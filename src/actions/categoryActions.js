import * as api from '../utils/api'

export function receiveCategories(categories) {
  return ({
    type: RECEIVE_CATEGORIES,
    categories
  });
}

export function fetchCategories() {
  return dispatch =>  {
    api
      .getCategories()
      .then(categories => dispatch(receiveCategories(categories)))
  }
}

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
