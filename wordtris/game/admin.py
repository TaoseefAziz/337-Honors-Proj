from django.contrib import admin
from .models import Game
from .models import Player

# Register your models here.

admin.site.register(Player)
#admin.site.register(Game)
@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('player','score','date_played')
    ordering = ('score',)

    # player.username doesnt work
    # search_fields = ('player.username','score',)
