from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import login,logout,authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
from .serializers import *
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required


# Create your views here.
def index(request):
    return render(request,"index.html")


@api_view(["POST"])
def loginUser(request):
    if request.content_type == 'application/json':
        data = request.data 
        _username = data.get("username")
        _password = data.get("password")
        user = authenticate(username=_username, password=_password)
        if user is not None:
            login(request, user)
            return Response({"message": "Sikeres bejelentkezés!"}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"message": "Sikertelen Bejelentkezés!"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"message": "Nem megfelelő formátum"}, status=status.HTTP_400_BAD_REQUEST)
 
@api_view(["POST"])
def logoutUser(request):
    logout(request)
    return Response({"message": "Sikeres kijelentkezés!"},status=status.HTTP_200_OK) 
 
    
@api_view(["POST"])
def registration(request):
    if request.content_type == "application/json" :
        data = request.data
        _username =  data.get("username")
        _password = data.get("password")
        _email = data.get("email")
        if User.objects.filter(username = _username).exists():
            return Response({"message": "A felhasználónév már foglalt!"}, status=status.HTTP_400_BAD_REQUEST)
        elif  User.objects.filter(email = _email).exists():
            return Response({"message": "A E-mail cím már foglalt!"}, status=status.HTTP_400_BAD_REQUEST)
        elif len(_username) < 6:
            return Response({"message": "A felhasználónévnek minimum 6 karakternek kell lennie!"},status=status.HTTP_400_BAD_REQUEST) 
        elif len(_password) < 6:
            return Response({"message": "A jelszónak minimum 6 karakternek kell lennie!"},status=status.HTTP_400_BAD_REQUEST)
        else:
            newUser=User(username=_username,email=_email)
            newUser.set_password(_password)
            newUser.save()
            return Response({"message": "Sikeres Regisztráció!"},status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "Nem megfelelő formátum!"},status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["POST", "PUT"])  # POST az új, PUT a frissítéshez
def addNote(request):
    if request.content_type == "application/json":
        data = request.data
        _title = data.get("title")
        _content = data.get("content")
        _category = data.get("category")
        _priority = data.get("priority")
        note_id = data.get("id", None)  # Az id, ha frissíteni akarjuk

        # Ellenőrizzük, hogy minden szükséges adat megvan-e
        if not all([_title, _content, _category, _priority]):
            return Response({"message": "Hiányzó mezők!"}, status=status.HTTP_400_BAD_REQUEST)

        # Ha van id, akkor frissítjük a meglévő jegyzetet
        if note_id:
            try:
                existing_note = Note.objects.get(id=note_id, user=request.user)  # Csak a saját jegyzetét frissítheti
                existing_note.title = _title
                existing_note.content = _content
                existing_note.category = _category
                existing_note.priority = _priority
                existing_note.save()
                return Response({"message": "Jegyzet frissítve!"}, status=status.HTTP_200_OK)
            except Note.DoesNotExist:
                return Response({"message": "A jegyzet nem található!"}, status=status.HTTP_404_NOT_FOUND)

        # Ha nincs id, akkor új jegyzetet hozunk létre
        else:
            newNote = Note(title=_title, content=_content, category=_category, priority=_priority, user=request.user)
            newNote.save()
            return Response({"message": "Sikeres jegyzet hozzáadás!"}, status=status.HTTP_201_CREATED)

    else:
        return Response({"message": "Nem megfelelő formátum!"}, status=status.HTTP_400_BAD_REQUEST) 
    
@api_view(["GET"])
def getAllNotes(request):
    notes = Note.objects.all().order_by("-updated_at")
    serialized = NoteSerializers(notes,many=True)
    return JsonResponse(serialized.data,safe=False)

@api_view(["DELETE"])
def deleteNote(request,note_id):
    try:
        note = Note.objects.get(id=note_id)
        note.delete()
        return Response({"message": "Sikeresen törölve!"},status=status.HTTP_200_OK)
    except:
        return Response({"message": "A megadott jegyzet nem található!"},status=status.HTTP_404_NOT_FOUND)

@login_required
@api_view(["GET"])
def checkAuth(request):
    return JsonResponse({"isAuthenticated": True, "username": request.user.username})
    