import React from "react";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import HistoryIcon from '@mui/icons-material/History';
import Toolbar from '@mui/material/Toolbar';

import { drawerWidth } from "../../constants/theme";

const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const AppBar = ({ open, setOpen, title }) => {

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <StyledAppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <HistoryIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {title}
                </Typography>
            </Toolbar>
        </StyledAppBar>
    );
};

AppBar.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    title: PropTypes.string
};

AppBar.defaultProps = {
    open: true,
    setOpen: () => { },
    title: 'Title'
};

export default AppBar;