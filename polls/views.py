from django.shortcuts import render
import json, datetime

from .models import Guest

# Create your views here.

def index(request):
    return render(request, 'polls/index.html')
