import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

import HiglightText from './StyledText';

const StyledButton = styled(Button)`
    width: 100%;
    margin: 5px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: initial;
    text-align: start;
    padding: 10px;
`;

const LinkCard = ({ link, text, query }) => {

    return (
        <StyledButton href={link} rel="noopener noreferrer" target="_blank" variant="outlined">
            <HiglightText text={text} query={query} />
        </StyledButton>
    )
}

LinkCard.propTypes = {
    link: PropTypes.string,
    text: PropTypes.string,
    query: PropTypes.string
};

LinkCard.defaultProps = {
    link: '',
    text: '',
    query: ''
};

export default LinkCard;
