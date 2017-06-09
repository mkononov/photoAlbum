from django.db import models
from sorl.thumbnail import ImageField
from sorl.thumbnail import delete


class ImageWithComment(models.Model):
    comment = models.CharField(max_length=200, verbose_name='Комментарий', )
    image = ImageField(upload_to='images/', max_length=200, verbose_name='Изображение')

    def __str__(self):
        return self.comment

    def delete(self):
        delete(self.image) # Удаляем запись thumbnail из БД и сам thumbnail в файловой системе
        self.image.delete()
        super(ImageWithComment, self).delete()

    def image_img(self):
        if self.image:
            return u'<a href="{0}"><img src="{0}" width="100"/></a>'.format(self.image.url)
        else:
            return '(Нет изображения)'

    image_img.short_description = 'Картинка'
    image_img.allow_tags = True

    class Meta:
        verbose_name = 'изображение с комментарием'
        verbose_name_plural = 'изображения с комментарием'