MyGame.screens['controls'] = (function(game) {
    'use strict';

    let controlsListIndex = 0,
        controlsList = JSON.parse(localStorage.getItem('MyGame.controlsList'));

    function addControls(controlsListIndex, controlsEventCode) {
        'use strict';

        if (!controlsList) controlsList = ["ArrowLeft", "ArrowRight", "Home", "PageUp", "ArrowDown", "ArrowUp"];

        if (controlsListIndex == 0) controlsList[0] = controlsEventCode;
        else if (controlsListIndex == 1) controlsList[1] = controlsEventCode;
        else if (controlsListIndex == 2) controlsList[2] = controlsEventCode;
        else if (controlsListIndex == 3) controlsList[3] = controlsEventCode;
        else if (controlsListIndex == 4) controlsList[4] = controlsEventCode;
        else if (controlsListIndex == 5) controlsList[5] = controlsEventCode;
        else if (controlsListIndex == 6) controlsList[6] = controlsEventCode;

        localStorage.setItem('MyGame.controlsList', JSON.stringify(controlsList));
    };

    let keyEvent = function(event) {
        if (controlsListIndex == 0) {
            document.getElementById("moveLeft-button").innerHTML = event.code;
            addControls(controlsListIndex, event.code);
        }

        else if (controlsListIndex == 1) {
            document.getElementById("moveRight-button").innerHTML = event.code;
            addControls(controlsListIndex, event.code);
        }

        else if (controlsListIndex == 2) {
            document.getElementById("rotateCCW-button").innerHTML = event.code;
            addControls(controlsListIndex, event.code);
        }

        else if (controlsListIndex == 3) {
            document.getElementById("rotateCW-button").innerHTML = event.code;
            addControls(controlsListIndex, event.code);
        }

        else if (controlsListIndex == 4) {
            document.getElementById("softDrop-button").innerHTML = event.code;
            addControls(controlsListIndex, event.code);
        }

        else if (controlsListIndex == 5) {
            document.getElementById("hardDrop-button").innerHTML = event.code;
            addControls(controlsListIndex, event.code);
        } 

        else if (controlsListIndex == 6) {
            document.getElementById("playMusic-button").innerHTML = event.code;
            addControls(controlsListIndex, event.code);
        } 

        document.removeEventListener('keyup', keyEvent);
    };

    function initialize() {
        document.getElementById('id-controls-back').addEventListener(
            'click',
            function() { location.reload(); }
        );

        document.getElementById('moveLeft-button').addEventListener(
            'click',
            function() { 
                controlsListIndex = 0

                document.getElementById("moveLeft-button").innerHTML = "Press Key..."

                document.addEventListener('keyup', keyEvent);
            }
        );

        document.getElementById('moveRight-button').addEventListener(
            'click',
            function() { 
                controlsListIndex = 1

                document.getElementById("moveRight-button").innerHTML = "Press Key..."

                document.addEventListener('keyup', keyEvent);
            }
        );

        document.getElementById('rotateCCW-button').addEventListener(
            'click',
            function() { 
                controlsListIndex = 2

                document.getElementById("rotateCCW-button").innerHTML = "Press Key..."

                document.addEventListener('keyup', keyEvent);
            }
        );

        document.getElementById('rotateCW-button').addEventListener(
            'click',
            function() { 
                controlsListIndex = 3

                document.getElementById("rotateCW-button").innerHTML = "Press Key..."

                document.addEventListener('keyup', keyEvent);
            }
        );

        document.getElementById('softDrop-button').addEventListener(
            'click',
            function() { 
                controlsListIndex = 4

                document.getElementById("softDrop-button").innerHTML = "Press Key..."

                document.addEventListener('keyup', keyEvent);
            }
        );

        document.getElementById('hardDrop-button').addEventListener(
            'click',
            function() { 
                controlsListIndex = 5

                document.getElementById("hardDrop-button").innerHTML = "Press Key..."

                document.addEventListener('keyup', keyEvent);
            }
        );

        document.getElementById('playMusic-button').addEventListener(
            'click',
            function() { 
                controlsListIndex = 6

                document.getElementById("playMusic-button").innerHTML = "Press Key..."

                document.addEventListener('keyup', keyEvent);
            }
        );
    }
    
    function run() {}
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
