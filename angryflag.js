var SIZE = 60;

var TOKENTYPES = {
    'B': {
        'movement': 0
    },
    'F': {
        'movement': 0
    },
    '2': {
        'movement': 9
    },
    '3': {
        'movement': 1
    },
    '4': {
        'movement': 1
    },
    '5': {
        'movement': 1
    },
    '6': {
        'movement': 1
    },
    '7': {
        'movement': 1
    },
    '8': {
        'movement': 1
    },
    '9': {
        'movement': 1
    },
    '10': {
        'movement': 1
    },
    'S': {
        'movement': 1
    },
};

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
        'type': 2
    },
    '0|1': {
        'color': 'red',
        'type': 2
    },
    '1|1': {
        'color': 'red',
        'type': 2
    },
    '2|1': {
        'color': 'red',
        'type': 2
    },
    '3|1': {
        'color': 'red',
        'type':2
    },
    '4|1': {
        'color': 'red',
        'type':2
    },
    '5|1': {
        'color': 'red',
        'type': 2
    },
    '6|1': {
        'color': 'red',
        'type': 2
		},
    '0|2': {
        'color': 'red',
        'type': 3
    },
    '1|2': {
        'color': 'red',
        'type': 3
    },
    '2|2': {
        'color': 'red',
        'type': 3
    },
    '3|2': {
        'color': 'red',
        'type': 3
    },
    '4|2': {
        'color': 'red',
        'type': 3
    },
    '5|2': {
        'color': 'red',
        'type': 4
    },
    '6|2': {
        'color': 'red',
        'type': 4
    },
    '0|3': {
        'color': 'red',
        'type': 4
    },
    '1|3': {
        'color': 'red',
        'type': 4
    },
    '2|3': {
        'color': 'red',
        'type': 5
    },
    '3|3': {
        'color': 'red',
        'type': 5
    },
    '4|3': {
        'color': 'red',
        'type': 5
    },
    '5|3': {
        'color': 'red',
        'type': 5
    },
    '6|3': {
        'color': 'red',
        'type': 6
    },
    '0|4': {
        'color': 'red',
        'type': 6
    },
    '1|4': {
        'color': 'red',
        'type': 6
    },
    '2|4': {
        'color': 'red',
        'type': 6
    },
    '3|4': {
        'color': 'red',
        'type': 7
    },
    '4|4': {
        'color': 'red',
        'type': 7
    },
    '5|4': {
        'color': 'red',
        'type': 7
    },
    '6|4': {
        'color': 'red',
        'type': 8
    },
    '0|5': {
        'color': 'red',
        'type': 8
    },
    '1|5': {
        'color': 'red',
        'type': 9
    },
    '2|5': {
        'color': 'red',
        'type': 10
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
        'type': 8
    },
    '1|6': {
        'color': 'blue',
        'type': 9
    },
    '2|6': {
        'color': 'blue',
        'type': 10
    },
    '3|6': {
        'color': 'blue',
        'type': 'S'
    },
    '4|6': {
        'color': 'blue',
        'type': 'F'
    },
    '0|7': {
        'color': 'blue',
        'type': 6
    },
    '1|7': {
        'color': 'blue',
        'type': 6
    },
    '2|7': {
        'color': 'blue',
        'type': 6
    },
    '3|7': {
        'color': 'blue',
        'type': 7
    },
    '4|7': {
        'color': 'blue',
        'type': 7
    },
    '5|7': {
        'color': 'blue',
        'type': 7
    },
    '6|7': {
        'color': 'blue',
        'type': 8
    },
    '0|8': {
        'color': 'blue',
        'type': 4
    },
    '1|8': {
        'color': 'blue',
        'type': 4
    },
    '2|8': {
        'color': 'blue',
        'type': 5
    },
    '3|8': {
        'color': 'blue',
        'type': 5
    },
    '4|8': {
        'color': 'blue',
        'type': 5
    },
    '5|8': {
        'color': 'blue',
        'type': 5
    },
    '6|8': {
        'color': 'blue',
        'type': 6
    },
    '0|9': {
        'color': 'blue',
        'type': 3
    },
    '1|9': {
        'color': 'blue',
        'type': 3
    },
    '2|9': {
        'color': 'blue',
        'type': 3
    },
    '3|9': {
        'color': 'blue',
        'type': 3
    },
    '4|9': {
        'color': 'blue',
        'type': 3
    },
    '5|9': {
        'color': 'blue',
        'type': 4
    },
    '6|9': {
        'color': 'blue',
        'type': 4
    },
    '0|10': {
        'color': 'blue',
        'type': 2
    },
    '1|10': {
        'color': 'blue',
        'type': 2
    },
    '2|10': {
        'color': 'blue',
        'type': 2
    },
    '3|10': {
        'color': 'blue',
        'type': 2
    },
    '4|10': {
        'color': 'blue',
        'type': 2
    },
    '5|10': {
        'color': 'blue',
        'type': 2
    },
    '6|10': {
        'color': 'blue',
        'type': 2
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
        'type': '2'
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

function isEmpty(destination) {
    var destinationIndex = destination.x + '|' + destination.y;
    var destinationIsEmpty = !boardTokens[destinationIndex];
    return destinationIsEmpty;
}

//used during setup
//swaps the pieces if there is a piece at the destination
function moveFromBoardToBoard(source, destination) {

    var destinationIndex = destination.x + '|' + destination.y;
    var destinationIsEmpty = isEmpty(destination);
    var sourceIndex = sourceSquare.x + '|' + sourceSquare.y;
    if (destinationIsEmpty) {
        //move to new spot on board
        boardTokens[destinationIndex] = boardTokens[sourceSquare.x + '|' + sourceSquare.y];

        //delete from old spot on board
        delete boardTokens[sourceIndex];
        //clear the global variable
        sourceSquare = {
            'region': '',
            'x': '',
            'y': ''
        };
    } else {
        //swap pieces
        var destinationToken = boardTokens[destinationIndex];
        boardTokens[destinationIndex] = boardTokens[sourceIndex];
        boardTokens[sourceIndex] = destinationToken;
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

    //check of moving from box to board during setup
    if (sourceSquare.region == 'box' && gameStatus == 'SETUP') {
        moveFromBoxToBoard(sourceSquare, destination);
    }
    //if moving from board to board during setup
    else if (sourceSquare.region == 'board' && gameStatus == 'SETUP') {
        moveFromBoardToBoard(sourceSquare, destination);
    }
    //if moving from board to board during play
    else if (sourceSquare.region == 'board' && gameStatus == 'RUNNING') {
        move(sourceSquare, destination);
    }
    // this is first click
    else if (boardTokens[index]) {
        sourceSquare = destination;
    }

    draw();
}

//used during game play
function move(source, destination) {
    //is target a valid destination
    var moves = getMoves(source);
    var validMove = false;
    for (var i = 0; i < moves.length; i++) {
        if (moves[i].x == destination.x && moves[i].y == destination.y) {
            //valid
            validMove = true;
            break;
        }
    }
    if (!validMove) {
        return;
    }

    //is a valid move
    //do the move
    var destinationIsEmpty = isEmpty(destination);
    var destinationIndex = getIndex(destination);
    var destinationToken = boardTokens[destinationIndex];
	var sourceIndex=getIndex(source);
    var sourceToken = boardTokens[sourceIndex];
	
	
	console.log(!isNaN(destinationToken.type));
	console.log(!isNaN(sourceToken.type));
	console.log(destinationToken.type );
	console.log( sourceToken.type);
	console.log(destinationToken.type > sourceToken.type);
	
	
    if (destinationIsEmpty) {
        moveFromBoardToBoard(source, destination);
    } else if (!isNaN(destinationToken.type) &&
        !isNaN(sourceToken.type) &&
        destinationToken.type > sourceToken.type) {
        //lower number attacking a higher number
        delete boardTokens[sourceIndex];
		console.log('lower attacking higher');
    }
}

function getIndex(square) {
    var index = square.x + '|' + square.y;
    return index;
}

function init() {
    //add click handlers
    var boardCanvas = document.getElementById('board');
    $(boardCanvas).click(boardClick);

    var boxCanvas = document.getElementById('box');
    $(boxCanvas).click(boxClick);

    var startGameButton = document.getElementById('startGameButton');
    $(startGameButton).click(startGame);
}

var gameStatus = 'SETUP';

function startGame() {
    gameStatus = 'RUNNING';
}
var LINEWIDTH = 6;
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

    //highlight valid moves for selected token
    (function drawMoves(moves) {
        //console.log(moves);
        board.save();

        board.strokeStyle = "blue";
        board.lineWidth = LINEWIDTH;
        board.beginPath();

        moves.forEach(square => {
            //console.log(square);
            board.rect(square.x * SIZE + LINEWIDTH / 2,
                square.y * SIZE + LINEWIDTH / 2,
                SIZE - LINEWIDTH, SIZE - LINEWIDTH);
        });

        board.stroke();
        board.restore();

    })(getMoves(sourceSquare));

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
            ctx.lineWidth = LINEWIDTH;

            ctx.rect(sourceSquare.x * SIZE + LINEWIDTH / 2, sourceSquare.y * SIZE + LINEWIDTH / 2,
                SIZE - LINEWIDTH, SIZE - LINEWIDTH);
            ctx.stroke();
            ctx.restore();

        }
    })();

}

