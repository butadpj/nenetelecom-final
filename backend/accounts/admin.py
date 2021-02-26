from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model


class CustomUserAdmin(UserAdmin):
    """Define admin model for custom User model with no username field."""
    fieldsets = (
        (None, {'fields': ('username', 'mobile_number', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'complete_address' )}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'mobile_number', 'first_name', 'last_name', 'complete_address',  'password1', 'password2'),
        }),
    )
    list_display = ('username', 'mobile_number', 'first_name', 'last_name', 'is_staff', 'is_superuser')
    search_fields = ('username', 'mobile_number', 'first_name', 'last_name', 'is_staff', 'is_superuser')
    ordering = ('username',)


admin.site.register(get_user_model(), CustomUserAdmin)