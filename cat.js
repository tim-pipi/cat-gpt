import { StandingLeft, StandingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight} from './state.js';

export class Cat {
    constructor(game) {
        this.game = game;

        // States of cat
        this.states = [new StandingLeft(this),
        new StandingRight(this),
        new SittingLeft(this),
        new SittingRight(this),
        new RunningLeft(this),
        new RunningRight(this),
        new JumpingLeft(this),
        new JumpingRight(this),
        new FallingLeft(this),
        new FallingRight(this),
        ];
        this.currentState = this.states[0];

        // Size of sprite
        this.width = 32;
        this.height = 32;

        // Position of sprite
        this.x = this.game.width / 4;
        this.y = 0;

        // Image source of sprite
        this.image = document.getElementById('cat');

        // Cat properties
        this.speed = 0;
        this.maxSpeed = 4;
        this.vy = 0;
        this.weight = 0.2;

        // xFrame and yFrame
        this.xFrame = 4;
        this.yFrame = 0;

        // x and y Sprite Offsets
        this.xOffset = -16;
        this.yOffset = -20;
    }
    // Update cat movements base on sprite frame
    update(input) {
        this.currentState.handleInput(input);

        // Horizontal movements
        this.x += this.speed;

        // Vertical movements
        this.y += this.vy;

        // Horizontal boundaries
        if (this.x <= 0 + this.xOffset) this.x = this.xOffset
        else if (this.x >= this.game.width - this.width + this.xOffset) this.x = this.game.width - this.width + this.xOffset

        // Vertical boundaries
        // if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
    }
    // Source dimensions to cut sprite frames
    sx = 0;
    sy = 0;
    sw = this.width;
    sh = this.height;
    // Draw currently active frame
    draw(context) {
        context.drawImage(this.image, this.width * this.xFrame, this.height * this.yFrame, this.width, this.height, this.x, this.y, this.height * 2, this.width * 2);
        // context.fillStyle = 'red';
        // context.fillRect(this.x, this.y, this.width, this.height);
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    onGround() {
        return this.y >= this.game.height - this.height + this.yOffset;
    }
}