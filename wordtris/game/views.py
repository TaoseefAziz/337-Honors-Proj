from django.shortcuts import render

# references 'models' folder in current directory and the 'Game' class from models.py
from .models import Game

context = {
    'n': range(200),
    'm': range(10),
    'k': range(16),
    # other context stuff
}

# Create your views here.
def game(request):
    return render(request,'game/game.html',context)

def scores(request):
    scoresList = Game.objects.all()
    return render(request, 'game/scores.html', {'scoresList': scoresList})