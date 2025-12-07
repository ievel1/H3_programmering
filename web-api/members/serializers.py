from rest_framework import serializers
from .models import Household, Sport, Member, Membership


class HouseholdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Household
        fields = "__all__"


class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = "__all__"


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = "__all__"


class MemberSerializer(serializers.ModelSerializer):
    household = HouseholdSerializer(read_only=True)
    household_id = serializers.PrimaryKeyRelatedField(
        queryset=Household.objects.all(), source="household", write_only=True
    )
    total_annual_fee = serializers.IntegerField(read_only=True)

    class Meta:
        model = Member
        fields = [
            "id",
            "first_name",
            "last_name",
            "street",
            "city",
            "postal_code",
            "cpr",
            "birth_date",
            "household",
            "household_id",
            "is_passive",
            "is_parent",
            "num_children_in_gif",
            "total_annual_fee",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["age"] = instance.age
        data["is_child"] = instance.is_child
        data["is_adult"] = instance.is_adult
        data["passive_fee"] = instance.passive_fee()
        data["sport_fees"] = instance.total_sport_fees()
        return data