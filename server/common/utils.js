const { months } = require('./constants');

const toTimestamp = (date) => {
    return +date;
};

const getArticleTitle = (date) => {
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${month}_${day}`;
};

const shuffle = (array) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

module.exports = { toTimestamp, getArticleTitle, shuffle };
