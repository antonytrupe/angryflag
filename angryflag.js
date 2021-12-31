class AngryFlag {

  ui;
  boardTokens;
  currentColor;
  nextColor;
  /**
   * LAYOUT, SETUP, RUNNING, FINISHED
  **/
  gameStatus;
  colors;
  startingLocations;

  constructor(_ui) {
    this.ui = _ui;
    this.boardTokens = {};

    this.colors = ['red', 'blue'];
    this.startingLocations={'red':['0|0','1|0','2|0','3|0','4|0','5|0','6|0','7|0','8|0','9|0','0|1','1|1','2|1','3|1','4|1','5|1','6|1','7|1','8|1','9|1','0|2','1|2','2|2','3|2','4|2','5|2','6|2','7|2','8|2','9|2','0|3','1|3','2|3','3|3','4|3','5|3','6|3','7|3','8|3','9|3'],
                            'blue':['0|6','1|6','2|6','3|6','4|6','5|6','6|6','7|6','8|6','9|6','0|7','1|7','2|7','3|7','4|7','5|7','6|7','7|7','8|7','9|7','0|8','1|8','2|8','3|8','4|8','5|8','6|8','7|8','8|8','9|8','0|9','1|9','2|9','3|9','4|9','5|9','6|9','7|9','8|9','9|9']};
    this.currentColor = 'red';
    this.nextColor = '';
    this.gameStatus = 'SETUP';

  }

  randomPlacement(){
      //make a copy of the starting locations list and remove startingLocations that aren't empty
    var remainingStartingLocations= this.startingLocations[this.currentColor].filter(location=>this.boardTokens[location]==undefined);
    // //loop over the remaining box tokens

    //console.log(Object.entries(this.boxTokens));
    Object.entries(this.boxTokens).forEach(([key,token]) => {
      //console.log(key);
      //console.log(token);
      //only check the current player's tokens
      if(token.color==this.currentColor){
        // find a random open spot on the board
        var randomStartingLocationIndex=Math.floor(Math.random()*remainingStartingLocations.length);
        //console.log('remainingStartingLocations.length:'+remainingStartingLocations.length);

        //console.log('remainingStartingLocations:'+remainingStartingLocations);
        //console.log('randomStartingLocationIndex:'+randomStartingLocationIndex);
        var randomStartingLocation=remainingStartingLocations[randomStartingLocationIndex];
        //remove that location from the remainingStartingLocations
        remainingStartingLocations.splice(randomStartingLocationIndex,1);

        this.moveFromBoxToBoard({'x':key.split('|')[0],'y':key.split('|')[1]},
                                {'x':randomStartingLocation.split('|')[0],'y':randomStartingLocation.split('|')[1]});

      }
    });
  }

  hasMoreTokens(color) {
    //console.log(color);
    var done= Object.entries(this.boxTokens).some(([key,token]) => {
      //console.log(key);
      //console.log(token.color);
      //console.log(this.boxTokens[key].color);

      var result=token.color == color;
      //console.log(result);
      return result;
    });
    //console.log(done);
    return done;
  }

  /**
   *remove a token from the box and add it to the board
   *
   * @param source
   * @param destination
   */
  moveFromBoxToBoard(source, destination) {
    let index = destination.x + '|' + destination.y;
    var destinationIsEmpty =this.isEmpty(destination);
    var destinationIsValidSetup=this.isSetupLocation(destination,this.currentColor);
    //console.log(destinationIsValidSetup);

    if (destinationIsEmpty && destinationIsValidSetup) {
      //place on board
      this.boardTokens[index] = this.boxTokens[source.x + '|' + source.y];

      //delete from box
      delete this.boxTokens[source.x + '|' + source.y];

      //clear the global variable
      this.ui.clearSelection();
    }
  }

  isSetupLocation(destination,color){
    var check=this.startingLocations[color].includes(this.getIndex(destination));
    return check;
  }

  /**
   * checks of the locatin on the board is isEmpty
   *
   * @param destination object with x and y attributes
  **/
  isEmpty(destination) {
    var destinationIndex = destination.x + '|' + destination.y;
    var destinationIsEmpty = !this.boardTokens[destinationIndex];
    return destinationIsEmpty;
  };

  startEndTurn() {
    //if there is no current color, this is a start turn click
    if (this.currentColor == "") {
      // then make next color the current color
      this.currentColor = this.nextColor;
    }
    //there is a currentColor
    else {
      this.nextColor = this.getNextColor();
      this.currentColor = "";
    }
  }

  getNextColor() {
    var currentColorIndex = this.colors.indexOf(this.currentColor)
    if (currentColorIndex == this.colors.length - 1) {
      return this.colors[0];
    } else {
      return this.colors[currentColorIndex + 1];
    }
  }

  /**
   * used during setup
   **/
  moveSetup(source,destination)
  {
    var destinationIsValidSetup=this.isSetupLocation(destination,this.currentColor);
    if(destinationIsValidSetup){
      this.moveFromBoardToBoard(source, destination);
    }
  }

  //swaps the pieces if there is a piece at the destination
  //doesn't enforce valid moves
  moveFromBoardToBoard(source, destination) {
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
      this.ui.clearSelection();
    } else {
      //swap pieces
      var destinationToken = this.boardTokens[destinationIndex];
      this.boardTokens[destinationIndex] = this.boardTokens[sourceIndex];
      this.boardTokens[sourceIndex] = destinationToken;
      //clear the global variable
      this.ui.clearSelection();
    }
  }

  //used during game play
  //enforces valid moves
  move(source, destination) {
    console.log('move');

    var destinationIsEmpty = this.isEmpty(destination);
    var destinationIndex = this.getIndex(destination);
    var destinationToken = this.boardTokens[destinationIndex];
    var sourceIndex = this.getIndex(source);
    var sourceToken = this.boardTokens[sourceIndex];

    //selecting a different piece
    if (destinationIndex == sourceIndex && destinationToken.color == this.currentColor) {
      console.log('source and destination index are the same');
      return false;
    }

    //is target a valid destination
    var moves = this.getMoves(source);
    var validMove = false;
    //check if the destination is in the list of valid moves
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].x == destination.x && moves[i].y == destination.y) {
        //valid
        validMove = true;
        console.log('valid move');
        break;
      }
    }
    if (!validMove) {
      console.log('not a valid move');
      return false;
    }

    //is a valid move
    //do the move
    if (destinationIsEmpty) {
      this.moveFromBoardToBoard(source, destination);
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
    this.startEndTurn();
    return true;
  }

  getIndex(square) {
    var index = square.x + '|' + square.y;
    return index;
  }

  startGame() {
    this.gameStatus = 'RUNNING';
    this.currentColor='';
    this.nextColor=this.colors[0];
  }

  getMoves(sourceSquare) {
    var moves = [];
    if (sourceSquare.region != 'board') {
      return [];
    }
    var index = this.getIndex(sourceSquare);
    var token = this.boardTokens[index];
    var type = TOKENTYPES[token.type];
    //get up movememnts
    for (var i = 1; i <= type.movement && sourceSquare.y - i >= 0 &&
      //check if board is empty
      (this.isEmpty({
          'x': sourceSquare.x,
          'y': sourceSquare.y - i
        }) ||
        //or is enemy token
        this.boardTokens[this.getIndex({
          'x': sourceSquare.x,
          'y': sourceSquare.y - i
        })].color != token.color); i++) {
      moves.push({
        'x': sourceSquare.x,
        'y': sourceSquare.y - i
      });
      //check if we hit an enemy pieces
      if (this.boardTokens[this.getIndex({
          'x': sourceSquare.x,
          'y': sourceSquare.y - i
        })] != undefined &&
        this.boardTokens[this.getIndex({
          'x': sourceSquare.x,
          'y': sourceSquare.y - i
        })].color != token.color) {
        break;
      }
    }
    //get down
    for (var i = 1; i <= type.movement && sourceSquare.y + i <= 9 &&
      //check if board is empty
      (this.boardTokens[this.getIndex({
          'x': sourceSquare.x,
          'y': sourceSquare.y + i
        })] == undefined ||
        //or is enemy token
        this.boardTokens[this.getIndex({
          'x': sourceSquare.x,
          'y': sourceSquare.y + i
        })].color != token.color); i++) {
      moves.push({
        'x': sourceSquare.x,
        'y': sourceSquare.y + i
      });
      //check if we hit an enemy pieces
      if (this.boardTokens[this.getIndex({
          'x': sourceSquare.x,
          'y': sourceSquare.y + i
        })] != undefined &&
        this.boardTokens[this.getIndex({
          'x': sourceSquare.x,
          'y': sourceSquare.y + i
        })].color != token.color) {
        break;
      }
    }
    //get left
    for (var i = 1; i <= type.movement && sourceSquare.x - i >= 0 &&
      //check if board is empty
      (this.boardTokens[this.getIndex({
          'x': sourceSquare.x - i,
          'y': sourceSquare.y
        })] == undefined ||
        //or is enemy token
        this.boardTokens[this.getIndex({
          'x': sourceSquare.x - i,
          'y': sourceSquare.y
        })].color != token.color); i++) {
      moves.push({
        'x': sourceSquare.x - i,
        'y': sourceSquare.y
      }); //check if we hit an enemy pieces
      if (this.boardTokens[this.getIndex({
          'x': sourceSquare.x - i,
          'y': sourceSquare.y
        })] != undefined &&
        this.boardTokens[this.getIndex({
          'x': sourceSquare.x - i,
          'y': sourceSquare.y
        })].color != token.color) {
        break;
      }
    }
    //get right
    for (var i = 1; i <= type.movement && sourceSquare.x + i <= 9 &&
      //check if board is empty
      (this.boardTokens[this.getIndex({
          'x': sourceSquare.x + i,
          'y': sourceSquare.y
        })] == undefined ||
        //or is enemy token
        this.boardTokens[this.getIndex({
          'x': sourceSquare.x + i,
          'y': sourceSquare.y
        })].color != token.color); i++) {
      moves.push({
        'x': sourceSquare.x + i,
        'y': sourceSquare.y
      });
      //check if we hit an enemy pieces
      if (this.boardTokens[this.getIndex({
          'x': sourceSquare.x + i,
          'y': sourceSquare.y
        })] != undefined &&
        this.boardTokens[this.getIndex({
          'x': sourceSquare.x + i,
          'y': sourceSquare.y
        })].color != token.color) {
        break;
      }
    }
    return moves;
  }


  boxTokens = {
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
}

