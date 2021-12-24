var AngryFlag = function (_ui) {
    this.boardTokens = {};

    var colors = ['red', 'blue'];
    this.currentColor = 'red';
    var nextColor = '';
    //LAYOUT, SETUP, RUNNING, FINISHED
    this.gameStatus = 'SETUP';

    function doneSetup(color) {
        return Object.keys(this.boxTokens).some((key) => {
            this.boxTokens[key].color == currentColor
        })
    }

    this.moveFromBoxToBoard = function (source, destination) {
        console.log('moveFromBoxToBoard');
        var index = destination.x + '|' + destination.y;
        var destinationIsEmpty = !this.boardTokens[index];

        if (destinationIsEmpty) {
            //place on board
            this.boardTokens[index] = this.boxTokens[source.x + '|' + source.y];

            //delete from box
            delete this.boxTokens[source.x + '|' + source.y];

            //clear the global variable
            _ui.clearSelection();
        }
    };

    this.isEmpty = function (destination) {
        var destinationIndex = destination.x + '|' + destination.y;
        var destinationIsEmpty = !this.boardTokens[destinationIndex];
        return destinationIsEmpty;
    };

    function startEndTurn(event) {
        //if there is no current color, this is a start turn click
        if (currentColor == "") {
            // then make next color the current color
            currentColor = nextColor;

        }
        //there is a currentColor
        else {
            nextColor = getNextColor(currentColor);
            currentColor = "";
        }
        //unselect
        clearSelection();

        //check if anyone has pieces to place still
        if (Object.keys(this.boxTokens).length == 0) {
            //TODO:if noone does, then toggle the start game button
        }

        draw();
    }

    function getNextColor(currentColor) {
        var currentColorIndex = colors.indexOf(currentColor)
            if (currentColorIndex == colors.length - 1) {
                return colors[0];
            } else {
                return colors[currentColorIndex + 1];
            }
    }

    //used during setup
    //swaps the pieces if there is a piece at the destination
    //doesn't enforce valid moves
    this.moveFromBoardToBoard = function (source, destination) {
        console.log('moveFromBoardToBoard');

        var destinationIndex = destination.x + '|' + destination.y;
        var destinationIsEmpty = this.isEmpty(destination);
        var sourceIndex = source.x + '|' + source.y;
        if (destinationIsEmpty) {
            //move to new spot on board
            //make a copy

            this.boardTokens[destinationIndex] = JSON.parse(JSON.stringify(this.boardTokens[sourceIndex]));

            //delete from old spot on board
            delete this.boardTokens[sourceIndex];
            //clear the global variable
            _ui.clearSelection();
        } else {
            //swap pieces
            var destinationToken = this.boardTokens[destinationIndex];
            this.boardTokens[destinationIndex] = this.boardTokens[sourceIndex];
            this.boardTokens[sourceIndex] = destinationToken;
            //clear the global variable
            _ui.clearSelection();
        }
    };

    //used during game play
    //enforces valid moves
    function move(source, destination) {
        var destinationIsEmpty = this.isEmpty(destination);
        var destinationIndex = getIndex(destination);
        var destinationToken = this.boardTokens[destinationIndex];
        var sourceIndex = getIndex(source);
        var sourceToken = this.boardTokens[sourceIndex];

        //selecting a different piece
        if (destinationIndex == sourceIndex && destinationToken.color == currentColor) {
            _ui.clearSelection();
            return;
        }

        //is target a valid destination
        var moves = getMoves(source);
        var validMove = false;
        //check if the destination is in the list of valid moves
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


        if (destinationIsEmpty) {
            moveFromBoardToBoard(source, destination);
        } else if (!isNaN(destinationToken.type) &&
            !isNaN(sourceToken.type)) {
            if (destinationToken.type > sourceToken.type) {
                //lower number attacking a higher number
                delete this.boardTokens[sourceIndex];
            }
            if (destinationToken.type == sourceToken.type) {
                //tie
                delete this.boardTokens[sourceIndex];
                delete this.boardTokens[destinationIndex];
            }
            if (destinationToken.type < sourceToken.type) {
                //higher number attacking a lower number
                delete this.boardTokens[destinationIndex];
            }
        }
        //advance the game
        startEndTurn();
    }

    function getIndex(square) {
        var index = square.x + '|' + square.y;
        return index;
    }

    function startGame() {
        gameStatus = 'RUNNING';
        var startGameButton = document.getElementById('startGameButton');
        startGameButton.disabled = 'disabled';
        _ui.clearSelection();
        currentColor = "";
        draw();
    }

    this.getMoves = function (sourceSquare) {
        var moves = [];
        if (sourceSquare.region != 'board') {
            return [];
        }
        index = getIndex(sourceSquare);
        var token = this.boardTokens[index];
        var type = TOKENTYPES[token.type];
        //get up movememnts
        for (var i = 1; i <= type.movement && sourceSquare.y - i >= 0 &&
            //check if board is empty
            (this.boardTokens[getIndex({
                        'x': sourceSquare.x,
                        'y': sourceSquare.y - i
                    })] == undefined ||
                //or is enemy token
                this.boardTokens[getIndex({
                        'x': sourceSquare.x,
                        'y': sourceSquare.y - i
                    })].color != token.color); i++) {
            moves.push({
                'x': sourceSquare.x,
                'y': sourceSquare.y - i
            });
            //check if we hit an enemy pieces
            if (this.boardTokens[getIndex({
                        'x': sourceSquare.x,
                        'y': sourceSquare.y - i
                    })] != undefined
                 && this.boardTokens[getIndex({
                        'x': sourceSquare.x,
                        'y': sourceSquare.y - i
                    })].color != token.color) {
                break;
            }
        }
        //get down
        for (var i = 1; i <= type.movement && sourceSquare.y + i <= 9 &&
            //check if board is empty
            (this.boardTokens[getIndex({
                        'x': sourceSquare.x,
                        'y': sourceSquare.y + i
                    })] == undefined ||
                //or is enemy token
                this.boardTokens[getIndex({
                        'x': sourceSquare.x,
                        'y': sourceSquare.y + i
                    })].color != token.color); i++) {
            moves.push({
                'x': sourceSquare.x,
                'y': sourceSquare.y + i
            });
            //check if we hit an enemy pieces
            if (this.boardTokens[getIndex({
                        'x': sourceSquare.x,
                        'y': sourceSquare.y + i
                    })] != undefined
                 && this.boardTokens[getIndex({
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
            (this.boardTokens[getIndex({
                        'x': sourceSquare.x - i,
                        'y': sourceSquare.y
                    })] == undefined ||
                //or is enemy token
                this.boardTokens[getIndex({
                        'x': sourceSquare.x - i,
                        'y': sourceSquare.y
                    })].color != token.color); i++) {
            moves.push({
                'x': sourceSquare.x - i,
                'y': sourceSquare.y
            }); //check if we hit an enemy pieces
            if (this.boardTokens[getIndex({
                        'x': sourceSquare.x - i,
                        'y': sourceSquare.y
                    })] != undefined
                 && this.boardTokens[getIndex({
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
            (this.boardTokens[getIndex({
                        'x': sourceSquare.x + i,
                        'y': sourceSquare.y
                    })] == undefined ||
                //or is enemy token
                this.boardTokens[getIndex({
                        'x': sourceSquare.x + i,
                        'y': sourceSquare.y
                    })].color != token.color); i++) {
            moves.push({
                'x': sourceSquare.x + i,
                'y': sourceSquare.y
            });
            //check if we hit an enemy pieces
            if (this.boardTokens[getIndex({
                        'x': sourceSquare.x + i,
                        'y': sourceSquare.y
                    })] != undefined
                 && this.boardTokens[getIndex({
                        'x': sourceSquare.x + i,
                        'y': sourceSquare.y
                    })].color != token.color) {
                break;
            }
        }
        return moves;
    };
};

var AngryFlagUI = function (_gameDiv, _scale) {
    var scale = _scale | 60;
    var LINEWIDTH = 6;

    var sourceSquare = {
        'region': '',
        'x': '',
        'y': ''
    }

    var gameDiv = _gameDiv;
    var angryFlag = new AngryFlag(this);

    (function addEventHandlers() {
        //add click handlers
        var boardCanvas = gameDiv.getElementsByClassName('board');
        $(boardCanvas).click(boardClick);

        var boxCanvas = gameDiv.getElementsByClassName('box');
        $(boxCanvas).click(boxClick);

        var startGameButton = gameDiv.getElementsByClassName('startGameButton');
        $(startGameButton).click(angryFlag.startGame);

        var startEndTurnButton = gameDiv.getElementsByClassName('startEndTurnButton');
        $(startEndTurnButton).click(angryFlag.startEndTurn);
    })();

    draw();

    this.clearSelection = function () {
        sourceSquare = {
            'region': '',
            'x': '',
            'y': ''
        };
    }

    function boxClick(event) {
        console.log('boxClick');
        //check to see if there is a token at this spot
        var destination = {
            'region': 'board',
            'x': Math.floor(event.offsetX / scale),
            'y': Math.floor(event.offsetY / scale)
        };
        var index = destination.x + '|' + destination.y;
        if (angryFlag.boxTokens[index] && angryFlag.boxTokens[index].color == angryFlag.currentColor) {

            sourceSquare.region = 'box';
            sourceSquare.x = Math.floor(event.offsetX / scale);
            sourceSquare.y = Math.floor(event.offsetY / scale);

            draw();
        }
    }

    function boardClick(event) {
        console.log('boardClick');
        var destination = {
            'region': 'board',
            'x': Math.floor(event.offsetX / scale),
            'y': Math.floor(event.offsetY / scale)
        };
        var index = destination.x + '|' + destination.y;

        //and its the current player's token
        //if (boardTokens[index].color !== currentColor) {
        // return;
        //}

        switch (angryFlag.gameStatus) {
        case 'SETUP':
            //check of moving from box to board during setup
            if (sourceSquare.region == 'box') {
                angryFlag.moveFromBoxToBoard(sourceSquare, destination);

            }
            //if moving from board to board during setup
            else if (sourceSquare.region == 'board') {
                angryFlag.moveFromBoardToBoard(sourceSquare, destination);
            }
            // this is first click, make sure its the currentColor's piece
            else if (angryFlag.boardTokens[index] && angryFlag.boardTokens[index].color == angryFlag.currentColor) {
                sourceSquare = destination;
            }
            break;
        case 'RUNNING':
            //if moving from board to board during play
            if (sourceSquare.region == 'board') {
                angryFlag.move(sourceSquare, destination);
            }
            // this is first click
            else if (angryFlag.boardTokens[index] && angryFlag.boardTokens[index].color == currentColor) {
                sourceSquare = destination;
            }
            break;
        }

        draw();
    }

    function draw() {
        var boardCanvas = gameDiv.getElementsByClassName('board')[0];
        //console.log(boardCanvas);
        var board = boardCanvas.getContext('2d');

        board.clearRect(0, 0, boardCanvas.width, boardCanvas.height);

        //draw the grid on the board
        for (var x = 0; x <= 10; x++) {
            //vertical lines
            board.beginPath();
            board.moveTo(x * scale, 0);
            board.lineTo(x * scale, 600);
            board.stroke();

            //horizontal lines
            board.beginPath();
            board.moveTo(0, x * scale);
            board.lineTo(600, x * scale);
            board.stroke();
        }

        var boxCanvas = gameDiv.getElementsByClassName('box')[0];
        var box = boxCanvas.getContext('2d');
        box.clearRect(0, 0, boxCanvas.width, boxCanvas.height);

        //draw the grid in the box
        //vertical lines
        for (var x = 0; x <= 7; x++) {
            box.beginPath();
            box.moveTo(x * scale, 0);
            box.lineTo(x * scale, 720);
            box.stroke();
        }
        //horizontal lines
        for (var x = 0; x <= 12; x++) {
            box.beginPath();
            box.moveTo(0, x * scale);
            box.lineTo(600, x * scale);
            box.stroke();
        }

        (function drawGameStatus() {
            //possible status messages
            //waiting for color to finish making changes to the board
            //waiting for color to accept the board
            //waiting for color to start setting up their tokens
            //waiting for color to finish setting up their tokens
            //waiting for color to start their turn
            //waiting for color to finish their turn
            //flag discovered by color

            //update the game status text
            var currentColorSpan = gameDiv.getElementsByClassName("currentColor")[0];
            //if there is a current color, then we're waiting for them to finish, otherwise we're waiting for the next player to start their turn
            currentColorSpan.textContent = angryFlag.currentColor ? "Waiting for " + angryFlag.currentColor + " to end their turn" : "Waiting on " + angryFlag.nextColor + " to start their turn";
        })();

        var startEndTurnButton = gameDiv.getElementsByClassName('startEndTurnButton')[0];
        startEndTurnButton.textContent = angryFlag.currentColor ? "End " + angryFlag.currentColor + " turn" : "Start " + angryFlag.nextColor + " turn";

        var phaseSpan = gameDiv.getElementsByClassName('phaseSpan')[0];
        phaseSpan.textContent = angryFlag.gameStatus;

        //TODO:toggle the endturn button


        //internal function in draw()
        function drawTokens(ctx, tokens) {
            console.log(tokens);
            Object.entries(tokens).forEach(([index, token]) => {
                var x,
                y;
                [x, y] = index.split('|');
                ctx.save();
                //if this is the current color's token, draw the type
                //console.log(token);
                //console.log(angryFlag.currentColor);
                if (token.color == angryFlag.currentColor) {
                    ctx.fillStyle = token.color;
                    ctx.font = "30px Arial Sans Serif";
                    ctx.fillText(token.type, x * scale + 20, y * scale + 40);
                }
                //draw a box
                ctx.strokeStyle = token.color;
                ctx.lineWidth = LINEWIDTH;
                ctx.beginPath();

                ctx.rect(x * scale + LINEWIDTH,
                    y * scale + LINEWIDTH,
                    scale - LINEWIDTH * 2, scale - LINEWIDTH * 2);
                ctx.stroke();
                ctx.restore();
            });
        }
        drawTokens(box, angryFlag.boxTokens);
        drawTokens(board, angryFlag.boardTokens);

        //anonymous self executing function for drawing
        //highlight valid moves for selected token
        if (angryFlag.gameStatus != 'SETUP') {
            (function drawMoves(moves) {
                board.save();

                board.strokeStyle = "blue";
                board.lineWidth = LINEWIDTH;
                board.beginPath();

                moves.forEach(square => {
                    board.rect(square.x * scale + LINEWIDTH / 2,
                        square.y * scale + LINEWIDTH / 2,
                        scale - LINEWIDTH, scale - LINEWIDTH);
                });

                board.stroke();
                board.restore();

            })(angryFlag.getMoves(sourceSquare));
        }

        (function drawSelection() {
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

                ctx.rect(sourceSquare.x * scale + LINEWIDTH / 2, sourceSquare.y * scale + LINEWIDTH / 2,
                    scale - LINEWIDTH, scale - LINEWIDTH);
                ctx.stroke();
                ctx.restore();

            }
        })();

    }
};

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

AngryFlag.prototype.boxTokens = {
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
        'type': 2
    },
    '4|1': {
        'color': 'red',
        'type': 2
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
