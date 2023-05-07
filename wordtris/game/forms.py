from django import forms
from django.forms import ModelForm
from .models import Game

class GameForm(forms.ModelForm):
    # django thing
    class Meta:
        # bound to game model
        model = Game
        fields = ('score','player',)