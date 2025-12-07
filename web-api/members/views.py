import logging

logger = logging.getLogger(__name__)

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum

from .models import Household, Sport, Member, Membership
from .serializers import (
    HouseholdSerializer,
    SportSerializer,
    MemberSerializer,
    MembershipSerializer,
)
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, TemplateView
from django.urls import reverse_lazy
from .forms import MemberForm


class HouseholdViewSet(viewsets.ModelViewSet):
    queryset = Household.objects.all()
    serializer_class = HouseholdSerializer


class HouseholdListView(ListView):
    model = Household
    template_name = "members/household_list.html"
    context_object_name = "households"


class HouseholdCreateView(CreateView):
    model = Household
    fields = ["name", "street", "city", "postal_code"]
    template_name = "members/household_form.html"
    success_url = reverse_lazy("household_list")


class HouseholdUpdateView(UpdateView):
    model = Household
    fields = ["name", "street", "city", "postal_code"]
    template_name = "members/household_form.html"
    success_url = reverse_lazy("household_list")


class HouseholdDeleteView(DeleteView):
    model = Household
    template_name = "members/household_confirm_delete.html"
    success_url = reverse_lazy("household_list")


class SportViewSet(viewsets.ModelViewSet):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer


class SportListView(ListView):
    model = Sport
    template_name = "members/sport_list.html"
    context_object_name = "sports"


class SportCreateView(CreateView):
    model = Sport
    fields = ["name", "annual_fee_adult", "annual_fee_child", "is_active"]
    template_name = "members/sport_form.html"
    success_url = reverse_lazy("sport_list")


class SportUpdateView(UpdateView):
    model = Sport
    fields = ["name", "annual_fee_adult", "annual_fee_child", "is_active"]
    template_name = "members/sport_form.html"
    success_url = reverse_lazy("sport_list")


class SportDeleteView(DeleteView):
    model = Sport
    template_name = "members/sport_confirm_delete.html"
    success_url = reverse_lazy("sport_list")


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    @action(detail=True, methods=["get"])
    def annual_fee(self, request, pk=None):
        member = self.get_object()
        return Response(
            {
                "member_id": member.id,
                "total_annual_fee": member.total_annual_fee(),
                "passive_fee": member.passive_fee(),
                "sport_fees": member.total_sport_fees(),
            }
        )

    @action(detail=False, methods=["get"])
    def household_total(self, request):
        household_id = request.query_params.get("household_id")
        if not household_id:
            return Response({"error": "household_id is required"}, status=400)
        members = Member.objects.filter(household_id=household_id)
        total = sum(m.total_annual_fee() for m in members)
        return Response({"household_id": household_id, "total_annual_fee": total})

    @action(detail=False, methods=["get"])
    def sport_total(self, request):
        sport_id = request.query_params.get("sport_id")
        if not sport_id:
            return Response({"error": "sport_id is required"}, status=400)

        memberships = Membership.objects.filter(sport_id=sport_id).select_related("member", "sport")
        total = 0
        for ms in memberships:
            m = ms.member
            if ms.is_board_member:
                continue
            sport = ms.sport
            if m.is_child:
                total += sport.annual_fee_child
            else:
                total += sport.annual_fee_adult

        return Response({"sport_id": sport_id, "total_annual_fee": total})

    @action(detail=False, methods=["get"])
    def all_sports_total(self, request):
        members = Member.objects.all()
        total = sum(m.total_sport_fees() for m in members)
        return Response({"total_annual_sport_fees": total})

    @action(detail=False, methods=["get"])
    def passive_total(self, request):
        members = Member.objects.filter(is_passive=True)
        total = sum(m.passive_fee() for m in members)
        return Response({"total_passive_fees": total})

    def perform_create(self, serializer):
        member = serializer.save()
        logger.info(f"Created member {member.id} - {member.first_name} {member.last_name}")


class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer


class MemberListView(ListView):
    model = Member
    template_name = "members/member_list.html"
    context_object_name = "members"


class MemberCreateView(CreateView):
    model = Member
    form_class = MemberForm
    template_name = "members/member_form.html"
    success_url = reverse_lazy("member_list")


class MemberUpdateView(UpdateView):
    model = Member
    form_class = MemberForm
    template_name = "members/member_form.html"
    success_url = reverse_lazy("member_list")


class MemberDeleteView(DeleteView):
    model = Member
    template_name = "members/member_confirm_delete.html"
    success_url = reverse_lazy("member_list")


class FeesDashboardView(TemplateView):
    template_name = "members/fees_dashboard.html"
