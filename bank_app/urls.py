from django.urls import path
from . import views

app_name = 'bank_app'

urlpatterns = [
    path('', views.home, name='home'),
    path('apply/', views.loan_application, name='loan_application'),
]