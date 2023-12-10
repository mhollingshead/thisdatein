const { shuffle } = require('../common/utils');

const extractEvents = (doc) => {
    const rounds = doc
        // Get the article's sections
        .sections()
        // Find the section titled 'Events'
        .find((section) => section.title() === 'Events')
        // Get the third subsection '1901–present'
        .children()[2]
        // Get the list of events
        .lists()[0]
        // Extract the text from each list item
        .lines()
        // Split the lines into years and events
        .map((line) => {
            const [year, event] = line.text().split(' – ');
            return { year: +year.trim(), event: event.replace(/\(See .+\)/g, '').trim() };
        })
        // Filter out any events that include the year
        .filter((round) => !round.event.includes(round.year));

    // Shuffle the rounds and select the first 5
    return shuffle(rounds).slice(0, 5);
};

const extractNotableBirths = (doc, roundYear) => {
    return (
        doc
            // Get the article's sections
            .sections()
            // Find the section titled 'Births'
            .find((section) => section.title() === 'Births')
            // Get the third subsection '1901–present'
            .children()[2]
            // Get the list of births
            .lists()[0]
            // Extract the text from each list item
            .lines()
            // Split the lines into years and births
            .map((line) => {
                const [year, birth] = line.text().split(' – ');
                // Return the birth only if the year matches the round year
                return +year.trim() !== roundYear 
                    ? null
                    // Remove the death year if necessary
                    : birth?.replace(/\(d\..+\)/g, '').trim();
            })
            // Filter out null births
            .filter((birth) => birth)
    );
};

const extractNotableDeaths = (doc, roundYear) => {
    return (
        doc
            // Get the article's sections
            .sections()
            // Find the section titled 'Deaths'
            .find((section) => section.title() === 'Deaths')
            // Get the third subsection '1901–present'
            .children()[2]
            // Get the list of births
            .lists()[0]
            // Extract the text from each list item
            .lines()
            // Split the lines into years and births
            .map((line) => {
                const [year, death] = line.text().split(' – ');
                // Return the birth only if the year matches the round year
                return +year.trim() !== roundYear 
                    ? null
                    // Remove the birth year if necessary
                    : death?.replace(/\(b\..+\)/g, '').trim();
            })
            // Filter out null deaths or list items that contain nested lists
            .filter((death) => death && !death.endsWith(':'))
    );
};

const extractRounds = (doc) => {
    // Extract 5 randomly selected events and the years they took place
    const events = extractEvents(doc);

    // Add notable births and deaths to each round
    const rounds = events.map(event => ({
        ...event,
        births: extractNotableBirths(doc, event.year),
        deaths: extractNotableDeaths(doc, event.year)
    }));

    // Return the final game rounds
    return rounds;
};

module.exports = { extractRounds };