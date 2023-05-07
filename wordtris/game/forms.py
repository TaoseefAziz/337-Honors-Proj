from django import forms
from django.forms import ModelForm
from .models import Game

class GameForm(forms.ModelForm):

    class Meta:
        # bound to game model
        model = Game
        fields = ('score','words_matched','longest_word','most_valuable_word',)
        widgets = {'score': forms.HiddenInput()}
        