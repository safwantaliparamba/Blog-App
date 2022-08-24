from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('', views.posts),
    path('create/', views.create_post),
    path('my-posts/', views.my_posts),
    path('<str:pk>/', views.post),
    path('<str:pk>/delete/', views.delete_post),
    path('<str:pk>/edit/', views.edit_post),
]
