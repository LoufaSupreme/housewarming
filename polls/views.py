from django.shortcuts import render
import json, datetime, traceback
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect

from .models import Guest, Question, Choice

# Globals
DRINK_OPTIONS = [
    'Beer',
    'Wine',
    'Caesar',
    'Moscow Mule',
    'Scotch',
    'Martini',
]

ANIMAL_OPTIONS = [
    'Fox',
    'Capybara',
    'Bunny',
    'Owl',
    'Eagle',
    'Beaver',
    'Mosquito',
]

# Create your views here.

def index(request):
    questions = Question.objects.all()
    return render(request, 'polls/index.html', {
        "questions": questions,
        "drinks": DRINK_OPTIONS,
        "animals": ANIMAL_OPTIONS,
    })

def create(request):
    if request.method == 'GET':
        return render(request, 'polls/create.html', {})

    elif request.method == 'POST':
        try:
            question = request.POST['question-text']
            q_type = request.POST['type']
            position = request.POST['position']
            
            try:
                img = request.FILES['q-img']
            except:
                img = None

            options = [request.POST['option-1'],request.POST['option-2'],request.POST['option-3'],request.POST['option-4'],request.POST['option-5']]

            if question is not None and question is not "":
                question = Question(q_text=question, type=q_type, position=position)
                if img is not None:
                    question.image = img
                question.save()

                for option in options:
                    if option is not None and option is not "":
                        option = Choice(question=question, choice_text=option)
                        option.save()

            print(f'Saved new question: {question}')
            return render(request, 'polls/create.html', {})
        except Exception as e:
            traceback.print_exc()


