import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { createComment, modifyComment, fetchSelectedComment } from '../actions/commentsActions'
import { fetchSelectedPost } from '../actions/postActions'
import serializeForm from 'form-serialize';

class CommentForm extends Component {
  state = {
    "selectedComment": {},
    "selectedPost": {},
    "selectedCategory": "",
    "status":""
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
    console.log(this.props);
    console.log(this.state);
    const values = serializeForm(e.target, { hash: true });
    const { body, author} = values;
    let { selectedComment, selectedPost, selectedCategory, status } = this.state;
    selectedComment = selectedComment || this.props.selectedComment;
    selectedComment.body = body;
    selectedComment.author = author;
    if(status === "new")
      this.props.dispatch(createComment(selectedComment))
    else {
      this.props.dispatch(modifyComment(selectedComment));
    }
    this.props.history.push(`/${selectedPost.category}/${selectedComment.parentId}`);
  }

  componentWillMount() {
      const post = this.props.match.params.post;
      const urlCommentId = this.props.match.params.comment;
      this.props.dispatch(fetchSelectedPost(post));
      if(urlCommentId) {
        this.props.dispatch(fetchSelectedComment(urlCommentId));
        const { selectedComment } = this.props
        if(selectedComment && selectedComment.parentId)
          this.props.dispatch(fetchSelectedPost(post));
        const { selectedPost } = this.props;
        this.setState({
          selectedComment,
          selectedPost,
          "selectedCategory": selectedPost || selectedPost.category,
          "status": "edit"
        })
      } else {
        const { selectedPost } = this.props;
        this.setState({
          "selectedComment": {
            "id": this.guid(),
            "timestamp": Date.now(),
            "body": "",
            "author": "",
            "parentId": post
          },
          selectedPost,
          "selectedCategory": selectedPost.category,
          "status": "new"
        })
      }
  }

  render() {
    const { selectedPost, status } = this.state;
    let selectedComment = this.state.selectedComment || this.props.selectedComment;
    console.log(this.state);
    console.log(selectedComment);
    return (
      <div>
        <Link to={`/${selectedPost.category}/${selectedPost}`} className='close-arrow-back'> Close </Link>
        <form onSubmit={this.handleSubmit} className="create-comment-form">
          <div className='create-comment-details'>
            {
              status === "new" && (
                <div>
                  Body:  <input type='text' placeholder='Body' name='body'/>
                  Author:  <input type='text' placeholder='Author' name='author'/>
                  <button>Add Comment</button>
                </div>
              )
            }
            {
              status === "edit" && selectedComment && (
                <div>
                  Body:  <input type='text' placeholder='Body' defaultValue={selectedComment.body} name='body'/>
                  <button>Edit Comment</button>
                </div>
              )
            }
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ commentsReducer, postReducer }, props) {
  return {
    "selectedPost": postReducer.selectedPost,
    "selectedComment": commentsReducer.selectedComment
  }
}

export default withRouter(connect(
  mapStateToProps
)(CommentForm))
