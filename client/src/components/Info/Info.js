import { Box, Stack, Typography } from '@mui/material';
import './Info.scss';

const Info = ({ info }) => {
    return (
        <Box>
            <Box mb={4}>
                <Typography
                    className='fade-in'
                    variant='body1'
                    sx={{ borderLeft: '5px solid #adcbee', paddingLeft: '9px' }}
                >
                    {info.event}
                </Typography>
            </Box>
            {(info.births.length > 0 || info.deaths.length > 0) && (
                <Stack
                    direction='row'
                    spacing={2}
                    mb={4}
                    sx={{
                        '& > *:nth-child(1)': { opacity: 0, animationDelay: '0.25s' },
                        '& > *:nth-child(2)': { opacity: 0, animationDelay: '0.5s' }
                    }}
                >
                    {info.births.length > 0 && (
                        <Box sx={{ width: '100%' }} className='fade-in'>
                            <Typography variant='overline' mb={2}>
                                Births
                            </Typography>
                            <ul>
                                {info.births.map((birth, i) => (
                                    <li key={`birth-${i}`}>
                                        <Typography variant='body2'>{birth}</Typography>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    )}
                    {info.deaths.length > 0 && (
                        <Box sx={{ width: '100%' }} className='fade-in'>
                            <Typography variant='overline' mb={2}>
                                Deaths
                            </Typography>
                            <ul>
                                {info.deaths.map((death, i) => (
                                    <li key={`death-${i}`}>
                                        <Typography variant='body2'>{death}</Typography>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    )}
                </Stack>
            )}
        </Box>
    );
};

export default Info;
