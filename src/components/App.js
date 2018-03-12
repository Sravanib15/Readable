import React, { Component } from 'react';
import Homepage from './Homepage'
import CategoryHome from './CategoryHome'
import PostHome from './PostHome'
import CommentForm from './CommentForm'
import { withRouter, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Route exact path='/' component={Homepage}/>
        <Route path='/:category/posts' component={CategoryHome}/>
        <Route path='/:post/comments' component={PostHome}/>
        <Route path='/:category/newpost' component={PostHome}/>
        <Route path='/:post/newcomment' component={CommentForm}/>
      </div>
    );
  }
}

export default withRouter(App);
