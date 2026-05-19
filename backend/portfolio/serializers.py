from rest_framework import serializers
from .models import Portfolio, GalleryImage

class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ['id', 'image']

class PortfolioSerializer(serializers.ModelSerializer):
    gallery_images = GalleryImageSerializer(many=True, read_only=True)

    class Meta:
        model = Portfolio
        fields = ['id', 'title', 'category', 'description', 'cover_image', 'gallery_images', 'created_at']
