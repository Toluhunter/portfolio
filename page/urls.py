# django imports
from django.urls import path
# Custom file imports
from .views import home

app_name = 'page'

urlpatterns = [
    path('', home, name="home")
]