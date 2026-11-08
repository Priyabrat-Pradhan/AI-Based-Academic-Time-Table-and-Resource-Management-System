from django.db import models


class Department(models.Model):
    DEPT_TYPES = [
        ('Science', 'Science'),
        ('Arts', 'Arts'),
        ('Commerce', 'Commerce'),
        ('Engineering', 'Engineering'),
        ('Humanities', 'Humanities'),
    ]
    name = models.CharField(max_length=200, unique=True)
    code = models.CharField(max_length=20, unique=True)
    head = models.CharField(max_length=200, blank=True)
    email = models.EmailField(blank=True)
    dept_type = models.CharField(max_length=50, choices=DEPT_TYPES, default='Science')
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.code} - {self.name}"

    class Meta:
        ordering = ['name']


class AcademicSemester(models.Model):
    STATUS_CHOICES = [('Upcoming', 'Upcoming'), ('Active', 'Active'), ('Completed', 'Completed')]
    SEM_TYPES = [('Odd Semester', 'Odd Semester'), ('Even Semester', 'Even Semester'), ('Summer Term', 'Summer Term')]

    name = models.CharField(max_length=200)
    academic_year = models.CharField(max_length=20)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Upcoming')
    sem_type = models.CharField(max_length=30, choices=SEM_TYPES, default='Odd Semester')
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.academic_year})"

    class Meta:
        ordering = ['-start_date']


class Teacher(models.Model):
    DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    EMP_TYPES = [('Full-Time', 'Full-Time'), ('Part-Time', 'Part-Time'), ('Visiting', 'Visiting'), ('Adjunct', 'Adjunct')]
    STATUS = [('Active', 'Active'), ('On Leave', 'On Leave'), ('Inactive', 'Inactive')]

    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='teachers')
    qualification = models.CharField(max_length=300, blank=True)
    specialization = models.CharField(max_length=300, blank=True)
    employment_type = models.CharField(max_length=20, choices=EMP_TYPES, default='Full-Time')
    max_weekly_hours = models.PositiveIntegerField(default=20)
    # Stored as comma-separated days e.g. "Monday,Wednesday,Friday"
    available_days = models.CharField(max_length=200, default='Monday,Tuesday,Wednesday,Thursday,Friday')
    # e.g. "09:00-12:00,14:00-17:00"
    available_time_slots = models.CharField(max_length=300, blank=True)
    status = models.CharField(max_length=20, choices=STATUS, default='Active')

    def get_available_days_list(self):
        return [d.strip() for d in self.available_days.split(',') if d.strip()]

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Subject(models.Model):
    SUBJECT_TYPES = [
        ('Theory', 'Theory'), ('Lab / Practical', 'Lab / Practical'),
        ('Theory + Lab', 'Theory + Lab'), ('Elective', 'Elective'), ('Project', 'Project')
    ]
    YEARS = [('1st Year', '1st Year'), ('2nd Year', '2nd Year'), ('3rd Year', '3rd Year'), ('4th Year', '4th Year')]
    ROOM_REQS = [('Classroom', 'Classroom'), ('Laboratory', 'Laboratory'), ('Lecture Hall', 'Lecture Hall'), ('Computer Lab', 'Computer Lab')]
    STATUS = [('Draft', 'Draft'), ('Active', 'Active'), ('Archived', 'Archived')]

    name = models.CharField(max_length=200)
    code = models.CharField(max_length=20, unique=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='subjects')
    credits = models.PositiveIntegerField(default=3)
    weekly_hours = models.PositiveIntegerField(default=3)
    subject_type = models.CharField(max_length=30, choices=SUBJECT_TYPES, default='Theory')
    semester = models.ForeignKey(AcademicSemester, on_delete=models.SET_NULL, null=True, blank=True, related_name='subjects')
    year = models.CharField(max_length=20, choices=YEARS, default='1st Year')
    room_requirement = models.CharField(max_length=30, choices=ROOM_REQS, default='Classroom')
    teachers = models.ManyToManyField(Teacher, blank=True, related_name='subjects')
    status = models.CharField(max_length=20, choices=STATUS, default='Active')
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.code} - {self.name}"

    class Meta:
        ordering = ['year', 'name']


