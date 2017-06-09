/*
* Для того, чтобы предотвратить повторную отправку формы при загрузке изображения,
* используется редирект на show.html. НО если после редиректа нажать назад, то поля формы будут заполнены.
* Т.о. если обновить index.html после возврата, форма будет отправлена заново.
* Очищение полей при загрузке страницы помогает предотвратить такого рода ситуации.
*/
function clearFields() {
    document.getElementById("add-comment").value = '';
    document.getElementById("file").value = '';
    document.getElementById("fake-input").value = '';
}


/* Вызов скрытого input-file */
function callInputFile() {
    document.getElementById('file').click();
}

/*
* Элементу выбора файла на форме добавлен атрибут accept="image/*", но при выборе файла есть возможность
* выбрать другой тип (указав вместо "файлы изображений" - "все файлы").
* Функция необходима для того, чтобы проинформировать пользователя о том, что нужно выбрать именно изображение,
* а также для выполнения сопутствующих проверок и иземнений в UI.
*/
function checkFileType(input_value) {
    var file = document.getElementById("file");
    var fake_input = document.getElementById("fake-input");
    if (file.value == '') {
        fake_input.value = '';
    } else {
        file_type = file.files[0].type;
        if (file_type.indexOf('image/') != -1) {
            document.getElementById("submit").disabled = false;
            filename = getName(input_value);
            fake_input.value = filename;
        }
        else {
            alert('Загрузка невозможна. Выбранный файл не является изображением. Выберите файл с изображением.');
            file.value = '';
            fake_input.value = '';
            document.getElementById("submit").disabled = true;
        }
    }
}

/* Возвращает имя указанного файла */
function getName(str){
    if (str.lastIndexOf('\\'))
        var i = str.lastIndexOf('\\') + 1;
    else
        var i = str.lastIndexOf('/') + 1;

    var filename = str.slice(i);
    return filename;
}

/*
 * Функция изменяет размер блоков с комментариями (.comment).
 * Высота блока с комментарием должна изменяться в зависимости от длинны оставленного комментария,
 * но при этом оставаться под изображением.
 */
function resizeComments() {
    var thumbnails = document.getElementsByClassName('thumbnail');
    var comments = document.getElementsByClassName('comment');

    /*if (comments.length > 0) {*/
        document.getElementById("second-page-body").hidden = false; // Данный "костыль" помогает при загрузке страницы
                                                                    // убрать мерцающие артефакты, связанные с изменением
                                                                    // изначальных размеров блоков.
        for (var i = 0; i < comments.length; i++) {
            comments[i].style.width = thumbnails[i].clientWidth + 'px';
            if (isOverflowed(comments[i])) { // Если блок "переполнен", то увеличиваем его размер в 2 раза

                var INCREASE = 2; // Увеличение в 2 раза достаточно для корректного отображения

                scrollW = comments[i].scrollWidth;
                scrollH = comments[i].scrollHeight;
                ofssetW = comments[i].offsetWidth;
                offsetH = comments[i].offsetHeight;
                marginL = comments[i].marginLeft;
                marginR = comments[i].marginRight;
                parent_node = comments[i].parentNode;

                comments[i].style.width = scrollW * INCREASE + "px";
                parent_node.style.width = scrollW * INCREASE + marginL + marginR + "px";
            }
        }
    /*}*/
}

/*
 * Функция возвращает true если элемент (комментарий) не может целиком поместиться в блок.
 * Такое м.б. из-за маленького изображения и длинного комментария.
 * Значит что размер блока с комментарием должен быть увеличен.
 */
function isOverflowed(element) {
    return element.scrollWidth > element.offsetWidth ||
        element.scrollHeight > element.offsetHeight;
}