class AngryFlagUI {

  LINEWIDTH = 6;
  scale;
  gameDiv;
  sourceSquare = {
    'region': '',
    'x': '',
    'y': ''
  };

  angryFlag = new AngryFlag(this);

  constructor(_gameDiv, _scale) {

    this.scale = _scale | 60;
    this.gameDiv = _gameDiv;

    this.boxCanvas = this.gameDiv.getElementsByClassName('box')[0];
    this.box = this.boxCanvas.getContext('2d');

    this.boardCanvas = this.gameDiv.getElementsByClassName('board')[0];
    this.board = this.boardCanvas.getContext('2d');

    this.addEventHandlers();

    this.draw();
  }

  addEventHandlers() {
    //add click handlers
    var boardCanvas = gameDiv.getElementsByClassName('board');
    $(boardCanvas).click(this.boardClick.bind(this));

    var boxCanvas = gameDiv.getElementsByClassName('box');
    $(boxCanvas).click(this.boxClick.bind(this));

    var startGameButton = gameDiv.getElementsByClassName('startGameButton');
    $(startGameButton).click(this.startGameClickHandler.bind(this));

    var startEndTurnButton = gameDiv.getElementsByClassName('startEndTurnButton');
    $(startEndTurnButton).click(this.startEndTurnClickHandler.bind(this));

    var randomPlacementButton = gameDiv.getElementsByClassName('randomPlacementButton');
    $(randomPlacementButton).click(this.randomPlacementClickHandler.bind(this));
  }

