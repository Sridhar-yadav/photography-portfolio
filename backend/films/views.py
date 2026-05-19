from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Film
from .serializers import FilmSerializer

class FilmViewSet(viewsets.ModelViewSet):
    queryset = Film.objects.all().order_by('-created_at')
    serializer_class = FilmSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
