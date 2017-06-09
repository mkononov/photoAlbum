from django import forms

class UploadImageForm(forms.Form):
    comment = forms.CharField(max_length=255)
    image = forms.ImageField()
