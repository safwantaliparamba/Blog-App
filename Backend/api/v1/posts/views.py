
from django.db.models import Q
import operator

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from posts.models import Posts
from .serializer import PostSerializer, SinglePostSerializer, CreatePostSerializer, EditPostSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def posts(request):
    posts = Posts.objects.filter(is_deleted=False).order_by('-timestamp')
    if request.GET.get('sort'):
        sort = request.GET.get('sort')
        if sort == 'title_asc':
            posts = posts.order_by('title')
        elif sort == 'title_desc':
            posts = posts.order_by('-title')
        elif sort == 'date_asc':
            posts = posts.order_by('timestamp')
        elif sort == 'date_desc':
            posts = posts.order_by('-timestamp')

    serilaized_posts = PostSerializer(
        posts, many=True, context={'request': request})

    return Response(serilaized_posts.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def post(request, pk):
    if Posts.objects.filter(Q(pk=pk), Q(is_deleted=False)).exists():
        post = Posts.objects.get(Q(pk=pk), Q(is_deleted=False))
        serialized_data = SinglePostSerializer(
            post, context={'request': request})
        return Response(serialized_data.data)
    else:
        response_obj = {
            'statusCode': 6001,
            'title': 'not found',
            'message': 'Post not found',
        }
        return Response(response_obj)


@api_view(['POST'])
@permission_classes({IsAuthenticated})
def create_post(request):
    instance = CreatePostSerializer(data=request.data)
    if instance.is_valid():
        post = instance.save(author=request.user.author)
        post.save()
        return Response(instance.data)
    else:
        return Response('error')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_posts(request):
    user = request.user.author
    posts = user.posts.filter(is_deleted=False).order_by('-timestamp')
    serilaized_posts = PostSerializer(
        posts, many=True, context={'request': request})
    print(posts.count())
    serilaized_posts.data.append({'is_author': True})
    return Response(serilaized_posts.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_post(request, pk):
    user = request.user.author
    if user.posts.filter(pk=pk).exists():
        if Posts.objects.filter(pk=pk).exists():
            post = Posts.objects.get(pk=pk)
            post.is_deleted = True
            post.save()

            posts = Posts.objects.filter(
                is_deleted=False).order_by('-timestamp')
            serilaized_posts = PostSerializer(
                posts, many=True, context={'request': request})

            response_obj = {
                'statusCode': 6000,
                'title': 'success',
                'data': serilaized_posts.data,
                'message': 'post deleted successfully'
            }
            return Response(response_obj)
        else:
            response_obj = {
                'statusCode': 6001,
                'title': 'error',
                'message': 'post does not exists'
            }
            return Response(response_obj)
    else:
        response_obj = {
            'statusCode': 6001,
            'title': 'Authorization error',
            'message': 'You have no permission to delete this post'
        }
        return Response(response_obj)


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def edit_post(request, pk):
    user = request.user.author
    if request.method == 'PATCH':
        if user.posts.filter(pk=pk).exists():
            instance = Posts.objects.get(pk=pk)
            serializer = EditPostSerializer(instance, data=request.data, partial=True)
            print(instance)
            print(request.data['image'])

            if serializer.is_valid():
                if not request.data['image']:
                    serializer.save(image=instance.image)
                else:
                    serializer.save()

                response_obj = {
                    'statusCode': 6000,
                    'status': 'success',
                    'message': 'Post updated successfully'
                }

                return Response(response_obj)
            else:
                response_obj = {
                    'statusCode': 6001,
                    'status': 'error',
                    'message': 'An error occured during the update'
                }

                return Response(response_obj)

    if request.method == 'GET':
        if user.posts.filter(pk=pk).exists():
            post = Posts.objects.get(pk=pk)
            serialized_data = SinglePostSerializer(
                post, context={'request': request})

            return Response(serialized_data.data)
        else:
            response_obj = {
                'statusCode': 6000,
                'title': 'post does not exist',
            }
            return Response(response_obj)
