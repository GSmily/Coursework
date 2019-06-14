function update(elapsedTime) {
    for(let i = 0; i < values.length; i++) {
        values[i][3] = false;
        values[i][1] -= elapsedTime;
        if (values[i][1] <= 0) {
            values[i][3] = true
            values[i][1] += values[i][4]
            values[i][2] -= 1
        }
    }
        values = values.filter(i => i[2] >= 0);

}

function render() {
    for (let i = 0; i < values.length; i++) {
        if (!values[i][3]) continue;
        let leftDiv = document.getElementById("left-side");
        let eventText = document.createElement("p")

        eventText.innerText = "Event: " + values[i][0] + " (" + values[i][2] + " remaining)";
        leftDiv.appendChild(eventText)

        leftDiv.scrollTop = leftDiv.scrollHeight - leftDiv.clientHeight;
    }
}

function gameLoop(currentTime) {
    const elapsedTime = currentTime - lastTime;
    lastTime = currentTime;

    update(elapsedTime);

    render();

    requestAnimationFrame(gameLoop);
}


function getValues(){
    let name = document.getElementById("name").value;
    let interval = parseInt(document.getElementById("interval").value);
    let times = parseInt(document.getElementById("times").value);

    values.push([name, interval, times, false, interval])
}

let values = []

let lastTime = performance.now();

requestAnimationFrame(gameLoop);
