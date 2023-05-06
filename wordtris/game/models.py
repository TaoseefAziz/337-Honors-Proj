from django.db import models
import datetime
# Create your models here.

class Player(models.Model):
    username = models.CharField(max_length=20)

    def __str__(self):
        return f"Username: {self.username}" 

class Game(models.Model):
    score = models.IntegerField()
    words_matched = models.IntegerField()
    longest_word = models.IntegerField()
    most_valuable_word = models.CharField(max_length=20)
    date_played = models.DateField(default=datetime.date.today, blank=True)
    player = models.ForeignKey(Player, blank='True',null='True',on_delete=models.CASCADE)

    def __str__(self):
        return f"Score: {self.score} Words Matched: {self.words_matched} Date Played: {self.date_played}" 


