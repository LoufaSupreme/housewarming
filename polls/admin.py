from django.contrib import admin

# Register your models here.
from .models import Guest, Question, Choice

admin.site.register(Guest)
admin.site.register(Question)
admin.site.register(Choice)
