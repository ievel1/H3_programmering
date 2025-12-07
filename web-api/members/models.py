from django.db import models
from datetime import date


class Household(models.Model):
    name = models.CharField("Navn", max_length=100, blank=True)
    street = models.CharField("Vejnavn", max_length=200)
    city = models.CharField("By", max_length=100)
    postal_code = models.CharField("Postnummer", max_length=20)

    def __str__(self):
        return self.name or f"{self.street}, {self.city}"


class Sport(models.Model):
    name = models.CharField("Navn", max_length=100, unique=True)
    annual_fee_adult = models.PositiveIntegerField("Kontingent (voksen)")
    annual_fee_child = models.PositiveIntegerField("Kontingent (barn)")
    is_active = models.BooleanField("Aktiv?", default=True)

    def __str__(self):
        return self.name


class Member(models.Model):
    CPR_FORMAT_HELP = "Format: xxyyzz-zzzz"

    first_name = models.CharField("Fornavn", max_length=100)
    last_name = models.CharField("Efternavn", max_length=100)
    street = models.CharField("Vejnavn", max_length=200)
    city = models.CharField("By", max_length=100)
    postal_code = models.CharField("Postnummer", max_length=20)

    cpr = models.CharField("CPR-nummer", max_length=11, unique=True, help_text=CPR_FORMAT_HELP)
    birth_date = models.DateField("Fødselsdato")
    household = models.ForeignKey(
        Household,
        verbose_name="Husstand",
        on_delete=models.PROTECT,
        related_name="members",
    )

    # Membership / roles
    is_passive = models.BooleanField("Passivt medlem?", default=True)
    is_parent = models.BooleanField(default=False)
    num_children_in_gif = models.PositiveIntegerField(default=0)

    PASSIVE_FEE_ADULT = 400
    PASSIVE_FEE_CHILD = 200

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def age(self) -> int:
        today = date.today()
        return today.year - self.birth_date.year - (
            (today.month, today.day) < (self.birth_date.month, self.birth_date.day)
        )

    @property
    def is_child(self) -> bool:
        return self.age < 18

    @property
    def is_adult(self) -> bool:
        return self.age >= 18

    def update_parent_role(self):
        self.is_parent = self.num_children_in_gif > 0
        self.save(update_fields=["is_parent"])

    def passive_fee(self) -> int:
        if not self.is_passive:
            return 0
        return self.PASSIVE_FEE_CHILD if self.is_child else self.PASSIVE_FEE_ADULT

    def total_sport_fees(self) -> int:
        total = 0
        memberships = self.sport_memberships.select_related("sport")
        for m in memberships:
            if m.is_board_member:
                continue
            sport = m.sport
            if self.is_child:
                total += sport.annual_fee_child
            else:
                total += sport.annual_fee_adult
        return total

    def total_annual_fee(self) -> int:
        return self.passive_fee() + self.total_sport_fees()


class Membership(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name="sport_memberships")
    sport = models.ForeignKey(Sport, on_delete=models.PROTECT, related_name="memberships")
    is_board_member = models.BooleanField(default=False)

    class Meta:
        unique_together = [
            ("member", "sport"),
        ]

    def save(self, *args, **kwargs):
        if self.is_board_member:
            qs = Membership.objects.filter(member=self.member, is_board_member=True)
            if self.pk:
                qs = qs.exclude(pk=self.pk)
            if qs.exists():
                raise ValueError("Member can only be board member in one sport.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.member} - {self.sport} ({'board' if self.is_board_member else 'active'})"
