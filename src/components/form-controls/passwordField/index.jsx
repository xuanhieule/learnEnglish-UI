import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label:PropTypes.string.isRequired,
    
};

function PasswordField(props) {
    const {form, name, label} = props;
    const { errors, formState } = form;
    const hasError = formState.touched[name] && errors[name];
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword =() => {
        setShowPassword(x => !x)
    }
    return (
        <div>
            
        <FormControl margin="normal" fullWidth variant="outlined">
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Controller
          name={name}
          control={form.control}
          as={OutlinedInput}
            id={name}
            type={showPassword ? 'text' : 'password'}
            label={label}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            error={!!hasError}
            helperText={errors[name]?.message}
            inputProps={{
              style: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: "2rem",
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: "2rem",
              },
            }}
          /> </FormControl>
        </div>
        
    );
}

export default PasswordField;