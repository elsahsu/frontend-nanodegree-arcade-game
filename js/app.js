
const COLUMN_WIDTH = 101;
const ROW_HEIGHT = 83;
const NUM_COLUMNS = 5;
const NUM_ROWS = 6;
const PLAYER_CHARACTERS = [
    'images/char-boy.png',
    'images/char-cat-girl.png'
];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < NUM_COLUMNS * COLUMN_WIDTH) {
        this.x += this.speed * dt;
    } else {
        this.reset();
    }

    // Check for collision if player is on the same row
    if (this.row === player.row) {
        let player_x = player.column * COLUMN_WIDTH;
        let distance = Math.abs(this.x - player_x);
        // console.log('Distance:', distance);
        if (distance < 75) {
            player.lose();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset enemy to the left of the grid and assign row and speed
Enemy.prototype.reset = function() {
    this.row = 1;
    this.speed = 50;
    this.x = - COLUMN_WIDTH;
    this.y = this.row * ROW_HEIGHT - 20;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.character_num = 0;
    this.reset();
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    x = this.column * COLUMN_WIDTH;
    y = this.row * ROW_HEIGHT - 20; // Add a little offset for more 3D look
    ctx.drawImage(Resources.get(this.sprite), x, y);
};

// Move player's position on the grid when arrow keys are pressed.
// Make sure player stays on the grid.
// If player reaches top row, game is won.
Player.prototype.handleInput = function(direction) {
    if ((direction === 'up') && (this.row > 0)) {
        this.row -= 1;
    }
    else if ((direction === 'down') && (this.row < NUM_ROWS - 1)) {
        this.row += 1;
    }
    else if ((direction === 'left') && (this.column > 0)) {
        this.column -= 1;
    }
    else if ((direction === 'right') && (this.column < NUM_COLUMNS - 1)) {
        this.column += 1;
    }
    console.log(direction, this.row, this.column);
    if (this.row === 0) {
        this.win();
    }
}

// Reset player location at the bottom of the grid and set player character.
// Called whenever player wins or loses or when game is started for the
// first time.
Player.prototype.reset = function() {
    this.character_num += 1;
    if (this.character_num > PLAYER_CHARACTERS.length - 1)
    {
        this.character_num = 0;
    }
    this.sprite = PLAYER_CHARACTERS[this.character_num];
    this.row = NUM_ROWS - 1;
    this.column = 2;
}

// Win game and start a new one.
Player.prototype.win = function() {
    console.log("Congratulations, you won!");
    this.reset();
}

// Lose game and start a new one.
Player.prototype.lose = function() {
    console.log("You lost");
    this.reset();
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var player = new Player();
var allEnemies = [];
allEnemies.push(new Enemy());

