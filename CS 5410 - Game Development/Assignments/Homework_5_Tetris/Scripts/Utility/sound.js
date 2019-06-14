function sound(spec) {
    let that = {};

    that.play = function() {
        thisSound = new Audio(spec.sound);
        thisSound.volume = spec.volume;
        thisSound.addEventListener('ended', () => {})
        thisSound.play();
    };

    return that;
}