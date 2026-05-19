from django.contrib import admin
from .models import Inquiry

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'event_type', 'created_at')
    search_fields = ('name', 'email', 'event_type')
    list_filter = ('event_type', 'created_at')
