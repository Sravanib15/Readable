import { RECEIVE_CATEGORIES } from '../actions/categoryActions'
const initialState = {
  fetching: false,
  categories: [],
}
export default function categoryReducer(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action;
      console.log(categories);
      let result = {
        ...state,
        categories,
        fetching: false
      }
      console.log(result);
      return result;
    default:
      return state;
  }
}
