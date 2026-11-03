from django.contrib import admin
from django.urls import path, include

admin.site.site_header = "GCE Admin"
admin.site.site_title = "GCE Admin"
admin.site.index_title = "GCE Administration"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('academic_tms1.timetable.urls')),
]