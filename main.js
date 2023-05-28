import { Cat } from "./cat.js";
import { InputHandler } from "./input.js";

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 100;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.cat = new Cat(this);
            this.input = new InputHandler();
        }
        update() {
            this.cat.update(this.input.keys);
        }
        draw(context) {
            this.cat.draw(context)
        }
    }

    const game = new Game(canvas.width, canvas.height);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});