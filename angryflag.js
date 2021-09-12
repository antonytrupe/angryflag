var SIZE = 60;
var boxTokens = {
    '0|0': {
        'color': 'red',
        'type': 'B'
    },
    '1|0': {
        'color': 'red',
        'type': 'B'
    },
    '2|0': {
        'color': 'red',
        'type': 'B'
    },
    '3|0': {
        'color': 'red',
        'type': 'B'
    },
    '4|0': {
        'color': 'red',
        'type': 'B'
    },
    '5|0': {
        'color': 'red',
        'type': 'B'
    },
    '6|0': {
        'color': 'red',
        'type': '2'
    },

    '0|1': {
        'color': 'red',
        'type': '2'
    },
    '1|1': {
        'color': 'red',
        'type': '2'
    },
    '2|1': {
        'color': 'red',
        'type': '2'
    },
    '3|1': {
        'color': 'red',
        'type': '2'
    },
    '4|1': {
        'color': 'red',
        'type': '2'
    },
    '5|1': {
        'color': 'red',
        'type': '2'
    },
    '6|1': {
        'color': 'red',
        'type': '2'
    },
    '0|2': {
        'color': 'red',
        'type': '3'
    },
    '1|2': {
        'color': 'red',
        'type': '3'
    },
    '2|2': {
        'color': 'red',
        'type': '3'
    },
    '3|2': {
        'color': 'red',
        'type': '3'
    },
    '4|2': {
        'color': 'red',
        'type': '3'
    },
    '5|2': {
        'color': 'red',
        'type': '4'
    },
    '6|2': {
        'color': 'red',
        'type': '4'
    },

    '0|3': {
        'color': 'red',
        'type': '4'
    },
    '1|3': {
        'color': 'red',
        'type': '4'
    },
    '2|3': {
        'color': 'red',
        'type': '5'
    },
    '3|3': {
        'color': 'red',
        'type': '5'
    },
    '4|3': {
        'color': 'red',
        'type': '5'
    },
    '5|3': {
        'color': 'red',
        'type': '5'
    },
    '6|3': {
        'color': 'red',
        'type': '6'
    },
    '0|4': {
        'color': 'red',
        'type': '6'
    },
    '1|4': {
        'color': 'red',
        'type': '6'
    },
    '2|4': {
        'color': 'red',
        'type': '6'
    },
    '3|4': {
        'color': 'red',
        'type': '7'
    },
    '4|4': {
        'color': 'red',
        'type': '7'
    },
    '5|4': {
        'color': 'red',
        'type': '7'
    },
    '6|4': {
        'color': 'red',
        'type': '8'
    },
    '0|5': {
        'color': 'red',
        'type': '8'
    },
    '1|5': {
        'color': 'red',
        'type': '9'
    },
    '2|5': {
        'color': 'red',
        'type': '10'
    },
    '3|5': {
        'color': 'red',
        'type': 'S'
    },
    '4|5': {
        'color': 'red',
        'type': 'F'
    },
    '0|6': {
        'color': 'blue',
        'type': 'B'
    },
    '1|6': {
        'color': 'blue',
        'type': 'B'
    },
    '2|6': {
        'color': 'blue',
        'type': 'B'
    },
    '3|6': {
        'color': 'blue',
        'type': 'B'
    },
    '4|6': {
        'color': 'blue',
        'type': 'B'
    },    
    '0|7': {
        'color': 'blue',
        'type': 'B'
    },
    '1|7': {
        'color': 'blue',
        'type': 'B'
    },
    '2|7': {
        'color': 'blue',
        'type': 'B'
    },
    '3|7': {
        'color': 'blue',
        'type': 'B'
    },
    '4|7': {
        'color': 'blue',
        'type': 'B'
    },
    '5|7': {
        'color': 'blue',
        'type': 'B'
    },
    '6|7': {
        'color': 'blue',
        'type': 'B'
    },
    '0|8': {
        'color': 'blue',
        'type': 'B'
    },
    '1|8': {
        'color': 'blue',
        'type': 'B'
    },
    '2|8': {
        'color': 'blue',
        'type': 'B'
    },
    '3|8': {
        'color': 'blue',
        'type': 'B'
    },
    '4|8': {
        'color': 'blue',
        'type': 'B'
    },
    '5|8': {
        'color': 'blue',
        'type': 'B'
    },
    '6|8': {
        'color': 'blue',
        'type': 'B'
    },
    '0|9': {
        'color': 'blue',
        'type': 'B'
    },
    '1|9': {
        'color': 'blue',
        'type': 'B'
    },
    '2|9': {
        'color': 'blue',
        'type': 'B'
    },
    '3|9': {
        'color': 'blue',
        'type': 'B'
    },
    '4|9': {
        'color': 'blue',
        'type': 'B'
    },
    '5|9': {
        'color': 'blue',
        'type': 'B'
    },
    '6|9': {
        'color': 'blue',
        'type': 'B'
    },
    '0|10': {
        'color': 'blue',
        'type': 'B'
    },
    '1|10': {
        'color': 'blue',
        'type': 'B'
    },
    '2|10': {
        'color': 'blue',
        'type': 'B'
    },
    '3|10': {
        'color': 'blue',
        'type': 'B'
    },
    '4|10': {
        'color': 'blue',
        'type': 'B'
    },
    '5|10': {
        'color': 'blue',
        'type': 'B'
    },
    '6|10': {
        'color': 'blue',
        'type': 'B'
    },
    '0|11': {
        'color': 'blue',
        'type': 'B'
    },
    '1|11': {
        'color': 'blue',
        'type': 'B'
    },
    '2|11': {
        'color': 'blue',
        'type': 'B'
    },
    '3|11': {
        'color': 'blue',
        'type': 'B'
    },
    '4|11': {
        'color': 'blue',
        'type': 'B'
    },
    '5|11': {
        'color': 'blue',
        'type': 'B'
    },
    '6|11': {
        'color': 'blue',
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

    function drawTokens(ctx, tokens) {
        Object.entries(tokens).forEach(([index, token]) => {
            var x,
            y;
            [x, y] = index.split('|');
            ctx.save();
            ctx.fillStyle = token.color;
            ctx.font = "30px Arial Sans Serif";
            ctx.fillText(token.type, x * 60 + 20, y * 60 + 40);
            ctx.restore();
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
