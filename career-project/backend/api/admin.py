from django.contrib import admin
from .models import (
    UserProfile,
    Career,
    Degree,
    PreparationStep,
)

# --------------------------------------------------
# USER PROFILE
# --------------------------------------------------

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "district",
        "dream_job",
        "twelfth_group",
    )
    search_fields = ("user__username", "dream_job")
    list_filter = ("district", "twelfth_group")


# --------------------------------------------------
# CAREER
# --------------------------------------------------

@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


# --------------------------------------------------
# DEGREE
# --------------------------------------------------

@admin.register(Degree)
class DegreeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "career")
    list_filter = ("career",)
    search_fields = ("name",)


# --------------------------------------------------
# PREPARATION STEP
# --------------------------------------------------

@admin.register(PreparationStep)
class PreparationStepAdmin(admin.ModelAdmin):
    list_display = ("degree", "step_order", "short_description")
    list_filter = ("degree",)
    ordering = ("degree", "step_order")

    def short_description(self, obj):
        return obj.description[:60]



from .models import College

@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "district", "type")
    list_filter = ("district", "type")
    search_fields = ("name",)
    filter_horizontal = ("degrees",)



from api.models import Degree, Career