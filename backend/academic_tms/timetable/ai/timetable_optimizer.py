from datetime import time

from ortools.sat.python import cp_model

from ..models import (
    AcademicSemester,
    Subject,
    Teacher,
    Classroom,
    TimetableEntry,
)


# --------------------------------------------------
# DAYS
# --------------------------------------------------

DAYS = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
]


# --------------------------------------------------
# TIME PERIODS
# --------------------------------------------------

PERIODS = [
    (time(9, 0), time(10, 0)),
    (time(10, 0), time(11, 0)),
    (time(11, 0), time(12, 0)),
    (time(12, 0), time(13, 0)),
    (time(14, 0), time(15, 0)),
    (time(15, 0), time(16, 0)),
]


# --------------------------------------------------
# TIMETABLE GENERATOR
# --------------------------------------------------

def generate_timetable(semester_id):
    """
    Generate a conflict-free timetable for one semester.
    """

    # Get semester
    semester = AcademicSemester.objects.get(id=semester_id)

    # Get subjects for this semester
    subjects = list(
        Subject.objects.filter(semester=semester)
    )

    # Get available teachers and classrooms
    teachers = list(Teacher.objects.all())
    classrooms = list(Classroom.objects.all())

    # --------------------------------------------------
    # VALIDATION
    # --------------------------------------------------

    if not subjects:
        raise ValueError(
            "No subjects found for this semester."
        )

    if not teachers:
        raise ValueError(
            "No teachers found."
        )

    if not classrooms:
        raise ValueError(
            "No classrooms found."
        )

    # --------------------------------------------------
    # OR-TOOLS MODEL
    # --------------------------------------------------

    model = cp_model.CpModel()

    total_slots = len(DAYS) * len(PERIODS)

    # --------------------------------------------------
    # VARIABLES
    # --------------------------------------------------

    # Subject -> time slot
    subject_slot = {}

    # Subject -> teacher
    subject_teacher = {}

    # Subject -> classroom
    subject_classroom = {}

    for subject in subjects:

        subject_slot[subject.id] = model.NewIntVar(
            0,
            total_slots - 1,
            f"slot_{subject.id}"
        )

        subject_teacher[subject.id] = model.NewIntVar(
            0,
            len(teachers) - 1,
            f"teacher_{subject.id}"
        )

        subject_classroom[subject.id] = model.NewIntVar(
            0,
            len(classrooms) - 1,
            f"classroom_{subject.id}"
        )

    # --------------------------------------------------
    # CONSTRAINT 1
    # Multiple classes may happen at the same time,
    # but they must use different teachers and rooms.
    # --------------------------------------------------

    # --------------------------------------------------
    # CONSTRAINT 2
    # A teacher cannot teach two subjects
    # at the same time.
    # --------------------------------------------------

    # --------------------------------------------------
    # CONSTRAINT 3
    # A classroom cannot be used by two subjects
    # at the same time.
    # --------------------------------------------------

    for i in range(len(subjects)):

        for j in range(i + 1, len(subjects)):

            s1 = subjects[i]
            s2 = subjects[j]

            # Boolean variable:
            # True when both subjects have the same slot
            same_slot = model.NewBoolVar(
                f"same_slot_{s1.id}_{s2.id}"
            )

            # Define same_slot correctly
            model.Add(
                subject_slot[s1.id]
                == subject_slot[s2.id]
            ).OnlyEnforceIf(same_slot)

            model.Add(
                subject_slot[s1.id]
                != subject_slot[s2.id]
            ).OnlyEnforceIf(same_slot.Not())

            # --------------------------------------------------
            # TEACHER CONSTRAINT
            # --------------------------------------------------

            model.Add(
                subject_teacher[s1.id]
                != subject_teacher[s2.id]
            ).OnlyEnforceIf(same_slot)

            # --------------------------------------------------
            # CLASSROOM CONSTRAINT
            # --------------------------------------------------

            model.Add(
                subject_classroom[s1.id]
                != subject_classroom[s2.id]
            ).OnlyEnforceIf(same_slot)

    # --------------------------------------------------
    # SOLVE
    # --------------------------------------------------

    solver = cp_model.CpSolver()

    solver.parameters.max_time_in_seconds = 10

    status = solver.Solve(model)

    if status not in (
        cp_model.OPTIMAL,
        cp_model.FEASIBLE,
    ):
        raise ValueError(
            "No feasible timetable could be generated."
        )

    # --------------------------------------------------
    # DELETE OLD TIMETABLE
    # --------------------------------------------------

    TimetableEntry.objects.filter(
        semester=semester
    ).delete()

    # --------------------------------------------------
    # SAVE GENERATED TIMETABLE
    # --------------------------------------------------

    generated_entries = []

    for subject in subjects:

        # Get selected slot
        slot = solver.Value(
            subject_slot[subject.id]
        )

        # Get selected teacher
        teacher_index = solver.Value(
            subject_teacher[subject.id]
        )

        # Get selected classroom
        classroom_index = solver.Value(
            subject_classroom[subject.id]
        )

        # Convert slot into day and period
        day_index = slot // len(PERIODS)
        period_index = slot % len(PERIODS)

        day = DAYS[day_index]

        start_time, end_time = PERIODS[
            period_index
        ]

        # Create database entry
        entry = TimetableEntry.objects.create(
            semester=semester,
            subject=subject,
            teacher=teachers[teacher_index],
            classroom=classrooms[classroom_index],
            day=day,
            start_time=start_time,
            end_time=end_time,
        )

        generated_entries.append(entry)

    return generated_entries