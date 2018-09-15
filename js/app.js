// GLOBAL DATA

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

    // Draw method for the image to be displayed.
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
        this.spawnY = (this.verticalMovement * 4) + 48; 
        
        // Character position along the x and y axis grid of canvas.
        this.x = this.spawnX;
        this.y = this.spawnY;

        // Image of the character.
        this.sprite = 'images/char-boy.png';
    }

    handleInput(input) {

        // Helper for calculating movements on Y axis.
        if(input == 'up') {console.log(this.y, 'logged!')};

        // Temporary switch statements to help with mapping the rendered character amongst the x and y axis of canvas.
        switch (input) {
            case 'left': if (this.x > 0) { this.x -= this.horizontalMovement; break; } else if (this.x <= 0) {break;}
            case 'up': if (this.y > 83) {this.y -= this.verticalMovement; break;} else if (this.y <= 83) {break;}
            case 'right': if (this.x < 101 * 4) this.x += this.horizontalMovement; break;
            case 'down': if (this.y < 83 * 4) this.y += this.verticalMovement; break;
        }
    }

    // Restart player postion.
    restartPosition() {

        // Character position along the x and y axis grid of canvas.
        this.x = this.spawnX;
        this.y = this.spawnY;
    }

    // Update method that checks for character collisions and win conditions.
    update() {

        // Condition for when this.y reaches 48. (Top block nearing 0 to Y axis.)
        this.y === 48 ? this.restartPosition() : 'Error';

        // Looping through the allEnemies for player and enemey collisions.
        for(let enemy of allEnemies) {

            // Conditional for collisions.
            enemy.y === this.y && (enemy.x + enemy.horizontalMovement / 1.8 > this.x && enemy.x < this.x + this.horizontalMovement / 1.8) ? this.restartPosition() : 'error';

            // console.log(enemy.y, 'Enemy logged.'); // Message to the console for confirmination.
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
