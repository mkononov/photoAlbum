from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse


from .models import ImageWithComment
from .forms import UploadImageForm


def show_images(request):
    """ This function is retrieve all images from the database and then passes them to the template """
    images = ImageWithComment.objects.all()
    content = {
        "images": images
    }
    return render(request, 'PhotoGallery/show.html', content)


def upload_image(request):
    """ This function uploads image from the form and saves it in the database """
    if request.method == 'POST':
        form = UploadImageForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded = ImageWithComment() # Создаем объект модели, заполняем данными с формы, сохраняем в БД
            uploaded.comment = form.cleaned_data['comment']
            uploaded.image = form.cleaned_data['image']
            uploaded.save()
        else:
            form = ImageWithComment()
    return HttpResponseRedirect(reverse('index-page'))