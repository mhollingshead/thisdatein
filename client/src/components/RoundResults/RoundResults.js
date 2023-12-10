import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { incrementScore } from '../../common/utils';
import './RoundResults.scss';

const RoundResults = ({ results, currentRound, handleNextRound, setRoundOver }) => {
    const [roundScore, setRoundScore] = useState(0);

    useEffect(() => {
        incrementScore(0, results.score, setRoundScore);
    }, []);

    const distance = Math.abs(results.guess - results.answer);

    return (
        <Box>
            <Box sx={{ textAlign: 'center' }} mb={4} className='fade-in'>
                <Typography variant='body1'>
                    You were <b>{distance}</b> year{distance !== 1 ? 's' : ''} away!
                </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }} mb={4}>
                <Typography variant='overline' sx={{ lineHeight: 1.5 }}>
                    Round Score
                </Typography>
                <Typography variant='h4'>
                    <b>{roundScore}</b>
                </Typography>
            </Box>
            {currentRound < 4 && (
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        variant='outlined'
                        onClick={() => {
                            setRoundOver(false);
                            handleNextRound();
                        }}
                        sx={{
                            width: '100%',
                            '.MuiSvgIcon-root': {
                                transition: 'transform 0.25s'
                            },
                            '&:hover .MuiSvgIcon-root': {
                                transform: 'translateX(4px)'
                            }
                        }}
                        endIcon={<ChevronRight />}
                    >
                        Next round
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default RoundResults;
