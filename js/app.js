// GLOBAL DATA

// Enemies our player must avoid
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };

// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Base character for Enemy and Hero to derive characteristics from.
class Character {
    constructor() {

        // Character movement properties.
        this.horizontalMovement = 101;
        this.verticalMovement = 83;

        // Border limits
        this.borderX = 101 * 5;
    }

    randomTile(num1 = 0, num2 = 4) {
        return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
    }
}

// Enemy class representing vehicles and vehicle collisions.
class Enemy extends Character {
    constructor(y, velocity){
        super()

        // Properties for Enemy class.

        // Input speed of class instances.
        this.velocity = velocity;

        // Enemy placement on x,y axis.
        this.x = 0;
        this.y = y + 48;

        // Sprite img for Enemy to render on canvas element.
        this.sprite = 'images/enemy-bug.png';
    }

    // Draw method for the image to be displayed.
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Update enemy entity across the x,y axis.
    update(dt) {

        // Increase speed of Enemy if x is less than all 5 blocks. (101w /per block)
        this.x < this.borderX ? this.x += dt * this.velocity : this.x = -101;
    }
}

// Hero class representing player and collisions.

class Hero extends Character {
    constructor() {
        super()

        // Properties for Hero class

        // Initial spawn position.
        this.spawnX = this.horizontalMovement * super.randomTile();
        this.spawnY = (this.verticalMovement * 5) - 40;
        
        // Character position along the x and y axis grid of canvas.
        this.x = this.spawnX;
        this.y = this.spawnY;

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
            case 'left': if (this.x > 0) { this.x -= this.horizontalMovement; break; } else if (this.x <= 0) {break;}
            case 'up': if (this.y > 83) {this.y -= this.verticalMovement; break;} else if (this.y <= 83) {break;}
            case 'right': if (this.x < 101 * 4) this.x += this.horizontalMovement; break;
            case 'down': if (this.y < 83 * 4) this.y += this.verticalMovement; break;
        }
    }
}

// Instantiated objects of classes.

// Player
const player = new Hero();

// Enemies
const vehicle = new Enemy(83, 150), vehicle2 = new Enemy(166, 110), vehicle3 = new Enemy(0, 225);

// Declare and push Enemy.
const allEnemies = [];
allEnemies.push(vehicle, vehicle2, vehicle3);

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
