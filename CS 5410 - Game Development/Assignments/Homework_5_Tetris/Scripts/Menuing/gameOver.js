MyGame.screens['gameover'] = (function(game) {
	'use strict';
	
    function initialize() {
        document.getElementById('id-gameover-back').addEventListener(
            'click',
            function() { location.reload(); });
    }
	
	function run() {}
	
	return {
		initialize : initialize,
		run : run
	};
}());
