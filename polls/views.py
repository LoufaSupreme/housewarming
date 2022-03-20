from django.shortcuts import render
import json, datetime

from .models import Guest, Question, Choice

# Create your views here.

def index(request):
    questions = Question.objects.all()
    return render(request, 'polls/index.html', {
        "questions": questions,
    })
