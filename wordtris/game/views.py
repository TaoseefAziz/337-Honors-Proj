from django.shortcuts import render

context = {
    'n': range(200),
    'm': range(10),
    'k': range(16),
    # other context stuff
}

# Create your views here.
def game(request):
    return render(request,'game/game.html',context)