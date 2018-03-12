import React, { Component } from 'react'
import PostsList from './PostsList'
import { connect } from 'react-redux'
import { fetchCategoryPosts, updatePostVote, deletePost } from '../actions/postActions'
import { withRouter, Link } from 'react-router-dom'

class CategoryHome extends Component {
  state = {
    selectedCategory: ''
  }

  updatePostVote = (post, voteType) => {
    this.props.dispatch(updatePostVote(post, voteType));
  }

  onDeletePost = (post) => {
    this.props.dispatch(deletePost(post));
  }

  componentWillMount() {
    const selectedCategory = this.props.match.params.category;
    this.setState({
      selectedCategory
    })

    this.props.dispatch(fetchCategoryPosts(selectedCategory));
  }

  render() {
    const { posts } = this.props
    const { selectedCategory } = this.state;
    return (
      <div className="list-posts">
        <div className="list-post-top">
          <h1>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h1>
          <Link
              to={"/"+selectedCategory+"/newpost"}
              className="add-post"
          >
            Add Post
          </Link>
        </div>
        <PostsList posts={posts} updatePostVote={this.updatePostVote} onDeletePost={this.onDeletePost}/>
      </div>
    )
  }
}

function mapStateToProps ({ postReducer }, props) {
  const { posts } = postReducer;
  return {
    "selectedCategory": props.match.params.category,
    posts
  }
}

export default withRouter(connect(
  mapStateToProps
)(CategoryHome))
