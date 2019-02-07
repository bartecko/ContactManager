import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const FormInputGroup = ({label, name, value, placeholder, type, onChange, error}) => {
  return (
    <div>
       <div className="form-group">
            <label htmlFor={name}>{label}:</label>
            <br/>
            <input 
            type={(name === 'number')}
            name={name}
            className={classnames('form-control form-control-lg', {'is-invalid': error})}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
            
        </div>  
    </div>
  )
}

FormInputGroup.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
}

FormInputGroup.defaultProps = {
    type: 'text'
}

export default FormInputGroup;