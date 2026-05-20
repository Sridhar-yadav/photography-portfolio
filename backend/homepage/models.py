from django.db import models

class Homepage(models.Model):
    hero_text = models.CharField(max_length=255, default="Capturing Timeless Moments")
    tagline = models.TextField(default="Luxury cinematic photography for the modern romantic.")
    hero_image = models.ImageField(upload_to='homepage/', null=True, blank=True)
    
    # Ensures only one instance exists
    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)

    def __str__(self):
        return "Homepage Settings"
