from django.db import models
from django.contrib.auth.models import User


# --------------------------------------------------
# USER PROFILE (EXTENDED – ROADMAP ENABLED)
# --------------------------------------------------

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    district = models.CharField(max_length=100, blank=True)
    dream_job = models.CharField(max_length=100, blank=True)
    twelfth_group = models.CharField(max_length=100, blank=True)

    age = models.IntegerField(null=True, blank=True)
    dob = models.DateField(null=True, blank=True)

    photo = models.TextField(blank=True)  # base64 image

    # 🔥 ROADMAP STATUS FLAGS
    profile_completed = models.BooleanField(default=False)
    degree_selected = models.BooleanField(default=False)
    preparation_started = models.BooleanField(default=False)
    college_selected = models.BooleanField(default=False)

    # 🔥 USER SELECTIONS
    selected_degree = models.ForeignKey(
        "Degree",
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    selected_college = models.ForeignKey(
        "College",
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.user.username


# --------------------------------------------------
# CAREER (Engineer, Doctor, etc.)
# --------------------------------------------------

class Career(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


# --------------------------------------------------
# DEGREE (Civil, Mechanical, etc.)
# --------------------------------------------------
class Degree(models.Model):
    career = models.ForeignKey(Career, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)  # 🔥 ADD THIS

    def __str__(self):
        return self.name




# --------------------------------------------------
# PREPARATION STEPS (Degree-specific)
# --------------------------------------------------

class PreparationStep(models.Model):
    degree = models.ForeignKey(
        Degree,
        on_delete=models.CASCADE,
        related_name="preparation_steps"
    )
    step_order = models.PositiveIntegerField()
    description = models.TextField()

    class Meta:
        ordering = ["step_order"]

    def __str__(self):
        return f"{self.degree.name} - Step {self.step_order}"


# --------------------------------------------------
# COLLEGE
# --------------------------------------------------

class College(models.Model):
    name = models.CharField(max_length=200)
    district = models.CharField(max_length=100)

    degrees = models.ManyToManyField(
        Degree,
        related_name="colleges"
    )

    type = models.CharField(
        max_length=50,
        choices=[("Government", "Government"), ("Private", "Private")],
        default="Private"
    )

    def __str__(self):
        return f"{self.name} ({self.district})"
class Meta:
    unique_together = ("name", "career")




