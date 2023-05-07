from django.urls import path
from . import views
urlpatterns = [
    path('login_player',views.login_player, name="login"),
    path('register_player',views.register_player, name="register_player"),
    path('logout_player',views.logout_player, name="logout"),
]
