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

    def has_vote(self, choice_id):
        choice = Choice.objects.get(pk=choice_id);
        if choice in self.choices.all():
            return choice
        else:
            return False
    
    def is_menace(self):
        return self.has_vote(7)

    def is_vip(self):
        return self.has_vote(8)

    def is_hottubbing(self):
        return self.has_vote(6)

    def is_not_hottubbing(self):
        return self.has_vote(5)

    def plus_one(self):
        return self.has_vote(10)
    
    def is_solo(self):
        return self.has_vote(9)

    def many_guests(self):
        return self.has_vote(11)

    def handstand(self):
        return self.has_vote(12)

    def gargoyle(self):
        return self.has_vote(13)

    def strong(self):
        return self.has_vote(14)

    def is_sleeping(self):
        return self.has_vote(16)

    def is_leaving(self):
        return self.has_vote(15)


    def serialize(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'alias': self.alias,
            'fav_color': self.fav_color,
            'fav_drink': self.fav_drink,
            'spirit_animal': self.spirit_animal,
            'comment': self.comment          
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
