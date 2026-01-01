from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    UserProfile,
    Career,
    Degree,
    PreparationStep,
    College,
)

from .serializers import ProfileSerializer
from django.core.mail import send_mail
from django.conf import settings








# ==================================================
# REGISTER
# ==================================================
@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username & password required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
    )

    UserProfile.objects.create(
        user=user,
        district=request.data.get("district", ""),
        dream_job=request.data.get("dreamJob", ""),
        twelfth_group=request.data.get("twelfthGroup", ""),
        age=request.data.get("age"),
        dob=request.data.get("dob"),
        photo="",
    )

    return Response(
        {"message": "User registered successfully"},
        status=status.HTTP_201_CREATED
    )


# ==================================================
# LOGIN
# ==================================================
@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    user = authenticate(
        username=request.data.get("username"),
        password=request.data.get("password"),
    )

    if not user:
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    })


# ==================================================
# PROFILE (STEP 1)
# ==================================================
@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def profile(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)

    if request.method == "GET":
        return Response(ProfileSerializer(profile).data)

    serializer = ProfileSerializer(
        profile,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():
        serializer.save()

        profile.profile_completed = True
        profile.save()

        return Response({"message": "Profile saved"})

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# ==================================================
# GET DEGREES BY CAREER (STEP 2)
# ==================================================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_degrees(request):
    career_name = request.GET.get("career")

    if not career_name:
        return Response([], status=status.HTTP_200_OK)

    degrees = Degree.objects.filter(
        career__name__iexact=career_name.strip(),
        is_active=True
    ).order_by("name").values("id", "name")

    return Response(list(degrees), status=status.HTTP_200_OK)


# ==================================================
# SELECT DEGREE (STEP 2)
# ==================================================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def select_degree(request):
    degree_id = request.data.get("degree_id")

    if not degree_id:
        return Response(
            {"error": "degree_id required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    profile = UserProfile.objects.get(user=request.user)

    # 🔒 CONDITION: degree must belong to user's dream job
    if not Degree.objects.filter(
        id=degree_id,
        career__name__iexact=profile.dream_job
    ).exists():
        return Response(
            {"error": "Invalid degree for selected career"},
            status=status.HTTP_400_BAD_REQUEST
        )

    profile.selected_degree_id = degree_id
    profile.degree_selected = True
    profile.save()

    return Response({
        "message": "Degree selected successfully"
    })



# ==================================================
# PREPARATION STEPS (STEP 3)
# ==================================================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_preparation_steps(request):
    degree_id = request.GET.get("degree_id")

    if not degree_id:
        return Response([], status=status.HTTP_200_OK)

    profile = UserProfile.objects.get(user=request.user)

    profile.preparation_started = True
    profile.save()

    steps = PreparationStep.objects.filter(
        degree_id=degree_id
    ).order_by("step_order")

    return Response([
        {
            "step": s.step_order,
            "description": s.description
        }
        for s in steps
    ])


# ==================================================
# GET COLLEGES (STEP 4)
# ==================================================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_colleges(request):
    degree_id = request.GET.get("degree_id")

    if not degree_id:
        return Response({"district": "", "colleges": []})

    profile = UserProfile.objects.get(user=request.user)

    colleges = College.objects.filter(
        district__iexact=profile.district,
        degrees__id=degree_id
    ).distinct()

    return Response({
        "district": profile.district,
        "colleges": [
            {
                "id": c.id,
                "name": c.name,
                "type": c.type,
            }
            for c in colleges
        ]
    })

# ==================================================
# SELECT COLLEGE (STEP 4)
# ==================================================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def select_college(request):
    college_id = request.data.get("college_id")

    if not college_id:
        return Response(
            {"error": "college_id required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    profile = UserProfile.objects.get(user=request.user)

    profile.selected_college_id = college_id
    profile.college_selected = True
    profile.save()

    return Response({"message": "College selected"})
# ==================================================
# ROADMAP STATUS (HOME PAGE)
# ==================================================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def roadmap_status(request):
    profile = UserProfile.objects.get(user=request.user)

    return Response({
        "step1": profile.profile_completed,
        "step2": profile.degree_selected,
        "step3": profile.preparation_started,
        "step4": profile.college_selected,
    })


# ==================================================
# CAREER SUMMARY (FINAL STEP)
# ==================================================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def career_summary(request):
    profile = UserProfile.objects.select_related(
        "selected_degree",
        "selected_college"
    ).get(user=request.user)

    degrees = Degree.objects.filter(
        career__name__iexact=profile.dream_job
    ).values("id", "name")

    return Response({
        "username": profile.user.username,
        "district": profile.district,
        "dream_job": profile.dream_job,
        "twelfth_group": profile.twelfth_group,

        "degrees": list(degrees),  # ✅ IMPORTANT

        "selected_degree": (
            {
                "id": profile.selected_degree.id,
                "name": profile.selected_degree.name
            }
            if profile.selected_degree else None
        ),

        "college": (
            {
                "name": profile.selected_college.name,
                "type": profile.selected_college.type,
            }
            if profile.selected_college else None
        ),

        "roadmap": {
            "profile_completed": profile.profile_completed,
            "degree_selected": profile.degree_selected,
            "preparation_started": profile.preparation_started,
            "college_selected": profile.college_selected,
        }
    })
#===========================================================
#admin page
#===========================================================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def admin_college_request(request):

    # 🔒 only admin
    if not request.user.is_staff:
        return Response({"error": "Unauthorized"}, status=403)

    college = request.data.get("college")
    degree = request.data.get("degree")
    district = request.data.get("district")
    college_type = request.data.get("college_type")
    notes = request.data.get("notes", "")

    if not college or not degree or not district:
        return Response({"error": "Missing fields"}, status=400)

    message = f"""
    NEW COLLEGE REQUEST

    College Name: {college}
    Degree: {degree}
    District: {district}
    Type: {college_type}

    Notes:
    {notes}
    """

    send_mail(
        subject="New College / Degree Admin Request",
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=["saransaran5475@gmail.com"],  
        fail_silently=False,
    )

    return Response({"message": "Request sent successfully"})
