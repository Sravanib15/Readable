import React, { Component } from 'react'
import CommentsList from './CommentsList'
import PostForm from './PostForm'
import { connect } from 'react-redux'
import { fetchPostComments, updateCommentVote, deleteComment } from '../actions/commentsActions'
import { fetchSelectedPost, updatePostVote } from '../actions/postActions'
import { withRouter, Link } from 'react-router-dom'
import serializeForm from 'form-serialize';

class PostHome extends Component {
  state = {
    "post": {},
    "category": '',
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
  updatePostVote = (post, voteType) => {
    this.props.dispatch(updatePostVote(post, voteType));
  }

  updateCommentVote = (comment, voteType) => {
    this.props.dispatch(updateCommentVote(comment, voteType));
  }

  onDeleteComment = (comment) => {
    this.props.dispatch(deleteComment(comment));
  }

  componentWillMount() {
    if (this.props.match.params.post) {
      const { selectedPost } = this.props;
      console.log(this.props);
      console.log(selectedPost);
      this.props.dispatch(fetchSelectedPost(this.props.match.params.post));
      selectedPost && (this.setState({
        "post": selectedPost,
        "category": selectedPost && selectedPost.category,
        "newpost": false
      }))
    } else {
      const category = this.props.match.params.category;
      console.log(category);
      this.setState({
        post: {
          "id": this.guid(),
          "title": "",
          "body": "",
          "author": "",
          "category": category
        },
        "category": category,
        "newpost": true
      })
    }
  }

  render() {
    const { comments, selectedPost} = this.props;
    const { newpost, category } = this.state;
    console.log(comments);
    console.log("selectedPost: " + JSON.stringify(selectedPost));
    console.log("newpost: " + newpost);
    console.log("category: " + category);
    return (
      <div>
        {newpost && (
          <PostForm category/>
        )}

        {selectedPost && (
          <div>
            <p>
              <h2>{selectedPost.title}</h2>
            </p>
            <div>
              {selectedPost.body}
            </div>
            <p>
              Author: {selectedPost.author}
              Score: {selectedPost.voteScore}
            </p>
            <button onClick={() => this.updatePostVote(selectedPost,'upVote')}>
              Upvote
            </button>
            <button onClick={() => this.updatePostVote(selectedPost, 'downVote')}>
              Downvote
            </button>
          </div>
        )}
        {!newpost && selectedPost && comments && (
          <div className="list-comments">
            <div className="list-comment-top">
              <h2>Comments</h2>
              <Link
                  to={"/"+selectedPost.id+"/CommentForm"}
                  className='add-comment'
              >
                Add Comment
              </Link>
            </div>
            {
              <CommentsList
                comments={comments}
                updateCommentVote={this.updateCommentVote}
                onDeleteComment={this.onDeleteComment}
              />
            }
          </div>
        )}
      </div>
    )
  }
}


function mapStateToProps ({ commentsReducer, postReducer }, props) {
  const { comments } = commentsReducer;
  const { selectedPost } = postReducer;
  const paramPost = props.match.params.post;
  //const currentPostArray = posts.filter(post => post.id === paramPost);
  //const currentPost = currentPostArray && currentPostArray.length > 0 && currentPostArray[0];
  return {
    selectedPost,
    comments
  }
}

export default withRouter(connect(
  mapStateToProps
)(PostHome))
