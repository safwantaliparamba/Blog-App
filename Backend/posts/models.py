from django.db import models

class Posts(models.Model):
    title = models.CharField(max_length=255)
    image = models.FileField(upload_to='posts/',blank=True, null=True)
    author = models.ForeignKey('users.Author',related_name='posts', on_delete=models.CASCADE)
    short_description = models.CharField(max_length=255)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
    is_updated = models.BooleanField(default=False)


    class Meta:
        verbose_name = 'posts'
        verbose_name_plural = 'posts'

    
    def __str__(self):
        return self.title
