
const COLUMN_WIDTH = 101; // Width of column in grid (tile width)
const ROW_HEIGHT = 83; // Height of column in grid (tile height)
const NUM_COLUMNS = 5;
const NUM_ROWS = 6;
const NUM_ENEMIES = 3;
const PLAYER_CHARACTERS = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 0;
    this.y = 0;
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Move along x-axis by speed multiplied by dt. Reset if gone over side.
    if (this.x < NUM_COLUMNS * COLUMN_WIDTH) {
        this.x += this.speed * dt;
    } else {
        this.reset();
    }

    // Check for collision if player is on the same row
    if (this.row === player.row) {
        let distance = Math.abs(this.x - player.x);
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
    this.row = Math.floor(Math.random() * 3) + 1; // Integer between 1 and 3
    // Randomize speed. Speed can be faster the more times player has won.
    this.speed = 50 + Math.random() * (50 * (player.win_count + 1));
    this.x = - COLUMN_WIDTH; // Start from beyond the canvas edge
    this.y = this.row * ROW_HEIGHT - 20;
    console.log("Beetle row: ", this.row, " speed: ", this.speed);
}

// Player class. Stores player location, score and handles keyboard input.
var Player = function() {
    this.x = 0;
    this.y = 0;
    this.win_count = 0;
    this.lose_count = 0;
    this.character_num = Math.floor(Math.random() * PLAYER_CHARACTERS.length);
    this.reset();
};

Player.prototype.update = function(dt) {
    // Player moves by steps in grid, no smooth time-based movement needed
};

// Draw the player and score on the screen
Player.prototype.render = function() {
    this.x = this.column * COLUMN_WIDTH;
    this.y = this.row * ROW_HEIGHT - 20; // Add a little offset for more 3D look
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.drawScore();
};

Player.prototype.drawScore = function() {
    ctx.font = "48px serif";
    let score_string = "Won: " + this.win_count + " Lost: " + this.lose_count;
    ctx.fillText(score_string, 0, 100);
}

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
    this.win_count++;
    updateScore();
    this.reset();
}

// Lose game and start a new one.
Player.prototype.lose = function() {
    console.log("You lost");
    this.lose_count++;
    updateScore();
    this.reset();
}

function updateScore() {
    console.log("Wins: ", player.win_count, " Loses: ", player.lose_count);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];

for (let i = 0;i < NUM_ENEMIES;i++) {
    allEnemies.push(new Enemy());
}

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

