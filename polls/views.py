from django.shortcuts import render
import json, datetime, traceback
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect

from .models import Guest, Question, Choice

# Globals
DRINK_OPTIONS = [
    {
        'drink': 'Select a drink',
        'img': 'question.svg',
    },
    {
        'drink': 'Beer',
        'img': 'homer_beer.jpg',
    },
    {
        'drink': 'Wine',
        'img': 'wine_snob.jpg',
    },
    {
        'drink': 'Caesar',
        'img': 'caesar.jpg',
    },
    {
        'drink': 'Moscow Mule',
        'img': 'moscow.jpg',
    },
    {
        'drink': 'Scotch',
        'img': 'scotch2.jpg',
    },
    {
        'drink': 'Martini',
        'img': 'martini.jpg',
    },
]

ANIMAL_OPTIONS = [
    {
        'animal': 'Select an animal',
        'img': 'question.svg',
    },
    {
        'animal': 'Koala',
        'img': 'koala.jpg'
    },
    {
        'animal': 'Capybara',
        'img': 'capybara.jpg'
    },
    {
        'animal': 'Goat',
        'img': 'goat.jpg'
    },
    {
        'animal': 'Sloth',
        'img': 'sloth.jpg'
    },
    {
        'animal': 'Monkey',
        'img': 'monkey.jpg'
    },
    {
        'animal': 'Ostrich',
        'img': 'ostrich.jpg'
    },
]

# Create your views here.

def index(request):
    questions = Question.objects.all()
    return render(request, 'polls/index.html', {
        "questions": questions,
        "drinks": DRINK_OPTIONS,
        "animals": ANIMAL_OPTIONS,
    })

def update_guest(request):
    if (request.method == 'POST'):
        data = json.loads(request.body)
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        field = data.get('field')
        value = data.get('value')

        # try:
        #     guest = Guest.objects.get(first_name=first_name, last_name=last_name)
        # except:
        #     guest = Guest(first_name=first_name, last_name=last_name)
        #     guest.save()

        print(first_name, last_name)
        return HttpResponseRedirect('/')
        

def add_vote(request, choice_id):
    if request.method == 'POST':
        choice = Choice.objects.get(pk=choice_id)
        question = choice.question
        possibleChoices = question.choices.all()
        user = request.POST['user']

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

            if question != None and question != "":
                question = Question(q_text=question, type=q_type, position=position)
                if img is not None:
                    question.image = img
                question.save()

                for option in options:
                    if option != None and option != "":
                        option = Choice(question=question, choice_text=option)
                        option.save()

            print(f'Saved new question: {question}')
            return render(request, 'polls/create.html', {})
        except Exception as e:
            traceback.print_exc()


