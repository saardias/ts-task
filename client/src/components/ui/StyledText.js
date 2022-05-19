import React from 'react';
import PropTypes from 'prop-types';

import { formatResultSearch } from '../../utils/formats';

const HiglightText = ({ text, query }) => {
    return (
        <span dangerouslySetInnerHTML={{ __html: formatResultSearch(text, query) }} />
    )
}

HiglightText.propTypes = {
    text: PropTypes.string,
    query: PropTypes.string
};

HiglightText.defaultProps = {
    text: '',
    query: ''
};

export default HiglightText;