const http = require('http');
const fs = require('fs');

let htmlFile;
let cssFile;
let jsFile;
const port = 3000;

//Чтение файлов и запись их в соответствующие переменные
fs.readFile('index.html', function(err, data) {
    if (err){
        throw err;
    }
    htmlFile = data;
});

fs.readFile('index.js', function(err, data) {
    if (err){
        throw err;
    }
    jsFile = data;
});

fs.readFile('index.css', function(err, data) {
    if (err){
        throw err;
    }
    cssFile = data;
});

// Создание http сервера
let server = http.createServer(function (request, response) {
    switch (request.url) {
        //В зависимости от запроса сервер отвечает соответствующим файлом - css, js, html
        case "/index.css" :
            response.write(cssFile);
            break;
        case "/index.js" :
            response.write(jsFile);
            break;
        default :
            response.write(htmlFile);
    }
    response.end();//Отправка ответа
});

// Сервер слушает заданный порт
server.listen(port);
