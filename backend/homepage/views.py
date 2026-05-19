from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Homepage
from .serializers import HomepageSerializer

class HomepageViewSet(viewsets.ModelViewSet):
    queryset = Homepage.objects.all()
    serializer_class = HomepageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
