import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = (props) => {

  const { name, placeholder, value, error, info, onChange } = props;

  return (
    <div className="form-group">
      <textarea
        value={value}
        className={classnames('form-control form-control-md', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextAreaFieldGroup;
