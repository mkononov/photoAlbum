from django.contrib import admin
from .models import ImageWithComment

# Определяем действие для админки
# Данное действие будет удалять все изображения (в т.ч. thumbnail) и записи в БД для выделенных объектов
def batch_delete(modeladmin, request, queryset):
    for obj in queryset:
        ImageWithComment.delete(obj)

class ImageWithCommentAdmin(admin.ModelAdmin):
    actions = [batch_delete]
    list_display = ('id', 'comment', 'image_img')

batch_delete.short_description = 'Удалить выбранные изображения полностью'

admin.site.disable_action('delete_selected') # Выключаем стандартный способ удаления выбранного множества объектов

admin.site.register(ImageWithComment, ImageWithCommentAdmin)