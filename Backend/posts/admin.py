from django.contrib import admin

from .models import Posts


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'image', 'timestamp')


admin.site.register(Posts, PostAdmin)