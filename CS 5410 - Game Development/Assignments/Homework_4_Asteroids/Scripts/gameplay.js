MyGame.screens['game-play'] = (function(game, graphics, input) {
    'use strict';

    let lastTimeStamp = performance.now(), 
        cancelNextRequest = true,
        myKeyboard = input.Keyboard(),
        highScores = JSON.parse(localStorage.getItem('MyGame.highScores')),
        ship = null,
        isShipHit = false,
        dead = false,
        isShipInvincible = false,
        torpedo = null,
        torpedoCount = 0,
        torpedoSound = null,
        warpReady = false,
        warpReadyText = null,
        warpCounter = 0,
        shipWarpSound = null,
        shipThrustParticles = null,
        shipSmokeExplosionParticles = null,
        shipFireExplosionParticles = null,
        shipExplosionSound = null,
        enemyKlingonShip = null,
        klingonCannon = null,
        klingonActive = false,
        enemyBorgShip = null,
        borgCannon = null,
        enemyShipFireExplosionParticles = null,
        enemyExplosionSound = null,
        borgActive = false,
        enemyCannonArray = [],
        enemyArray = [],
        enemyShipHit = false,
        asteroid = null,
        asteroidHit = false,
        asteroidExplosionParticles = null,
        asteroidExplosionSound = null,
        largeAsteroidScore = 20,
        mediumAsteroidScore = 50,
        smallAsteroidScore = 100,
        klingonShipScore = 200,
        borgShipScore = 1000,
        asteroidCount = 0,
        asteroidArray = [],
        startingLives = 3,
        extraLife = 10000,
        lifeArray = [],
        livesText = null,
        livesPicture = null,
        levelScore = 0,
        scoreText = null,
        scoreNumberText = null,
        levelText = null,
        levelNumText = null,
        warpText = null,
        wait = 0,
        invincibleCounter = 0,
        backgroundMusic = null,
        backgroundAmbiance = null;

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

    // Function that checks if two items have collided
    let checkCollision = function(item1, item2){
		let item1x = item1.getX();
		let item1y = item1.getY();
		let item2x = item2.getX();
        let item2y = item2.getY();
        
        let item1Radius = item1.getRadius();
		let item2Radius = item2.getRadius();
	
		let distanceX =  item1x - item2x;
		let distanceY = item1y - item2y;
		
		let distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
		
		return (distance <= (item1Radius + item2Radius));
    };

    // Helper boolean function that returns if a coord is safe to warp to
    let warpSafety = function(x, y) {
        let safeRadius = 400;
        let isWarpSafe = false;
        
		for(let i = 0; i < asteroidArray.length; i++){
			let xDistance = x - asteroidArray[i].getX();
			let yDistance = y - asteroidArray[i].getY();
            isWarpSafe = ((safeRadius + asteroidArray[i].getRadius()) <
                Math.sqrt((xDistance*xDistance) + (yDistance*yDistance)));
        }
        
		return isWarpSafe;
    };
    
    // Warp function that safely teleports the ship to a random location
    let warp = function() {
        if(warpReady && !dead) {
            shipWarpSound.play();
			let x = Random.nextRange(0, MyGame.screenWidth); 
			let y = Random.nextRange(0, MyGame.screenHeight);
	
			if(warpSafety(x, y)){
				ship.moveTo(x, y);
            }
            
			else {
				x = Random.nextRange(0, MyGame.screenWidth); 
				y = Random.nextRange(0, MyGame.screenHeight);
				warp();
            }
            
            warpCounter = 0;
			warpReady = false;
        }
    };

    // Explode the ship
    let explodeShip = function() {
        shipExplosionSound.play();

        dead = true;

        lifeArray.pop();
        // If 0 lives remaining
        if(lifeArray.length == 0) {
            //Show Game Over screen
            addValue(scoreNumberText.getText())
            game.showScreen('gameover');
			cancelNextRequest = true;
        }

        // Update particles
        shipSmokeExplosionParticles.updateParticlePosition(ship.getX(), ship.getY());
        shipFireExplosionParticles.updateParticlePosition(ship.getX(), ship.getY());
        
        // Create particles
        for(let i = 0; i < 150; i++){
			shipSmokeExplosionParticles.createParticle();
			shipFireExplosionParticles.createParticle();

            isShipHit = true;
			isShipInvincible = true;
			ship.isShipHit();
        }
    };

    let shootTorpedo = function() {
        if (!dead) {
            torpedo.updateProjectilePosition({x: ship.getCannonPosition().x,
                y: ship.getCannonPosition().y}, ship.getRotation());
            torpedoCount += 1;

            if(torpedoCount == 10){
                torpedoSound.play();
                torpedo.createProjectile();
                torpedoCount = 0;
            }
        }
    };

    function update(elapsedTime) {
        // Update asteroid position
        for(let i = 0; i < asteroidArray.length; i++){
            asteroidArray[i].asteroidMovement(elapsedTime);
        };
        
        asteroidHit = torpedo.findProjectile(asteroidArray);
        if(asteroidHit.hit){
			asteroidExplosionSound.play();
			let x = asteroidHit.x, 
				y = asteroidHit.y,
                size = asteroidHit.size;
                
			asteroidExplosionParticles.updateParticlePosition(asteroidHit.x, asteroidHit.y);

			asteroidHit = false;
			
			//add new asteroids
			//size 3 asteroids split into 3 smaller ones
			if(size == 3){
				scoreNumberText.updateScore(largeAsteroidScore);
                levelScore += 20;
                asteroidExplosionParticles.setParticleSpeed(100, 10);
                asteroidExplosionParticles.setParticleSize(15, 5);
				for(let i = 0; i < 3; i++){
					asteroidArray.push(graphics.Texture({
								image : 'Assets/Asteroid.png',
                                height : 75,
                                width : 75,
                                center : { x : x, y : y },
                                size : 2,
                                rotation : 0,
                                rotationRate : 4,
                                direction : Random.nextRange(1,5),
								moveRate : Math.abs(Random.nextGaussian(50, 10))
							})
						);
				}
			}
			//size 2 asteroids split into 4 smaller ones
			if(size == 2){
				scoreNumberText.updateScore(mediumAsteroidScore);
                levelScore += 50;
                asteroidExplosionParticles.setParticleSpeed(75, 10);
                asteroidExplosionParticles.setParticleSize(10, 3);
				for(let i = 0; i < 4; i++){
					asteroidArray.push(graphics.Texture( {
                                image : 'Assets/Asteroid.png',
                                height : 37.5,
                                width : 37.5,
								center : { x : x, y : y },
                                size : 1,
                                rotation : 0,
                                rotationRate : 6,
                                direction : Random.nextRange(1,5),
								moveRate : Math.abs(Random.nextGaussian(60, 10))
							})
						);
				}
			}
			//add score for smaller size
			if(size == 1){
                asteroidExplosionParticles.setParticleSpeed(25, 5);
                asteroidExplosionParticles.setParticleSize(5, 1);
				scoreNumberText.updateScore(smallAsteroidScore);
				levelScore += 100;
            }
            
            for(let i = 0; i < 20; i++)
                asteroidExplosionParticles.createParticle();
        }

        asteroidExplosionParticles.updateParticle(elapsedTime/1000);

        enemyShipHit = torpedo.enemyShipHit(enemyArray, enemyCannonArray);
        if(enemyShipHit.hit) {
            if(enemyShipHit.type == 'klingon') {
                scoreNumberText.updateScore(klingonShipScore);
                levelScore += 200;
            }
            else if (enemyShipHit.type == 'borg') {
                scoreNumberText.updateScore(borgShipScore);
                levelScore += 1000;
            }

            enemyExplosionSound.play();
            enemyShipFireExplosionParticles.updateParticlePosition(enemyShipHit.x, enemyShipHit.y);
            for(let i = 0; i < 100; i++)
                enemyShipFireExplosionParticles.createParticle();
            enemyShipHit = false;
        }

        enemyShipFireExplosionParticles.updateParticle(elapsedTime/1000);

        // Level compleated when all asteroids and enemies are gone
        if(asteroidArray.length == 0 && enemyArray.length == 0) {
			levelNumText.addLevel();
			levelScore = 0;
            klingonActive = false;
            borgActive = false;
			asteroidCount += 1;
			for(let i = 0; i < asteroidCount; i++){
				asteroidArray.push(
					asteroid = graphics.Texture({
                        image : 'Assets/Asteroid.png',
                        center : { x : Random.nextRange(0, MyGame.screenWidth), y : MyGame.screenHeight },
                        width : 125,
                        height : 125,
                        size : 3,
                        rotation : 0,
                        moveRate : Math.abs(Random.nextGaussian(40, 10)),
                        rotationRate : 2,
                        direction : Random.nextRange(1,5)
					})
				);
			}
        };
        
        if(!isShipHit){
			for(let i = 0; i < asteroidArray.length; i++){
				if(checkCollision(ship, asteroidArray[i]))
                    explodeShip();
            }
            for(let j = 0; j < enemyArray.length; j++) {
                if(checkCollision(ship, enemyArray[j]))
                    explodeShip()
                if(klingonCannon.enemyHitPlayerShip(ship).isShipHit || borgCannon.enemyHitPlayerShip(ship).isShipHit)
                    explodeShip();
			}
		}
		else{
			wait += elapsedTime;
			invincibleCounter += elapsedTime;

			if(wait >= 1000 && isShipInvincible){
				ship.reset(elapsedTime);
                isShipInvincible = false;
                dead = false;
			}
			if(invincibleCounter >= 4000){
				invincibleCounter = wait = 0;
				isShipHit = false;
			}
        }

        // Update and create ship thruster particles
        if(!dead) {
            if(ship.getThrustStatus()) {
                shipThrustParticles.updateParticlePosition(ship.getShipThrusterPosition().x, ship.getShipThrusterPosition().y);
                for(let i = 0; i < 2; i++) {
                    shipThrustParticles.createParticle();
                }
                ship.setThrustStatus(false);
            }
        }
        shipThrustParticles.updateParticle(elapsedTime/1000);

        shipSmokeExplosionParticles.updateParticle(elapsedTime/1000);
        shipFireExplosionParticles.updateParticle(elapsedTime/1000);

        // Updating ship position
        ship.updateShipPosition();
        torpedo.updateProjectile(elapsedTime/1000);

        for(let i = 0; i < enemyCannonArray.length; i++){
            if(enemyCannonArray[i].getType() == 'klingon') {
                enemyKlingonShip.updateEnemy(enemyKlingonShip, klingonCannon, elapsedTime);
            }
            if(enemyCannonArray[i].getType() == 'borg') {
                enemyBorgShip.updateEnemy(enemyBorgShip, borgCannon, elapsedTime);
            }
        }

        klingonCannon.updateProjectile(elapsedTime/1000);
        borgCannon.updateProjectile(elapsedTime/1000);

        // Update extra lives
		if(scoreNumberText.getText() >= extraLife){
			lifeArray.push(
					livesPicture = graphics.Texture({
					image : 'Assets/ship.png',
					center : { x : 180 + (lifeArray.length * 40), y : 170 },
                    width : 60,
                    height : 30,
                    rotation: -1.57
					})
				);

			extraLife+=10000;
        };

        warpCounter += elapsedTime;
        if (warpCounter > 5000) {warpReady = true;}

        if(warpReady) { warpReadyText.setWarpReadyText(); }
        else { warpReadyText.setText(5 - Math.floor(warpCounter/1000)); }

        if(scoreNumberText.getText() < 40000 ) {
            if(levelScore >= 1000 && !klingonActive) {
                enemyArray.push(enemyKlingonShip);
                enemyCannonArray.push(klingonCannon);
                klingonActive = true;
            }        

            if(levelScore >= 3000 && !borgActive) {
                enemyArray.push(enemyBorgShip);
                enemyCannonArray.push(borgCannon);
                borgActive = true;
            }   
        }
        // Only add borg ships if score > 40000
        else {
            if(levelScore >= 1000 && !borgActive) {
                enemyArray.push(enemyBorgShip);
                enemyCannonArray.push(borgCannon);
                borgActive = true;
            }
        }
    }

    function render() {
        graphics.clear();

        // Draw asteroids in asteroid array
        for(let i = 0; i < asteroidArray.length; i++){
			asteroidArray[i].draw();
        }

        shipThrustParticles.drawParticle();
        shipFireExplosionParticles.drawParticle();
        shipSmokeExplosionParticles.drawParticle();

        asteroidExplosionParticles.drawParticle();

        enemyShipFireExplosionParticles.drawParticle();

        torpedo.drawTorpedo();

        ship.draw();

        klingonCannon.drawTorpedo();
        borgCannon.drawTorpedo();
        for(let i = 0; i < enemyArray.length; i++) {
            enemyArray[i].draw();
        }

        scoreText.drawText();
        scoreNumberText.drawText();
        levelText.drawText();
        levelNumText.drawText();
        livesText.drawText();
        warpText.drawText();
        warpReadyText.drawText();

        for(let i = 0; i <lifeArray.length; i++) {
            lifeArray[i].draw();
        }

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
        asteroidCount = 2;
        warpReady = true;

        ship = graphics.Texture( {
            image: 'Assets/ship.png',
            height : 40,
            width : 80,
            center : { x : MyGame.screenWidth/2, y : MyGame.screenHeight/2},
            rotation: -1.57,
            rotationRate: 3.14159,
            dx: 0,
            dy: 0,
            thrusting : false
        });

        shipThrustParticles = graphics.Texture({
            image: 'Assets/fire.png',
            center: {x: ship.getShipThrusterPosition().x, y: ship.getShipThrusterPosition().y},
            size: {mean: 10, std: 4},
            speed: {mean: 10, std: 2},
            lifetime: {mean: 2, std: 1}
        });

        shipSmokeExplosionParticles = graphics.Texture({
            image: 'Assets/smoke-2.png',
            center: {x: 0, y: 0},
            size: {mean: 30, std: 5},
            speed: {mean: 60, std: 10},
            lifetime: {mean: 2, std: 1}
        });

        shipFireExplosionParticles = graphics.Texture({
            image: 'Assets/fire.png',
            center: {x: 0, y: 0},
            size: {mean: 30, std: 5},
            speed: {mean: 30, std: 10},
            lifetime: {mean: 2, std: 1}
        });

        shipExplosionSound = sound({
            sound: 'Assets/Sounds/shipExplosionSound.wav',
            volume: .008
        });

        shipWarpSound = sound({
            sound: 'Assets/Sounds/shipWarpSound.wav',
            volume: .02
        })

        torpedo = graphics.Texture({
            image: 'Assets/torpedo.png',
            center: {x: ship.getCannonPosition().x, y: ship.getCannonPosition().y},
            size: 7,
            direction: {x: 0, y: 0},
            speed: 400,
            lifetime: 4,
        });

        torpedoSound = sound({
            sound: 'Assets/Sounds/torpedoSound.wav',
            volume: .008
        });

        // Number of asteroids
		for(let i = 0; i < asteroidCount; i++){
			asteroidArray.push(
				asteroid = graphics.Texture({
                    image : 'Assets/Asteroid.png',
                    height : 150,                    
                    width : 150,
                    center : { x : Random.nextRange(0, MyGame.screenWidth), y : MyGame.screenHeight },
                    size : 3,
                    rotation : 0,
                    rotationRate : 2,
                    direction : Random.nextRange(1,5),
                    moveRate : Math.abs(Random.nextGaussian(40, 10))
                })
			)
        };

        asteroidExplosionParticles = graphics.Texture({
            image: 'Assets/Asteroid.png',
            center: {x: 0, y: 0},
            size: {mean: 5, std: 1},
            speed: {mean: 100, std: 10},
            lifetime: {mean: 2, std: 1}
        });

        asteroidExplosionSound = sound({
            sound: 'Assets/Sounds/asteroidExplosionSound.wav',
            volume: 0.005
        })

        enemyKlingonShip = graphics.Texture( {
            image: 'Assets/klingon.png',
            type: 'klingon',
            height : 80,
            width : 80,
            center : { x : Random.nextRange(0, MyGame.screenWidth), y : Random.nextRange(0, MyGame.screenHeight)},
            rotation: 1.57,
            rotationRate: 3.14159,
            moveRate: 100,
            dx: 0,
            dy: 0,
            speed: 2,
            direction: Random.nextCircleVector()
        });

        klingonCannon = graphics.Texture({
            image: 'Assets/enemyTorpedo.png',
            type: 'klingon',
            center: {x: enemyKlingonShip.getEnemyCannonPosition().x, y: enemyKlingonShip.getEnemyCannonPosition().y},
            size: 10,
            direction: {x: 0, y: 0},
            speed: 200,
            lifetime: 6,
        });

        enemyBorgShip = graphics.Texture( {
            image: 'Assets/borg.png',
            type: 'borg',
            height : 54.3,
            width : 59.6,
            center : { x : Random.nextRange(0, MyGame.screenWidth), y : Random.nextRange(0, MyGame.screenHeight)},
            rotation: 0,
            rotationRate: 3.14159,
            moveRate: 100,
            dx: 3,
            dy: 3,
            speed: 3,
            direction: Random.nextCircleVector()
        });

        borgCannon = graphics.Texture({
            image: 'Assets/enemyTorpedo.png',
            type: 'borg',
            center: {x: enemyBorgShip.getEnemyCannonPosition().x, y: enemyBorgShip.getEnemyCannonPosition().y},
            size: 10,
            direction: {x: 0, y: 0},
            speed: 300,
            lifetime: 3,
        });

        enemyShipFireExplosionParticles = graphics.Texture({
            image: 'Assets/fire.png',
            center: {x: 0, y: 0},
            size: {mean: 30, std: 5},
            speed: {mean: 30, std: 10},
            lifetime: {mean: 2, std: 1}
        });

        enemyExplosionSound = sound({
            sound: 'Assets/Sounds/enemyExplosionSound.wav',
            volume: .008
        })

        scoreText = graphics.Text({
			text: "Score:",
            font: '48px StarTrek',
            fill: 'rgb(0, 141, 255)',
            pos: {x: 20, y: 20},
            rotation: 0
		});
        
        scoreNumberText = graphics.Text({
            text: 0,
            font: '48px StarTrek',
            fill: 'rgb(0, 141, 255)',
            pos: {x: 175, y: 20},
            rotation: 0
        });

        levelText = graphics.Text({
			text: "Level:",
            font: '48px StarTrek',
            fill: 'rgb(0, 141, 255)',
            pos: {x: 20, y: 80},
            rotation: 0
		});
		
		levelNumText = graphics.Text({
			text: 1,
            font: '48px StarTrek',
            fill: 'rgb(0, 141, 255)',
            pos: {x: 175, y: 80},
            rotation: 0
        });

        livesText = graphics.Text({
			text: "Lives:",
            font: '48px StarTrek',
            fill: 'rgb(0, 141, 255)',
            pos: {x: 20, y: 140},
            rotation: 0
        });
        
        warpText = graphics.Text({
			text: "Warp:",
            font: '48px StarTrek',
            fill: 'rgb(0, 141, 255)',
            pos: {x: 20, y: 200},
            rotation: 0
        });
        
        warpReadyText = graphics.Text({
			text: "Ready!",
            font: '48px StarTrek',
            fill: 'rgb(0, 141, 255)',
            pos: {x: 175, y: 200},
            rotation: 0
        });
        
        // Number starting lives
		for(let i = 0; i < startingLives; i++){
			lifeArray.push(
				livesPicture = graphics.Texture( {
					image : 'Assets/ship.png',
                    center : { x : 180 + (i * 40), y : 170 },
                    height : 30,
                    width : 60,
                    rotation: -1.57
				})
			)
        };

        backgroundMusic = sound({
            sound: 'Assets/Sounds/TNGOpening.wav',
            volume: 0.005
        })

        backgroundMusic.play();

        backgroundAmbiance = sound({
            sound: 'Assets/Sounds/bridgeAmbiance.wav',
            volume: 0.005
        })

        backgroundAmbiance.play();

        myKeyboard.register();
        myKeyboard.register('ArrowUp', ship.thrustShip);
        myKeyboard.register('ArrowLeft', ship.rotateShipLeft);
        myKeyboard.register('ArrowRight', ship.rotateShipRight);
        myKeyboard.register(' ', shootTorpedo);
        myKeyboard.register('z', warp);
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