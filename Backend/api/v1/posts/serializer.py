from rest_framework.serializers import ModelSerializer

from posts.models import Posts
from users.models import Author


class AuthorSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = ('id','name')

class PostSerializer(ModelSerializer):
    author = AuthorSerializer()
    class Meta:
        model = Posts
        fields = ('title','image','timestamp','short_description','author','id')

class SinglePostSerializer(ModelSerializer):
    author = AuthorSerializer()
    class Meta:
        model = Posts
        fields = ('title','image','timestamp','short_description','author','id','description')

class CreatePostSerializer(ModelSerializer):
    class Meta:
        model = Posts
        # fields = '__all__'
        exclude = ('timestamp','author')


class EditPostSerializer(ModelSerializer):
    class Meta:
        model = Posts
        fields = ('title','description','short_description','image')