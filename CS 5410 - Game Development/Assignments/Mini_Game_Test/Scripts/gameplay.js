MyGame.screens['game-play'] = (function(game, graphics, input) {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    let surface = [
        { x: MyGame.screenWidth * 0.00, y: MyGame.screenHeight, safe: false },
        { x: MyGame.screenWidth, y: MyGame.screenHeight, safe: false },
        { x: MyGame.screenWidth * 0.80, y: MyGame.screenHeight * 0.55, safe: false },
        { x: MyGame.screenWidth * 0.70, y: MyGame.screenHeight * 0.90, safe: true },
        { x: MyGame.screenWidth * 0.40, y: MyGame.screenHeight * 0.90, safe: true },
        { x: MyGame.screenWidth * 0.25, y: MyGame.screenHeight * 0.75, safe: false },
        { x: MyGame.screenWidth * 0.00, y: MyGame.screenHeight, safe: false },
    ];

    let lastTimeStamp = performance.now(), 
        cancelNextRequest = true,
        myKeyboard = input.Keyboard(),
        highScores = JSON.parse(localStorage.getItem('MyGame.highScores')),
        fuelText = null,
        fuelNumberText = null,
        speedText = null,
        speedNumberText = null,
        angleText = null,
        angleNumberText = null,
        betterLuckText = null,
        betterLuck = false,
        safeLanding = false,
        done = false,
        safeLandingText = null,
        lander = null,
        landerThrustParticles = null;

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    };

    function addValue(score) {
        'use strict';

        if (!highScores) highScores = [0, 0, 0, 0, 0];
        highScores.push(score);
        highScores.sort((a, b) => b - a);
        highScores = highScores.slice(0, 5);

        localStorage.setItem('MyGame.highScores', JSON.stringify(highScores));
    };

    function drawSurface() {
        context.save();
        context.beginPath();

        context.moveTo(surface[0].x, surface[0].y)
        for(let i = 1; i < surface.length; i += 1) context.lineTo(surface[i].x, surface[i].y)
        
        context.closePath();

        context.fillStyle = 'hsl(0, 0%, 18%)';
        context.fill();
    
        context.strokeStyle = 'hsl(0, 0%, 98%)';
        context.lineWidth = 2;
        context.stroke();
    
        context.restore();
    }

    function update(elapsedTime) {
        landerThrustParticles.updateParticle(elapsedTime/1000);

        if(done) return
        lander.updateLanderPosition();


        if (lander.getThrustStatus()) {
            landerThrustParticles.updateParticlePosition(lander.getLanderThrusterPosition().x, lander.getLanderThrusterPosition().y);
            for (let i = 0; i < 2; i++) {
                landerThrustParticles.createParticle(lander.getRotation());
            }
            lander.setThrustStatus(false);
        }

        let collided = lander.detectCollision(surface)
        if(collided[0]) {
            let win = collided[1]
            if (win && lander.getSpeed() < 2 && !(lander.getAngle() >= 5 && lander.getAngle() <= 355)) {
                lander.win = true;
                addValue(lander.getFuel().toFixed(0));
                safeLanding = true;
                cancelNextRequest = true;
            }
            else {
                landerThrustParticles.updateParticlePosition(lander.getPosition().x, lander.getPosition().y)
                for (let i = 0; i < 150; i++) landerThrustParticles.createExplosionParticle();
                done = true;
                betterLuck = true;
                lander.deleteLander();
            }
        }

        fuelNumberText.setText(lander.getFuel().toFixed(0));

        speedNumberText.setText(lander.getSpeed() + " m/s");
        speedText.updateSpeedColor(lander.getSpeed());
        speedNumberText.updateSpeedColor(lander.getSpeed());

        angleNumberText.setText(lander.getAngle()  + ' °');
        angleText.updateAngleColor(lander.getRotation());
        angleNumberText.updateAngleColor(lander.getRotation());
    }

    function render() {
        graphics.clear();

        lander.draw();

        landerThrustParticles.drawParticle();

        drawSurface();

        if(betterLuck) betterLuckText.drawText();
        if(safeLanding) safeLandingText.drawText();

        fuelText.drawText();
        fuelNumberText.drawText();
        speedText.drawText();
        speedNumberText.drawText();
        angleText.drawText();
        angleNumberText.drawText();
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
        lander = graphics.Texture({
            image: 'Assets/lander-1.png',
            height : 56,
            width: 75,
            center: { x: MyGame.screenWidth / 4, y: MyGame.screenHeight / 10 },
            dx: 0,
            dy: 0,
            rotation: 3 * (Math.PI / 2),
            rotateRate: 0.0015,
            radius: 30,
            thrustRate: 0.00000005,
            fuel: 20000,
            thrusting: false,
            win: false
        });

        landerThrustParticles = graphics.Texture({
            image: 'Assets/fire.png',
            center: {x: lander.getLanderThrusterPosition().x, y: lander.getLanderThrusterPosition().y},
            size: {mean: 10, std: 4},
            speed: {mean: 70, std: 2},
            lifetime: {mean: 2, std: 1}
        })

        fuelText = graphics.Text({
			text: "Fuel:",
            font: '48px Arial',
            fill: 'rgb(0, 255, 0)',
            pos: {x: 20, y: 20},
            rotation: 0
		});
        
        fuelNumberText = graphics.Text({
            text: 0,
            font: '48px Arial',
            fill: 'rgb(0, 255, 0)',
            pos: {x: 175, y: 20},
            rotation: 0
        });

        speedText = graphics.Text({
			text: "Speed:",
            font: '48px Arial',
            fill: 'rgb(0, 255, 0)',
            pos: {x: 20, y: 80},
            rotation: 0
		});
		
		speedNumberText = graphics.Text({
			text: 1,
            font: '48px Arial',
            fill: 'rgb(0, 255, 0)',
            pos: {x: 175, y: 80},
            rotation: 0
        });

        angleText = graphics.Text({
			text: "Angle:",
            font: '48px Arial',
            fill: 'rgb(255, 255, 255)',
            pos: {x: 20, y: 140},
            rotation: 0
		});
		
		angleNumberText = graphics.Text({
			text: 1,
            font: '48px Arial',
            fill: 'rgb(255, 255, 255)',
            pos: {x: 175, y: 140},
            rotation: 0
        });

        betterLuckText = graphics.Text({
			text: "Better luck next time...",
            font: '64px Arial',
            fill: 'rgb(255, 255, 255)',
            pos: {x: MyGame.screenWidth / 3, y: MyGame.screenHeight / 3},
            rotation: 0
        });
        
        safeLandingText = graphics.Text({
			text: "Safe Landing!!!",
            font: '64px Arial',
            fill: 'rgb(255, 255, 255)',
            pos: {x: MyGame.screenWidth / 3, y: MyGame.screenHeight / 3},
            rotation: 0
		});

        // Controls
        myKeyboard.register('ArrowUp', lander.thrustLander);
        myKeyboard.register('ArrowLeft', lander.rotateLeft);
        myKeyboard.register('ArrowRight', lander.rotateRight);
        myKeyboard.register('Escape', function() {

            cancelNextRequest = true;

            game.showScreen('main-menu');
        })
    };

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.graphics, MyGame.input));