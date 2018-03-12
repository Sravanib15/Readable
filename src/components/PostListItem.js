import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class PostListItem extends Component {

  state = {
    listItemPost: {}
  }
  componentWillMount() {
    this.setState({
      listItemPost: this.props.post
    })
  }
  render() {
    const { post } = this.props;
    return(
      <li key={post.id} className="post-list-item">
        <div className="post-details">
            <Link to={`/${post.id}/comments`}>
              {post.title}
            </Link>
            <div>
              Score: {post.voteScore}
            </div>
        </div>
        <button onClick={() => this.props.updatePostVote(post,'upVote')} className="up-vote">
          Upvote
        </button>
        <button onClick={() => this.props.updatePostVote(post, 'downVote')} className="down-vote">
          Downvote
        </button>
        <button onClick={() => this.props.onDeletePost(post)} className='post-remove'>
          Remove
        </button>
      </li>
    )
  }
)

function mapStateToProps ({ postReducer }, props) {
  let posts = postReducer.posts;
  let { post } = props;
  const currentPostArray = posts.filter(postRecord => postRecord.id === post.id);
  const currentPost = currentPostArray && currentPostArray.length > 0 && currentPostArray[0];
  return {
    post: currentPost
  }
}

export default withRouter(connect(
  mapStateToProps
)(PostListItem))
