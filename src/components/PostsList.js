import React from 'react';
import { Link } from 'react-router-dom'

let PostsList = (props) => (
  <ol className="post-list">
    {props.posts && props.posts.length > 0 && props.posts.map(post => (
      <li key={post.id} className="post-list-item">
        <div className="post-details">
            <Link to={`/${post.id}/comments`}>
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
        </div>
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
