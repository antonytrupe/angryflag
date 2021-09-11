var SIZE = 60;
var boxTokens = {
    '0|0': {
        'color': 'red',
        'type': 'B'
    },
    '1|0': {
        'color': 'red',
        'type': 'B'
    }

};
var boardTokens = {};

var sourceSquare = {
    'region': '',
    'x': '',
    'y': ''
}

function boxClick(event) {
    //check to see if there is a token at this spot
    var destination = {
        'region': 'board',
        'x': Math.floor(event.offsetX / SIZE),
        'y': Math.floor(event.offsetY / SIZE)
    };
    var index = destination.x + '|' + destination.y;
    if (boxTokens[index]) {

        sourceSquare.region = 'box';
        sourceSquare.x = Math.floor(event.offsetX / SIZE);
        sourceSquare.y = Math.floor(event.offsetY / SIZE);

        draw();
    }
}

function moveFromBoxToBoard(source, destination) {

    var index = destination.x + '|' + destination.y;
    var destinationIsEmpty = !boardTokens[index];

    if (destinationIsEmpty) {
        //place on board
        boardTokens[index] = boxTokens[sourceSquare.x + '|' + sourceSquare.y];

        //delete from box
        delete boxTokens[sourceSquare.x + '|' + sourceSquare.y];

        //clear the global variable
        sourceSquare = {
            'region': '',
            'x': '',
            'y': ''
        };
    }
}

function moveFromBoardToBoard(source, destination) {

    var index = destination.x + '|' + destination.y;
    var destinationIsEmpty = !boardTokens[index];
    if (destinationIsEmpty) {
        //move to new spot on board
        boardTokens[index] = boardTokens[sourceSquare.x + '|' + sourceSquare.y];

        //delete from old spot on board
        delete boardTokens[sourceSquare.x + '|' + sourceSquare.y];
        //clear the global variable
        sourceSquare = {
            'region': '',
            'x': '',
            'y': ''
        };
    }
}

function boardClick(event) {
    //event.clientX
    //event.clientY
    var destination = {
        'region': 'board',
        'x': Math.floor(event.offsetX / SIZE),
        'y': Math.floor(event.offsetY / SIZE)
    };
    var index = destination.x + '|' + destination.y;

    //check of moving from box
    if (sourceSquare.region == 'box') {
        moveFromBoxToBoard(sourceSquare, destination);
    }
    //if moving from board to board
    else if (sourceSquare.region == 'board') {
        moveFromBoardToBoard(sourceSquare, destination);
    }
    // this is first click
    else if (boardTokens[index]) {
        sourceSquare = destination;
    }

    draw();
}

function init() {
    //add click handlers
    var boardCanvas = document.getElementById('board');
    $(boardCanvas).click(boardClick);

    var boxCanvas = document.getElementById('box');
    $(boxCanvas).click(boxClick);
}

function draw() {
    //console.log('draw');

    var boardCanvas = document.getElementById('board');
    var board = boardCanvas.getContext('2d');
    board.clearRect(0, 0, boardCanvas.width, boardCanvas.height);

    //draw the grid on the board
    for (var x = 0; x <= 10; x++) {
        //vertical lines
        board.beginPath();
        board.moveTo(x * SIZE, 0);
        board.lineTo(x * SIZE, 600);
        board.stroke();

        //horizontal lines
        board.beginPath();
        board.moveTo(0, x * SIZE);
        board.lineTo(600, x * SIZE);
        board.stroke();
    }

    var boxCanvas = document.getElementById('box');
    var box = boxCanvas.getContext('2d');
    box.clearRect(0, 0, boxCanvas.width, boxCanvas.height);

    //draw the grid in the box
    //vertical lines
    for (var x = 0; x <= 7; x++) {
        box.beginPath();
        box.moveTo(x * SIZE, 0);
        box.lineTo(x * SIZE, 720);
        box.stroke();
    }
    //horizontal lines
    for (var x = 0; x <= 12; x++) {
        box.beginPath();
        box.moveTo(0, x * SIZE);
        box.lineTo(600, x * SIZE);
        box.stroke();
    }

    function drawTokens(box, tokens) {
        Object.entries(tokens).forEach(([index, token]) => {
            box.save();
            box.fillStyle = token.color;
            box.fillText(token.type, index.split('|')[0] * 60 + 30, index.split('|')[1] * 60 + 30);
            box.restore();
        });
    }
    drawTokens(box, boxTokens);
    drawTokens(board, boardTokens);

    (function drawSelection() {
        //console.log(sourceSquare);
        var ctx;
        if (sourceSquare.region == 'board') {
            var ctx = board;
        } else if (sourceSquare.region == 'box') {
            var ctx = box;
        }
        if (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = "6";

            ctx.rect(sourceSquare.x * SIZE, sourceSquare.y * SIZE,
                SIZE, SIZE);
            ctx.stroke();
            ctx.restore();

        }
    })();
    //drawSelection();
}
