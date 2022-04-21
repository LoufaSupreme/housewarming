from django.contrib import admin

# Register your models here.
from .models import Guest, Question, Choice

# custom formatting for the admin page:
# note: you need that comma after the argument in filter_horizontal (must be a tuple)
class ChoiceAdmin(admin.ModelAdmin):
    filter_horizontal = ('votes',)

admin.site.register(Guest)
admin.site.register(Question)
admin.site.register(Choice, ChoiceAdmin)
