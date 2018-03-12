import { ADD_POST, REMOVE_POST, UPDATE_POST, GET_POSTS, GET_POST, RECEIVE_CATEGORY_POSTS, SET_SELECTED_CATEGORY, UPDATE_POST_VOTE} from '../actions/postActions';

const initialState = {
  posts: []
}

export default function postReducer(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_CATEGORY_POSTS:
      let { posts } = action;
      return {
        ...state,
        posts
      }
    case SET_SELECTED_CATEGORY:
      const { selectedCategory } = action;
      return {
        ...state,
        selectedCategory
      }
    case GET_POSTS:
      return {
        ...state,
      }
    case GET_POST: {
      let { post } = action;
      return {
        ...state,
        "selectedPost": post
      }
    }
    case ADD_POST: {
      let { post } = action;
      state.posts.push(post);
      return {
        ...state
      }
    }
    case REMOVE_POST:
      return {
        ...state,
      }
    case UPDATE_POST: {
      let updatedPost = action.post;
      /*const objIndex = state.posts.findIndex((obj => obj.id === selectedPost.id));
      state.posts[objIndex].title = selectedPost.title;
      state.posts[objIndex].body = selectedPost.body;*/
      return {
        ...state,
        "selectedPost": updatedPost
      }
    }
    case UPDATE_POST_VOTE: {
      let scoreupdatedPost = action.post;
      return {
        ...state,
        "selectedPost": scoreupdatedPost
      }
    }
    default:
      return state;
  }
}
