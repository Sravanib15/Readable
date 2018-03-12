import * as api from '../utils/api'
import { fetchPostComments } from './commentsActions'

export function fetchSelectedPost(postId) {
  return dispatch => {
    api
      .getPost(postId)
      .then(post => {
        dispatch(getPost(post))
        dispatch(fetchPostComments(post));
      })
  }
}

export function deletePost(post) {
  return dispatch => {
    api
      .deletePost(post.id)
      .then(post => dispatch(fetchCategoryPosts(post.category)))
  }
}

export function updatePostVote(post, vote) {
  return dispatch =>  {
    api
      .updatePostVote(post.id, {"option": vote})
      .then(post => dispatch(fetchCategoryPosts(post.category)))
  }
}

export function updatePostVoteOnForm(post, vote) {
  return dispatch =>  {
    api
      .updatePostVote(post.id, {"option": vote})
      .then(post => dispatch(updateVote(post)))
  }
}

export function modifyPost(post) {
  return dispatch =>  {
    api
      .updatePost(post.id, {"title": post.title, "body": post.body})
      .then(post => dispatch(updatePost(post)))
  }
}

export function updateVote(post) {
  return {
    type: UPDATE_POST_VOTE,
    post
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}
export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post
  }
}

export function removePost({ id }) {
  return {
    type: REMOVE_POST,
    id
  }
}

export function getPost(post) {
  return {
    type: GET_POST,
    post
  }
}

export function fetchCategoryPosts(category) {
  setSelectedCategory(category);
  return dispatch =>  {
    api
      .getCategoryPosts(category)
      .then(posts => dispatch(receiveCategoryPosts(category, posts)))
  }
}

export function createPost(post) {
  return dispatch =>  {
    api
      .createPost(post)
      .then(post => dispatch(addPost(post)))
  }
}

export function receiveCategoryPosts(selectedCategory, posts) {
  return {
    type: RECEIVE_CATEGORY_POSTS,
    selectedCategory,
    posts
  }
}

export function setSelectedCategory(selectedCategory) {
  return {
    type: SET_SELECTED_CATEGORY,
    selectedCategory
  }
}

export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY'
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST= 'REMOVE_POST'
export const UPDATE_POST= 'UPDATE_POST'
export const GET_POSTS= 'GET_POSTS'
export const GET_POST= 'GET_POST'
export const GET_CATEGORY_POSTS= 'GET_CATEGORY_POSTS'
export const RECEIVE_COMMENTS= 'RECEIVE_COMMENTS'
export const UPDATE_POST_VOTE= 'UPDATE_POST_VOTE'
