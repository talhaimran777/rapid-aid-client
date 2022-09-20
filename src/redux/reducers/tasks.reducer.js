import {
  LOAD_TASKS,
  LOAD_TASKS_SUCCESS,
  // ZERO_TASKS,
} from '../actions/actionTypes'

const tasksReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_TASKS:
      return {
        ...state,
        loading: true,
      }

    case LOAD_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }

    default:
      return state
  }
}

export default tasksReducer
