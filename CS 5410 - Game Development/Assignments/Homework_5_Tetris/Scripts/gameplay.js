MyGame.screens['game-play'] = (function(game, graphics, input) {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    let textCanvas = document.getElementById('text-canvas');
    let textContext = textCanvas.getContext('2d');

    let nextPieceCanvas = document.getElementById('next-piece-canvas');
    let nextPieceContext = nextPieceCanvas.getContext('2d');

    context.scale(20, 20);

    nextPieceContext.scale(10, 10);

    let lastTimeStamp = performance.now(), 
        cancelNextRequest = true,
        myKeyboard = input.Keyboard(),
        highScores = JSON.parse(localStorage.getItem('MyGame.highScores')),
        controlsList = JSON.parse(localStorage.getItem('MyGame.controlsList')),
        scoreText = null,
        scoreNumText = null,
        scoreValue = 0,
        linesText = null,
        linesNumText = null,
        totalLines = 0,
        lineCounter = 0,
        levelText = null,
        levelNumText = null,
        levelValue = 0,
        board = createGameMatrix(10, 20),
        userPiece = { position: {x: 0, y: 0}, pieceMatrix: null},
        tetriminoArray = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'],
        tetriminoColors = [ null, '#00F0F0', '#0000F0', '#F0A000', '#F0F000',
                            '#00F000', '#A000F0', '#F00000'],
        nextRandomTetriminoValue = Random.nextRange(0,7),
        levelDropCounter = 0,
        levelDropInterval = 1000,
        tetrisMusic = null,
        musicPlaying = false,
        lineClearedSound = null,
        levelUpSound = null;

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    };

    function playMusic() {
        tetrisMusic.play();
    }

    function addHighScore(score) {
        'use strict';

        if (!highScores) highScores = [0, 0, 0, 0, 0];
        highScores.push(score);
        highScores.sort((a, b) => b - a);
        highScores = highScores.slice(0, 5);

        localStorage.setItem('MyGame.highScores', JSON.stringify(highScores));
    }

    // Function that checks if any lines have been cleared and
    // updates the UI accordingly 
    function boardCheck() {
        let rowCount = 0;
        let recheck = false;

        for (let y = board.length - 1; 0 < y; y -= 1) {
            if (board[y].includes(0)) continue;

            let line = board.splice(y, 1)[0].fill(0);
            board.unshift(line);
            y += 1;

            rowCount += 1;
            totalLines += 1;
            lineCounter += 1;

            lineClearedSound.play();
            recheck = true;
        }

        // Scoring
        if (rowCount == 1) {
            scoreValue = 40 * (levelValue + 1);
        }
        else if (rowCount == 2) {
            scoreValue = 100 * (levelValue + 1);
        }
        else if (rowCount == 3) {
            scoreValue = 300 * (levelValue + 1);
        }
        else if (rowCount == 4) {
            scoreValue = 1200 * (levelValue + 1);
        }
        scoreNumText.updateScore(scoreValue);
        scoreValue = 0;

        // Set Lines cleared text
        linesNumText.setText(totalLines);

        // Set Level text
        levelNumText.setText(levelValue);

        if (recheck) boardCheck();
    }

    // Collision check function
    function collisionCheck(board, userPiece) {
        for (let y = 0; y < userPiece.pieceMatrix.length; y += 1) {
            for (let x = 0; x < userPiece.pieceMatrix[y].length; x += 1) {
                // User piece boundry check vs the board matrix
                if (userPiece.pieceMatrix[y][x] != 0 && (board[y + userPiece.position.y]
                    && board[y + userPiece.position.y][x + userPiece.position.x]) != 0) return true;
            }
        }
        return false;
    }

    // Create game matrix with a width and height
    function createGameMatrix(width, height) {
        let matrix = [];
        while (height--) {
            matrix.push(new Array(width).fill(0));
        }
        return matrix;
    }

    // Function that creates a tetrimino
    function createTetrimino(piece) {
        if (piece == 'I') {
            return [[0, 0 ,0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]];
        }

        else if (piece == 'J') {
            return [[2, 0, 0],
                    [2, 2, 2],
                    [0, 0, 0]];
        }

        else if (piece == 'L') {
            return [[0, 0, 3],
                    [3, 3, 3],
                    [0, 0, 0]];
        }

        else if (piece == 'O') {
            return [[4, 4],
                    [4, 4]];
        }

        else if (piece == 'S') {
            return [[0, 5, 5],
                    [5, 5, 0],
                    [0, 0, 0]];
        }

        else if (piece === 'T') {
            return [[0, 6, 0],
                    [6, 6, 6],
                    [0, 0, 0]];
        }

        else if (piece == 'Z') {
            return [[7, 7, 0],
                    [0, 7, 7],
                    [0, 0, 0]];
        }
    }

    // Function that adds a tetris piece to the game board
    function addUserPieceToBoard(board, userPiece) {
        userPiece.pieceMatrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value != 0) board[y + userPiece.position.y][x + userPiece.position.x] = value;
            })
        })
    }

    // Function that handles the level's "gravity"
    let levelDrop = function() {
        userPiece.position.y += 1;
        if (collisionCheck(board, userPiece)) {
            userPiece.position.y -= 1;
            addUserPieceToBoard(board, userPiece);
            spawnTetrimino();
        }
        levelDropCounter = 0;
    }

    let softDrop = function() {
        userPiece.position.y += 1;
        if (collisionCheck(board, userPiece)) {
            userPiece.position.y -= 1;
            addUserPieceToBoard(board, userPiece);
            spawnTetrimino();
        }
    }

    let hardDropCheck = function() {
        userPiece.position.y += 1;
        if (collisionCheck(board, userPiece)) {
            userPiece.position.y -= 1;
            addUserPieceToBoard(board, userPiece);
            spawnTetrimino();
            return true;
        }
        return false;
    }

    // Hard drop piece
    let hardDrop = function() {
        for (let i = 0; i < 20; i += 1) {
            if (hardDropCheck()) return;
        }
    }

    // Move piece left
    let moveLeft = function() {
        userPiece.position.x += -1;
        // Collision check left wall
        if (collisionCheck(board, userPiece)) userPiece.position.x += 1;
    }

    // Move piece right
    let moveRight = function() {
        userPiece.position.x += 1;
        // Collision check right wall
        if (collisionCheck(board, userPiece)) userPiece.position.x -= 1;
    }

    // Rotate piece counter-clockwise
    let rotatePieceCCW = function() {
        let position = userPiece.position.x;
        let positionOffset = 1;
        rotatePiece(userPiece.pieceMatrix, -1);
        // Wall kick check
        while (collisionCheck(board, userPiece)) {
            userPiece.position.x += positionOffset;
            positionOffset = -(positionOffset + (positionOffset > 0 ? 1 : -1));
            if (positionOffset > userPiece.pieceMatrix[0].length) {
                rotatePiece(userPiece.pieceMatrix, 1);
                userPiece.position.x = position;
                return;
            }
        }
    }

    // Rotate piece clockwise
    let rotatePieceCW = function() {
        let position = userPiece.position.x;
        let positionOffset = 1;
        rotatePiece(userPiece.pieceMatrix, 1);
        // Wall kick check
        while (collisionCheck(board, userPiece)) {
            userPiece.position.x += positionOffset;
            positionOffset = -(positionOffset + (positionOffset > 0 ? 1 : -1));
            if (positionOffset > userPiece.pieceMatrix[0].length) {
                rotatePiece(userPiece.pieceMatrix, -1);
                userPiece.position.x = position;
                return;
            }
        }
    }

    // Helper function to rotate a matrix
    function rotatePiece(matrix, direction) {
        for (let y = 0; y < matrix.length; y += 1) {
            for (let x = 0; x < y; x += 1) {
                [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]]
            }
        }
        if (direction == 1) matrix.forEach(row => row.reverse());
        else matrix.reverse();
    }

    function spawnTetrimino() {
        userPiece.pieceMatrix = createTetrimino(tetriminoArray[nextRandomTetriminoValue]);
        nextRandomTetriminoValue = Random.nextRange(0,7);

        // Start piece in the middle of the board
        userPiece.position.x = (Math.floor(board[0].length / 2)) - (Math.floor(userPiece.pieceMatrix[0].length / 2));
        // Start piece at the top of the board
        userPiece.position.y = 0;
    }

    // Function that draws a matrix with an offset value
    function drawPieceMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value != 0) {
                    context.fillStyle = tetriminoColors[value];
                    context.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    // Function that draws a grid on the tetris board
    function drawGrid() {
        context.strokeStyle = "rgb(255, 255, 255)";
        context.lineWidth = .075;

        context.beginPath();

        for (let i = 0; i < 100; i += 1) {
            context.moveTo(i, 0);
            context.lineTo(i, 20);
        }
        for (let j = 0; j < 200; j += 1) {
            context.moveTo(0, j);
            context.lineTo(10, j);
        }
        context.stroke();
    }

    // Function that draws what the next piece is in the NEXT box
    function drawNextPiece() {
        if (nextRandomTetriminoValue == 0) {
            nextPieceContext.fillStyle = tetriminoColors[1];
            nextPieceContext.fillRect(0, 2, 4, 1);
        }

        else if (nextRandomTetriminoValue == 1) {
            nextPieceContext.fillStyle = tetriminoColors[2];
            nextPieceContext.fillRect(0.5, 1, 1, 1);
            nextPieceContext.fillRect(0.5, 2, 3, 1);
        }

        else if (nextRandomTetriminoValue == 2) {
            nextPieceContext.fillStyle = tetriminoColors[3];
            nextPieceContext.fillRect(2.5, 1, 1, 1);
            nextPieceContext.fillRect(0.5, 2, 3, 1);
        }

        else if (nextRandomTetriminoValue == 3) {
            nextPieceContext.fillStyle = tetriminoColors[4];
            nextPieceContext.fillRect(1, 1, 2, 2);
        }

        else if (nextRandomTetriminoValue == 4) {
            nextPieceContext.fillStyle = tetriminoColors[5];
            nextPieceContext.fillRect(0.5, 2, 2, 1);
            nextPieceContext.fillRect(1.5, 1, 2, 1);
        }

        else if (nextRandomTetriminoValue == 5) {
            nextPieceContext.fillStyle = tetriminoColors[6];
            nextPieceContext.fillRect(1.5, 1, 1, 1);
            nextPieceContext.fillRect(0.5, 2, 3, 1);
        }

        else if (nextRandomTetriminoValue == 6) {
            nextPieceContext.fillStyle = tetriminoColors[7];
            nextPieceContext.fillRect(1.5, 2, 2, 1);
            nextPieceContext.fillRect(0.5, 1, 2, 1);
        }
    }

    function update(elapsedTime) {
        levelDropCounter += elapsedTime;

        //Level drop rate
        if (levelDropCounter > levelDropInterval) {
            levelDrop();
        }

        //Game over
        if (collisionCheck(board, userPiece)) {
            game.showScreen('gameover');
            addHighScore(scoreNumText.getText())
            cancelNextRequest = true;
        }

        // Checks if lines have been cleared and update UI elements
        boardCheck();

        // Increase level and decrease drop interval when 10 lines are cleared
        if (lineCounter >= 10 && levelValue < 10) {
            levelUpSound.play();
            levelValue += 1;
            levelDropInterval -= 100;
            lineCounter -= 10;
        }

        // Win when level 10 is reached
        if (levelValue == 10) { console.log("YOU WIN!!!") }
    }

    function render() {
        graphics.clear();

        // Draw black background for tetris canvas
        context.fillStyle = "Black";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw black background for next piece canvas
        nextPieceContext.fillStyle = "Black";
        nextPieceContext.fillRect(0, 0, canvas.width, canvas.height);
    
        // Draw board and user tetris piece
        drawPieceMatrix(userPiece.pieceMatrix, userPiece.position);
        drawPieceMatrix(board, {x: 0, y: 0});

        // Draw the next piece
        drawNextPiece();

        // Draw the tetris board grid
        drawGrid();

        // Draw all UI text
        scoreText.drawText();
        scoreNumText.drawText();
        levelText.drawText();
        levelNumText.drawText();
        linesText.drawText();
        linesNumText.drawText();
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
        // Initial next piece
        spawnTetrimino();

        // Setting title to rainbow colors
        let str = 'TETRIS'
        let chars = str.split("");
        let result = '';

        result += '<span class = "tetrisColor1">' + chars[0] + '</span>'
        result += '<span class = "tetrisColor2">' + chars[1] + '</span>'
        result += '<span class = "tetrisColor3">' + chars[2] + '</span>'
        result += '<span class = "tetrisColor4">' + chars[3] + '</span>'
        result += '<span class = "tetrisColor5">' + chars[4] + '</span>'
        result += '<span class = "tetrisColor6">' + chars[5] + '</span>'
        
        document.getElementById('game-title').innerHTML = result;

        // Score text object
        scoreText = graphics.Text({
			text: "Score:",
            font: '48px Arial',
            fill: 'rgb(0, 141, 255)',
            pos: {x: 20, y: 20},
            rotation: 0
		}, textContext);
        
        // Score number text object
        scoreNumText = graphics.Text({
            text: 0,
            font: '48px Arial',
            fill: 'rgb(0, 141, 255)',
            pos: {x: 175, y: 20},
            rotation: 0
        }, textContext);

        // Level text object
        levelText = graphics.Text({
			text: "Level:",
            font: '48px Arial',
            fill: 'rgb(0, 141, 255)',
            pos: {x: ((textCanvas.width / 2) - (canvas.width / 2)), y: 20},
            rotation: 0
		}, textContext);
        
        // Level number text object
		levelNumText = graphics.Text({
			text: 0,
            font: '48px Arial',
            fill: 'rgb(0, 141, 255)',
            pos: {x: ((textCanvas.width / 2) + (canvas.width / 5)), y: 20},
            rotation: 0
        }, textContext);

        // Lines text object
        linesText = graphics.Text({
            text: "Lines:",
            font: '48px Arial',
            fill: 'rgb(0, 141, 255)',
            pos: {x: ((textCanvas.width) - (canvas.width)), y: 20},
            rotation: 0
        }, textContext);

        // Lines number text object
        linesNumText = graphics.Text({
            text: 0,
            font: '48px Arial',
            fill: 'rgb(0, 141, 255)',
            pos: {x: ((textCanvas.width) - (canvas.width /3.5)), y: 20},
            rotation: 0
        }, textContext);

        tetrisMusic = sound({
            sound: 'Assets/Sounds/tetrisMusic.wav',
            volume: 0.03
        })

        lineClearedSound = sound({
            sound: 'Assets/Sounds/lineClearedSound.wav',
            volume: 0.03
        })

        levelUpSound = sound ({
            sound: 'Assets/Sounds/levelUpSound.wav',
            volume: 0.05
        })

        myKeyboard.register('Escape', function() {

            cancelNextRequest = true;

            game.showScreen('main-menu');
        })
    };

    function run() {
        lastTimeStamp = performance.now();

        document.addEventListener('keydown', event => {
            if (!controlsList) {
                if (event.code === "ArrowLeft") moveLeft();
                else if (event.code === "ArrowRight") moveRight();
                else if (event.code === "Home") rotatePieceCCW();
                else if (event.code === "PageUp") rotatePieceCW();
                else if (event.code === "ArrowDown") softDrop();
                else if (event.code === "ArrowUp") hardDrop();
                else if (event.code === "KeyP") {
                    if (!musicPlaying) {
                        playMusic();
                    }
                    musicPlaying = true;
                }
            }

            else {
                if (event.code === controlsList[0]) moveLeft();
                else if (event.code === controlsList[1]) moveRight();
                else if (event.code === controlsList[2]) rotatePieceCCW();
                else if (event.code === controlsList[3]) rotatePieceCW();
                else if (event.code === controlsList[4]) softDrop();
                else if (event.code === controlsList[5]) hardDrop();
                else if (event.code === controlsList[6]) {
                    if (!musicPlaying) {
                        playMusic();
                    }
                    musicPlaying = true;
                }

            }
        });

        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.graphics, MyGame.input));
