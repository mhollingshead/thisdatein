import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { incrementScore } from '../../common/utils';
import Countdown from '../Countdown';
import './GameResults.scss';

const GameResults = ({ results, score }) => {
    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        if (displayScore > 0) return;

        incrementScore(0, score, setDisplayScore);
    }, []);

    return (
        <Box>
            <Box sx={{ textAlign: 'center' }} mb={4}>
                <Typography variant='overline'>Next Game</Typography>
                <Countdown />
            </Box>
            <Box sx={{ textAlign: 'center' }} mb={4}>
                <Typography variant='overline'>Score</Typography>
                <Typography variant='h4'>
                    <b>{displayScore}</b>
                </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }} mb={4}>
                <Typography variant='overline'>Results</Typography>
                <table className='results'>
                    <thead>
                        <tr>
                            <th>Rnd</th>
                            <th style={{ textAlign: 'left' }}>Event</th>
                            <th>Guess</th>
                            <th>Answer</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, i) => (
                            <tr
                                key={`result-${i}`}
                                className='fade-in'
                                style={{ animationDelay: `${0.5 + 0.25 * i}s` }}
                            >
                                <td>
                                    <Typography variant='body2'>{i + 1}</Typography>
                                </td>
                                <td style={{ textAlign: 'left' }}>
                                    <Typography
                                        variant='body2'
                                        sx={{
                                            cursor: 'pointer',
                                            borderLeft: '3px solid #adcbee',
                                            paddingLeft: '9px'
                                        }}
                                        className='clamped'
                                        onClick={(e) => e.target.classList.toggle('clamped')}
                                    >
                                        {result.data.event}
                                    </Typography>
                                </td>
                                <td>
                                    <Typography variant='body2'>{result.guess}</Typography>
                                </td>
                                <td>
                                    <Typography variant='body2'>{result.data.year}</Typography>
                                </td>
                                <td>
                                    <Typography variant='body1'>
                                        <b>{result.score}</b>
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
        </Box>
    );
};

export default GameResults;
