MyGame.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    MyGame.screenWidth = canvas.width
    MyGame.screenHeight = canvas.height

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    let projectileScreenLoop = function(projectile){
        let screenX = MyGame.screenWidth;
        let screenY = MyGame.screenHeight;

        // X Sides
        if (projectile.center.x > screenX) {
            projectile.center.x -= screenX;
        }
        else if (projectile.center.x < 0) {
            projectile.center.x += screenX;
        }

        // Y sides
        if (projectile.center.y > screenY) {
            projectile.center.y -= screenY;
        }
        else if (projectile.center.y < 0) {
            projectile.center.y += screenY;
        }
    };

    function Texture(spec) {
        let that = {},
            projectiles = {},
            projectileID = 1,
            rotateCount = 0,
            enemyFireCount = 0,
            particles = {},
            nextName = 1;

        let collision = function(x1, y1, r1, x2, y2, r2) {
            let distance = Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
            return distance < (r1 + r2);
        };

        let image = new Image();
        image.src = spec.image

        // Function that allows objects to loop from one side of the screen to the other
        let screenLoop = function() {
            let screenX = MyGame.screenWidth;
            let screenY = MyGame.screenHeight;

            // X Sides
            if (spec.center.x > screenX) {
                spec.center.x -= screenX;
            }
            else if (spec.center.x < 0) {
                spec.center.x += screenX;
            }

            // Y sides
            if (spec.center.y > screenY) {
                spec.center.y -= screenY;
            }
            else if (spec.center.y < 0) {
                spec.center.y += screenY;
            }
        };

        that.getWidth = function() {
            return spec.width;
        };

        that.getHeight = function() {
            return spec.height;
        };

        that.getRadius = function() {
            return spec.height/2;
        };

        that.getX = function() {
            return spec.center.x;
        };

        that.getY = function() {
            return spec.center.y;
        };

        that.getDX = function () {
            return spec.dx;
        };

        that.getDY = function() {
            return spec.dy;
        };

        that.getPosition = function() {
            return spec.center;
        };

        that.getRotation = function() {
            return spec.rotation;
        };

        that.getSize = function() {
            return spec.size;
        };

        that.getCannonPosition = function() {
            return {
                x : spec.center.x+(spec.height/2)*Math.cos(spec.rotation), 
				y : spec.center.y+(spec.height/2)*Math.sin(spec.rotation)
            }
        }

        that.getEnemyCannonPosition = function() {
            return {
                x : spec.center.x+(spec.height/2)*Math.cos(spec.rotation), 
				y : spec.center.y+(spec.height/2)*Math.sin(spec.rotation)
            }
        }

        that.getType = function(){
            return spec.type;
        };

        that.getShipThrusterPosition = function() {
            return {
                x : spec.center.x+(spec.height/2)*-Math.cos(spec.rotation), 
				y : spec.center.y+(spec.height/2)*-Math.sin(spec.rotation)
            }
        };

        that.getThrustStatus = function(){
			return spec.thrusting;
		};
		
		that.setThrustStatus = function(status){
			spec.thrusting = status;
		};

        that.rotateShipLeft = function(elapsedTime) {
            spec.rotation -= spec.rotationRate * (elapsedTime / 1100);
        };

        that.rotateShipRight = function(elapsedTime) {
            spec.rotation += spec.rotationRate * (elapsedTime / 1100);
        }; 

        that.thrustShip = function() {
            spec.dx += Math.cos(spec.rotation) * 0.075;
            spec.dy += Math.sin(spec.rotation) * 0.075;
            spec.thrusting = true;
        }

        that.moveAsteroidUp = function(elapsedTime) {
			spec.center.y -= spec.moveRate * (elapsedTime / 1000);
		};
		
		that.moveAsteroidDown = function(elapsedTime) {
			spec.center.y += spec.moveRate * (elapsedTime / 1000);
		};

        that.moveAsteroidRight = function(elapsedTime) {
			spec.center.x += spec.moveRate * (elapsedTime / 1000);
		};

        that.moveAsteroidLeft = function(elapsedTime) {
			spec.center.x -= spec.moveRate * (elapsedTime / 1000);
		};

        that.asteroidMovement = function(elapsedTime) {
			if(spec.direction == 1){
				that.rotateShipRight(elapsedTime);
				that.moveAsteroidRight(elapsedTime);
				that.moveAsteroidDown(elapsedTime);
			}
			else if(spec.direction == 2){
				that.rotateShipRight(elapsedTime);
				that.moveAsteroidLeft(elapsedTime);
				that.moveAsteroidLeft(elapsedTime);
				that.moveAsteroidUp(elapsedTime);
			}
			else if(spec.direction == 3){
				that.rotateShipLeft(elapsedTime);
				that.moveAsteroidRight(elapsedTime);
				that.moveAsteroidUp(elapsedTime);
				that.moveAsteroidUp(elapsedTime);
				that.moveAsteroidUp(elapsedTime);
			}
			else if(spec.direction == 4){
				that.rotateShipLeft(elapsedTime);
				that.moveAsteroidLeft(elapsedTime);
				that.moveAsteroidLeft(elapsedTime);
				that.moveAsteroidDown(elapsedTime);
			}
			else{
				that.rotateShipRight(elapsedTime);
				that.moveAsteroidRight(elapsedTime);
				that.moveAsteroidRight(elapsedTime);
				that.moveAsteroidUp(elapsedTime);
			}

			screenLoop();
		};

        that.reset = function(){
			spec.image = 'Assets/ship.png';
			spec.center.x = MyGame.screenWidth/2;
            spec.center.y = MyGame.screenHeight/2;
            spec.height = 40;
			spec.width = 80;
			spec.rotation = -1.57;
			spec.rotationRate = 3.14159;
			spec.dx = 0;
			spec.dy = 0;
        };

        that.isShipHit = function(){
			spec.width = 0;
			spec.height = 0;
			spec.rotationRate = 0;
			spec.dx = 0;
			spec.dy = 0;
			that.moveTo(5000, 5000);
		};

        that.updateShipPosition = function() {
            spec.center.x += spec.dx;
            spec.center.y += spec.dy;
            screenLoop();
        }

        that.updateEnemy = function(enemyShip, enemyCannon, elapsedTime) {
            spec.center.x += (spec.speed * spec.direction.x);
			spec.center.y += (spec.speed * spec.direction.y);
			
			rotateCount += elapsedTime;
			enemyFireCount += elapsedTime;
            	
			if(spec.type == 'borg'){
                enemyCannon.updateProjectilePosition({x: enemyShip.getEnemyCannonPosition().x,
                    y: enemyShip.getEnemyCannonPosition().y}, enemyShip.getRotation());

				if(enemyFireCount >= 1000){
					enemyCannon.createProjectile();
					enemyFireCount = 0;
				}

				if(rotateCount >= 100){
					that.rotateShipLeft(elapsedTime);
					rotateCount = 0;
				}
			}
			if(spec.type == 'klingon'){
                enemyCannon.updateProjectilePosition({x: enemyShip.getEnemyCannonPosition().x,
                    y: enemyShip.getEnemyCannonPosition().y}, enemyShip.getRotation());
				if(enemyFireCount >= 1500){
					enemyCannon.createProjectile();
					enemyFireCount = 0;
				}
				if(rotateCount >= 100){
					that.rotateShipRight(elapsedTime);
					rotateCount = 0;
				}
			}
			screenLoop();
        };

        that.moveTo = function(x, y) {
			spec.center.x = x;
			spec.center.y = y;
        };

        ////////////////////////////////PROJECTILES///////////////////////////////////
        that.createProjectile = function() {
            let p = {
                image: spec.image,
                size: spec.size,
                center: {x: spec.center.x, y: spec.center.y},
                direction: {x: spec.direction.x, y: spec.direction.y},
                speed: spec.speed, // pixels per second
                rotation: 0,
                lifetime: spec.lifetime, // How long the projectile should live, in seconds
                alive: 0, // How long the projectile has been alive, in seconds
            };

            p.size = Math.max(1, p.size);

            p.lifetime = Math.max(0.01, p.lifetime);

            projectiles[projectileID++] = p;
        };

        that.updateProjectilePosition = function(center, rotation) {
            spec.center.x = center.x;
            spec.center.y = center.y;
            spec.direction.x = Math.cos(rotation);
            spec.direction.y = Math.sin(rotation);
        };

        that.updateProjectile = function(elapsedTime) {
            let removeMe = [],
                    value,
                    projectile;
            for (value in projectiles) {
                if (projectiles.hasOwnProperty(value)) {
                    projectile = projectiles[value];
                    //
                    // Update how long it has been alive
                    projectile.alive += elapsedTime;
    
                    //
                    // Update its position
                    projectile.center.x += (elapsedTime * projectile.speed * projectile.direction.x);
                    projectile.center.y += (elapsedTime * projectile.speed * projectile.direction.y);
                    
                    projectileScreenLoop(projectile);
    
                    //
                    // Rotate proportional to its speed
                    //projectile.rotation += projectile.speed / 300;
    
                    //
                    // If the lifetime has expired, identify it for removal
                    if (projectile.alive > projectile.lifetime) {
                        removeMe.push(value);
                    }
                }
            }
    
            // Remove all of the expired projectiles
            for (projectile = 0; projectile < removeMe.length; projectile++) {
                delete projectiles[removeMe[projectile]];
            }
            removeMe.length = 0;
        };

        that.findProjectile = function(asteroids) {
            let removeMe = [],
                value,
                projectile,
                asteroidPosition = {x : 0, y : 0},
                asteroidSize = 0,
                hit = false;

            for (value in projectiles) {
                if (projectiles.hasOwnProperty(value)) {
                    projectile = projectiles[value];
                    for(let i = 0; i < asteroids.length; i++){
                        if (collision(projectile.center.x, projectile.center.y, projectile.size/2, asteroids[i].getX(), asteroids[i].getY(), asteroids[i].getWidth()/2)) {
                            removeMe.push(value);
                            asteroidPosition = asteroids[i].getPosition();
                            asteroidSize = asteroids[i].getSize();
                            asteroids.splice(i, 1);
                            hit = true;
                        }
                    }
                }
            }

            for (projectile = 0; projectile < removeMe.length; projectile++) {
                delete projectiles[removeMe[projectile]];
            }
            removeMe.length = 0;
            return {hit: hit, x: asteroidPosition.x, y: asteroidPosition.y, size: asteroidSize};
        };

        that.enemyShipHit = function(enemies, cannons) {
            let removeMe = [], 
                value, 
                projectile, 
                enemyPosition = {x: 0, y: 0},
                type = null,
                hit = false;

            for (value in projectiles) {
                if (projectiles.hasOwnProperty(value)) {
                    projectile = projectiles[value];
                    for ( let i = 0; i < enemies.length; i++) {
                        if (collision(projectile.center.x, projectile.center.y,
                                projectile.size / 2, enemies[i].getX(),
                                enemies[i].getY(), enemies[i].getWidth() / 2)) {
                            type = enemies[i].getType();
                            removeMe.push(value);
                            enemyPosition = enemies[i].getPosition();
                            enemies.splice(i, 1);
                            cannons.splice(i, 1);
                            hit = true;
                        }
                    }
                }
            }

            for (projectile = 0; projectile < removeMe.length; projectile++) {
                delete projectiles[removeMe[projectile]];
            }
            removeMe.length = 0;
            return {
                type : type,
                hit : hit,
                x : enemyPosition.x,
                y : enemyPosition.y
            };
        };

        that.enemyHitPlayerShip = function(ship) {
            let removeMe = [], 
                value, 
                projectile, 
                isShipHit = false;
            for (value in projectiles) {
                if (projectiles.hasOwnProperty(value)) {
                    projectile = projectiles[value];
                    if (collision(projectile.center.x, projectile.center.y,
                            projectile.size / 2, ship.getX(),
                        ship.getY(), ship.getHeight() / 2)) {
                        removeMe.push(value);
                        isShipHit = true;
                    }
                }
            }
            for (projectile = 0; projectile < removeMe.length; projectile++) {
                delete projectiles[removeMe[projectile]];
            }
            removeMe.length = 0;
            return {
                isShipHit : isShipHit
            };
        };
        
        that.drawTorpedo = function() {
            let value,
                projectile;
            
            for (value in projectiles) {
                projectile = projectiles[value];
                drawImage(projectile);
            }
        };

////////////////////////PARTICLE SYSTEM////////////////////////////////
        that.createParticle = function() {
            var p = {
				image: spec.image,
				size: Random.nextGaussian(spec.size.mean, spec.size.std),
				center: {x: spec.center.x, y: spec.center.y},
				direction: Random.nextCircleVector(),
				speed: Random.nextGaussian(spec.speed.mean, spec.speed.std),
				rotation: 0,
				lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.std),
				alive: 0
            };
            
            p.size = Math.max(1, p.size);

            p.lifetime = Math.max(0.01, p.lifetime);

            particles[nextName++] = p;
        }

        that.updateParticle = function(elapsedTime) {
            var removeMe = [],
                value,
                particle;
		
            for (value in particles) {
                if (particles.hasOwnProperty(value)) {
                    particle = particles[value];

                    particle.alive += elapsedTime;
                    
                    particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
                    particle.center.y += (elapsedTime * particle.speed * particle.direction.y);
                    
                    if (particle.alive > particle.lifetime) {
                        removeMe.push(value);
                    }
                }
            }

            for (particle = 0; particle < removeMe.length; particle++) {
                delete particles[removeMe[particle]];
            }
            removeMe.length = 0;
        };

        that.updateParticlePosition = function(x, y) {
            spec.center.x = x;
            spec.center.y = y;
        };

        that.setParticleSpeed = function(newMean, newStd) {
            spec.speed.mean = newMean,
            spec.speed.std = newStd
        }

        that.setParticleSize = function(newMean, newStd) {
            spec.size.mean = newMean,
            spec.size.std = newStd
        }

        that.drawParticle = function() {
            var value,
                particle;

            for (value in particles) {
                if (particles.hasOwnProperty(value)) {
                    particle = particles[value];
                    drawImage(particle);
                }
            }
        };

