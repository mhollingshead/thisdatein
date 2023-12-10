import { Box, Modal, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { getHighScores } from '../../storage/storage';
import './Modals.scss';
import { MONTHS } from '../../common/constants';

const Modals = ({ statsModalOpen, helpModalOpen, closeStatsModal, closeHelpModal }) => {
    const highScores = getHighScores();

    return (
        <>
            <Modal open={statsModalOpen} onClose={closeStatsModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        backgroundColor: '#fff',
                        maxWidth: '480px',
                        width: 'calc(100% - 2rem)',
                        transform: 'translateX(-50%) translateY(-50%)',
                        top: '50%',
                        left: '50%',
                        borderRadius: '3px'
                    }}
                    p={4}
                >
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Close onClick={closeStatsModal} sx={{ cursor: 'pointer' }} />
                    </Box>
                    <Typography variant='h5' mb={3}>
                        <b>High Scores</b>
                    </Typography>
                    {highScores.length > 0 && (
                        <table className='high-scores'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Date</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {highScores.map((score, i) => (
                                    <tr key={`score-${i}`}>
                                        <td>
                                            <Typography
                                                variant='body2'
                                                textAlign='center'
                                            >
                                                {i + 1}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography
                                                variant='body2'
                                                textAlign='center'
                                            >
                                                {MONTHS[new Date(score.date).getMonth()]}{' '}
                                                {new Date(score.date).getDate()}{' '}
                                                {new Date(score.date).getFullYear()}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography
                                                variant='body1'
                                                textAlign='center'
                                            >
                                                <b>{score.score}</b>
                                            </Typography>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {highScores.length === 0 && (
                        <Typography variant='body2' textAlign='center'>
                            <i>No high scores yet!</i>
                        </Typography>
                    )}
                </Box>
            </Modal>
            <Modal open={helpModalOpen} onClose={closeHelpModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        backgroundColor: '#fff',
                        maxWidth: '480px',
                        width: 'calc(100% - 2rem)',
                        transform: 'translateX(-50%) translateY(-50%)',
                        top: '50%',
                        left: '50%',
                        borderRadius: '3px'
                    }}
                    p={4}
                >
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Close onClick={closeHelpModal} sx={{ cursor: 'pointer' }} />
                    </Box>
                    <Typography variant='h5' mb={3}>
                        <b>How to Play</b>
                    </Typography>
                    <Typography variant='body1' mb={2}>
                        Guess the years of historical events that occurred on today's date!
                    </Typography>
                    <Typography variant='body1' mb={3}>
                        Over 5 rounds, earn points based on the accuracy of your guesses. Return
                        daily to aim for a high score!
                    </Typography>
                    {/* <Divider mb={3} /> */}
                </Box>
            </Modal>
        </>
    );
};

export default Modals;