function getMoves(sourceSquare) {
    var moves = [];
    if (sourceSquare.region != 'board') {
        return [];
    }
    //console.log(sourceSquare);
    index = getIndex(sourceSquare);
    //console.log(index);
    var token = boardTokens[index];
    //console.log(token);
    var type = TOKENTYPES[token.type];
    //console.log(type);
    //get up movememnts
    for (var i = 1; i <= type.movement && sourceSquare.y - i >= 0 &&
        //check if board is empty
        (boardTokens[getIndex({
                    'x': sourceSquare.x,
                    'y': sourceSquare.y - i
                })] == undefined ||
            //or is enemy token
            boardTokens[getIndex({
                    'x': sourceSquare.x,
                    'y': sourceSquare.y - i
                })].color != token.color); i++) {
        moves.push({
            'x': sourceSquare.x,
            'y': sourceSquare.y - i
        });
        //check if we hit an enemy pieces
        if (boardTokens[getIndex({
                    'x': sourceSquare.x,
                    'y': sourceSquare.y - i
                })] != undefined
             && boardTokens[getIndex({
                    'x': sourceSquare.x,
                    'y': sourceSquare.y - i
                })].color != token.color) {
            break;
        }
    }
    //get down
    for (var i = 1; i <= type.movement && sourceSquare.y + i <= 9 &&
        //check if board is empty
        (boardTokens[getIndex({
                    'x': sourceSquare.x,
                    'y': sourceSquare.y + i
                })] == undefined ||
            //or is enemy token
            boardTokens[getIndex({
                    'x': sourceSquare.x,
                    'y': sourceSquare.y + i
                })].color != token.color); i++) {
        moves.push({
            'x': sourceSquare.x,
            'y': sourceSquare.y + i
        });
        //check if we hit an enemy pieces
        if (boardTokens[getIndex({
                    'x': sourceSquare.x,
                    'y': sourceSquare.y + i
                })] != undefined
             && boardTokens[getIndex({
                    'x': sourceSquare.x,
                    'y': sourceSquare.y + i
                })].color != token.color) {
            break;
        }
    }
    //get left
    for (var i = 1; i <= type.movement && sourceSquare.x - i >= 0
         &&
        //check if board is empty
        (boardTokens[getIndex({
                    'x': sourceSquare.x - i,
                    'y': sourceSquare.y
                })] == undefined ||
            //or is enemy token
            boardTokens[getIndex({
                    'x': sourceSquare.x - i,
                    'y': sourceSquare.y
                })].color != token.color); i++) {
        moves.push({
            'x': sourceSquare.x - i,
            'y': sourceSquare.y
        }); //check if we hit an enemy pieces
        if (boardTokens[getIndex({
                    'x': sourceSquare.x - i,
                    'y': sourceSquare.y
                })] != undefined
             && boardTokens[getIndex({
                    'x': sourceSquare.x - i,
                    'y': sourceSquare.y
                })].color != token.color) {
            break;
        }
    }
    //get right
    for (var i = 1; i <= type.movement && sourceSquare.x + i <= 9
         &&
        //check if board is empty
        (boardTokens[getIndex({
                    'x': sourceSquare.x + i,
                    'y': sourceSquare.y
                })] == undefined ||
            //or is enemy token
            boardTokens[getIndex({
                    'x': sourceSquare.x + i,
                    'y': sourceSquare.y
                })].color != token.color); i++) {
        moves.push({
            'x': sourceSquare.x + i,
            'y': sourceSquare.y
        });
        //check if we hit an enemy pieces
        if (boardTokens[getIndex({
                    'x': sourceSquare.x + i,
                    'y': sourceSquare.y
                })] != undefined
             && boardTokens[getIndex({
                    'x': sourceSquare.x + i,
                    'y': sourceSquare.y
                })].color != token.color) {
            break;
        }
    }
    return moves;
}
