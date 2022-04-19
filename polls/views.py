from django.shortcuts import render
import json, datetime, traceback, base64
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.conf import settings
from django.core.files.base import ContentFile

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

def upload_results(request):
    if (request.method != 'POST'):
        return JsonResponse({"error": "Post method required"}, status=400)
    else:
        try:
            data = json.loads(request.body)
        except Exception as e:
            traceback.print_exc()
            return JsonResponse({"error": e}, status=400)

        try:
            first_name = data.get('firstName')
            last_name = data.get('lastName')
            alias = data.get('alias')
            fav_color = data.get('favColor')
            fav_drink = data.get('favDrink')
            spirit_animal = data.get('animal')
            selected_choices = data.get('answers')
            comments = data.get('comments')
            image_base64 = data.get('profilePic')

            # get uploaded profile pic and save it as a "content file"
            if image_base64:
                format, imgstr = image_base64.split(';base64,')
                ext = format.split('/')[-1]
                profile_pic = ContentFile(base64.b64decode(imgstr), name=f'{first_name}_({alias})_{last_name}.' + ext)
            else:
                profile_pic = 'profile_default.jpg'

            try:
                guest = Guest.objects.get(first_name=first_name, last_name=last_name)
                print('******Existing guest found...')
            except:
                print('*********Creating new Guest')
                guest = Guest(first_name=first_name,last_name=last_name)
                guest.save()
            
            # print(guest, data)
            guest.alias=alias
            guest.fav_color=fav_color
            guest.fav_drink=fav_drink
            guest.spirit_animal=spirit_animal
            guest.comment=comments
            guest.picture=profile_pic
            guest.save()

            for choice in selected_choices:
                add_vote(int(choice), guest)

            return JsonResponse(guest.serialize(), safe=False)
        
        except Exception as e:
            traceback.print_exc()
            return JsonResponse({"error": e}, status=400)
        

def add_vote(choice_id, guest):
    try:
        choice = Choice.objects.get(pk=choice_id)
    except:
        traceback.print_exc()

    choice.votes.add(guest)


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


def display_housepasses(request):
    guests = Guest.objects.all()
    return render(request, 'polls/housepasses.html', {
        "guests": guests,
        "drinks": DRINK_OPTIONS,
        "animals": ANIMAL_OPTIONS,
    })


def show_results(request):
    questions = Question.objects.all()
    return render(request, 'polls/results.html', {
        "questions": questions,
    })
