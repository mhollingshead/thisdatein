import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import { getDefaultSliderYears } from '../../common/utils';
import Info from '../Info';
import RoundInputs from '../RoundInputs';
import RoundResults from '../RoundResults';
import './Round.scss';

const Round = ({ handleRoundOver, handleNextRound }) => {
    const [sliderYears, setSliderYears] = useState(getDefaultSliderYears());
    const [roundOver, setRoundOver] = useState(false);

    const rounds = useSelector((state) => state.game.rounds);
    const currentRound = useSelector((state) => state.game.currentRound);

    useEffect(() => {
        // Whenever the round changes, reset state
        setRoundOver(false);
        setSliderYears(getDefaultSliderYears());
    }, [currentRound]);

    return (
        <Box>
            <Info info={rounds[currentRound]} key={currentRound} />
            <RoundInputs
                sliderYears={sliderYears}
                setSliderYears={setSliderYears}
                roundOver={roundOver}
            />
            {!roundOver && (
                <Button
                    sx={{ width: '100%' }}
                    variant='contained'
                    onClick={() => {
                        setRoundOver(true);
                        handleRoundOver({ guess: sliderYears[0], data: rounds[currentRound] });
                        setSliderYears([sliderYears[0], rounds[currentRound].year]);
                        if (currentRound === 4) {
                            setTimeout(handleNextRound, 1000);
                        }
                    }}
                >
                    Guess
                </Button>
            )}
            {roundOver && (
                <RoundResults
                    results={{
                        guess: sliderYears[0],
                        answer: rounds[currentRound].year,
                        score: Math.max(
                            5000 - Math.abs(sliderYears[0] - rounds[currentRound].year) ** 2 * 25,
                            0
                        )
                    }}
                    currentRound={currentRound}
                    handleNextRound={handleNextRound}
                    setRoundOver={setRoundOver}
                />
            )}
        </Box>
    );
};

export default Round;
