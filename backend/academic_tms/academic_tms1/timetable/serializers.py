from rest_framework import serializers
from .models import Department, AcademicSemester, Teacher, Subject, Classroom, TimetableEntry, Task


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class AcademicSemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicSemester
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    scheduled_hours = serializers.SerializerMethodField()

    class Meta:
        model = Teacher
        fields = '__all__'

    def get_scheduled_hours(self, obj):
        return obj.timetable_entries.count()  # each entry = 1 hour approx


class SubjectSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    semester_name = serializers.CharField(source='semester.name', read_only=True)
    teachers_list = serializers.SerializerMethodField()

    class Meta:
        model = Subject
        fields = '__all__'

    def get_teachers_list(self, obj):
        return [t.name for t in obj.teachers.all()]


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = '__all__'


class TimetableEntrySerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    subject_code = serializers.CharField(source='subject.code', read_only=True)
    teacher_name = serializers.CharField(source='teacher.name', read_only=True)
    room_number = serializers.CharField(source='room.room_number', read_only=True)
    semester_name = serializers.CharField(source='semester.name', read_only=True)

    class Meta:
        model = TimetableEntry
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    semester_name = serializers.CharField(source='semester.name', read_only=True)

    class Meta:
        model = Task
        fields = '__all__'