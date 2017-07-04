from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.template.loader import render_to_string

from .form import BookForm
from .models import Book


def book_list(request):
    books = Book.objects.all()
    context = {
        'books': books,
    }
    return render(request, 'book/book_list.html', context=context)


def save_book_form(request, form, template_name):
    data = dict()
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True
            books = Book.objects.all()
            data['html_book_list'] = render_to_string(
                'book/include/partial_book_list.html',
                {'books': books},
            )
        else:
            data['form_is_valid'] = False
    context = {
        'form': form,
    }
    data['html_form'] = render_to_string(
        template_name,
        context,
        request=request,
    )
    return JsonResponse(data)


def book_create(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
    else:
        form = BookForm()
    return save_book_form(request, form, 'book/include/partial_book_create.html')


def book_update(request, pk):
    book = get_object_or_404(Book, pk=pk)
    if request.method == 'POST':
        form = BookForm(request.POST, instance=book)
    else:
        form = BookForm(instance=book)
    return save_book_form(request, form, 'book/include/partial_book_update.html')