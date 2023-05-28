export class Cat {
    constructor(game) {
        this.game = game;

        // Size of sprite
        this.width = 60;
        this.height = 40;

        // Position of sprite
        this.x = 0;
        this.y = this.game.height - this.height;

        // Image source of sprite
        this.image = document.getElementById('cat');

        // Cat properties
        this.speed = 0;
        this.maxSpeed = 3;
        this.vy = 0;
        this.weight = 0.5;
    }
    // Update cat movements base on sprite frame
    update(input) {
        // Horizontal movements
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;

        // Boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        // Vertical movements
        if (input.includes('ArrowUp') && this.onGround()) this.vy -= 50;
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        if (input.includes('ArrowDown')) this.y++;
    }
    // Source dimensions to cut sprite frames
    sx = 0;
    sy = 0;
    sw = this.width;
    sh = this.height;
    // Draw currently active frame
    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
        // context.drawImage(this.image, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height;
    }
}