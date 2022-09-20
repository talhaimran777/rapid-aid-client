/*eslint comma-dangle: ["error", "always-multiline"]*/
// import {
//   CLEAR_REGISTER_STATE,
//   TASKS_FETCH_INITIATED,
//   TASKS_FETCH_SUCCESS,
// } from '../../../actions/action.types/actionTypes'

import {
  POST_TASK_FAILED,
  POST_TASK_INITIATED,
  POST_TASK_SUCCESS,
  RESET_TASK_POST,
} from '../../../actions/action.types/actionTypes'
//
const taskPostReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_TASK_INITIATED:
      return { inProcess: true }

    case POST_TASK_SUCCESS:
      return { inProcess: false, task: action.payload.task, status: 'SUCCESS' }

    case POST_TASK_FAILED:
      return { inProcess: false, errs: action.payload.errors }

    case RESET_TASK_POST:
      return {}
    default:
      return state
  }
}

export default taskPostReducer
