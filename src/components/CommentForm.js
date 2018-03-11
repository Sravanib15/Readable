import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { createComment } from '../actions/commentsActions'
import serializeForm from 'form-serialize';

class CommentForm extends Component {
  state = {
    comment: {},
    "selectedPost": ''
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
    const values = serializeForm(e.target, { hash: true });
    const { body, author} = values;
    console.log(values);
    let { comment, selectedPost } = this.state;
    comment.body = body;
    comment.author = author;
    console.log(this.state);
    this.props.dispatch(createComment(comment));
    this.props.history.push(`/${selectedPost}/comments`);
  }

  componentWillMount() {
      const selectedPost = this.props.match.params.post;
      this.setState({
        comment: {
          "id": this.guid(),
          "timestamp": Date.now(),
          "body": "",
          "author": "",
          "parentId": selectedPost
        },
        selectedPost
      })
  }

  render() {
    const { selectedPost } = this.state;
    return (
      <div>
        <Link to={`/${selectedPost}/comments`} className='close-arrow-back'> Close </Link>
        <form onSubmit={this.handleSubmit}>
          <div>
            <p>
              Body:
              <input type='text' placeholder='Body' name='body'/>
            </p>
            <p>
              Author:
              <input type='text' placeholder='Author' name='author'/>
            </p>
            <button>Add Comment</button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ commentsReducer, postReducer }, props) {
  return {
    "selectedPost": props.match.params.post
  }
}

export default withRouter(connect(
  mapStateToProps
)(CommentForm))
