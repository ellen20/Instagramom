import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User/User';
import Navigation from './components/Navigation/Navigation';
import Post from './components/Post/Post';
import Home from "./components/Home/Home";
import { authenticate } from './store/session';
import PostComment from './components/PostComment/PostComment';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { getAllPosts } from './store/post';
// import EditPost from './components/EditPost/EditPost';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts)
  const comments = useSelector(state => state.comments)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getAllPosts());

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
          <PostComment posts={posts} />
        </ProtectedRoute>

        {/* <ProtectedRoute path="/posts/:postId/edit" exact={true}>
          <Navigation />
          <EditPost posts={posts} />
        </ProtectedRoute> */}

        <ProtectedRoute path='/users/:userId' exact={true} >
          <Navigation />
          <User />
        </ProtectedRoute>

        <Route>
          <PageNotFound />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
