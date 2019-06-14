MyGame.main = (function(graphics) {
    'use strict';

    let lastTimeStamp = performance.now();
    let elapsedTime = 0;

    let myFoodTexture = graphics.foodTexture();
    let myObstacleTexture = graphics.obstacleTexture();
    let mySnakeTexture = graphics.snakeTexture();

    function onKeyDown(e) {
        graphics.changeDirection(e.keyCode)
    }

    function drawBackground(){
        let canvas = document.getElementById('id-canvas');
        let context = canvas.getContext('2d');

        context.strokeStyle = 'rgba(0, 0, 0, 1)'
        context.lineWidth = 15;
        context.strokeRect(7.5, 7.5, canvas.width - 15, canvas.height - 15);

        context.fillStyle = 'rgba(44, 47, 51, 1)'
        context.fillRect(15, 15, canvas.width - 30, canvas.height - 30)
    }

    function update(elapsedTime) {
        if (! graphics.getGameOver())
            graphics.update(elapsedTime);
        document.getElementById("currentScore").innerHTML = "Score: " + graphics.getCurrentScore();
        document.getElementById("first").innerHTML = "1st: " + graphics.getHighScores(0);
        document.getElementById("second").innerHTML = "2nd: " + graphics.getHighScores(1);
        document.getElementById("third").innerHTML = "3rd: " + graphics.getHighScores(2);
        document.getElementById("fourth").innerHTML = "4th: " + graphics.getHighScores(3);
        document.getElementById("fifth").innerHTML = "5th: " + graphics.getHighScores(4);
    }

    function render() {
        graphics.clear();

        drawBackground();
        myObstacleTexture.draw();
        myFoodTexture.draw();
        mySnakeTexture.draw();
    }

    function gameLoop(time) {
        elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;
        update(elapsedTime);
        render();

        requestAnimationFrame(gameLoop);
    }

    window.addEventListener('keydown', onKeyDown);
    requestAnimationFrame(gameLoop);

}(MyGame.graphics));
