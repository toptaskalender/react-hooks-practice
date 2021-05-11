import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const reducerEnteredEmail = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ENTERED_EMAIL':
      return {
        value: action.value,
        validity: action.value.includes('@'),
      };
    case 'VALIDATE_ENTERED_EMAIL':
      return {
        value: state.value,
        validity: state.value.includes('@'),
      };

    default:
      throw Error('NO ACCEPTABLE ACTION TYPE');
  }
};

const reducerEnteredPassword = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ENTERED_PASSWORD':
      return {
        value: action.value,
        validity: action.value.trim().length > 6,
      };

    case 'VALIDATE_ENTERED_PASSWORD':
      return {
        value: state.value,
        validity: state.value.trim().length > 6,
      };

    default:
      throw Error('NO ACCEPTABLE ACTION TYPE');
  }
};

const Login = props => {
  const [enteredEmailState, dispatchEnteredEmail] = useReducer(
    reducerEnteredEmail,
    {
      value: '',
      validity: null,
    }
  );

  const [enteredPasswordState, dispatchEnteredPassword] = useReducer(
    reducerEnteredPassword,
    { value: '', validity: null }
  );

  const [formIsValid, setFormIsValid] = useState(false);

  // Alias assignment to pull out specific properties
  const { validity: emailValidity } = enteredEmailState;
  const { validity: passwordValidity } = enteredPasswordState;

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log('useEffect setTimeout');
      setFormIsValid(emailValidity && passwordValidity);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [emailValidity, passwordValidity]);

  // Handlers

  const emailChangeHandler = event => {
    dispatchEnteredEmail({
      type: 'CHANGE_ENTERED_EMAIL',
      value: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEnteredEmail({
      type: 'VALIDATE_ENTERED_EMAIL',
    });
  };

  const passwordChangeHandler = event => {
    dispatchEnteredPassword({
      type: 'CHANGE_ENTERED_PASSWORD',
      value: event.target.value,
    });
  };

  const validatePasswordHandler = () => {
    dispatchEnteredPassword({
      type: 'VALIDATE_ENTERED_PASSWORD',
    });
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onLogin(enteredEmailState, enteredPasswordState);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            enteredEmailState.validity === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            enteredPasswordState.validity === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPasswordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
