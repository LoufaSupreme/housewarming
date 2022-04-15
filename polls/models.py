from django.db import models
from django.db.models.fields import EmailField
from django.utils import timezone

# Create your models here.

class Guest(models.Model):
    first_name = models.CharField(max_length=10)
    last_name = models.CharField(max_length=10)
    alias = models.CharField(max_length=20, blank=True)
    fav_color = models.CharField(max_length=20, blank=True)
    fav_drink = models.CharField(max_length=20, blank=True)
    spirit_animal = models.CharField(max_length=20, blank=True)
    picture = models.ImageField(blank=True)
    comment = models.CharField(max_length=140, blank=True)

    def __str__(self):
        return f'{self.id}: {self.first_name} "{self.alias}" {self.last_name}'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'alias': self.alias,
            'fav_color': self.fav_color,
            'fav_drink': self.fav_drink,
            'spirit_animal': self.spirit_animal,
            'picture': self.picture,
            'comment': self.comment,            
        }

class Question(models.Model):
    q_text = models.CharField(max_length=255)
    type = models.CharField(max_length=20)
    image = models.ImageField(blank=True)
    position = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.id}: {self.q_text[:50]}...'

    def serialize(self):
        return {
            'id': self.id,
            'q_text': self.q_text,
            'type': self.type,
            'image': self.image,
            'position': self.position,
        }

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    choice_text = models.CharField(max_length=255)
    votes = models.ManyToManyField(Guest, related_name='choices', blank=True)
    image = models.FileField(blank=True)

    def __str__(self):
        return f'{self.id}: {self.choice_text[:10]}... for Q{self.question}'

    def serialize(self):
        return {
            'id': self.id,
            'choice_text': self.choice_text,
            'question': self.question.serialize(),
            'votes': [{'id':guest.id, 'name':guest.name} for guest in self.votes],
            'image': self.image,
        }
