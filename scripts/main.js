// init the canvas

const canvas = document.createElement("canvas");
const ctx    = canvas.getContext("2d");

canvas.width  = 600;
canvas.height = 400;

document.body.appendChild(canvas);

let rightPressed = false;
let leftPressed  = false;

let intervalCounter = 0;

let spaceship = {
    x: canvas.width / 2,
    width: 40,
    height: 40,
    marginToBottom: 5,
    color: "#ff6347",
    beamMaxNum: 10,
};

let meteos = [];
let beams = [];
let blasts = [];


let ourblast = {
    start: 0,
    x: 300,
    y: 200,
};

let blastImages =[];
for (let i = 0; i < 6; i++) {
    blastImages[i] = new Image();
    blastImages[i].src = "./images/blast" + i + ".png";
}

let score = 0;

const drawSpaceship = () => {
    ctx.beginPath();
    ctx.moveTo(spaceship.x, canvas.height - spaceship.height - spaceship.marginToBottom);
    ctx.lineTo(spaceship.x + spaceship.width / 2, canvas.height - spaceship.marginToBottom);
    ctx.lineTo(spaceship.x - spaceship.width / 2, canvas.height - spaceship.marginToBottom);
    ctx.fillStyle = spaceship.color;
    ctx.fill();
    ctx.closePath();
}

const drawNumbers = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("score: " + score + ", #beams: " + beams.length + ", #meteos: " + meteos.length + ", #blast: " + blasts.length, 8, 20);
}

const fire = () => {
    let beam = {
        x: spaceship.x,
        y: canvas.height - spaceship.height - spaceship.marginToBottom,
    };

    beams.push(beam);
}

const drawSingleBeam = (beam) => {
    ctx.beginPath();
    ctx.rect(beam.x - 4, beam.y, 8, 40);
    ctx.fillStyle = "#adff2f";
    ctx.fill();
    ctx.closePath();
}

const drawBeams = () => {
    beams.forEach( (beam) => {
        drawSingleBeam(beam);
    });
}

const beamGoingOut = (beam) => {
    return beam.y < 0;
}

const newMeteo = () => {
    let meteo = {
        x: Math.random() * canvas.width,
        y: 0,
    };

    meteos.push(meteo);
}

const drawSingleMeteo = (meteo) => {
    ctx.beginPath();
    ctx.arc(meteo.x, meteo.y, 40, 0, Math.PI*2);
    ctx.fillStyle = "#2f4f4f";
    ctx.fill();
    ctx.closePath();
}

const drawMeteos = () => {
    meteos.forEach( (meteo) => {
        drawSingleMeteo(meteo);
    });
}

const meteoGoingOut = (meteo) => {
    return meteo.y > canvas.height + 40;
}

const collide = () => {
    for (let i = 0; i < beams.length; i++) {
        for (let j = 0; j < meteos.length; j++) {
            let beam = beams[i];
            let meteo = meteos[j];

            if (((beam.x - meteo.x)**2 + (beam.y - meteo.y)**2) < 1500) {
//                alert("(beam.x - meteo.x)^2 + (beam.y - meteo.y)^2: "+ ((beam.x - meteo.x)**2 + (beam.y - meteo.y)**2));
                score++;

                let blast = {
                    start: intervalCounter,
                    x: meteo.x,
                    y: meteo.y,
                };

                blasts.push(blast);
                
                beams.splice(i, 1);
                meteos.splice(j, 1);
            }
        }
    }
}

const drawSingleBlast = blast => {
    for (let i = 0; i < 6; i++) {
        if (intervalCounter - blast.start < i * 8) {
            ctx.drawImage(blastImages[i], blast.x - 50, blast.y - 50);
            break;
        }
    }
}

const drawBlasts = () => {
    blasts.forEach( blast => {
        drawSingleBlast(blast);
    });
}

onkeydown = (e) => {
    if (e.key == "ArrowRight" || e.key == "Right") {
        rightPressed = true;
    } else if (e.key == "ArrowLeft" || e.key == "Left") {
        leftPressed = true;
    }
};

onkeyup = (e) => {
    if (e.key == "ArrowRight" || e.key == "Right") {
        rightPressed = false;
    } else if (e.key == "ArrowLeft" || e.key == "Left") {
        leftPressed = false;
    }
}

const animate = () => {
//    ctx.fillStyle = "rgba(238, 238, 238,0.4)";
//    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collide();
    
    
//    drawSingleMeteo({x: 300, y: 200});
    drawMeteos();
    drawSingleBlast(ourblast);
    drawBlasts();
    drawBeams();
    drawSpaceship();
    drawNumbers();

    if(rightPressed && spaceship.x < canvas.width - spaceship.width / 2) {
        spaceship.x += 7;
    }
    else if(leftPressed && spaceship.x > spaceship.width / 2) {
        spaceship.x -= 7;
    }

    intervalCounter ++;
    if (intervalCounter % 20 == 0) {
        fire();
    }

    if (intervalCounter % 100 == 0) {
        newMeteo();
    }

    beams.forEach( (beam) => {
        beam.y += -4;
    });

    beams = beams.filter( beam => !beamGoingOut(beam));

    meteos.forEach ( meteo => {
        meteo.y += 2;
    });

    meteos = meteos.filter( meteo => !meteoGoingOut(meteo));

    blasts = blasts.filter( blast => intervalCounter - blast.start < 100);


    requestAnimationFrame(animate);
}

animate();