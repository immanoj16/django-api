from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.ExpenseList.as_view(), name='expense-list'),
    url(r'^(?P<pk>[0-9]+)/$', views.ExpenseDetail.as_view(), name='expense-detail'),
]