///////////////////////////////////////////////////////////////////////

        that.draw = function() {
            context.save();

            context.translate(spec.center.x, spec.center.y);
            context.rotate(spec.rotation);
            context.translate(-spec.center.x, -spec.center.y);

            context.drawImage(
                image,
                spec.center.x - spec.width/2,
                spec.center.y - spec.height/2,
                spec.width,
                spec.height
            );
            context.restore();
        };
        return that;
    }

    function drawImage(spec) {
        let image = new Image();
        image.src = spec.image
		context.save();
		
		context.translate(spec.center.x, spec.center.y);
		context.rotate(spec.rotation);
		context.translate(-spec.center.x, -spec.center.y);
		
		context.drawImage(
			image, 
			spec.center.x - spec.size/2, 
			spec.center.y - spec.size/2,
			spec.size, spec.size);
		
		context.restore();
    }

    function Text(spec) {
        let that = {};

        that.getX = function(){
        	return spec.pos.x;
        };
        
        that.getText = function(){
        	return spec.text;
        };

        that.setText = function(newText) {
            spec.text = newText;
        }

        that.updateScore = function(score) {
            spec.text = spec.text + score;
        }

        that.addLevel = function() {
            spec.text = spec.text + 1;
        }

        that.setWarpReadyText = function() {
            spec.text = "Ready!";
        }

        function measureTextHeight(spec) {
            context.save();

            context.font = spec.font;
            context.fillStyle = spec.fill;
            context.strokeStyle = spec.stroke;

            let height = context.measureText('C').width;

            context.restore();

            return height;
        }

        function measureTextWidth(spec) {
            context.save();

            context.font = spec.font;
            context.fillStyle = spec.fill;
            context.strokeStyle = spec.stroke;

            let width = context.measureText(spec.text).width;

            context.restore();

            return width;
        }

        that.drawText = function() {
            context.save();

            context.font = spec.font;
            context.fillStyle = spec.fill;
            context.strokeStyle = spec.stroke;
            context.textBaseline = 'top';

            context.translate(spec.pos.x + that.width / 2, spec.pos.y + that.height / 2);
            context.rotate(spec.rotation);
            context.translate(-(spec.pos.x + that.width / 2), -(spec.pos.y + that.height / 2));

            context.fillText(spec.text, spec.pos.x, spec.pos.y);
            context.strokeText(spec.text, spec.pos.x, spec.pos.y);

            context.restore();
        };

        that.height = measureTextHeight(spec);
        that.width = measureTextWidth(spec);
        that.pos = spec.pos;

        return that;
    }

    return {
        clear : clear,
        Texture : Texture,
        drawImage : drawImage,
        Text: Text
    }
}());