class Classroom(models.Model):
    ROOM_TYPES = [
        ('Classroom', 'Classroom'), ('Laboratory', 'Laboratory'),
        ('Lecture Hall', 'Lecture Hall'), ('Seminar Room', 'Seminar Room'), ('Computer Lab', 'Computer Lab')
    ]
    AVAIL_STATUS = [('Available', 'Available'), ('Occupied', 'Occupied'), ('Under Maintenance', 'Under Maintenance')]
    FACILITY_CHOICES = ['Projector', 'Whiteboard', 'AC', 'Computer Systems', 'Smart Board', 'Lab Equipment']

    name = models.CharField(max_length=200)
    room_number = models.CharField(max_length=50, unique=True)
    room_type = models.CharField(max_length=30, choices=ROOM_TYPES, default='Classroom')
    capacity = models.PositiveIntegerField(default=30)
    floor_building = models.CharField(max_length=100, blank=True)
    availability = models.CharField(max_length=30, choices=AVAIL_STATUS, default='Available')
    # Stored as comma-separated e.g. "Projector,AC,Whiteboard"
    facilities = models.CharField(max_length=300, blank=True)
    notes = models.TextField(blank=True)

    def get_facilities_list(self):
        return [f.strip() for f in self.facilities.split(',') if f.strip()]

    def __str__(self):
        return f"{self.room_number} - {self.name}"

    class Meta:
        ordering = ['room_number']


class TimetableEntry(models.Model):
    DAYS = [
        ('Monday', 'Monday'), ('Tuesday', 'Tuesday'), ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'), ('Friday', 'Friday'), ('Saturday', 'Saturday')
    ]
    SESSION_TYPES = [
        ('Lecture', 'Lecture'), ('Lab', 'Lab'), ('Tutorial', 'Tutorial'),
        ('Seminar', 'Seminar'), ('Exam', 'Exam')
    ]
    CONFLICT_STATUS = [
        ('No Conflict', 'No Conflict'), ('Teacher Conflict', 'Teacher Conflict'),
        ('Room Conflict', 'Room Conflict'), ('Needs Review', 'Needs Review')
    ]
    YEARS = [('1st Year', '1st Year'), ('2nd Year', '2nd Year'), ('3rd Year', '3rd Year'), ('4th Year', '4th Year')]

    session_title = models.CharField(max_length=300)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='timetable_entries')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='timetable_entries')
    room = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='timetable_entries')
    semester = models.ForeignKey(AcademicSemester, on_delete=models.CASCADE, related_name='timetable_entries')
    day = models.CharField(max_length=15, choices=DAYS)
    start_time = models.TimeField()
    end_time = models.TimeField()
    session_type = models.CharField(max_length=20, choices=SESSION_TYPES, default='Lecture')
    conflict_status = models.CharField(max_length=30, choices=CONFLICT_STATUS, default='No Conflict')
    batch_section = models.CharField(max_length=100, blank=True)
    year = models.CharField(max_length=20, choices=YEARS, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.day} {self.start_time}-{self.end_time} | {self.subject} | {self.teacher}"

    class Meta:
        ordering = ['day', 'start_time']


class Task(models.Model):
    TASK_TYPES = [
        ('Assignment', 'Assignment'), ('Project', 'Project'), ('Exam', 'Exam'),
        ('Quiz', 'Quiz'), ('Lab Report', 'Lab Report'), ('Presentation', 'Presentation')
    ]
    PRIORITY = [('High', 'High'), ('Medium', 'Medium'), ('Low', 'Low')]
    STATUS = [
        ('Not Started', 'Not Started'), ('Upcoming', 'Upcoming'),
        ('In Progress', 'In Progress'), ('Under Review', 'Under Review'),
        ('Submitted', 'Submitted'), ('Completed', 'Completed')
    ]

    title = models.CharField(max_length=300)
    subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True, related_name='tasks')
    semester = models.ForeignKey(AcademicSemester, on_delete=models.SET_NULL, null=True, related_name='tasks')
    task_type = models.CharField(max_length=30, choices=TASK_TYPES, default='Assignment')
    due_date = models.DateField(null=True, blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY, default='Medium')
    status = models.CharField(max_length=20, choices=STATUS, default='Not Started')
    max_marks = models.PositiveIntegerField(default=100)
    marks_scored = models.FloatField(null=True, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['due_date']