import { ADD_COMMENT, SORT_COMMENTS, REMOVE_COMMENT, UPDATE_COMMENT,UPDATE_COMMENTS, GET_COMMENT, VOTE_COMMENT, RECEIVE_POST_COMMENTS, SET_SELECTED_POST }  from '../actions/commentsActions'
const initialState = {
  comments: [],
  sortBy: 'timestamp'
}
export default function commentsReducer(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_POST_COMMENTS:
      const { comments } = action;
      return {
        ...state,
        comments
      }
    case SORT_COMMENTS:
      const { sortBy } = action;
      const postComments = action.comments;
      return {
        ...state,
        "comments": postComments,
        sortBy
      }
    case UPDATE_COMMENTS:
      let updatedComments = action.comments;
      return {
        ...state,
        "comments": updatedComments
      }
    case SET_SELECTED_POST:
      const { selectedPost } = action;
      return {
        ...state,
        selectedPost
      }
    case ADD_COMMENT:
      return {
        ...state
      }
    case REMOVE_COMMENT:
      return {
        ...state
      }
    case UPDATE_COMMENT:
    const { comment } = action;
      return {
        ...state,
        comment
      }
    case GET_COMMENT:
      return {
        ...state
      }
    case VOTE_COMMENT: {
      const { comment } = action;
      const objIndex = state.comments.findIndex((obj => obj.id === comment.id));
      state.comments[objIndex].voteScore = comment.voteScore;
      return {
        ...state
      }
    }
    default:
      return state;
  }
}
