# How to animate?

const AnimationSpeed = {
    FAST: 200ms,
    MEDIUM: 500ms,
    SLOW: 1000ms
};

const FPS = 60;
const TPF = 17ms;

animateMove(pathPoints, AnimationSpeed.MEDIUM);
{
    const lines = getLines(points);

    lines.forEach(line => {
    });

    moveFameInterval(line, startPoint);
}

moveInterval = (line, startPoint) => {
    lineLength = getLineLength(line);
    movePoint =  startPoint + some-interval-of-lineLength

    if (movePoint === lineEnd) {
        return;
    }

    setTimeout(() => {
        moveInterval(line, movePoint);
    })
};

Might work....