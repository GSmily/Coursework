MyGame.graphics = (function() {
    let canvas = document.getElementById('player-canvas');
    let context = canvas.getContext('2d');

    // Highscore values
    let highScores = [];
    for (let i = 0; i < 5; i++) {
        highScores.push(0);
    }

    let is5x5 = false;
    let is10x10 = false;
    let is15x15 = false;
    let is20x20 = false;

    // Sets up a 5x5 maze
    function fiveByFive() {
        if (!is5x5) {
            startUp();

            is5x5 = true;
            is10x10 = false;
            is15x15 = false;
            is20x20 = false;

            constructMaze(5, 5);
        }
    }

    // Sets up a 10x10 maze
    function tenByTen() {
        if (is10x10 == false) {
            startUp();

            is5x5 = false;
            is10x10 = true;
            is15x15 = false;
            is20x20 = false;

            constructMaze(10, 10);
        }
    }

    // Sets up a 15x15 maze
    function fifteenByFifteen() {
        if (is15x15 == false) {
            startUp();

            is5x5 = false;
            is10x10 = false;
            is15x15 = true;
            is20x20 = false;

            constructMaze(15, 15);
        }
    }

    // Sets up a 20x20 maze
    function twentyByTwenty() {
        if (is20x20 == false) {
            startUp();

            is5x5 = false;
            is10x10 = false;
            is15x15 = false;
            is20x20 = true;

            constructMaze(20, 20);
        }
    }

    // Helper start up function when creating mazes
    function startUp() {
        clearMaze();
        clearBread();
        clearPath();

        score = 0;
        check = 0;
        totalTime = 0;
        breadArray = [];
        pathArray = [];

        // Hide the bread canvas and path canvas
        document.getElementsByClassName('bread')[0].style.visibility = 'hidden';
        document.getElementsByClassName('path')[0].style.visibility = 'hidden';

        bPressed = false;
        pPressed = false;
        hPressed = false;
        gameOver = false;
    }

    // Function that constructs the maze using the Maze class
    function constructMaze(x, y) {
        mazeObject = new Maze(x, y);

        mazeArray = mazeObject.maze;

        mazeX = x;
        mazeY = y;

        // Find shortest path and add scoring along path
        let path = findPath(0, 0, array = []);

        for (let i=0; i < path.length; i++) {
            let pathX = path[i][0];
            let pathY = path[i][1];

            mazeArray[pathX][pathY].score = 5;
            mazeArray[pathX][pathY].path = true;
            pathArray.push([pathX,pathY]);
        }

        // Starting point score
        mazeArray[0][0].score = 0;

        // Ending point score
        mazeArray[x - 1][y - 1].score = 5;
        
        displayMaze(x, y, mazeArray); 
    }

    // Function that draws the maze
    function displayMaze(x, y, maze) {
        canvas = document.getElementById('maze-canvas');
        context = canvas.getContext('2d');
        let width = canvas.width;
        let height = canvas.height;
        let cellSize = width / x;

        // Green starting cell
        context.fillStyle = 'rgba(0, 200, 0, 0.5)';
        context.fillRect(0, 0, cellSize, cellSize);
        
        // Red ending cell
        context.fillStyle = 'rgba(200, 0, 0, 0.5)';
        context.fillRect(width - cellSize, height - cellSize, cellSize, cellSize);

        // Loop through each maze cell
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                let columnCoord = i * cellSize;
                let rowCoord = j * cellSize;

                if(!maze[i][j].top) {
                    context.beginPath();
                    context.strokeStyle = '#FFFFFF';
                    context.moveTo(columnCoord, rowCoord + cellSize);
                    context.lineTo(columnCoord + cellSize, rowCoord + cellSize);
                    context.stroke();
                }
                if(!maze[i][j].bottom) {
                    context.beginPath();
                    context.strokeStyle = '#FFFFFF';
                    context.moveTo(columnCoord + cellSize, rowCoord);
                    context.lineTo(columnCoord, rowCoord);
                    context.stroke();
                } 
                if(!maze[i][j].left) {
                    context.beginPath();
                    context.strokeStyle = '#FFFFFF';
                    context.moveTo(columnCoord, rowCoord);
                    context.lineTo(columnCoord, rowCoord + cellSize);
                    context.stroke();
                }
                if(!maze[i][j].right) {
                    context.beginPath();
                    context.strokeStyle = '#FFFFFF';
                    context.moveTo(columnCoord + cellSize, rowCoord + cellSize);
                    context.lineTo(columnCoord + cellSize, rowCoord);
                    context.stroke();
                }
            }
        }
    }

    // Texture function that has multiple inner functions
    function Texture() {
        let texture = {};
        let cell_size = 0;
        let playerImage = new Image();
        let breadImage = new Image();
        let pathImage = new Image();

        playerImage.src = 'ship.png';
        breadImage.src = 'chewy.png';
        pathImage.src = 'rebel.png';

        // Initializes the texture based on maze size
        texture.initialize = function(cellSize) {
            // 5x5 maze
            if(cellSize == 150) {
                width = cellSize;
                height = cellSize - 50;
            }
            // 10x10 maze
            else if(cellSize == 75) {
                width = cellSize;
                height = cellSize - 25;
            }
            // 15x15 maze
            else if(cellSize == 50) {
                width = cellSize;
                height = cellSize - 12.5;
            }
            // 20x20 maze
            else {
                width = cellSize;
                height = cellSize - 6.25;
            }
            
            cell_size = cellSize;

            center.x = 0;
            center.y = 0;

            playerX = center.x / cellSize;
            playerY = center.y / cellSize;
        }

        // Update function for textures
        texture.update = function(elapsedTime) {
            // Start timer
            totalTime += elapsedTime

            // Push player position to the bread array
            breadArray.push([playerX, playerY])

            // Display score UI
            document.getElementById("currentScore").innerHTML = "Score: " + score + " points"

            // Display counting timer UI if game is running
            if (gameOver == false) {
                document.getElementById("currentTime").innerHTML = "Time: " + (totalTime/1000).toFixed(0) + " (s)"
            }

            // Display highscores
            document.getElementById("first").innerHTML = "1st: " + getHighScores(0) + " points";
            document.getElementById("second").innerHTML = "2nd: " + getHighScores(1) + " points";
            document.getElementById("third").innerHTML = "3rd: " + getHighScores(2) + " points";
            document.getElementById("fourth").innerHTML = "4th: " + getHighScores(3) + " points";
            document.getElementById("fifth").innerHTML = "5th: " + getHighScores(4) + " points";
            
            // If player position matches the maze's end
            if (mazeObject.maze[playerX][playerY].end == true) {
                gameOver = true;

                // Re-hide bread and path 
                document.getElementsByClassName('bread')[0].style.visibility = 'hidden';
                document.getElementsByClassName('path')[0].style.visibility = 'hidden';

                // Check to stop timer when it's game over
                if (check <= 0) {
                    setHighScores();
                    document.getElementById("currentTime").innerHTML = "Time: " + (totalTime/1000).toFixed(0) + " (s)"
                    check += 1;
                }
                // Reset timer time for other maze runs
                totalTime = 0;
            }

            // Always be drawing bread to the bread-canvas
            canvas = document.getElementById('bread-canvas');
            context = canvas.getContext('2d');

            for (let i = 0; i < breadArray.length; i++){
                context.drawImage(breadImage,
                    breadArray[i][0] * cell_size + cell_size / 6,
                    breadArray[i][1] * cell_size + cell_size / 6,
                    cell_size / 1.5,
                    cell_size / 1.5);
            }
        }

        // Player functionality
        texture.displayPlayer = function() {
            canvas = document.getElementById('player-canvas');
            context = canvas.getContext('2d');
            context.save();

            // Draw the player based on the size of the maze

            // 5x5 Maze
            if (is5x5) {
                context.drawImage(playerImage, center.x, center.y + 20, width, height);
            }
            // 10x10 Maze
            else if (is10x10) {
                context.drawImage(playerImage, center.x, center.y + 10, width, height);
            }
            // 15x15 Maze
            else if (is15x15) {
                context.drawImage(playerImage, center.x, center.y + 5, width, height);
            }
            // 20x20 Maze
            else if (is20x20) {
                context.drawImage(playerImage, center.x, center.y + 2.5, width, height);
            }
            context.restore();
        }

        // Move the player up
        texture.goUp = function() {
            // Game over check so you can't move when the game is over
            if(gameOver == false) {
                // Wall collision check
                if(center.y - cell_size >= 0 && (mazeArray[playerX][playerY - 1].top || mazeArray[playerX][playerY].bottom)){
                    center.y -= cell_size;
                    playerY -= 1;
    
                    // Add to the score what the cell's score is worth
                    score += mazeArray[playerX][playerY].score;
                    // Set the cell's score to zero so you can't get infinite points
                    mazeArray[playerX][playerY].score = 0;
                }
            }
        }

        // Move the player down
        texture.goDown = function() {
            // Game over check so you can't move when the game is over
            if(gameOver == false) {
                // Wall collision check
                if((center.y + cell_size) + cell_size <= 750 && (mazeArray[playerX][playerY + 1].bottom || mazeArray[playerX][playerY].top) ) {
                    center.y += cell_size;
                    playerY += 1;
    
                    // Add to the score what the cell's score is worth
                    score += mazeArray[playerX][playerY].score;
                    // Set the cell's score to zero so you can't get infinite points
                    mazeArray[playerX][playerY].score = 0;
                }
            }
        }

        // Move the player left
        texture.goLeft = function() {
            // Game over check so you can't move when the game is over
            if(gameOver == false) {
                // Wall collision check
                if(center.x - cell_size >= 0 && (mazeArray[playerX][playerY].left || mazeArray[playerX - 1][playerY].right)) {
                    center.x -= cell_size;
                    playerX -= 1;

                    // Add to the score what the cell's score is worth
                    score += mazeArray[playerX][playerY].score;
                    // Set the cell's score to zero so you can't get infinite points
                    mazeArray[playerX][playerY].score = 0;
                }
            }
        }
  
        // Move the player right
        texture.goRight = function() {
            // Game over check so you can't move when the game is over
            if(gameOver == false) {
                // Wall collision check
                if((center.x + cell_size) + cell_size <= 750 && (mazeArray[playerX][playerY].right || mazeArray[playerX + 1][playerY].left) ) {
                    center.x += cell_size;
                    playerX += 1;

                    // Add to the score what the cell's score is worth
                    score += mazeArray[playerX][playerY].score;
                    // Set the cell's score to zero so you can't get infinite points
                    mazeArray[playerX][playerY].score = 0;
                }
            }
        }
  
        // Bread functionality
        texture.displayBread = function() {
            // Game over check so you can't display bread when the game is over
            if (gameOver == false) {
                if (bPressed == false) {
                    // Show bread-canvas
                    document.getElementsByClassName('bread')[0].style.visibility = 'initial';
                    bPressed = true
                }
                else {
                    // Hide bread-canvas
                    document.getElementsByClassName('bread')[0].style.visibility = 'hidden';
                    bPressed = false;
                }
            }
        }
  
        // Path functionality
        texture.displayPath = function() {
            // Game over check so you can't display the path when the game is over
            if (gameOver == false) {
                canvas = document.getElementById('path-canvas');
                context = canvas.getContext('2d');

                hPressed = false;
                clearPath();
                
                // Draw the path
                for (let i=0; i < pathArray.length; i++ ){
                    context.drawImage(pathImage,
                        pathArray[i][0] * cell_size + cell_size / 4,
                        pathArray[i][1] * cell_size + cell_size / 4,
                        cell_size / 2,
                        cell_size / 2);
                }

                if (pPressed == false) {
                    // Deduct score
                    score -= 20;
                    // Show path-canvas
                    document.getElementsByClassName('path')[0].style.visibility = 'initial';
                    pPressed = true
                }
                else {
                    // Hide path-canvas
                    document.getElementsByClassName('path')[0].style.visibility = 'hidden';
                    pPressed = false
                }
            }
        }

        // Hint functionality
        texture.displayHint = function() {
            // Game over check so you can't display a hint when the game is over
            if (gameOver == false) {
                canvas = document.getElementById('path-canvas');
                context = canvas.getContext('2d');
                
                pPressed = false;
                clearPath();
                
                // Only show the closest seen hint to the player
                for(let i = 0; i < breadArray.length; i++) {
                    for(let j = 0; j < pathArray.length; j++) {
                        if(breadArray[i][0] == pathArray[j][0] && breadArray[i][1] == pathArray[j][1]) {
                            pathArray.splice(j, 1);
                        }
                    }
                }
    
                // Draw the hint
                context.drawImage(pathImage,
                    pathArray[0][0] * cell_size + cell_size / 4,
                    pathArray[0][1] * cell_size + cell_size / 4,
                    cell_size / 2,
                    cell_size / 2);
    
                if (hPressed == false) {
                    // Deduct score
                    score -= 5;
                    // Show path-canvas
                    document.getElementsByClassName('path')[0].style.visibility = 'initial';
                    hPressed = true
                }
                else {
                    // Hide and clear path-canvas
                    context.clearRect(0,0, canvas.width, canvas.height);
                    document.getElementsByClassName('path')[0].style.visibility = 'hidden';
                    hPressed = false
                }
            }
        }

        return texture;
    }

    // Clear the maze context
    function clearMaze() {
        canvas = document.getElementById('maze-canvas');
        context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Clear the player context
    function clearPlayer(){
        canvas = document.getElementById('player-canvas');
        context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    // Clear the bread context
    function clearBread(){
        canvas = document.getElementById('bread-canvas');
        context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Clear the path context
    function clearPath(){
        canvas = document.getElementById('path-canvas');
        context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Function that finds the shortest path to the end
    function findPath(x, y, path = []){
        // Starting point push
        path.push([x, y]);

        // Set the starting point as seen
        mazeArray[x][y].seen = true;
    
        // If the path makes it to the end of the maze, return the path
        if (mazeX - 1 == x && mazeY - 1 == y){
            path.push([x, y]);
            return path;
        }
    
        let topPath = (function() {
            if (mazeArray[x][y].top && mazeArray[x][y + 1].bottom){
                if(!mazeArray[x][y + 1].seen){
                    mazeArray[x][y + 1].seen = true;
                    return findPath(x, y + 1, path);
                } 
                else {
                    return false;
                }
            } 
        }());
    
        let bottomPath = (function() {
            if (mazeArray[x][y].bottom && mazeArray[x][y - 1].top){
                if(!mazeArray[x][y - 1].seen){
                    mazeArray[x][y - 1].seen = true;
                    return findPath(x, y - 1, path);
                } 
                else {
                    return false;
                }
            }
        }());

        let leftPath = (function() {
            if (mazeArray[x][y].left && mazeArray[x - 1][y].right){
                if(!mazeArray[x - 1][y].seen){
                    mazeArray[x - 1][y].seen = true;
                    return findPath(x - 1, y, path);
                }
                else {
                    return false;
                }
            }
        }());
    
        let rightPath = (function() {
            if (mazeArray[x][y].right && mazeArray[x + 1][y].left){
                if(!mazeArray[x + 1][y].seen){
                    mazeArray[x + 1][y].seen = true;
                    return findPath(x + 1, y, path);
                }
                else {
                    return false;
                }
            }
        }());
    
        // Hit a dead end so restart the path
        if (!topPath && !bottomPath && !leftPath && !rightPath ) {
            path.splice(path.indexOf([x, y]));
        }
        // Return the completed path
        else {
            return (topPath || bottomPath || leftPath || rightPath);
        }
    }

    // When new maze is clicked
    function newGame() {
        if (is5x5) {
            startUp()
            constructMaze(5, 5);
            Texture().initialize(150);
        }
        else if (is10x10) {
            startUp()
            constructMaze(10, 10);
            Texture().initialize(75);
        }
        else if (is15x15) {
            startUp()
            constructMaze(15, 15);
            Texture().initialize(50);
        }
        else if (is20x20) {
            startUp()
            constructMaze(20, 20);
            Texture().initialize(37.5);
        }
        else {
            console.log("Please select a maze size to start.")
        }
    }

    // Return highscore at a position
    function getHighScores(position) {
        return highScores[position]
    }

    // Set the highscore array to be sorted
    function setHighScores() {
        highScores.push(score);
        highScores.sort(function(a,b){return b - a});
    }

    // Return game over status
    function getGameOver() {
        return gameOver;
    }

    function getHPressed() {
        return hPressed;
    }

    let api = {
        fiveByFive: fiveByFive,
        tenByTen: tenByTen,
        fifteenByFifteen: fifteenByFifteen,
        twentyByTwenty: twentyByTwenty,
        constructMaze: constructMaze,
        Texture: Texture,
        clearPlayer: clearPlayer,
        newGame: newGame,
        getGameOver: getGameOver,
        getHPressed: getHPressed
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