from django.db import models


class AcademicSemester(models.Model):
    STATUS_CHOICES = [
        ("upcoming", "Upcoming"),
        ("active", "Active"),
        ("completed", "Completed"),
    ]

    SEM_TYPE_CHOICES = [
        ("odd", "Odd Semester"),
        ("even", "Even Semester"),
    ]

    name = models.CharField(max_length=100)
    academic_year = models.CharField(max_length=20)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="upcoming"
    )
    sem_type = models.CharField(
        max_length=10,
        choices=SEM_TYPE_CHOICES,
        default="odd"
    )
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} - {self.academic_year}"


class Department(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f"{self.name} ({self.code})"


class Classroom(models.Model):
    name = models.CharField(max_length=100)
    room_number = models.CharField(max_length=50)
    capacity = models.PositiveIntegerField(default=30)

    def __str__(self):
        return self.name


class Teacher(models.Model):
    name = models.CharField(max_length=100)

    employee_id = models.CharField(max_length=50, unique=True, blank=True, null=True)
    email = models.EmailField(blank=True)

    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name


class Subject(models.Model):
    name = models.CharField(max_length=150)
    code = models.CharField(max_length=30, unique=True)
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE
    )
    semester = models.ForeignKey(
        AcademicSemester,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.code} - {self.name}"


class Task(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    due_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class TimetableEntry(models.Model):
    DAYS = [
        ("monday", "Monday"),
        ("tuesday", "Tuesday"),
        ("wednesday", "Wednesday"),
        ("thursday", "Thursday"),
        ("friday", "Friday"),
        ("saturday", "Saturday"),
    ]

    semester = models.ForeignKey(
        AcademicSemester,
        on_delete=models.CASCADE
    )
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE
    )
    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.CASCADE
    )
    classroom = models.ForeignKey(
        Classroom,
        on_delete=models.CASCADE
    )
    day = models.CharField(
        max_length=20,
        choices=DAYS
    )
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.subject} - {self.day}"
