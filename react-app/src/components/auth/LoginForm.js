import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './Login.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const demoLogin = async () => {
    await dispatch(login("demo@aa.io", "password"));
  };

  return (
    <div className='login-page'>

      <div className='login-page-left'>
        <img className='login-img' src='https://t4.ftcdn.net/jpg/01/10/52/05/240_F_110520599_LSEtlBbLG09ZXiiWbTubjqEpD2jeCBZO.jpg'></img>
      </div>

      <div className="login-page-right">

        <div className="login-top">
          <img
            className="login-logo"
            src=""
          />
        </div>

        <form onSubmit={onLogin} className="login-form">
          <input
            className='login-email'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
          <input
            className='login-password'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <button className='login-submit'
            type='submit'
            disabled={email.length < 1 || password.length < 1}>
            Login
          </button>
        </form>

        <div className="login-or">
          <div className="login-line"></div>
          <div className="l-or">OR</div>
          <div className="login-line"></div>
        </div>

        <div className='login-demo'>
          <div className="demo-link" onClick={demoLogin}>
            Log in as Demo
          </div>
        </div>

        <div className='login-errors'>
          {errors?.map((error, ind) => (
            <div className='login-err-msg' key={ind}>{error}</div>
          ))}
        </div>

        <div className="login-signup">
          <div className="login-signup-word">
            Don't have an account?{" "}
            <span
              className="signup-link"
              onClick={() => history.push("/signup")}>
              Sign Up
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;
