import React, { Component } from 'react'
import CommentsList from './CommentsList'
import { connect } from 'react-redux'
import { updateCommentVote, deleteComment, sortComments } from '../actions/commentsActions'
import { fetchSelectedPost, updatePostVoteOnForm, modifyPost, deletePost} from '../actions/postActions'
import { withRouter, Link } from 'react-router-dom'
import serializeForm from 'form-serialize';

class PostHome extends Component {
  state = {
    "post": {},
    "category": '',
    "selectedPost": '',
    "editFlag": ''
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
    this.props.dispatch(updatePostVoteOnForm(post, voteType));
  }

  editPost = () => {
    const { selectedPost } = this.props;
    /*
    let edit = this.state.editFlag;
    this.setState({
      editFlag: !edit
    })
    */
    this.props.history.push(`/post/${selectedPost.id}/edit`);
  }

  onDeletePost = (post) => {
    this.props.dispatch(deletePost(post));
    this.props.history.push(`/`);
  }

  editComment = (comment) => {
    this.props.history.push(`/comment/${comment.id}/edit`);
  }

  updateCommentVote = (comment, voteType) => {
    console.log(comment);
    this.props.dispatch(updateCommentVote(comment, voteType));
  }

  onDeleteComment = (comment) => {
    this.props.dispatch(deleteComment(comment));
  }

  updateSort = (e) => {
    const { comments } = this.props;
    let index = e.nativeEvent.target.selectedIndex;
    this.props.dispatch(sortComments(comments, e.nativeEvent.target[index].value));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedPost } = this.props;
    const values = serializeForm(e.target, { hash: true });
    const { title, body } = values;
    console.log(this.props);
    selectedPost.title = title;
    selectedPost.body = body;
    this.props.dispatch(modifyPost(selectedPost));
    this.editPost();
  }
  /*
  {
    editFlag ? (
      <form onSubmit={this.handleSubmit} className="create-post-form">
        <div className="create-post-details">
          <p>
            Title:
            <input type='text' placeholder='Title' name='title' defaultValue={selectedPost.title}/>
          </p>
          <p>
            Body:
            <input type='text' placeholder='Body' cols="40" rows="5" name='body' defaultValue={selectedPost.body}/>
          </p>
          <button>Update Post</button>
        </div>
      </form>
    ) : (

    )
  }
  */
  componentWillMount() {
    const category = this.props.match.params.category;
    const post = this.props.match.params.post;
    if(post) {
      const { selectedPost } = this.props;
      this.props.dispatch(fetchSelectedPost(post));
      selectedPost && (this.setState({
        "post": selectedPost,
        "category": selectedPost && selectedPost.category,
        "newpost": false
      }))
    } else {
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
    const { newpost } = this.state;
    console.log(newpost);
    console.log(this.props);
    return (
      <div>
        {
          !newpost && selectedPost && !selectedPost.category && (
            <div>
      				<h2>Page Not Found 404</h2>
      			</div>
          )
        }

        {!newpost && selectedPost && selectedPost.category && (
          <div className="post-home-form">
            <div className="list-post-top">
              <Link to={`/${selectedPost.category}`} className='close-arrow-back'> Close </Link>
              <h2>{selectedPost.title}</h2>
              <button onClick={() => this.editPost()} className="post-home-edit">
                Upvote
              </button>
              <button onClick={() => this.updatePostVote(selectedPost,'upVote')} className="post-home-up-vote">
                Upvote
              </button>
              <button onClick={() => this.updatePostVote(selectedPost, 'downVote')} className="post-home-down-vote">
                Downvote
              </button>
              <button onClick={() => this.onDeletePost(selectedPost)} className='post-remove'>
                Remove
              </button>
            </div>
            <div className="post-form-body">
              {selectedPost.body}
            </div>
            <div>
              <span>
                Author: {selectedPost.author}
              </span>
              <span className="post-form-score">
                Score: {selectedPost.voteScore}
              </span>
            </div>
          </div>
        )}
        {!newpost && selectedPost && selectedPost.category && comments && (
          <div className="list-comments">
            <div className="list-comment-top">
              <h2 className="comments-header">Comments: {comments.length}</h2>
              <select name="sort-by" className="add-comment-sort" defaultValue="timestamp" onChange={this.updateSort}>
                <option value="timestamp">Date</option>
                <option value="voteScore">Score</option>
              </select>
              <Link
                  to={"/"+selectedPost.id+"/comment/new"}
                  className='add-comment'
              >
                Add Comment
              </Link>
            </div>
            {
              <CommentsList
                comments={comments}
                editComment={this.editComment}
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
  console.log(postReducer);
  const { comments, sortBy } = commentsReducer;
  const sortedComments = [].concat(comments)
    .sort((a, b) => a[sortBy] < b[sortBy])
  const { selectedPost } = postReducer;
  return {
    selectedPost,
    "comments": sortedComments
  }
}

export default withRouter(connect(
  mapStateToProps
)(PostHome))
