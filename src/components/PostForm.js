import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions'

class PostForm extends Component {

  state = {
    "post": {
    "timestamp":Date.now()
    },
    "selectedCategory": ''
  }

  guid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const category = this.props.match.params.category;
    console.log(this.props);
    const values = serializeForm(e.target, { hash: true });
    const { title, body, author} = values;
    console.log(values);
    let { post } = this.state;
    post.title = title;
    post.body = body;
    post.author = author;
    post.category = category;
    console.log(this.state);
    this.props.dispatch(createPost(post));
    this.props.history.push(`/${category}/posts`);
  }

  componentWillMount() {
    console.log(this.props);
    const selectedCategory = this.props.match.params.category;
    this.setState({
      post: {
        "id": this.guid(),
        "timestamp": Date.now(),
        "body": "",
        "author": "",
        "category": selectedCategory
      },
      selectedCategory
    })
  }

  render() {
    const { selectedCategory } = this.state;
    return (
      <div>
          <Link to={`/${selectedCategory}/posts`} className='close-arrow-back'> Close </Link>
          <form onSubmit={this.handleSubmit} className="create-post-form">
            <div className="create-post-details">
              <p>
                Title:
                <input type='text' placeholder='Title' name='title'/>
              </p>
              <p>
                Body:
                <input type='text' placeholder='Body' cols="40" rows="5" name='body'/>
              </p>
              <p>
                Author:
                <input type='text' placeholder='Author' name='author'/>
              </p>
              <button>Add Post</button>
            </div>
          </form>
      </div>
    )
  }
}

export default withRouter(connect(
)(PostForm))
