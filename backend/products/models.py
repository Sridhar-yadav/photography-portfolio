from django.db import models
from cloudinary.models import CloudinaryField

class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image = CloudinaryField('image', folder='store')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
