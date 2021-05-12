import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from './Input';
import AuthContext from '../../store/auth-context';

import classes from './Login.module.css';

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
      setFormIsValid(emailValidity && passwordValidity);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [emailValidity, passwordValidity]);

  const authCtx = useContext(AuthContext);

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
    authCtx.onLogin(enteredEmailState, enteredPasswordState);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={emailValidity}
          id="email"
          labelText="E-Mail"
          inputType="email"
          inputValue={enteredEmailState.value}
          inputOnChange={emailChangeHandler}
          inputOnBlur={validateEmailHandler}
        />
        <Input
          isValid={passwordValidity}
          id="password"
          labelText="Password"
          inputType="password"
          inputValue={enteredPasswordState.value}
          inputOnChange={passwordChangeHandler}
          inputOnBlur={validatePasswordHandler}
        />
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
