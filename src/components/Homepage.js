import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostsList from './PostsList'
import { fetchCategories } from '../actions/categoryActions'
import { fetchAllPosts, updatePostVoteOnHome, deletePostOnHome, sortPosts  } from '../actions/postActions'
import { withRouter, Link } from 'react-router-dom'
import '../index.css'

class HomePage extends Component {

  updatePostVote = (post, voteType) => {
    this.props.dispatch(updatePostVoteOnHome(post, voteType));
  }

  editPost = (post) => {
    this.props.history.push(`/post/${post.id}/edit`);
  }

  onDeletePost = (post) => {
    this.props.dispatch(deletePostOnHome(post));
  }

  updateSort = (e) => {
    const { posts } = this.props;
    const index = e.nativeEvent.target.selectedIndex;
    this.props.dispatch(sortPosts(posts, e.nativeEvent.target[index].value));
  }

  componentWillMount() {
    this.setState(() => ({ fetching: true }))
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchAllPosts());
  }

  render() {
    const { categories, fetching, posts } = this.props
    return (
      <div>
        <div className="list-comment-top">
          <h1> Categories </h1>
        </div>
        <ol className='category-list'>
        {
          !fetching && categories && categories.length > 0 && categories.map(category => (
            <li key={category.name} className="category-list-item">
              <Link to={`/${category.name}`}>
                <h3> {category.name.charAt(0).toUpperCase() + category.name.slice(1)} </h3>
              </Link>
            </li>
            )
          )
        }
        </ol>
        <div className="list-posts">
          <div className="list-top">
            <h1>Posts</h1>
            <select name="sort-by" className="add-sort" defaultValue="date" onChange={this.updateSort}>
              <option value="timestamp">Date</option>
              <option value="voteScore">Score</option>
            </select>
          </div>
          <PostsList posts={posts} editPost={this.editPost} updatePostVote={this.updatePostVote} onDeletePost={this.onDeletePost}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ categoryReducer, postReducer }) {
  const { categories } = categoryReducer;
  const { posts, sortBy } = postReducer;
  const sortedPosts = [].concat(posts)
    .sort((a, b) => a[sortBy] < b[sortBy])
  return {
    categories,
    "posts": sortedPosts,
    "fetching": false
  }
}

export default withRouter(connect(
  mapStateToProps
)(HomePage))
