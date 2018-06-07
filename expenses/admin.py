from django.contrib import admin

from .models import Expense


@admin.register(Expense)
class UserProfileAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'price', 'image', 'created', 'user')
