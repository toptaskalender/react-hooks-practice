import React from 'react';

import classes from './Input.module.css';

const Input = props => {
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        type={props.inputType}
        id={props.id}
        value={props.inputValue}
        onChange={props.inputOnChange}
        onBlur={props.inputOnBlur}
      />
    </div>
  );
};

export default Input;
