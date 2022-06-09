import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User/User';
import Navigation from './components/Navigation/Navigation';
import Post from './components/Post/Post';
import Home from "./components/Home/Home";
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/' exact={true} >
          <Navigation />
          <Home />
        </ProtectedRoute>

        <ProtectedRoute path="/posts/:postId" exact={true}>
          <Navigation />
          <Post />
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <Navigation />
          <User />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
