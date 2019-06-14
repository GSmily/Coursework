MyGame.screens['main-menu'] = (function(game) {
    'use strict';
    
    function initialize() {
        //
        // Setup each of menu events for the screens
        document.getElementById('id-new-game').addEventListener(
            'click',
            function() {game.showScreen('game-play'); });
        
        document.getElementById('id-high-scores').addEventListener(
            'click',
            function() { 
                let highScores = JSON.parse(localStorage.getItem('MyGame.highScores'));
                if (!highScores) highScores = [];
                document.getElementById("first").innerHTML = 
                    highScores[0] === undefined ? 0 : highScores[0];
                document.getElementById("second").innerHTML = 
                    highScores[1] === undefined ? 0 : highScores[1];
                document.getElementById("third").innerHTML = 
                    highScores[2] === undefined ? 0 : highScores[2];
                document.getElementById("fourth").innerHTML = 
                    highScores[3] === undefined ? 0 : highScores[3];
                document.getElementById("fifth").innerHTML = 
                    highScores[4] === undefined ? 0 : highScores[4];
                game.showScreen('high-scores'); });
        
        document.getElementById('id-controls').addEventListener(
            'click',
            function() { 
                let controlsList = JSON.parse(localStorage.getItem('MyGame.controlsList'));
                let controlsFunction = ["Move Piece Left: ", "Move Piece Right: ", "Rotate Piece Counter-Clockwise: ", "Rotate Piece Clockwise: ", "Soft Drop: ", "Hard Drop: ", "Play Music: "]
                if (!controlsList) controlsList = ["ArrowLeft", "ArrowRight", "Home", "PageUp", "ArrowDown", "ArrowUp", "KeyP"];

                document.getElementById("moveLeft").innerHTML = controlsFunction[0];
                document.getElementById("moveRight").innerHTML = controlsFunction[1];
                document.getElementById("rotateCCW").innerHTML = controlsFunction[2];
                document.getElementById("rotateCW").innerHTML = controlsFunction[3];
                document.getElementById("softDrop").innerHTML = controlsFunction[4];
                document.getElementById("hardDrop").innerHTML = controlsFunction[5];
                document.getElementById("playMusic").innerHTML = controlsFunction[6];

                document.getElementById("moveLeft-button").innerHTML = controlsList[0];
                document.getElementById("moveRight-button").innerHTML = controlsList[1];
                document.getElementById("rotateCCW-button").innerHTML = controlsList[2];
                document.getElementById("rotateCW-button").innerHTML = controlsList[3];
                document.getElementById("softDrop-button").innerHTML = controlsList[4];
                document.getElementById("hardDrop-button").innerHTML = controlsList[5];
                document.getElementById("playMusic-button").innerHTML = controlsList[6];

                game.showScreen('controls'); });
        
        document.getElementById('id-credits').addEventListener(
            'click',
            function() { game.showScreen('credits'); });
    }
    
    function run() {}
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
