import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const focus = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: focus,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        ref={inputRef}
        type={props.inputType}
        id={props.id}
        value={props.inputValue}
        onChange={props.inputOnChange}
        onBlur={props.inputOnBlur}
      />
    </div>
  );
});

export default Input;
