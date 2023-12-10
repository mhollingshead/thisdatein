import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addHighScore,
    getGameState,
    getResults,
    storeGameState,
    storeResults
} from './storage/storage';
import {
    addScore,
    nextRound,
    setCurrentRound,
    setResults,
    setRounds,
    setScore
} from './features/game/gameSlice';
import { getCurrentGame } from './data/data';
import Header from './components/Header';
import Round from './components/Round';
import GameInfo from './components/GameInfo';
import GameResults from './components/GameResults';

const App = () => {
    const [date, setDate] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const dispatch = useDispatch();
    const rounds = useSelector((state) => state.game.rounds);
    const currentRound = useSelector((state) => state.game.currentRound);
    const score = useSelector((state) => state.game.score);
    const results = useSelector((state) => state.game.results);

    useEffect(() => {
        getCurrentGame().then((data) => {
            // Set date
            setDate(data.date);
            // Get the last stored game results from localStorage
            const storedResults = getResults();
            // If the stored results were for today's game, they've already played
            if (storedResults.date === data.date && storedResults.data.length === 5) {
                // Skip straight to game over state
                dispatch(setResults(storedResults.data));
                dispatch(setScore(storedResults.score));
                setGameOver(true);
            } else {
                // Set rounds
                dispatch(setRounds(data.rounds));
                // Reset stored results since they aren't for today's game
                if (storedResults.date !== data.date) {
                    storeResults({});
                } else {
                    dispatch(setResults(storedResults.data));
                }
                // Next, check for stored game state
                const storedGameState = getGameState();
                // If the stored game state is for today's game, they're currently playing
                if (storedGameState.date === data.date) {
                    // Update state to their last saved state
                    dispatch(setCurrentRound(storedGameState.data.currentRound));
                    dispatch(setScore(storedGameState.data.score));
                } else {
                    // Reset stored game state since it isn't for today's game
                    storeGameState({});
                }
            }
        });
    }, []);

    const handleGameOver = () => {
        setGameOver(true);
        // Clear stored game state now that the game is over
        storeGameState({});
    };

    const handleNextRound = useCallback(() => {
        // Progress to the next round if more rounds remain
        if (currentRound < 4) {
            // Update current round in state
            dispatch(nextRound());
        }
    }, [currentRound]);

    const handleRoundOver = useCallback(
        (result) => {
            // Calculate the score
            const distance = Math.abs(rounds[currentRound].year - result.guess);
            const roundScore = Math.max(5000 - distance ** 2 * 25, 0);
            // Add the round result to the results array
            const newResults = [...results, { ...result, score: roundScore }];
            // Update the results in state
            dispatch(setResults(newResults));
            // Update the results in localStorage
            storeResults({
                date,
                score: score + roundScore,
                data: newResults
            });
            // Update game state in localStorage
            storeGameState({
                date,
                data: {
                    currentRound: currentRound + 1,
                    score: score + roundScore
                }
            });
            if (currentRound === 4) {
                addHighScore({ date, score: score + roundScore });
                setTimeout(handleGameOver, 4000);
            }
            dispatch(addScore(roundScore));
        },
        [rounds, currentRound, results, score, date]
    );

    return (
        <div className='App'>
            <Header />
            <main>
                {!gameOver && rounds.length > 0 && (
                    <>
                        <GameInfo date={date} />
                        <Round
                            handleRoundOver={handleRoundOver}
                            handleNextRound={handleNextRound}
                        />
                    </>
                )}
                {gameOver && <GameResults results={results} score={score} />}
            </main>
        </div>
    );
};

export default App;
