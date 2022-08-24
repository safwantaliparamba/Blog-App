import json
import requests

from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializer import AuthorSerializer
from users.models import Author, User


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']

        if not User.objects.filter(username=username).exists():
            author_instance = AuthorSerializer(data=request.data)

            # print(request.data)

            if author_instance.is_valid():

                user = User.objects.create_user(
                    email=email,
                    username=username,
                    password=password
                )
                author_instance.save(user=user)

                ssl = 'http'
                if request.is_secure():
                    ssl = 'https'
                host = request.get_host()
                url = f'{ssl}://{host}/api/v1/auth/token/'
                print(url)
                headers = {
                    'Content-Type': 'application/json'
                }
                data = {
                    'username': username,
                    'password': password
                }
                result = requests.post(
                    url, headers=headers, data=json.dumps(data)).json()

                response_obj = {
                    'StatusCode': 6000,
                    'data': {
                        'access': result['access'],
                        'refresh': result['refresh'],
                    },
                    'user_data': {
                        'name': user.username,
                        'user_id': user.author.id
                    },
                    'message': 'Account created successfully'
                }

                return Response(response_obj)

            else:
                response_obj = {
                    'StatusCode': 6001,
                    'message': 'An error occurred while creating account'
                }
                return Response(response_obj)

        else:
            response_obj = {
                'StatusCode': 6001,
                'message': 'This user is already exists'
            }
            return Response(response_obj)



@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        ssl = 'http://'
        if request.is_secure():
            ssl = 'https://'
        host = request.get_host()
        url = f'{ssl}{host}/api/v1/auth/token/'
        print(url)
        headers = {
            'Content-Type': 'application/json'
        }
        data = {
            'username': username,
            'password': password
        }
        result = requests.post(
            url, headers=headers, data=json.dumps(data)).json()

        response_obj = {
            'StatusCode': 6000,
            'data': {
                'access': result['access'],
                'refresh': result['refresh'],
            },
            'user_data': {
                'name': user.username,
                'user_id': user.author.id,
                'image':f'{ssl}{host}{user.author.image.url}'
            },
            'message': 'Logged in successfully'
        }

        return Response(response_obj)
    else:
        response_obj = {
            'StatusCode': 6001,
            'message': 'User not found',
        }

        return Response(response_obj)
