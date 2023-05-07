from django.shortcuts import render, redirect
from .forms import GameForm
# references 'models' folder in current directory and the 'Game' class from models.py
from .models import Game
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages



# for form posts

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

@csrf_exempt
def add_game(request):
    submitted = False

    if request.method=='POST':
        form = GameForm(request.POST)
        if form.is_valid():
            formobj = form.save(commit=False)
            formobj.player = request.user
            formobj.save()
            return redirect('game')
    else:
        form = GameForm(request.POST)
        if 'submitted' in request.GET:
            submitted = True

    return render(request, 'game/add_game.html', {'form':form, 'submitted':submitted})

            