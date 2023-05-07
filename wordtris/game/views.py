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

    def post(self, request):
        print('POST REQ')
        if request.user.is_authenticated:
            form = GameForm(request.POST)
            if form.is_valid():
                obj = form.save(commit=False)
                obj.player = request.user

                obj.save()
                messages.success(request, ('Saved successfully!'))
                #return redirect(request, 'game/add_game.html', {'form':obj})
            return redirect('game')
        else:
            print("User not authenticated")
            return redirect('login')

            