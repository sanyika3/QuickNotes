from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model=User
        fields= ("username",)
        
class NoteSerializers(serializers.ModelSerializer):
    user = UserSerializers(read_only = True)   # Ezzel megjeleníted a user mezőt az UserSerializers alapján
    class Meta:
        model = Note
        fields = "__all__"
        depth = 1