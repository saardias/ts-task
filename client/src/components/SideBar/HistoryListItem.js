import React from "react";
import styled from 'styled-components'
import PropTypes from 'prop-types';

import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

const HistoryItemContainer = styled(ListItemButton)`
    height: 60px;
    width: 100%;
`
const HistoryListItem = ({ text, onClick }) => {
    return (
        <HistoryItemContainer onClick={onClick}>
            <ListItemText primary={text} />
        </HistoryItemContainer>
    )
}

HistoryItemContainer.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func
};

HistoryItemContainer.defaultProps = {
    text: '',
    onClick: () => { }
};

export default HistoryListItem