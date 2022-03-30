from django.shortcuts import render
import json, datetime

from .models import Guest, Question, Choice

# Globals
DRINK_OPTIONS = [
    'Beer',
    'Red Wine',
]

ANIMAL_OPTIONS = [
    'Fox',
    'Capybara',
]

# Create your views here.

def index(request):
    questions = Question.objects.all()
    return render(request, 'polls/index.html', {
        "questions": questions,
        "drinks": DRINK_OPTIONS,
        "animals": ANIMAL_OPTIONS,
    })
