from django.urls import path
from .views import *


urlpatterns = [
    path('', index, name="index"),
    path('loginUser', loginUser, name="loginUser"),
    path('registration', registration, name="registration"),
    path('logoutUser', logoutUser, name="logoutUser"),
    path('addNote', addNote, name="addNote"),
    path('getAllNotes', getAllNotes, name="getAllNotes"),
    path('deleteNote/<int:note_id>', deleteNote, name="deleteNote"),
    path('checkAuth', checkAuth, name="checkAuth"),
]