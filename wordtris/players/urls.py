from django.urls import path
from . import views
urlpatterns = [
    path('login_player',views.login_player, name="login"),
]
