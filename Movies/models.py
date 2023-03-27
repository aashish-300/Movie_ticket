from django.db import models
from django.urls import reverse
from datetime import datetime
from embed_video.fields import EmbedVideoField

# Create your models here.


class movieCertificate(models.Model):
    certificate_name=models.CharField(max_length=50)
    certificate_des=models.TextField(max_length=250, blank=True, null=True)
    
    def __str__(self):
        return self.certificate_name

class movieType(models.Model):
    type_name=models.CharField(max_length=50)
    type_des=models.TextField(max_length=250, blank=True, null=True)
    
    def __str__(self):
        return self.type_name

class movieLanguage(models.Model):
    language_name=models.CharField(max_length=50)
    language_des=models.TextField(max_length=250, blank=True, null=True)
    
    def __str__(self):
        return self.language_name
    
class movieShowtime(models.Model):
    showtime_name=models.CharField(max_length=50)
    
    def __str__(self):
        return self.showtime_name
    
class Movies(models.Model):
    img_slider = models.ImageField(upload_to='movies_images/',blank=True, null=True)
    movie_img = models.ImageField(upload_to='movies_images/')
    movie_title = models.CharField(max_length=50)
    movie_cast = models.TextField(max_length=250)
    movie_director=models.CharField(max_length=200,blank=True, null=True)
    release_date=models.DateTimeField(max_length=50,blank=True, null=True)
    movie_duration=models.CharField(max_length=50,blank=True, null=True)
    movie_language=models.ForeignKey(movieLanguage, on_delete=models.CASCADE,blank=True, null=True)
    movie_type=models.ForeignKey(movieType, on_delete=models.CASCADE,blank=True, null=True)
    movie_certificate=models.ForeignKey(movieCertificate,on_delete=models.CASCADE, blank=True, null=True)
    movie_showtime=models.ForeignKey(movieShowtime,on_delete=models.CASCADE,blank=True, null=True)
    movie_trailer=EmbedVideoField()
    movie_price=models.CharField(max_length=50,blank=True, null=True)
    movie_des=models.TextField(max_length=250,blank=True, null=True)
    
    
    
        
    
    def __str__(self):
        return self.movie_title
    

