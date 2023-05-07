from django.db import models
import datetime
from django.contrib.auth.models import User
# Create your models here.

class Player(models.Model):
    username = models.CharField(max_length=20)

    def __str__(self):
        return f"Username: {self.username}" 

class Game(models.Model):
    score = models.IntegerField()

    # blank=True => not required
    words_matched = models.IntegerField(null='True',blank=True)
    longest_word = models.CharField(max_length=10, null='True',blank=True)
    most_valuable_word = models.CharField(max_length=10,null='True', blank=True)
    date_played = models.DateField(default=datetime.date.today,null='True', blank=True)
    player = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.player.username} scored {self.score} with {self.words_matched} word matches. Most valuable word was {self.most_valuable_word}, longest was {self.longest_word}. {self.date_played}" 


