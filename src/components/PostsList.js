import React from 'react';
import { Link } from 'react-router-dom'

let PostsList = (props) => (
  <ol className="post-list">
    {props.posts && props.posts.length > 0 && props.posts.map(post => (
      <li key={post.id} className="post-list-item">
        <div className="post-details">
            <Link to={`/${post.category}/${post.id}`}>
              {post.title}
            </Link>
            <div>
              {post.body}
            </div>
            <div>
              Author: {post.author}
            </div>
            <div>
              Score: {post.voteScore}
            </div>
            <div>
              Comments Count: {post.commentCount}
            </div>
        </div>
        <button onClick={() => props.editPost(post)} className="post-home-edit">
          Edit
        </button>
        <button onClick={() => props.updatePostVote(post,'upVote')} className="up-vote">
          Upvote
        </button>
        <button onClick={() => props.updatePostVote(post, 'downVote')} className="down-vote">
          Downvote
        </button>
        <button onClick={() => props.onDeletePost(post)} className='post-remove'>
          Remove
        </button>
      </li>
    ))}
  </ol>
)

export default PostsList;
