// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// Temporary Hero class structure in progress.

class Hero {
    constructor() {

        // Properties for Hero class

        // Position along the x and y axis grid of canvas.
        this.x = 101 * 0;
        this.y = (83 * 5) - 40;

        // Hero movement properties.
        this.horizontalMovement = 101;
        this.verticalMovement = 83;

        // Image of the character.
        this.sprite = 'images/char-boy.png';
    }

    // Draw method for the image to be displayed.
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(input) {

        // Temporary switch statements to help with mapping the rendered character amongst the x and y axis of canvas.
        switch (input) {
            case 'left': this.x -= this.horizontalMovement; break;
            case 'up': this.y -= this.verticalMovement; break;
            case 'right': this.x += this.horizontalMovement; break;
            case 'down': this.y += this.verticalMovement; break;
        }
    }
}

const player = new Hero();

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
