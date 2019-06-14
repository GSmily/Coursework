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
        
        document.getElementById('id-help').addEventListener(
            'click',
            function() { game.showScreen('help'); });
        
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
