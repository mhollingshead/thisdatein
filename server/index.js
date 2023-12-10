const fs = require('fs');
const wtf = require('wtf_wikipedia');
const { getArticleTitle } = require('./common/utils');
const { extractRounds } = require('./extractors/extractors');

(async () => {
    // Get the existing data
    const data = JSON.parse(fs.readFileSync('./data.json'));

    // Get the previous date
    const previousDate = new Date(data.date);
    // Create the next date (the day after the current date)
    const currentDate = new Date(previousDate.getTime());
    currentDate.setDate(previousDate.getDate() + 1);

    // Fetch and parse the next date's wikipedia page
    const doc = await wtf.fetch(getArticleTitle(currentDate));

    // Update data.json with the new game
    fs.writeFileSync(
        './data.json',
        JSON.stringify(
            {
                date: currentDate.getTime(),
                rounds: extractRounds(doc)
            },
            null,
            4
        )
    );
})();