  startEndTurnClickHandler(){
    this.angryFlag.startEndTurn();
    //unselect
    this.clearSelection();
    this.draw();
  }

  startGameClickHandler(){
    this.angryFlag.startGame();
    this.clearSelection();
    this.draw();
  }

  randomPlacementClickHandler(){
    this.angryFlag.randomPlacement();
    this.draw();
  }

  clearSelection() {
    this.sourceSquare = {
      'region': '',
      'x': '',
      'y': ''
    };
    this.draw();
  }

  boxClick(event) {
    //check to see if there is a token at this spot
    var destination = {
      'region': 'board',
      'x': Math.floor(event.offsetX / this.scale),
      'y': Math.floor(event.offsetY / this.scale)
    };
    var index = destination.x + '|' + destination.y;


    if (this.angryFlag.boxTokens[index] && this.angryFlag.boxTokens[index].color == this.angryFlag.currentColor) {

      this.sourceSquare.region = 'box';
      this.sourceSquare.x = Math.floor(event.offsetX / this.scale);
      this.sourceSquare.y = Math.floor(event.offsetY / this.scale);

      this.draw();
    }
  }

  boardClick(event) {
    var destination = {
      'region': 'board',
      'x': Math.floor(event.offsetX / this.scale),
      'y': Math.floor(event.offsetY / this.scale)
    };
    var index = destination.x + '|' + destination.y;
    //console.log(index);
    //and its the current player's token
    //if (boardTokens[index].color !== currentColor) {
    // return;
    //}

    switch (this.angryFlag.gameStatus) {
      case 'SETUP':
        //check of moving from box to board during setup
        if (this.sourceSquare.region == 'box') {
          this.angryFlag.moveFromBoxToBoard(this.sourceSquare, destination);
        }
        //if moving from board to board during setup
        else if (this.sourceSquare.region == 'board') {
          this.angryFlag.moveSetup(this.sourceSquare, destination);
        }
        // this is first click, make sure its the currentColor's piece
        else if (this.angryFlag.boardTokens[index] && this.angryFlag.boardTokens[index].color == this.angryFlag.currentColor) {
          this.sourceSquare = destination;
        }
        break;
      case 'RUNNING':
        //if moving from board to board during play
        if (this.sourceSquare.region == 'board') {
          var moved=this.angryFlag.move(this.sourceSquare, destination);
          console.log(moved);
          if(moved)
          {
            console.log('clearing selection');
            this.clearSelection();
          }
        }
        // this is first click
        else if (this.angryFlag.boardTokens[index] && this.angryFlag.boardTokens[index].color == this.angryFlag.currentColor) {
          this.sourceSquare = destination;
        }
        break;
    }

    this.draw();
  }

