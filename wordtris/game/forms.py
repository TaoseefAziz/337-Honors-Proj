from django import forms
from django.forms import ModelForm
from .models import Game

class GameForm(ModelForm):
    # django thing
    class Meta:
        model = Game
        fields = ('score','player')