MyGame.graphics = (function() {
    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    // The interval the snake moves in milliseconds
    const interval = 150;
    let carryOver = interval;

    // If false the game plays
    let gameOver = false;

    // Highscore values
    let highScores = [];
    for (let i = 0; i < 5; i++)
        highScores.push(0)

    // Random coords function
    function randomCoords() {
        return Math.ceil(Math.random() * 750 / 16) * 15 + 15;
    }

    // All block sizes
    let blockSize = 15;

    // --------------------------------------------------------------------
    // Obstacle Stuff
    // --------------------------------------------------------------------
    let obstacleArray = [];
    let obstacleCount = 14;
    let obstacleCheck = 0;

    // Spawn all obstacles
    function obstacleSetUp() {
        for (let i = 0; i <= obstacleCount; i++) 
            obstacleArray.push({x: randomCoords(), y:randomCoords()})
    }

    // Checks if the obstacles spawn coords overlap with other obstacles
    function obstacleOverlapCheck() {
        for (let i = 0; i < obstacleArray.length; i++) {
            for (let j = 0; j < obstacleArray.length; j++) {
                if (obstacleArray[i].x == obstacleArray[j].x && obstacleArray[i].y == obstacleArray[j].y)
                    obstacleCheck += 1;
            }
        }
        if (obstacleCheck > 15) {
            obstacleArray.length = 0;
            obstacleCheck = 0;
            obstacleSetUp();
            obstacleOverlapCheck();
        }
    }

    obstacleSetUp();
    obstacleOverlapCheck();

    // --------------------------------------------------------------------
    // Snake Stuff
    // --------------------------------------------------------------------
    let snakeStartCoords;
    let snakeArray = [];
    let direction;
    let newHead;
    let currentScore = 1;
    let snakeCheck = 0;
    let snakePieces = 0;

    // Spawn the snake
    function snakeSetUp() {
        snakeStartCoords = {x: randomCoords(), y: randomCoords()}
    }

    // Checks if the snake spawn coords overlap with obstacles
    function snakeOverlapCheck() {
        for (let i = 0; i < obstacleArray.length; i++) {
            if (obstacleArray[i].x == snakeStartCoords.x && obstacleArray[i].y == snakeStartCoords.y) 
                snakeCheck += 1
        }
        if (snakeCheck > 0) {
            snakeCheck = 0;
            snakeSetUp();
            snakeOverlapCheck();
        }
    }

    snakeSetUp();
    snakeOverlapCheck();
    snakeArray.push(snakeStartCoords);

    // --------------------------------------------------------------------
    // Food Stuff
    // --------------------------------------------------------------------
    let foodCoords;
    let foodCheck = 0;

    // Spawn the food
    function foodSetUp() {
        foodCoords = {x: randomCoords(), y: randomCoords()};
    }

    // Checks if the food spawn coords overlap with obstacles or snake
    function foodOverlapCheck(){
        for (let i = 0; i < obstacleArray.length; i++) {
            if (obstacleArray[i].x == foodCoords.x && obstacleArray[i].y == foodCoords.y) 
                foodCheck += 1
        }
        for (let i = 0; i < snakeArray.length; i++) {
            if (snakeArray[i].x == foodCoords.x && snakeArray[i].y == foodCoords.y) 
                foodCheck += 1
        }
        if (foodCheck > 0) {
            foodCheck = 0;
            foodSetUp();
            foodOverlapCheck();
        }
    }

    foodSetUp();
    foodOverlapCheck();

    // Clear the canvas
    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function snakeTexture() {
        function draw() {
            context.save();
            for (let i = 0; i < snakeArray.length; i++) {
                context.translate(snakeArray[i].x, snakeArray[i].y);
                context.translate(-snakeArray[i].x, -snakeArray[i].y);
                
                context.fillStyle = 'rgba(255, 255, 255, 1)';
                context.fillRect(snakeArray[i].x, snakeArray[i].y, blockSize, blockSize);

                context.strokeStyle = 'rgba(0, 0, 0, 1)';
                context.lineWidth = 2;
                context.strokeRect(snakeArray[i].x + 1, snakeArray[i].y + 1, blockSize - 2, blockSize - 2);
            }
            context.restore();
        }
        return {
            draw: draw
        };
    }

    function foodTexture() {
        function draw() {
            context.save();

            context.translate(foodCoords.x, foodCoords.y);
            context.translate(-foodCoords.x, -foodCoords.y);

            context.fillStyle = 'rgba(40, 180, 0, 1)'
            context.fillRect(foodCoords.x, foodCoords.y, blockSize, blockSize)

            context.strokeStyle = 'rgba(0, 0, 0, 1)';
            context.lineWidth = 2;
            context.strokeRect(foodCoords.x + 1, foodCoords.y + 1, blockSize - 2, blockSize - 2);
            context.restore();
        }
        return {
            draw: draw
        };
    }

    function obstacleTexture() {
        function draw() {
            context.save();
            for (let i = 0; i <= obstacleCount; i ++) {
                context.translate(obstacleArray[i].x, obstacleArray[i].y);
                context.translate(-obstacleArray[i].x, -obstacleArray[i].y);
                
                context.fillStyle = 'rgba(240, 100, 10, 1)'
                context.fillRect(obstacleArray[i].x, obstacleArray[i].y, blockSize, blockSize)

                context.strokeStyle = 'rgba(0, 0, 0, 1)';
                context.lineWidth = 2;
                context.strokeRect(obstacleArray[i].x + 1, obstacleArray[i].y + 1, blockSize - 2, blockSize - 2);
            }
            context.restore();
        }
        return {
            draw: draw
        };
    }

    function update(elapsedTime) {
        carryOver -= elapsedTime;
        if (carryOver <= 0) {
            carryOver += interval
            
            // Depending on what direction, add a snake segment in said direction
            if (direction == "LEFT") {
                newHead = {x: snakeArray[0].x - blockSize, y: snakeArray[0].y};
                snakeArray.splice(0, 0, newHead)
            }
            else if (direction == "RIGHT") {
                newHead = {x: snakeArray[0].x + blockSize, y: snakeArray[0].y};
                snakeArray.splice(0, 0, newHead)
            }
            else if (direction == "UP")  {
                newHead = {x: snakeArray[0].x, y: snakeArray[0].y - blockSize}
                snakeArray.splice(0, 0, newHead)
            }
            else if (direction == "DOWN") {
                newHead = {x: snakeArray[0].x, y: snakeArray[0].y + blockSize}
                snakeArray.splice(0, 0, newHead)
            }

            // Checks if the shake hits the border
            if (snakeArray[0].x <= 0 || snakeArray[0].y <= 0 || snakeArray[0].x >= 735 || snakeArray[0].y >= 735) {
                gameOver = true;
                setHighScores();
            }

            // Checks if the snake hits an obstacle
            for (let i = 0; i < obstacleArray.length; i++) {
                if (snakeArray[0].x == obstacleArray[i].x && snakeArray[0].y == obstacleArray[i].y) {
                    gameOver = true;
                    setHighScores();
                }
            }

            // Checks if the snake hits itself
            if (snakeArray.length > 1) {
                for (let i = 1; i < snakeArray.length; i++) {
                    if (snakeArray[0].x === snakeArray[i].x && snakeArray[0].y === snakeArray[i].y) {
                        gameOver = true;
                        setHighScores();
                    }
                }
            }

            // Checks if the snake hits food and set the snake pieces to add to 3
            if (snakeArray[0].x == foodCoords.x && snakeArray[0].y == foodCoords.y) {
                foodSetUp();
                foodOverlapCheck();
                currentScore += 3;
                snakePieces = 3;
                snakeArray.splice(-1, 1);
            }
            // Adds 3 snake tail pieces
            else if (snakePieces > 0) 
                snakePieces -= 1;

            // Removes Tail if the snake is longer than one piece
            else if (snakeArray.length > 1)
                snakeArray.splice(-1, 1);
        }
    }

    function getGameOver() {
        return gameOver;
    }

    function setGameOver(check) {
        gameOver = check;
    }

    function getCurrentScore() {
        return currentScore
    }

    function getHighScores(position) {
        return highScores[position]
    }

    function setHighScores() {
        highScores.push(currentScore);
        highScores.sort(function(a, b){return b - a});
    }

    function newGame() {
        obstacleSetUp();
        obstacleOverlapCheck();
        snakeArray = [];
        snakeSetUp();
        snakeOverlapCheck();
        snakeArray.push(snakeStartCoords);
        foodSetUp();
        foodOverlapCheck();
        currentScore = 1;
        gameOver = false;
        direction = "";
    }

    function changeDirection(keyCode) {
        if (keyCode === KeyEvent.DOM_VK_LEFT && direction != "RIGHT") 
            direction = "LEFT"
        else if (keyCode === KeyEvent.DOM_VK_RIGHT && direction != "LEFT") 
            direction = "RIGHT"
        else if (keyCode === KeyEvent.DOM_VK_UP && direction != "DOWN") 
            direction = "UP"
        else if (keyCode === KeyEvent.DOM_VK_DOWN && direction != "UP") 
            direction = "DOWN"
    }

    let api = {
        clear: clear,
        snakeTexture: snakeTexture,
        foodTexture: foodTexture,
        obstacleTexture: obstacleTexture,
        update: update,
        getGameOver: getGameOver,
        setGameOver: setGameOver,
        getCurrentScore: getCurrentScore,
        getHighScores: getHighScores,
        setHighScores: setHighScores,
        newGame: newGame,
        changeDirection: changeDirection
    };

    Object.defineProperty(api, 'context', {
        value: context,
        writable: false,
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(api, 'canvas', {
        value: canvas,
        writable: false,
        enumerable: true,
        configurable: false
    });

    return api;
}());