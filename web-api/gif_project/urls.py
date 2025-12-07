"""
URL configuration for gif_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from members.views import *

router = DefaultRouter()
router.register(r"households", HouseholdViewSet)
router.register(r"sports", SportViewSet)
router.register(r"members", MemberViewSet)
router.register(r"memberships", MembershipViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),

    # Web App views
    path("", MemberListView.as_view(), name="member_list"),
    path("members/create/", MemberCreateView.as_view(), name="member_create"),
    path("members/<int:pk>/edit/", MemberUpdateView.as_view(), name="member_edit"),
    path("members/<int:pk>/delete/", MemberDeleteView.as_view(), name="member_delete"),

    path("households/", HouseholdListView.as_view(), name="household_list"),
    path("households/create/", HouseholdCreateView.as_view(), name="household_create"),
    path("households/<int:pk>/edit/", HouseholdUpdateView.as_view(), name="household_edit"),
    path("households/<int:pk>/delete/", HouseholdDeleteView.as_view(), name="household_delete"),

    path("sports/", SportListView.as_view(), name="sport_list"),
    path("sports/create/", SportCreateView.as_view(), name="sport_create"),
    path("sports/<int:pk>/edit/", SportUpdateView.as_view(), name="sport_edit"),
    path("sports/<int:pk>/delete/", SportDeleteView.as_view(), name="sport_delete"),

    path("fees/", FeesDashboardView.as_view(), name="fees_dashboard"),

    # API schema / docs (hvis du har drf-spectacular)
    # path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),

    # API routes
    path("api/", include(router.urls)),
]
