const API_END_PONT = process.env.REACT_APP_END_POINT

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': 'anythingworks'
}

export const getCategories = () =>
  fetch(`${API_END_PONT}/categories`, { headers })
    .then((res) => res.json())
    .then(data => data.categories);

export const getAllPosts = () =>
  fetch(`${API_END_PONT}/posts`, { headers })
    .then((res) => res.json())

export const getPost = (postId) =>
  fetch(`${API_END_PONT}/posts/${postId}`, { headers })
    .then((res) => res.json())

export const getComment = (commentId) =>
  fetch(`${API_END_PONT}/comments/${commentId}`, { headers })
    .then((res) => res.json())

export const getCategoryPosts = (category) =>
  fetch(`${API_END_PONT}/${category}/posts`, { headers })
    .then((res) => res.json())
    .then(data => data);

export const getPostComments = (post) =>
  fetch(`${API_END_PONT}/posts/${post}/comments`, { headers })
    .then((res) => res.json())
    .then(data => data);

export const createPost = (post) =>
  fetch(`${API_END_PONT}/posts`, {
    'method': 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
   .then((res) => res.json())

export const createComment = (comment) =>
 fetch(`${API_END_PONT}/comments`, {
   'method': 'POST',
   headers: {
     ...headers,
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(comment)
 })
  .then((res) => res.json())

export const updatePost = (postId, updatedJson) =>
  fetch(`${API_END_PONT}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedJson)
  })
    .then((res) => res.json())

export const updateComment = (commentId, updatedJson) =>
  fetch(`${API_END_PONT}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedJson)
  })
    .then((res) => res.json())

export const updatePostVote = (postId, vote) =>
  fetch(`${API_END_PONT}/posts/${postId}`, {
    'method': 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vote)
  })
   .then((res) => res.json())
   .then(data => data);

export const updateCommentVote = (commentId, vote) =>
 fetch(`${API_END_PONT}/comments/${commentId}`, {
   'method': 'POST',
   headers: {
     ...headers,
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(vote)
 })
  .then((res) => res.json())
  .then(data => data);

export const deletePost = (postId) =>
  fetch(`${API_END_PONT}/posts/${postId}`, {
    'method': 'DELETE',
    headers
  })
   .then((res) => res.json())
   .then(data => data);

export const deleteComment = (commentId) =>
 fetch(`${API_END_PONT}/comments/${commentId}`, {
   'method': 'DELETE',
   headers
 })
  .then((res) => res.json())
  .then(data => data);
