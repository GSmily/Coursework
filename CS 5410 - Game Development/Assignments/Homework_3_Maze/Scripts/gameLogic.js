MyGame.main = (function() {
    'use strict';

    let lastTimeStamp = performance.now();
    let elapsedTime = 0;
    let start = {};
    let input = {};
    let gameTexture = MyGame.graphics.Texture();

    function update(elapsedTime) {
        gameTexture.update(elapsedTime);
    }

    function render() {
        MyGame.graphics.clearPlayer();
        gameTexture.displayPlayer();
    }

    function gameLoop(time) {
        elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;
        update(elapsedTime);
        render();
        requestAnimationFrame(gameLoop);
    }

    function onKeyDown(e) {
        if (input.hasOwnProperty(e.key)) {
            input[e.key](elapsedTime);
        }
    }

    start.initialize = function(cellSize) {
        if (cellSize == 150) {
            MyGame.graphics.fiveByFive();
        }
        else if (cellSize == 75) {
            MyGame.graphics.tenByTen();
        }
        else if (cellSize == 50) {
            MyGame.graphics.fifteenByFifteen();
        }
        else {
            MyGame.graphics.twentyByTwenty();
        }
        
        if (!MyGame.graphics.getGameOver()) {
            gameTexture.initialize(cellSize);
        }

        window.addEventListener('keydown', onKeyDown);

        //movement
        input['w'] = gameTexture.goUp;
        input['a'] = gameTexture.goLeft;
        input['s'] = gameTexture.goDown;
        input['d'] = gameTexture.goRight;

        //utility functions
        input['h'] = gameTexture.displayHint;
        input['b'] = gameTexture.displayBread;
        input['p'] = gameTexture.displayPath;


        requestAnimationFrame(gameLoop);
    }

    return start;
}(MyGame.graphics));
