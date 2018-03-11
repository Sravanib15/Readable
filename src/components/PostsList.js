import React from 'react';
import { Link } from 'react-router-dom'

let PostsList = (props) => (
  <ol>
    {props.posts && props.posts.length > 0 && props.posts.map(post => (
        <li key={post.id}>
          <div>
            <div>
              <Link to={`/${post.id}/comments`}>
                {post.title}
              </Link>
              <button onClick={() => props.onDeletePost(post)} className='post-remove'>
                Remove
              </button>
            </div>
            <div>

              <button onClick={() => props.updatePostVote(post,'upVote')} className="up-vote">
                Upvote
              </button>
              <button onClick={() => props.updatePostVote(post, 'downVote')} className="down-vote">
                Downvote
              </button>
              {post.voteScore}
            </div>
          </div>
        </li>
      ))}
  </ol>
)

export default PostsList;