  drawGameStatus() {
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
    currentColorSpan.textContent = this.angryFlag.currentColor ? "Waiting for " + this.angryFlag.currentColor + " to end their turn" : "Waiting on " + this.angryFlag.nextColor + " to start their turn";

    var phaseSpan = gameDiv.getElementsByClassName('phaseSpan')[0];
    phaseSpan.textContent = this.angryFlag.gameStatus;
  }

  drawTokens(ctx, tokens) {
    Object.entries(tokens).forEach(([index, token]) => {
      var x,
        y;
      [x, y] = index.split('|');
      ctx.save();
      //if this is the current color's token, draw the type
      //console.log(token);
      //console.log(angryFlag.currentColor);
      if (token.color == this.angryFlag.currentColor) {
        ctx.fillStyle = token.color;
        ctx.font = "30px Arial Sans Serif";
        ctx.fillText(token.type, x * this.scale + 20, y * this.scale + 40);
      }
      //draw a box
      ctx.strokeStyle = token.color;
      ctx.lineWidth = this.LINEWIDTH;
      ctx.beginPath();

      ctx.rect(x * this.scale + this.LINEWIDTH,
        y * this.scale + this.LINEWIDTH,
        this.scale - this.LINEWIDTH * 2, this.scale - this.LINEWIDTH * 2);
      ctx.stroke();
      ctx.restore();
    });
  }

