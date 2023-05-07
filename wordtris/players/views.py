from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

# Create your views here.
def login_player(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        player = authenticate(request, username=username, password=password)
        
        if player is not None:
            login(request, player)
            return redirect('game')
        else: 
            messages.success(request, ('There was an error logging in!'))
            redirect('login')
            return render(request, 'authenticate/login.html',{})
    else:
        return render(request, 'authenticate/login.html',{})