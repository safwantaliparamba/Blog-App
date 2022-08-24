from django.db import models
from django.contrib.auth.models import User


class Author(models.Model):
    name = models.CharField(max_length=255)
    user = models.OneToOneField(User,related_name='author',on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile-images/',blank=True,null=True)

    class Meta:
        verbose_name = 'author'
        verbose_name_plural = 'author'

    def __str__(self):
        return self.name