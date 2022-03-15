from django.db import models
from django.db.models.fields import EmailField
from django.utils import timezone

# Create your models here.

class Guest(models.Model):
    name = models.CharField(max_length=20)
    alias = models.CharField(max_length=20,blank=True)
    email = EmailField(max_length=100, blank=True)
    timestamp = models.DateTimeField(default=timezone.now)
