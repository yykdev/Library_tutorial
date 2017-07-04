from django.conf.urls import url
from . import views

app_name = 'book'

urlpatterns = [
    url(r'list/$', views.book_list, name='book_list' ),
    url(r'^create/$', views.book_create, name='book_create'),
    url(r'^(?P<pk>\d+)/update/$', views.book_update, name='book_update'),
]
