import * as api from '../utils/api'

export function updateCommentVote(comment, vote) {
  return dispatch =>  {
    api
      .updateCommentVote(comment.id, {"option": vote})
      .then(comment => dispatch(updateComment(comment)))
  }
}

export function createComment(comment) {
  console.log(comment);
  return dispatch =>  {
    api
      .createComment(comment)
      .then(comment => dispatch(addComment(comment)))
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}
export function updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export function voteComment({ option }) {
  return {
    type: VOTE_COMMENT,
    option
  }
}

export function deleteComment(comment) {
  return dispatch =>  {
    api
      .deleteComment(comment.id)
      .then(comment => dispatch(fetchPostComments(comment.parentId)))
  }
}

export function removeComment(comment) {
  return {
    type: REMOVE_COMMENT,
    comment
  }
}

export function getComment({ id }) {
  return {
    type: GET_COMMENT,
    id
  }
}

export function fetchPostComments(post) {
  setSelectedPost(post);
  return dispatch =>  {
    api
      .getPostComments(post.id)
      .then(comments => dispatch(receiveComments(post, comments)))
  }
}

export function setSelectedPost(selectedPost) {
  return {
    type: SET_SELECTED_POST,
    selectedPost
  }
}


export function receiveComments(selectedPost, comments) {
  return {
    type: RECEIVE_POST_COMMENTS,
    selectedPost,
    comments
  }
}

export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const GET_COMMENT = 'GET_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS'
export const SET_SELECTED_POST= 'SET_SELECTED_POST'