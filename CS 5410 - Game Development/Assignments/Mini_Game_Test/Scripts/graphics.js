MyGame.graphics = (function() {
    'use strict';

    const GRAVITY = 0.025; // world units per millisecond

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    MyGame.screenWidth = canvas.width
    MyGame.screenHeight = canvas.height

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function lineCircleIntersection(pt1, pt2, circle) {
        let v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y };
        let v2 = { x: pt1.x - circle.center.x, y: pt1.y - circle.center.y };
        let b = -2 * (v1.x * v2.x + v1.y * v2.y);
        let c =  2 * (v1.x * v1.x + v1.y * v1.y);
        let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
        if (isNaN(d)) { // no intercept
            return false;
        }
        // These represent the unit distance of point one and two on the line
        let u1 = (b - d) / c;  
        let u2 = (b + d) / c;
        if (u1 <= 1 && u1 >= 0) {  // If point on the line segment
            return true;
        }
        if (u2 <= 1 && u2 >= 0) {  // If point on the line segment
            return true;
        }
        return false;
    }

    function Texture(spec) {
        let that = {},
            particles = {},
            nextName = 1;

        let image = new Image();
        image.src = spec.image

        that.moveUp = function(elapsedTime) {
			spec.center.y -= (spec.moveRate * elapsedTime);
		};
		
		that.moveDown = function(elapsedTime) {
			spec.center.y += (spec.moveRate * elapsedTime);
		};

        that.moveRight = function(elapsedTime) {
			spec.center.x += (spec.moveRate * elapsedTime);
		};

        that.moveLeft = function(elapsedTime) {
			spec.center.x -= (spec.moveRate * elapsedTime);
        };

        that.moveTo = function(x, y) {
			spec.center.x = x;
			spec.center.y = y;
        };

        that.getRotation = function() {
            return spec.rotation;
        }

        that.getPosition = function() {
            return spec.center
        }

        that.getSpeed = function() {
            return Math.sqrt((spec.dx * spec.dx) + (spec.dy * spec.dy)).toFixed(2);
        }

        that.rotateLeft = function(elapsedTime) {
            spec.rotation -= spec.rotateRate * (elapsedTime);
            if (spec.rotation < 0) spec.rotation += (2 * Math.PI);
        }

        that.rotateRight = function(elapsedTime) {
            spec.rotation += spec.rotateRate * (elapsedTime);
            if (spec.rotation > (2 * Math.PI)) spec.rotation -= (2 * Math.PI);
        };

        that.thrustLander = function(elapsedTime) {
            if (spec.fuel <= 0) return;
            spec.fuel -= elapsedTime
            spec.dx += Math.cos(spec.rotation - (Math.PI / 2)) * 0.075;
            spec.dy += Math.sin(spec.rotation - (Math.PI / 2)) * 0.075;
            spec.thrusting = true;
        };

        that.deleteLander = function() {
            spec.width = 0;
            spec.height = 0;
        }

        that.getLanderThrusterPosition = function() {
            return {
                x : spec.center.x+(spec.height/2)*-Math.cos(spec.rotation - (Math.PI / 2)), 
				y : spec.center.y+(spec.height/2)*-Math.sin(spec.rotation - (Math.PI / 2))
            }
        };

		that.setThrustStatus = function(status){
			spec.thrusting = status;
		};

        that.getThrustStatus = function() {
            return spec.thrusting;
        };

        that.detectCollision = function(surface) {
            for (let i = 1; i < surface.length - 1; i++) {
                if (lineCircleIntersection(surface[i], surface[i+1], spec)) return [true, surface[i].safe && surface[i+1].safe];
            }
            return [false, false];
        }

        that.updateLanderPosition = function() {
            if (spec.win) return
            spec.dy += GRAVITY;
            spec.center.x += spec.dx;
            spec.center.y += spec.dy;
        };

        that.getFuel = function() {
            return spec.fuel;
        };

        that.getAngle = function() {
            let angle = spec.rotation;
            angle /= Math.PI;
            angle *= 180;
            return angle.toFixed(2);
        };

////////////////////////PARTICLE SYSTEM////////////////////////////////
        that.createParticle = function(rotation) {
            var p = {
				image: spec.image,
				size: Random.nextGaussian(spec.size.mean, spec.size.std),
				center: {x: spec.center.x, y: spec.center.y},
				direction: {x: Math.cos(rotation + Random.nextDouble() + (Math.PI / 2)), y: Math.sin(rotation + Random.nextDouble() + (Math.PI / 2))},
				speed: Random.nextGaussian(spec.speed.mean, spec.speed.std),
				rotation: 0,
				lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.std),
				alive: 0
            };
            
            p.size = Math.max(1, p.size);

            p.lifetime = Math.max(0.01, p.lifetime);

            particles[nextName++] = p;
        }

        that.createExplosionParticle = function() {
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

        that.updateSpeedColor = function(speed) {
            if (speed >= 2) spec.fill = 'rgb(255, 255, 255)';
            else spec.fill = 'rgb(0, 255, 0)'
        }

        that.updateAngleColor = function(angle) {
            angle /= Math.PI;
            angle *= 180;
            if (angle >= 5 && angle <= 355) {
                spec.fill = 'rgb(255, 255, 255)'
            }
            else spec.fill = 'rgb(0, 255, 0)'
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