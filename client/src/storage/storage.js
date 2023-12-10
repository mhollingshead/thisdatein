import { STORAGE_PREFIX } from '../common/constants';

export const storeResults = (results) => {
    localStorage.setItem(STORAGE_PREFIX + 'results', JSON.stringify(results));
};

export const getResults = () => {
    return JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'results') || '{}');
};

export const storeGameState = (state) => {
    localStorage.setItem(STORAGE_PREFIX + 'game-state', JSON.stringify(state));
};

export const getGameState = () => {
    return JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'game-state') || '{}');
};

export const addHighScore = (highScore) => {
    const highScores = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'high-scores') || '[]');
    // Add the new score
    highScores.push(highScore);
    // Update the high scores list by sorting and taking the top 5
    const newHighScores = highScores.sort((a, b) => b.score - a.score).slice(0, 5);
    // Store the high scores list
    localStorage.setItem(STORAGE_PREFIX + 'high-scores', JSON.stringify(newHighScores));
};

export const getHighScores = () => {
    return JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'high-scores') || '[]');
};
