import React from 'react'

let CommentsList = (props) => (
  <ol className="comment-list">
    {
      props.comments.map(comment => (
        <li key={comment.id} className="comment-list-item">
          <div className="comment-details">
            {comment.body}
            <p>
              Author: {comment.author}
            </p>
            <p>
              Score: {comment.voteScore}
            </p>
          </div>
          <button onClick={() => props.updateCommentVote(comment,'upVote')} className="up-vote">
            Upvote
          </button>
          <button onClick={() => props.updateCommentVote(comment, 'downVote')} className="down-vote">
            Downvote
          </button>
          <button onClick={() => props.onDeleteComment(comment)} className='comment-remove'>
            Delete
          </button>
        </li>
      ))
    }
  </ol>
)

export default CommentsList;
