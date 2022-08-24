from django.contrib.auth.models import User

from rest_framework.serializers import ModelSerializer

from users.models import Author


class AuthorSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = ('name','image')



class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email','password')