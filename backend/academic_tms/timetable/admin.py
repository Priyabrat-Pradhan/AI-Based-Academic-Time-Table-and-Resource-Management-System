from django.contrib import admin
from .models import (
    AcademicSemester,
    Classroom,
    Department,
    Subject,
    Task,
    Teacher,
    TimetableEntry,
)
admin.site.site_header = "GCE Admin"
admin.site.site_title = "GCE Admin"
admin.site.index_title = "GCE Administration"

admin.site.register(AcademicSemester)
admin.site.register(Classroom)
admin.site.register(Department)
admin.site.register(Subject)
admin.site.register(Task)
admin.site.register(Teacher)
admin.site.register(TimetableEntry)
