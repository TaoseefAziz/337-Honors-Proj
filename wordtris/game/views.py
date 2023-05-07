from django.shortcuts import render, redirect
from .forms import GameForm
# references 'models' folder in current directory and the 'Game' class from models.py
from .models import Game
from django.views.decorators.csrf import csrf_exempt




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
    scoresList = Game.objects.all().order_by('-score')[0:25]
    return render(request, 'game/scores.html', {'scoresList': scoresList, 'num_scores': range(20)})

def my_scores(request):
    if request.user.username != "":
        scoresList = Game.objects.all().filter(player=request.user).order_by('-score')[0:25]
        return render(request, 'game/scores.html', {'scoresList': scoresList, 'num_scores':  range(20)})
    else:
        return render(request, 'game/scores_restricted.html')
@csrf_exempt
def add_game(request):
    if request.method=='POST':
        form = GameForm(request.POST)
        if form.is_valid():
            formobj = form.save(commit=False)
            formobj.player = request.user
            formobj.save()
            return redirect('game')

def help(request):
    return render(request, 'game/help.html')
            