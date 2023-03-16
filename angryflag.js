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

  getVisibleTokens(color){
    //TODO get visible tokens
  }

  getRevealedTokens(color){
    //TODO get revealed tokens
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
      this.startEndTurn();
    } else if (!isNaN(destinationToken.type) &&
      !isNaN(sourceToken.type)) {
      if (destinationToken.type > sourceToken.type) {
        //lower number attacking a higher number
        this.moveToBox(this.boardTokens[sourceIndex]);
        delete this.boardTokens[sourceIndex];
        //don't advance game automatically
        //TODO toggle displaying the other player's token
        //TODO don't let the player move another token
      }
      if (destinationToken.type == sourceToken.type) {
        //tie
        this.moveToBox(this.boardTokens[sourceIndex]);
        delete this.boardTokens[sourceIndex];
        this.moveToBox(this.boardTokens[destinationIndex]);
        delete this.boardTokens[destinationIndex];
        this.startEndTurn();
      }
      if (destinationToken.type < sourceToken.type) {
        //higher number attacking a lower number
        this.moveToBox(this.boardTokens[destinationIndex]);
        delete this.boardTokens[destinationIndex];
        this.startEndTurn();
      }
    }
    return true;
  }

  moveToBox(){
    //TODO find a spot in the box for this token
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
  boxStartingTokens=JSON.parse(JSON.stringify(this.boxTokens));
}


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
