from django.urls import path
from .views import career_summary
from .views import (
    register_user,
    login_user,
    profile,
    get_degrees,
    get_preparation_steps,
    get_colleges,
    select_degree,
    select_college,
    roadmap_status,
    admin_college_request,
)

urlpatterns = [
    # ================= AUTH =================
    path("auth/register/", register_user),
    path("auth/login/", login_user),

    # ================= PROFILE =================
    path("profile/", profile),

    # ================= CAREER FLOW =================
    path("degrees/", get_degrees),

    # 🔥 PREPARATION
    path("preparation-steps/", get_preparation_steps),

    # 🔥 COLLEGES
    path("colleges/", get_colleges),

    # ================= ROADMAP ACTIONS =================
    path("select-degree/", select_degree),
    path("select-college/", select_college),
    path("roadmap/", roadmap_status),
    path("career-summary/", career_summary),
    path("admin/college-request/", admin_college_request),


]

