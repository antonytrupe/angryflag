import "angryflag.js"

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
        //TODO what if they clicked another token that's theirs?
        //if they clicked the same token again, ie deselect

        if (this.sourceSquare.x==destination.x && this.sourceSquare.y==destination.y)
        {
          this.clearSelection();
        }
        //if moving from board to board during play
        else if (this.sourceSquare.region == 'board') {
          var moved=this.angryFlag.move(this.sourceSquare, destination);
          //console.log(moved);
          if(moved)
          {
            //console.log('clearing selection');
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

      //draw a box
      ctx.strokeStyle = token.color;
      //ctx.lineWidth = this.LINEWIDTH;
      //ctx.beginPath();
      ctx.fillStyle = token.color;
      ctx.fillRect(x * this.scale + this.LINEWIDTH,
        y * this.scale + this.LINEWIDTH,
        this.scale - this.LINEWIDTH * 2, this.scale - this.LINEWIDTH * 2);
      ctx.stroke();

      //if this is the current color's token, draw the type
      if (token.color == this.angryFlag.currentColor) {
  ctx.fillStyle = 'black';
        ctx.font = "30px Arial Sans Serif";
        ctx.fillText(token.type, x * this.scale + 20, y * this.scale + 40);
      }
      ctx.restore();
    });
  }

//TODO handle revealing the attacked token
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
    //TODO move possible move grid color/style
    this.board.strokeStyle = "lightgrey";
    this.board.lineWidth = this.LINEWIDTH;
    this.board.beginPath();

    moves.forEach(square => {
      this.board.rect(square.x * this.scale + this.LINEWIDTH / 2+1,
        square.y * this.scale + this.LINEWIDTH / 2+1,
        this.scale - this.LINEWIDTH-2, this.scale - this.LINEWIDTH-2);
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
      //TODO move selected token color/style
      ctx.strokeStyle = "white";
      var lineWidth=5;
      ctx.lineWidth = lineWidth;

      ctx.rect(this.sourceSquare.x * this.scale + lineWidth / 2+1, this.sourceSquare.y * this.scale + lineWidth / 2+1,
        this.scale - lineWidth-2, this.scale - lineWidth-2);
      ctx.stroke();
      ctx.restore();

    }
  }
};
