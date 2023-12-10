import { Box, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { incrementScore } from '../../common/utils';
import { MONTHS } from '../../common/constants';
import './GameInfo.scss';

const GameInfo = ({ date }) => {
    const score = useSelector((state) => state.game.score);
    const currentRound = useSelector((state) => state.game.currentRound);

    const [displayScore, setDisplayScore] = useState(score);

    useEffect(() => {
        incrementScore(displayScore, score - displayScore, setDisplayScore);
    }, [score]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mb={4}>
            <Box>
                <Stack alignItems='center'>
                    <Typography variant='overline' sx={{ lineHeight: 1.2 }}>
                        Score
                    </Typography>
                    <Typography variant='body1'>
                        <b>{displayScore}</b>
                    </Typography>
                </Stack>
            </Box>
            <Box>
                <Typography variant='overline' sx={{ lineHeight: 1.2 }}>
                    <Stack>
                        <b>
                            {MONTHS[new Date(date).getMonth()]} {new Date(date).getDate()}
                        </b>
                    </Stack>
                </Typography>
            </Box>
            <Box>
                <Stack alignItems='center'>
                    <Typography variant='overline' sx={{ lineHeight: 1.2 }}>
                        Round
                    </Typography>
                    <Typography variant='body1'>
                        <b>{currentRound + 1}</b>/5
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
};

export default GameInfo;
