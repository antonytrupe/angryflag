
var boxTokens = [{
        'color': 'red',
        'type': 'B',
        'boxX': 0,
        'boxY': 0
    }
];

function draw() {

    var boardCanvas = document.getElementById('board');
    var board = boardCanvas.getContext('2d');
    var SIZE = 60;
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
    //draw the grid in the box
    for (var x = 0; x <= 7; x++) {
        //vertical lines
        box.beginPath();
        box.moveTo(x * SIZE, 0);
        box.lineTo(x * SIZE, 720);
        box.stroke();
    }
    for (var x = 0; x <= 12; x++) {
        //horizontal lines
        box.beginPath();
        box.moveTo(0, x * SIZE);
        box.lineTo(600, x * SIZE);
        box.stroke();
    }

    function drawBoxTokens(box, tokens) {
        tokens.forEach(token => {
            box.fillText(token.type, token.boxX * 60 + 30, token.boxY * 60 + 30);
        });
    }
    drawBoxTokens(box, boxTokens);
}