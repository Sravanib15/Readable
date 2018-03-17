import React, { Component } from 'react'
import PostsList from './PostsList'
import { connect } from 'react-redux'
import { fetchCategoryPosts, updatePostVote, deletePost, sortPosts } from '../actions/postActions'
import { withRouter, Link } from 'react-router-dom'

class CategoryHome extends Component {
  state = {
    "selectedCategory": "",
    "post": ""
  }

  editPost = (post) => {
    this.props.history.push(`/post/${post.id}/edit`);
  }

  updatePostVote = (post, voteType) => {
    this.props.dispatch(updatePostVote(post, voteType));
  }

  onDeletePost = (post) => {
    this.props.dispatch(deletePost(post));
  }

  updateSort = (e) => {
    const { posts } = this.props;
    const index = e.nativeEvent.target.selectedIndex;
    this.props.dispatch(sortPosts(posts, e.nativeEvent.target[index].value));
  }

  componentWillMount() {
    const selectedCategory = this.props.match.params.category;
    const post = this.props.match.params.post;
    this.setState({
      selectedCategory,
      post
    })

    this.props.dispatch(fetchCategoryPosts(selectedCategory));
  }

  render() {
    const { posts } = this.props
    const { selectedCategory, post} = this.state;
    console.log(post);
    return (
      <div className="list-posts">
      {
        selectedCategory && !post && (
          <div>
            <div className="list-post-top">
              <Link to="/" className='close-arrow-back'> Close </Link>
              <h1>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h1>
              <select name="sort-by" className="add-sort" defaultValue="date" onChange={this.updateSort}>
                <option value="timestamp">Date</option>
                <option value="voteScore">Score</option>
              </select>
              <Link
                  to={"/"+selectedCategory+"/post/new"}
                  className="add-post"
              >
                Add Post
              </Link>
            </div>
            <PostsList posts={posts} editPost={this.editPost} updatePostVote={this.updatePostVote} onDeletePost={this.onDeletePost}/>
          </div>
        )
      }
      </div>
    )
  }
}

function mapStateToProps ({ postReducer }, props) {
  const { posts, sortBy } = postReducer
  const sortedPosts = [].concat(posts)
    .sort((a, b) => a[sortBy] < b[sortBy])
  return {
    "selectedCategory": props.match.params.category,
    "posts": sortedPosts
  }
}

export default withRouter(connect(
  mapStateToProps
)(CategoryHome))
