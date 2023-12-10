import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import './Countdown.scss';

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState('00:00:00');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const difference = Math.floor((tomorrow - now) / 1000);

            if (difference > 0) {
                const hours = Math.floor(difference / 3600);
                const minutes = Math.floor((difference % 3600) / 60);
                const seconds = difference % 60;

                setTimeLeft(
                    `${hours.toString().padStart(2, '0')}:${minutes
                        .toString()
                        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                );
            } else {
                setTimeLeft('00:00:00');
            }
        };

        calculateTimeLeft();

        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Typography variant='h4'>
            <b>{timeLeft}</b>
        </Typography>
    );
};

export default Countdown;
