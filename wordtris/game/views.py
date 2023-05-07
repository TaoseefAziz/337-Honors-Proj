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
    
    if request.user.is_authenticated:
        curUser = request.user
        print(f"user: {curUser}")

        if request.method=='POST':
            form = GameForm(request.POST)
            obj = form.save(commit=False)
            obj.player = curUser
            print(f"form: {form}")
            print(f"obj: {obj}")
            obj.save()
            messages.success(request, ('Saved successfully!'))
        
            return render(request, 'game/add_game.html', {'form':obj})
            # else:
            #     print('Form invalid.')
            #     return render(request, 'game/add_game.html', {'form':form})
        else:
            print('Not a post request')
    else:
        print("User not authenticated")
        return redirect('game')

        