import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useHistory } from "react-router";
import './Signup.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const date = new Date();
  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, fullname, email, password));

      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords must be matched.'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFullname = (e) => {
    setFullname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-page'>
      <div className="signup-top">
          <img
            className="login-logo"
            src="https://fontmeme.com/permalink/220617/310e477cf85c7466a813f402a3e3fe0c.png" alt="generate-text-with-any-font" border="0"
          />

        <form className='signup-form' onSubmit={onSignUp}>
          <input
            placeholder="Email*"
            className="signup-input"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            required={true}
            autoComplete="off"
          ></input>
          <input
            placeholder="Full Name*"
            className="signup-input"
            type="text"
            name="fullname"
            onChange={updateFullname}
            value={fullname}
            autoComplete="off"
            required={true}
          ></input>
          <input
            placeholder="Username*"
            className="signup-input"
            type="text"
            name="username"
            onChange={updateUsername}
            autoComplete="off"
            value={username}
            required={true}
          ></input>
          <input
            placeholder="Password*"
            className="signup-input"
            type="password"
            name="password"
            autoComplete="off"
            onChange={updatePassword}
            value={password}
            required={true}
          ></input>
          <input
            placeholder="Repeat Password*"
            autoComplete="off"
            className="signup-input"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
          <button
            className="signup-submit"
            type="submit"
            disabled={
              username.length < 1 ||
              email.length < 1 ||
              password.length < 1 ||
              repeatPassword.length < 1 ||
              fullname.length < 1
            }>
            Sign Up
          </button>
        </form>
        <div className='login-errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      </div>
      <div className="signup-bot">
        Have an account?{" "}
        <span onClick={() => history.push("/login")} className="signup-log">
          Log in
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
