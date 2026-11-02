from django.contrib import admin
from .models import Department, AcademicSemester, Teacher, Subject, Classroom, TimetableEntry, Task


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'dept_type', 'head']
    search_fields = ['name', 'code']
    list_filter = ['dept_type']


@admin.register(AcademicSemester)
class AcademicSemesterAdmin(admin.ModelAdmin):
    list_display = ['name', 'academic_year', 'sem_type', 'start_date', 'end_date', 'status']
    list_filter = ['status', 'sem_type']


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ['name', 'department', 'employment_type', 'max_weekly_hours', 'status']
    list_filter = ['status', 'employment_type', 'department']
    search_fields = ['name', 'email']
    filter_horizontal = []


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'department', 'year', 'subject_type', 'credits', 'status']
    list_filter = ['year', 'subject_type', 'department', 'status']
    search_fields = ['name', 'code']
    filter_horizontal = ['teachers']


@admin.register(Classroom)
class ClassroomAdmin(admin.ModelAdmin):
    list_display = ['room_number', 'name', 'room_type', 'capacity', 'availability']
    list_filter = ['room_type', 'availability']
    search_fields = ['room_number', 'name']


@admin.register(TimetableEntry)
class TimetableEntryAdmin(admin.ModelAdmin):
    list_display = ['session_title', 'day', 'start_time', 'end_time', 'subject', 'teacher', 'room', 'conflict_status']
    list_filter = ['day', 'session_type', 'conflict_status', 'year']
    search_fields = ['session_title', 'teacher__name', 'subject__name']


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'subject', 'task_type', 'due_date', 'priority', 'status']
    list_filter = ['status', 'priority', 'task_type']
    search_fields = ['title']