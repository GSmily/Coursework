function sound(spec) {
    let that = {};

    that.play = function() {
        // var sound = {
        //     sound: spec.sound,
        //     duration: spec.duration,
        //     volume: spec.volume  //needs to be a number between 0 and 1
        // },
        thisSound = new Audio(spec.sound);
        thisSound.volume = spec.volume;
        thisSound.addEventListener('ended', () => {
        })
        thisSound.play();
    };

    return that;
}