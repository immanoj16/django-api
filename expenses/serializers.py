from rest_framework import serializers

from .models import Expense


class ExpenseSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Expense
        fields = ('id', 'created', 'name', 'price', 'image', 'user')
        extra_kwargs = {
            'url': {
                'view_name': 'expenses:expense-detail',
            }
        }