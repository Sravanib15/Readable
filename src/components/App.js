import React, { Component } from 'react';
import Homepage from './Homepage'
import CategoryHome from './CategoryHome'
import PostHome from './PostHome'
import CommentForm from './CommentForm'
import PostForm from './PostForm'
import { withRouter, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/:category' component={CategoryHome}/>
        <Route exact path='/:category/:post' component={PostHome}/>
        <Route exact path='/:category/post/new' component={PostForm}/>
        <Route exact path='/post/:post/edit' component={PostForm}/>
        <Route exact path='/:post/comment/new' component={CommentForm}/>
        <Route exact path='/comment/:comment/edit' component={CommentForm}/>
      </div>
    );
  }
}

export default withRouter(App);
