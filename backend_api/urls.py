from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/users/', include(('users.urls', 'users'), namespace='users')),
    url(r'^api-auth/expenses/', include(('expenses.urls', 'expenses'), namespace='expenses')),
]