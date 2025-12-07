from django.test import TestCase
from django.urls import reverse
from datetime import date

from .models import Household, Member, Sport, Membership


class MemberFeeTests(TestCase):
    def setUp(self):
        self.household = Household.objects.create(
            name="Familien Test",
            street="Testvej 1",
            city="Gudumholm",
            postal_code="1234",
        )
        self.sport = Sport.objects.create(
            name="Fodbold",
            annual_fee_adult=800,
            annual_fee_child=600,
        )

    def test_passive_child_fee(self):
        member = Member.objects.create(
            first_name="Test",
            last_name="Barn",
            street="Testvej 1",
            city="Gudumholm",
            postal_code="1234",
            cpr="010101-0000",
            birth_date=date.today().replace(year=date.today().year - 10),
            household=self.household,
            is_passive=True,
        )
        self.assertEqual(member.passive_fee(), 200)

    def test_active_adult_with_sport(self):
        member = Member.objects.create(
            first_name="Test",
            last_name="Voksen",
            street="Testvej 1",
            city="Gudumholm",
            postal_code="1234",
            cpr="010101-0001",
            birth_date=date.today().replace(year=date.today().year - 30),
            household=self.household,
            is_passive=False,
        )
        Membership.objects.create(member=member, sport=self.sport, is_board_member=False)
        self.assertEqual(member.total_annual_fee(), 800)
