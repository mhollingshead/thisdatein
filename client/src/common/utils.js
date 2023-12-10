export const getDefaultSliderYears = () => [
    Math.floor(1901 + (new Date().getFullYear() - 1901) / 2),
    Math.floor(1901 + (new Date().getFullYear() - 1901) / 2)
];

export const getSliderMarks = () => {
    const marks = [
        {
            value: 1901,
            label: 1901
        }
    ];
    let step = 20;
    const min = 1900 + step;
    const max = new Date().getFullYear();

    let current = min;

    while (current < max) {
        marks.push({
            value: max - current < step ? max : current,
            label: max - current < step ? max : current
        });
        current += step;
    }

    step = 10;

    current = 1900 + step;

    while (current < max) {
        if (!(max - current < step)) {
            marks.push({
                value: current,
                label: ''
            });
        }

        current += step;
    }

    return marks;
};

export const incrementScore = (score, points, setState) => {
    // The duration of the increment effect
    const duration = 1000;

    // Browsers limit the ms between intervals to around 10, so we need to find
    // how many steps we need to increment each interval
    let steps = points;
    while (steps > 0 && duration / steps < 10) {
        steps--;
    }
    const increment = points / steps;

    // Add the points to the new store
    const newScore = score + points;

    // Create a variable to store the incrementing score value
    let i = score;
    // Set the interval
    const interval = setInterval(() => {
        // If we've reached the new score, clear the interval
        if (+i.toFixed(0) === newScore) {
            clearInterval(interval);
        } else {
            // Otherwise, increment the score and update in state
            i += increment;
            setState(+i.toFixed(0));
        }
    }, duration / steps);
};
