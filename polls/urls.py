from django.urls import path
from . import views
# for images
from django.conf.urls.static import static
from django.conf import settings

# good practice.  Be sure to use urls in html templates as 'app_name:view_name'
app_name = 'polls'

urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.create, name='create'),
    path('vote/<int:choice_id>', views.add_vote, name='vote'),
    path('update_guest/', views.update_guest, name='update_guest'),
]

# for images:
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_URL)