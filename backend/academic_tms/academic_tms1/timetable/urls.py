from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'departments', views.DepartmentViewSet)
router.register(r'semesters', views.AcademicSemesterViewSet)
router.register(r'teachers', views.TeacherViewSet)
router.register(r'subjects', views.SubjectViewSet)
router.register(r'classrooms', views.ClassroomViewSet)
router.register(r'timetable', views.TimetableEntryViewSet)
router.register(r'tasks', views.TaskViewSet)

urlpatterns = [
    path('dashboard/', views.dashboard_summary, name='dashboard-summary'),
    path('', include(router.urls)),
]