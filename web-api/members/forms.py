from django import forms

from .models import Member


class MemberForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = [
            "first_name",
            "last_name",
            "street",
            "city",
            "postal_code",
            "cpr",
            "birth_date",
            "household",
            "is_passive",
        ]
        widgets = {
            "birth_date": forms.DateInput(attrs={"type": "date"}),
        }

    def clean_first_name(self):
        value = self.cleaned_data.get("first_name", "").strip()
        if len(value) < 2:
            raise forms.ValidationError("Fornavn skal være mindst 2 tegn.")
        return value

    def clean_last_name(self):
        value = self.cleaned_data.get("last_name", "").strip()
        if len(value) < 2:
            raise forms.ValidationError("Efternavn skal være mindst 2 tegn.")
        return value

    def clean_postal_code(self):
        value = self.cleaned_data.get("postal_code", "").strip()
        if not value.isdigit() or not (3 <= len(value) <= 5):
            raise forms.ValidationError("Postnummer skal være 3-5 cifre.")
        return value

    def clean_cpr(self):
        value = self.cleaned_data.get("cpr", "").strip()
        if len(value) != 11 or value[6] != "-":
            raise forms.ValidationError("CPR skal være i formatet xxyyzz-zzzz.")
        return value
