from django.db import models
import datetime
# Create your models here.

class Player(models.Model):
    username = models.CharField(max_length=20)

    def __str__(self):
        return f"Username: {self.username}" 

class Game(models.Model):
    score = models.IntegerField()

    # blank=True => not required
    words_matched = models.IntegerField(null='True',blank=True)
    longest_word = models.IntegerField(null='True',blank=True)
    most_valuable_word = models.CharField(max_length=20,null='True', blank=True)
    date_played = models.DateField(default=datetime.date.today,null='True', blank=True)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)

    def __str__(self):
        return f"Player: {self.player.username} Score: {self.score} Words Matched: {self.words_matched} Date Played: {self.date_played}" 


