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
