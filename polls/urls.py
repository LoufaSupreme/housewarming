from django.urls import path
from . import views
# for images
from django.conf.urls.static import static
from django.conf import settings

# good practice.  Be sure to use urls in html templates as 'app_name:view_name'
app_name = 'polls'

urlpatterns = [
    path('', views.index, name='index'),

    # API ROUTES:
]

# for images:
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_URL)