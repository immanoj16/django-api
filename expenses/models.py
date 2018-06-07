import os
from django.db import models


def get_image_path(instance, filename):
    return os.path.join('photos', str(instance.id), filename)


class Expense(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, unique=True, blank=False, null=False)
    price = models.IntegerField(default=0, blank=False)
    image = models.ImageField(upload_to=get_image_path, blank=True, null=True)
    user = models.ForeignKey('users.UserProfile', related_name='expenses', on_delete=models.CASCADE, null=False)

    class Meta:
        ordering = ('created',)