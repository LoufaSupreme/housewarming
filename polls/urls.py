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
    path('uploadResults/', views.upload_results, name='upload_results'),
    path('display_housepasses/', views.display_housepasses, name='display_housepasses'),
    path('show_results/', views.show_results, name='show_results'),
]

# for images:
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)