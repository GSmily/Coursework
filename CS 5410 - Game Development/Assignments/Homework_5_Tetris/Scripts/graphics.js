MyGame.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    let textCanvas = document.getElementById('text-canvas');
    let textContext = textCanvas.getContext('2d');

    let nextPieceCanvas = document.getElementById('next-piece-canvas');
    let nextPieceContext= nextPieceCanvas.getContext('2d');

    textCanvas.width = window.innerWidth;
    textCanvas.height = window.innerHeight / 10;

    MyGame.screenWidth = textCanvas.width
    MyGame.screenHeight = textCanvas.height

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        textContext.clearRect(0, 0, textCanvas.width, textCanvas.height);
        nextPieceContext.clearRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height);
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
			spec.pos.x = spec.pos.x - 1
        };

        that.moveTo = function(x, y) {
			spec.center.x = x;
			spec.center.y = y;
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

    function Text(spec, canvasContex) {
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

        function measureTextHeight(spec) {
            canvasContex.save();

            canvasContex.font = spec.font;
            canvasContex.fillStyle = spec.fill;
            canvasContex.strokeStyle = spec.stroke;

            let height = canvasContex.measureText('C').width;

            canvasContex.restore();

            return height;
        }

        function measureTextWidth(spec) {
            canvasContex.save();

            canvasContex.font = spec.font;
            canvasContex.fillStyle = spec.fill;
            canvasContex.strokeStyle = spec.stroke;

            let width = canvasContex.measureText(spec.text).width;

            canvasContex.restore();

            return width;
        }

        that.drawText = function() {
            canvasContex.save();

            canvasContex.font = spec.font;
            canvasContex.fillStyle = spec.fill;
            canvasContex.strokeStyle = spec.stroke;
            canvasContex.textBaseline = 'top';

            canvasContex.translate(spec.pos.x + that.width / 2, spec.pos.y + that.height / 2);
            canvasContex.rotate(spec.rotation);
            canvasContex.translate(-(spec.pos.x + that.width / 2), -(spec.pos.y + that.height / 2));

            canvasContex.fillText(spec.text, spec.pos.x, spec.pos.y);
            canvasContex.strokeText(spec.text, spec.pos.x, spec.pos.y);

            canvasContex.restore();
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