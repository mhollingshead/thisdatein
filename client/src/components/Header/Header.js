import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { BarChart, HelpOutline } from '@mui/icons-material';
import Modals from '../Modals';
import './Header.scss';

const Header = () => {
    const [statsModalOpen, setStatsModalOpen] = useState(false);
    const [helpModalOpen, setHelpModalOpen] = useState(false);

    const openStatsModal = () => setStatsModalOpen(true);
    const closeStatsModal = () => setStatsModalOpen(false);
    const openHelpModal = () => setHelpModalOpen(true);
    const closeHelpModal = () => setHelpModalOpen(false);

    return (
        <header className='Header'>
            <Box className='Header__content' mx='auto'>
                <h1 className='Header__logo'>ThisDateIn</h1>
                <nav className='Header__menu'>
                    <IconButton color='primary' onClick={openStatsModal}>
                        <BarChart />
                    </IconButton>
                    <IconButton color='primary' onClick={openHelpModal}>
                        <HelpOutline />
                    </IconButton>
                </nav>
            </Box>
            <Modals
                statsModalOpen={statsModalOpen}
                helpModalOpen={helpModalOpen}
                closeStatsModal={closeStatsModal}
                closeHelpModal={closeHelpModal}
            />
        </header>
    );
};

export default Header;
