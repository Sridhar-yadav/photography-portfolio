from django.db import models

class Film(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    thumbnail = models.ImageField(upload_to='films/thumbnails/')
    video_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
