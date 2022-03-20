from django.shortcuts import render
import json, datetime

from .models import Guest, Question, Choice

# Globals
COLOUR_OPTIONS = [
    {'colour': 'red', 'hsl': '360 100% 100%'},
    {'colour': 'blue', 'hsl': '160 100% 100%'},
]

DRINK_OPTIONS = [
    'beer',
    'red wine',
]

ANIMAL_OPTIONS = [
    'fox',
    'capybara',
]

# Create your views here.

def index(request):
    questions = Question.objects.all()
    return render(request, 'polls/index.html', {
        "questions": questions,
        "colours": COLOUR_OPTIONS,
        "drinks": DRINK_OPTIONS,
        "animals": ANIMAL_OPTIONS,
    })
