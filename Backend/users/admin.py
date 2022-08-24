from django.contrib import admin

from .models import Author


class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name','id', 'user','image')

admin.site.register(Author,AuthorAdmin)
