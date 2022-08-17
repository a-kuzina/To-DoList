let myNodelist = document.getElementsByTagName("LI");
let mainText = document.getElementById("MainText");
let list = document.querySelector('ul');
var i;


//Добавление СлушателяЭвентов(по нажатию мыши) для списка
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        // Если кликнули по элементу списка, то: В зону редактирования добавляется текст заметки
        mainText.value = ev.target.textContent;

        for (i = 0; i < myNodelist.length; i++) {
            myNodelist[i].classList.toggle('target', false);
        } //Для всех элементов списка убирается фокус
        ev.target.classList.toggle('target'); //Для выбранного элемента списка добавляется фокус (css класс)
    }
}, false);


//Функция поиска среди текста среди заметов
function search(text= document.getElementById("search").value){
    var flag = false;

    for (i = 0; i < myNodelist.length; i++) {
        myNodelist[i].classList.toggle('target', false);
    }//Для всех элементов списка убирается фокус
    for (i = 0; i < myNodelist.length; i++) {//Для каждого элемента списка ищется совпадение текста заметки с искомым текстом
        if (myNodelist[i].textContent.includes(text)){
            myNodelist[i].classList.toggle('target', true);
            mainText.value = myNodelist[i].textContent;//Если найдено - элементу добавляется фокус, текст заметки добавляется в зону редактирования
            flag = true;
            break;//Если будет найдено несколько совпадений - выведется первое
        }
    }
    if(!flag){ //Если совпадений не найдено - выводится оповещение
        alert("No matches found");
    }
    document.getElementById("search").value = ""; //Очищается поле ввода
}


//Функция сохранения изменения заметки или создания новой
function saveTask() {
    var inputValue = document.getElementById("MainText").value; //Получение значения поля редактирования
    if (inputValue === '') {
        alert("You must write something!"); //Оповещение, если поле пустое, завершение функции
    } else {
        var task = null;
        for (i = 0; i < myNodelist.length; i++) {
            if (myNodelist[i].classList.contains('target')) {
                task = myNodelist[i];
            } //Поиск заметки в фокусе
        }

        if (task === null){ //Если заметка не найдена, значит создаем новую
            var li = document.createElement("li");
            var t = document.createTextNode(inputValue);
            li.appendChild(t); //Создаем новый элемент списка и добавляем ему записанный текст
            document.getElementById("myUL").appendChild(li); //добавляем в список
            li.classList.toggle('target'); //Добавляем созданному элементу фокус
            myNodelist[i].classList.toggle('awaits', true);//Добаялем статус "ожидает"
        }
        else{
            task.textContent = inputValue; //Если заметка найдена - изменяем ее содержимое, сохраняем изменения
        }
    }
}


//Функция удаления заметки
function deleteTask() {
    for (i = 0; i < myNodelist.length; i++) {
        if (myNodelist[i].classList.contains('target')) {//Ищем заметку в фокусе
            myNodelist[i].parentNode.removeChild(myNodelist[i]);//Удаляем элемент списка из спика
        }
    }
    mainText.value = "";//Очищается поле редактирования замметки
}


//Функция по нажатию кнопки новая заметка
function newTask() {
    for (i = 0; i < myNodelist.length; i++) {//Убрать фокус со всех заметок
        myNodelist[i].classList.toggle('target', false);
    }
    mainText.value=""; //Очистить поле редактирования заметки
}


//Функция изменения статуса заметки
function taskStatus(token) {//Разные кнопки передают разный статус
    for (i = 0; i < myNodelist.length; i++) {//С заметки в фокусе вначае снимаются css классы ожидает, процесс и сделано
        if (myNodelist[i].classList.contains('target')) {
            myNodelist[i].classList.toggle('awaits', false);
            myNodelist[i].classList.toggle('process', false);
            myNodelist[i].classList.toggle('done', false);
            myNodelist[i].classList.toggle(token, true);//И затем добавляется переданный класс статуса
        }
    }
}
