import React from 'react'

let CommentsList = (props) => (
  <ol>
    {
      props.comments.map(comment => (
        <li key={comment.id}>
          <div>
            {comment.body}
            <button onClick={() => props.onDeleteComment(comment)} className='comment-remove'>
              Delete
            </button>
          </div>
          <p>
            Author: {comment.author}
          </p>
          <p>
            Score: {comment.voteScore}
          </p>
          <div>
            <button onClick={() => props.updateCommentVote(comment,'upVote')}>
              Upvote
            </button>
            <button onClick={() => props.updateCommentVote(comment, 'downVote')}>
              Downvote
            </button>
          </div>
        </li>
      ))
    }
  </ol>
)

export default CommentsList;
