from django.db import models

class Testimonial(models.Model):
    client_name = models.CharField(max_length=200)
    review = models.TextField()
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.client_name
