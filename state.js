export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    RUNNING_LEFT: 4,
    RUNNING_RIGHT: 5,
    JUMPING_LEFT: 6,
    JUMPING_RIGHT: 7,
    FALLING_LEFT: 8,
    FALLING_RIGHT: 9,
}

class State {
    constructor(state){
        this.state = state;
    }
}

export class StandingLeft extends State {
    constructor(cat){
        super('STANDING LEFT');
        this.cat = cat;
    }
    enter(){
        // Spritesheet Row
        this.cat.yFrame = 0;
        this.cat.speed = 0;
    }
    handleInput(input){
        if (input === "PRESS RIGHT") this.cat.setState(states.RUNNING_RIGHT);
        else if (input === "PRESS LEFT") this.cat.setState(states.RUNNING_LEFT);
        else if (input === "PRESS DOWN") this.cat.setState(states.SITTING_LEFT);
        else if (input === "PRESS UP") this.cat.setState(states.JUMPING_LEFT);
    }
}

export class StandingRight extends State {
    constructor(cat){
        super('STANDING RIGHT');
        this.cat = cat;
    }
    enter(){
        // Spritesheet Row
        this.cat.yFrame = 0;
        this.cat.speed = 0;
    }
    handleInput(input){
        if (input === "PRESS RIGHT") this.cat.setState(states.RUNNING_RIGHT);
        else if (input === "PRESS LEFT") this.cat.setState(states.RUNNING_LEFT);
        else if (input === "PRESS DOWN") this.cat.setState(states.SITTING_RIGHT);
        else if (input === "PRESS UP") this.cat.setState(states.JUMPING_RIGHT);
    }
}

export class SittingLeft extends State {
    constructor(cat){
        super('SITTING LEFT');
        this.cat = cat;
    }
    enter(){
        // Spritesheet Row
        this.cat.yFrame = 0;
    }
    handleInput(input){
        if (input === "PRESS RIGHT") this.cat.setState(states.SITTING_RIGHT);
        else if (input === "RELEASE DOWN") this.cat.setState(states.STANDING_LEFT);
    }
}

export class SittingRight extends State {
    constructor(cat){
        super('SITTING RIGHT');
        this.cat = cat;
    }
    enter(){
        // Spritesheet Row
        this.cat.yFrame = 0;
    }
    handleInput(input){
        if (input === "PRESS LEFT") this.cat.setState(states.SITTING_LEFT);
        else if (input === "RELEASE DOWN") this.cat.setState(states.STANDING_RIGHT);
    }
}

export class RunningLeft extends State {
    constructor(cat){
        super('SITTING RIGHT');
        this.cat = cat;
    }
    enter(){
        // Spritesheet Row
        this.cat.yFrame = 0;
        this.cat.speed = -this.cat.maxSpeed;
    }
    handleInput(input){
        if (input === "PRESS RIGHT") this.cat.setState(states.RUNNING_RIGHT);
        else if (input === "PRESS DOWN") this.cat.setState(states.SITTING_LEFT);
        else if (input === "RELEASE LEFT") this.cat.setState(states.STANDING_LEFT);
    }
}

export class RunningRight extends State {
    constructor(cat){
        super('SITTING RIGHT');
        this.cat = cat;
    }
    enter(){
        // Spritesheet Row
        this.cat.yFrame = 0;
        this.cat.speed = this.cat.maxSpeed;
    }
    handleInput(input){
        if (input === "PRESS LEFT") this.cat.setState(states.RUNNING_LEFT);
        else if (input === "PRESS DOWN") this.cat.setState(states.SITTING_RIGHT);
        else if (input === "RELEASE RIGHT") this.cat.setState(states.STANDING_RIGHT);
    }
}

export class JumpingLeft extends State {
    constructor(cat){
        super('JUMPING LEFT');
        this.cat = cat;
    }
    enter(){
        // Spritesheet Row
        this.cat.yFrame = 0;
        if (this.cat.onGround()) this.cat.vy -= 4;
        this.cat.speed = -this.cat.maxSpeed / 2;
    }
    handleInput(input){
        if (this.cat.onGround()) this.cat.setState(states.STANDING_LEFT);
        if (input === 'PRESS RIGHT') this.cat.setState(states.JUMPING_RIGHT);
        else if (this.cat.vy > 0) this.cat.setState(states.FALLING_LEFT);
    }
}

export class JumpingRight extends State {
    constructor(cat){
        super('JUMPING RIGHT');
        this.cat = cat;
    }
    enter(){
        // Spritesheet Row
        this.cat.yFrame = 0;
        if (this.cat.onGround()) this.cat.vy -= 4;
        this.cat.speed = this.cat.maxSpeed / 2;
    }
    handleInput(input){
        if (this.cat.onGround()) this.cat.setState(states.STANDING_RIGHT);
        if (input === 'PRESS LEFT') this.cat.setState(states.JUMPING_LEFT);
        else if (this.cat.vy > 0) this.cat.setState(states.FALLING_RIGHT);
    }
}

export class FallingLeft extends State {
    constructor(cat){
        super('FALLING LEFT');
        this.cat = cat;
    }
    enter(){
        // Spritesheet Row
        this.cat.yFrame = 0;
    }
    handleInput(input){
        if (this.cat.onGround()) this.cat.setState(states.STANDING_LEFT);
        if (input === 'PRESS RIGHT') this.cat.setState(states.FALLING_RIGHT);
    }
}

export class FallingRight extends State {
    constructor(cat){
        super('FALLING RIGHT');
        this.cat = cat;
    }
    enter(){
        // Spritesheet Row
        this.cat.yFrame = 0;
    }
    handleInput(input){
        if (this.cat.onGround()) this.cat.setState(states.STANDING_RIGHT);
        if (input === 'PRESS LEFT') this.cat.setState(states.FALLING_LEFT);
    }
}