from django.db import models

class Portfolio(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    cover_image = models.ImageField(upload_to='portfolio/covers/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class GalleryImage(models.Model):
    portfolio = models.ForeignKey(Portfolio, related_name='gallery_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='portfolio/gallery/')

    def __str__(self):
        return f"{self.portfolio.title} Image"
