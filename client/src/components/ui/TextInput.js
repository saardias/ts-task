import * as React from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const TextInput = ({ label, value, setValue, onSubmit }) => {

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onKeyDown = (event) => {
        if (event.key === 'Enter' && (value.trim(''))) {
            onSubmit();
        }
    }

    return (
        <TextField
            label={label}
            id="outlined-start-adornment"
            sx={{ m: 1, width: '100%' }}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton
                            disabled={!(value.trim(''))}
                            onClick={onSubmit}
                            edge="end">
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}

TextInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func,
    onSubmit: PropTypes.func
};

TextInput.defaultProps = {
    label: '',
    value: '',
    setValue: () => { },
    onSubmit: () => { },
};

export default TextInput;
