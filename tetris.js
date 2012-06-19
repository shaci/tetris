function Tetris() {
                
    var self = this;
                
    //игровое поле
    var gameField = null;
    //очки
    var point = null;
    var points = 0;
    //кнопки
    var startButton = null;
    var pauseButton = null;
                
    //позиции x и y
    var x = 4;
    var y = 0;
    //текущая фигура
    var figure = null;
    //цвет фигуры
    var color = "";
                
    var gameFieldHeight = 20;
    var gameFieldWidth = 10;
                
    var cycleTime = 400;
    var moveId = null;
    var pause = false;
                
    init();
                
    function init() {
        createField();
        startButton.onclick = start;
        document.body.onkeydown = handler;
        document.body.onkeyup = handler2;
    }
                
    function createField() {                    
        //создадим wrapper
        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        document.body.appendChild(wrapper);
        //создадим меню, инициализируем кнопки
        var menu = document.createElement("ul");
        menu.className = "menu";
        startButton = document.createElement("li");
        pauseButton = document.createElement("li");
        startButton.innerHTML = "Новая игра";
        pauseButton.innerHTML = "Старт/Пауза";
        menu.appendChild(startButton);
        menu.appendChild(pauseButton);                    
        wrapper.appendChild(menu);
                    
        //поведение pause кнопки
        pauseButton.onclick = function() {
            if (pause) {
                pause = false;
                step();
            }
            else {
                pause = true;
                clearInterval(moveId);
            }
        }
                    
        //создадим индикатор очков
        var pointMenu = document.createElement("div");
        pointMenu.className = "point_menu";
        point = document.createElement("span");
        point.innerHTML = " Очки: " + 0;
        pointMenu.appendChild(point);
        wrapper.appendChild(pointMenu);
                    
        //создадим игровое поле
        gameField = document.createElement("table");
        //gameField.array = [];
        gameField.className = "game_field";
        for (var i = 0; i < gameFieldHeight; i++) {
            var row = gameField.insertRow(i);
            //gameField.array[i] = [];
            for (var j = 0; j < gameFieldWidth; j++) {
                var cell = row.insertCell(j);
                cell.className = "";            
            }
        }
        wrapper.appendChild(gameField);                                  
    }
                
                
    function start() {
        //обнулим очки, очистим поле
        points = 0;
        point.innerHTML = " Очки: " + 0;
        pause = false;
        for(var i = 0; i < gameFieldHeight; i++) {
            for (var j = 0; j < gameFieldWidth; j++) {
                gameField.rows[i].cells[j].className = "";
            }
        }
        clearInterval(moveId);
        //начать движение
        move();
    }
                
    //произвольное число от min до max
    function getRandNum(min, max) {
        var rand = min - 0.5 + Math.random()*(max-min+1);
        return Math.round(rand);
    }                
                
    //ф-ция будет возврашать фигуру (запишем набор пложений фигур в пространстве ввиде односвязного списка для того, чтобы их было удобнее крутить)
    function getFigure () {
        switch (getRandNum(1, 7)) {
            case 1:
                var resFigure = [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
                ];
                            
                resFigure.next = [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0]
                ];
                            
                resFigure.next.next = [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
                ];
                            
                resFigure.next.next.next = [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]
                ];
                            
                resFigure.next.next.next.next = resFigure;
                            
                var n = getRandNum(1, 4)
                var retVal = resFigure; 
                            
                for (var i = 1; i < n; i++) {
                    retVal = retVal.next;
                }                            
                return retVal;                            
                break;
            case 2:
                var resFigure = [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
                ];
                            
                resFigure.next = [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
                ];  
                            
                resFigure.next.next = resFigure;  
                            
                var n = getRandNum(1, 2)
                var retVal = resFigure;                            
                for (var i = 1; i < n; i++) {
                    retVal = retVal.next;
                }                            
                return retVal;                            
                break;
            case 3:
                var resFigure = [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1]
                ];
                            
                resFigure.next = [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0]
                ];
                            
                resFigure.next.next = resFigure;                            
                            
                var n = getRandNum(1, 2)
                var retVal = resFigure;                            
                for (var i = 1; i < n; i++) {
                    retVal = retVal.next;
                }                            
                return retVal;                            
                break;
            case 4:
                var resFigure = [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0]
                ];
                            
                resFigure.next = [
                [0, 1, 0],
                [0, 1, 1],
                [0 ,0, 1]
                ];
                            
                resFigure.next.next = resFigure;
                            
                var n = getRandNum(1, 2)
                var retVal = resFigure;                            
                for (var i = 1; i < n; i++) {
                    retVal = retVal.next;
                }                            
                return retVal;                            
                break;
            case 5:
                var resFigure = [
                [1, 1],
                [1, 1]
                ];
                            
                resFigure.next = [
                [1, 1],
                [1, 1]
                ];
                            
                resFigure.next.next = resFigure; 
                            
                var n = getRandNum(1, 2)
                var retVal = resFigure;                            
                for (var i = 1; i < n; i++) {
                    retVal = retVal.next;
                }                            
                return retVal;                            
                break; 
            case 6:
                var resFigure = [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
                ];
                            
                resFigure.next = [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0]
                ];
                            
                resFigure.next.next = [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1]
                ];
                            
                resFigure.next.next.next = [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0]
                ];
                            
                resFigure.next.next.next.next = resFigure;
                            
                var n = getRandNum(1, 4)
                var retVal = resFigure;                            
                for (var i = 1; i < n; i++) {
                    retVal = retVal.next;
                }
                return retVal;                            
                break;
            case 7:
                var resFigure = [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0] 
                ];                            
                resFigure.next = [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
                ];                            
                resFigure.next.next = [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0]
                ];                            
                resFigure.next.next.next = [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1]
                ];                            
                resFigure.next.next.next.next = resFigure;
                            
                var n = getRandNum(1, 4)
                var retVal = resFigure;                            
                for (var i = 1; i < n; i++) {
                    retVal = retVal.next;
                }                            
                return retVal;                            
                break;
        }
    }
                
    //Набор ф-ций, проверяющих, возможно ли движение фигуры и возможно ли вращение фигуры
                
    /******************************************************/                
    function leftMovePossible() {
        for (var i = 0; i < figure.length; i++) {
            var last = null;
            for (var j = 0; j < figure[i].length; j++) {
                if (figure[i][j]) {
                    last = j;
                    break;
                }
            }
            if (last != null) {
                if (gameField.rows[y - 1 + i].cells[x - 1 + last].className != "") {
                    return false;
                }
            }
        }
        return true;
    }
                
    function rightMovePossible() {                    
        for (var i = 0; i < figure.length; i++) {
            var last = null;
            for (var j = figure[i].length - 1; j >= 0; j--) {
                if (figure[i][j]) {
                    last = j;
                    break;
                }
            }
            if (last != null) {
                if (gameField.rows[y - 1 + i].cells[x + figure[0].length - (figure[0].length - 1 - last)].className != "") {                                
                    return false;
                }
            }
        }
        return true;
    }
                
    function downMovePossible() {                    
        for (var i = 0; i < figure[0].length; i++) {
            var last = null;
            for (var j = 0; j < figure.length; j++) {                            
                if (figure[j][i]) {
                    last = j;
                }
            }
            if (last != null)
                if (gameField.rows[y + last].cells[x + i].className != "") {                            
                    return false;
                }
        }
        return true;
    }
                
    function rotatePossible() {
        var rotatedFig = figure.next;                
        for (var i = 0; i < figure.length; i++) {
            for (var j = 0; j < figure[i].length; j++) {
                if (rotatedFig[i][j] && !figure[i][j]) {
                    if (gameField.rows[y - 1 + i].cells[x + j].className != "") {
                        return false;
                    }
                }
            }
        }                
        return true;
    }
                
    /******************************************************/
                
    //Функция для либо рисования, либо стирания фигуры
    function drawFigure(yPos, className) {
        for (var i = 0; i < figure.length; i++) {
            for (var j = 0; j < figure[i].length; j++) { 
                if (figure[i][j]) {                               
                    gameField.rows[yPos + i].cells[x + j].className = className;                                 
                }
            }
        }
    }
                
    function move() { 
        //берем случайное число, и определяем цвет фигуры                    
        switch (getRandNum(1, 4)) {
            case 1:
                color = "green";
                break;
            case 2:
                color = "blue";
                break;
            case 3:
                color = "red";
                break;
            case 4:
                color = "yellow";
                break;
        }
                    
        x = 4;
        y = 0;
                    
        //Получим произвольную фигуру
        figure = getFigure();
                    
        //И начнем её перемещать
        moveId = setTimeout(step, cycleTime);                    
    }
                
                
    function step(){                        
        //проверка конца игры
        if (!y) {                                
            if (checkEndOfGame()) return;
        }
                        
        if (y < gameFieldHeight + 1 + downEmptyRow() - figure.length) {
                            
            if (downMovePossible()) {
                //стирание предудыщей позиции                            
                if (y) {
                    drawFigure(y - 1, ""); 
                }
                //новая позиция
                drawFigure(y, color);
                y++;
                moveId = setTimeout(step, cycleTime);
            }
            else {
                clearInterval(moveId);
                checkGameField();
                move();
            }
        }
        else {
            clearInterval(moveId);
            checkGameField();
            move();
        }
    }
                
                
    //ф-ции, "срезающие" последние пробелы,  возвращается количество пустых линий
    function downEmptyRow() {
        var incr = 0;
        for (var k = figure.length - 1; k >= 0; k--) {
            var isEmpty = true;
            for (var i = 0; i < figure[k].length;i++) {
                if (figure[k][i]) {
                    isEmpty = false;
                    break;//этот break в принципе необязателен
                }
            }
            if (isEmpty) incr++;
            else break;
        }
        return incr;
    }
                
                
    function leftEmptyCol() {
        //пустой ли весь ряд слева у фигуры                                                      
        var incr = 0;
        for (var k = 0; k < figure[0].length; k++) {
            var isEmpty = true;
            for (var i = 0; i < figure.length; i++) {
                if (figure[i][k]) {
                    isEmpty = false;
                    break;
                }
            }
            if (isEmpty) incr++;
            else break;
        }
        return incr;
    }
                
                
    function rightEmptyCol() {
        //пустой ли ряд справа у фигуры
        var incr = 0;
        for (var k = figure[0].length - 1; k >= 0; k--) {
            var isEmpty = true;
            for (var i = 0; i < figure.length; i++) {
                if (figure[i][k]) {
                    isEmpty = false;
                    break;
                }
            }
            if (isEmpty) incr++;
            else break;
        }
        return incr;
    }
                
                
                
    function handler(e) {  
        e = e || window.event;                    
                    
        switch (e.keyCode) {
            case 37:                
                //"<-"
                if (!pause)
                if (x + leftEmptyCol() && y && leftMovePossible()) {
                    if (y) {
                        drawFigure(y - 1, "");
                    }
                    x--;
                    drawFigure(y - 1, color);
                }
                break;
            case 39:
                //"->"
                if (!pause)
                if (y && x < gameFieldWidth + rightEmptyCol() - figure[0].length && rightMovePossible()) {
                    if (y) {
                        drawFigure(y - 1, "");
                    }
                    x++;
                    drawFigure(y - 1, color);
                }
                break;
            case 38:
                if (!pause)
                if (y && gameFieldWidth - x >= figure.length && x + figure.length >= figure.length && y - 1 + figure.length < gameFieldHeight && rotatePossible()) {                            
                    drawFigure(y - 1, "");
                    figure = figure.next;
                    drawFigure(y - 1, color);
                }
                break;
            case 40:
                //alert("down");..
                cycleTime = 50;
                break;
            case 80:
                if (pause) {
                    pause = false;
                    step();
                }
                else {
                    pause = true;
                    clearInterval(moveId);
                }                            
                break;                  
        }
    }
                
            
    function handler2(e) {
        e = e || window.event;
        switch(e.keyCode){
            case 40:
                cycleTime = 400;
                break;
        }
    }
            
    //Просто ф-ция проверки стакана и очистки заполненных рядов                
    function checkGameField() {
        for (var i = 0; i < gameFieldHeight; i++) {                    
            var delRow = true;
            for (var j = 0; j < gameFieldWidth; j++) {
                if (gameField.rows[i].cells[j].className == "") {
                    delRow = false;
                }
            }
            if (delRow) {                                                 
                for (var k = i; k > 0; k--) {
                    for (var j = 0; j < gameFieldWidth; j++) {
                        gameField.rows[k].cells[j].className = gameField.rows[k - 1].cells[j].className;
                    }
                }
                points += gameFieldWidth;
                point.innerHTML = "Очки: " + points;
            }
        }
    }
                
    //проверка конца игры
    function checkEndOfGame() {
        var stopGame = false;
        for (var i = 0; i < figure.length; i++) {
            for (var j = 0; j < figure[i].length; j++) {
                if (figure[i][j] && gameField.rows[y + i].cells[x + j].className != "") {
                    stopGame = true;                                
                    break;
                }
            }
            if (stopGame) {
                            
                var endGameBox = document.createElement("div");
                endGameBox.id = "box";
                            
                var innerBox = document.createElement("div");
                innerBox.id = "box-inner";
                            
                var message = document.createElement("div");
                message.id = "box-message";
                            
                var top = document.createElement("div");
                top.id = "top";
                top.innerHTML = "<span>Конец игры</span><br>Очки:" + points;  
                            
                var bottom = document.createElement("div");
                bottom.id = "bottom";
                            
                var closeButton = document.createElement("span");
                closeButton.innerHTML = "ok";
                            
                bottom.appendChild(closeButton);
                            
                closeButton.onclick = function(){
                    endGameBox.style.display = "none";
                }
                            
                endGameBox.appendChild(innerBox);
                endGameBox.appendChild(message);
                message.appendChild(top);
                message.appendChild(bottom);
                            
                document.body.appendChild(endGameBox);
                            
                return true;
            }
        }
        return false;
    }
}
var tetris = new Tetris();