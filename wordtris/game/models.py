from django.db import models
import datetime
# Create your models here.

class Game(models.Model):
    score = models.IntegerField()
    words_matched = models.IntegerField()
    longest_word = models.IntegerField()
    most_valuable_word = models.CharField(max_length=20)
    date_played = models.DateField(_("Date"), auto_now_add=True)

def __str__(self):
    return f"Score: {self.score} Words Matched: {self.words_matched} Date Played: {self.date_played}" 


class Player(models.Model):
    username = models.CharField(max_length=20)
    games_played = models.ForeignKey(Game, blank='True',null='True')


    def __str__(self):
        return f"Username: {self.username} Games Played: {self.games_played}" 
