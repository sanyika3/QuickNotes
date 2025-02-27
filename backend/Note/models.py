from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator,MinValueValidator
from datetime import datetime 

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField(blank=False, null=False)
    priority = models.PositiveIntegerField(default=1,validators=[MinValueValidator(1),MaxValueValidator(3)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.CharField(max_length=100,default="Uncategorized")
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    def __str__(self):
        return self.title + " - " + str(self.user)
    
    
    
    
    