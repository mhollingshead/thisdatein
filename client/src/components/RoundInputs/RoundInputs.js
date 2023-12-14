import { Box, Slider } from '@mui/material';
import { getSliderMarks } from '../../common/utils';
import './RoundInputs.scss';

const RoundInputs = ({ sliderYears, setSliderYears, roundOver }) => {
    const handleChange = (_, newValue) => {
        const value = newValue.find((value) => value !== sliderYears[0]);
        setSliderYears([value, value]);
    };

    return (
        <Box pt={4} mb={4}>
            {
                <Slider
                    className={
                        roundOver
                            ? sliderYears[1] >= sliderYears[0]
                                ? 'after'
                                : 'before'
                            : 'picking'
                    }
                    value={sliderYears}
                    valueLabelDisplay='on'
                    track={false}
                    step={1}
                    min={1901}
                    max={new Date().getFullYear()}
                    marks={getSliderMarks()}
                    disabled={roundOver}
                    onChange={handleChange}
                />
            }
        </Box>
    );
};

export default RoundInputs;
