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
        fields = ['id', 'title', 'category', 'description', 'location', 'event_date', 'cover_image', 'gallery_images', 'created_at']

    def create(self, validated_data):
        portfolio = Portfolio.objects.create(**validated_data)
        request = self.context.get('request')
        if request and request.FILES:
            images = request.FILES.getlist('gallery_images')
            for img in images:
                GalleryImage.objects.create(portfolio=portfolio, image=img)
        return portfolio

    def update(self, instance, validated_data):
        portfolio = super().update(instance, validated_data)
        request = self.context.get('request')
        if request and request.FILES:
            images = request.FILES.getlist('gallery_images')
            for img in images:
                GalleryImage.objects.create(portfolio=portfolio, image=img)
        return portfolio
