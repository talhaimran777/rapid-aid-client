/*eslint comma-dangle: ["error", "always-multiline"]*/
// import {
//   CLEAR_REGISTER_STATE,
//   TASKS_FETCH_INITIATED,
//   TASKS_FETCH_SUCCESS,
// } from '../../../actions/action.types/actionTypes'

import {
  CLEAR_FETCH_TASKS,
  TASKS_FETCH_INITIATED,
  TASKS_FETCH_INITIATED_NO_UPDATES_VERSION,
  TASKS_FETCH_SUCCESS,
  TASKS_FETCH_SUCCESS_NO_UPDATES_VERSION,
  TASK_FETCH_FAILED,
  TASK_FETCH_INITIATED,
  TASK_FETCH_SUCCESS,
  TASK_FETCH_SUCCESS_NO_UPDATES_VERSION,
} from '../../../actions/action.types/actionTypes'

const taskFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case TASKS_FETCH_INITIATED:
      return { inProcess: true }

    case TASKS_FETCH_SUCCESS:
      return { inProcess: false, tasks: action.payload }

    // case TASKS_FETCH_INITIATED_NO_UPDATES_VERSION:
    //   return {}

    case TASKS_FETCH_SUCCESS_NO_UPDATES_VERSION:
      return { tasks: action.payload }

    case TASK_FETCH_INITIATED:
      return { inProcess: true }

    case TASK_FETCH_SUCCESS:
      return { inProcess: false, task: action.payload }
    case TASK_FETCH_SUCCESS_NO_UPDATES_VERSION:
      return { inProcess: false, task: action.payload }
    case TASK_FETCH_FAILED:
      return { inProcess: false, error: action.payload }

    case CLEAR_FETCH_TASKS:
      return {}
    default:
      return state
  }
}

export default taskFetchReducer
