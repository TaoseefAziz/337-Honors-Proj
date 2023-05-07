from django.shortcuts import render
from .forms import GameForm
# references 'models' folder in current directory and the 'Game' class from models.py
from .models import Game

# for form posts
from django.http import HttpResponseRedirect

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

def add_game(request):
    submitted = False

    if request.method=='POST':
        form = GameForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/add_game?submitted=True')
    else:
        form = GameForm(request.POST)
        if 'submitted' in request.GET:
            submitted = True

    return render(request, 'game/add_game.html', {'form':form, 'submitted':submitted})