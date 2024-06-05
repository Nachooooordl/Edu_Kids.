const intro = document.getElementById('intro');
const game = document.getElementById('game');
const sequenceButtons = document.querySelectorAll('.sequenceButton');
const resetButton = document.getElementById('resetButton');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');

let points = [];
let selectedPoints = [];
let correctSequence = [];

const sequences = {
    'I,U,E,A,O': [
        { x: 100, y: 100, letter: 'I' },
        { x: 300, y: 100, letter: 'U' },
        { x: 500, y: 100, letter: 'E' },
        { x: 200, y: 300, letter: 'A' },
        { x: 400, y: 300, letter: 'O' }
    ],
    'E,I,O,U,A': [
        { x: 100, y: 100, letter: 'E' },
        { x: 300, y: 100, letter: 'I' },
        { x: 500, y: 100, letter: 'O' },
        { x: 200, y: 300, letter: 'U' },
        { x: 400, y: 300, letter: 'A' }
    ]
};

sequenceButtons.forEach(button => {
    button.addEventListener('click', () => {
        points = sequences[button.dataset.sequence];
        correctSequence = button.dataset.sequence.split(',');
        selectedPoints = [];
        intro.style.display = 'none';
        game.style.display = 'block';
        message.innerText = '';
        drawPoints();
    });
});

resetButton.addEventListener('click', () => {
    selectedPoints = [];
    message.innerText = '';
    drawPoints();
});

function drawPoints() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#4caf50';
        ctx.fill();
        ctx.strokeStyle = '#388e3c';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Comic Sans MS';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(point.letter, point.x, point.y);
    });

    if (selectedPoints.length > 1) {
        ctx.beginPath();
        ctx.moveTo(selectedPoints[0].x, selectedPoints[0].y);
        for (let i = 1; i < selectedPoints.length; i++) {
            ctx.lineTo(selectedPoints[i].x, selectedPoints[i].y);
        }
        ctx.strokeStyle = '#ff5722';
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    if (selectedPoints.length === points.length) {
        checkSequence();
    }
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function isInside(point, mousePos) {
    const dx = point.x - mousePos.x;
    const dy = point.y - mousePos.y;
    return Math.sqrt(dx * dx + dy * dy) < 30;
}

canvas.addEventListener('mousedown', (evt) => {
    const mousePos = getMousePos(canvas, evt);
    points.forEach(point => {
        if (isInside(point, mousePos)) {
            if (!selectedPoints.includes(point)) {
                selectedPoints.push(point);
                drawPoints();
            }
        }
    });
});

function checkSequence() {
    const selectedLetters = selectedPoints.map(point => point.letter);
    if (JSON.stringify(selectedLetters) === JSON.stringify(correctSequence)) {
        message.innerText = '¡Correcto! ¡Bien hecho!';
        message.style.color = '#4caf50';
    } else {
        message.innerText = 'Incorrecto, inténtalo de nuevo.';
        message.style.color = '#f44336';
    }
}

drawPoints();