  draw() {

    this.board.clearRect(0, 0, this.boardCanvas.width, this.boardCanvas.height);

    //draw the grid on the board
    for (var x = 0; x <= 10; x++) {
      //vertical lines
      this.board.beginPath();
      this.board.moveTo(x * this.scale, 0);
      this.board.lineTo(x * this.scale, 600);
      this.board.stroke();

      //horizontal lines
      this.board.beginPath();
      this.board.moveTo(0, x * this.scale);
      this.board.lineTo(600, x * this.scale);
      this.board.stroke();
    }

    this.box.clearRect(0, 0, this.boxCanvas.width, this.boxCanvas.height);

    //draw the grid in the box
    //vertical lines
    for (var x = 0; x <= 7; x++) {
      this.box.beginPath();
      this.box.moveTo(x * this.scale, 0);
      this.box.lineTo(x * this.scale, 720);
      this.box.stroke();
    }
    //horizontal lines
    for (var x = 0; x <= 12; x++) {
      this.box.beginPath();
      this.box.moveTo(0, x * this.scale);
      this.box.lineTo(600, x * this.scale);
      this.box.stroke();
    }


    this.drawGameStatus();

    this.toggleActionButtons();

    this.drawTokens(this.box, this.angryFlag.boxTokens);
    this.drawTokens(this.board, this.angryFlag.boardTokens);

    //anonymous self executing function for drawing
    //highlight valid moves for selected token
    if (this.angryFlag.gameStatus != 'SETUP' && this.sourceSquare!=undefined) {
      this.drawMoves(this.angryFlag.getMoves(this.sourceSquare));
    }
    this.drawSelection();
  }

  drawMoves(moves) {
    this.board.save();

    this.board.strokeStyle = "blue";
    this.board.lineWidth = this.LINEWIDTH;
    this.board.beginPath();

    moves.forEach(square => {
      this.board.rect(square.x * this.scale + this.LINEWIDTH / 2,
        square.y * this.scale + this.LINEWIDTH / 2,
        this.scale - this.LINEWIDTH, this.scale - this.LINEWIDTH);
    });

    this.board.stroke();
    this.board.restore();

  }

  toggleActionButtons(){
    // toggle the randomPlacementButton
    if(!this.angryFlag.hasMoreTokens(this.angryFlag.currentColor) || this.angryFlag.gameStatus!='SETUP')
    {
      //console.log('disable');
      this.disableButton('randomPlacementButton');
    }
    else{
      //console.log('enable');
      this.enableButton('randomPlacementButton');

    }

    //toggle the endturn button
    var startEndTurnButton = gameDiv.getElementsByClassName('startEndTurnButton')[0];
    switch (this.angryFlag.gameStatus)
    {
      case 'SETUP':
      if(this.angryFlag.hasMoreTokens(this.angryFlag.currentColor))
      {
        this.disableButton('startEndTurnButton');
      }
      else{
        this.enableButton('startEndTurnButton');
      }
      break;
    }

    //update the turn button's text
    startEndTurnButton.textContent = this.angryFlag.currentColor ? "End " + this.angryFlag.currentColor + " turn" : "Start " + this.angryFlag.nextColor + " turn";

    //check if anyone has pieces to place still
    if (Object.keys(this.angryFlag.boxTokens).length == 0 && this.angryFlag.gameStatus=='SETUP') {
      // enabled and visible
      this.enableButton('startGameButton');
    }
    else{
      //disable and hide
      this.disableButton('startGameButton');
    }
  }

  enableButton(className)
  {
    var button = gameDiv.getElementsByClassName(className)[0];
    button.removeAttribute('disabled');
    button.style.visibility = 'visible';
    button.style.display = 'initial';
  }

  disableButton(className)
  {
    var button = gameDiv.getElementsByClassName(className)[0];
    button.setAttribute('disabled',true);
    button.style.visibility = 'hidden';
    button.style.display = 'none';
  }

  drawSelection() {
    var ctx;
    if (this.sourceSquare.region == 'board') {
      var ctx = this.board;
    } else if (this.sourceSquare.region == 'box') {
      var ctx = this.box;
    }
    if (ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = this.LINEWIDTH;

      ctx.rect(this.sourceSquare.x * this.scale + this.LINEWIDTH / 2, this.sourceSquare.y * this.scale + this.LINEWIDTH / 2,
        this.scale - this.LINEWIDTH, this.scale - this.LINEWIDTH);
      ctx.stroke();
      ctx.restore();

    }
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
