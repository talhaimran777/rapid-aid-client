import {
  RESET_TASK_UPDATE,
  UPDATE_TASK_FAILED,
  UPDATE_TASK_INITIATED,
  UPDATE_TASK_SUCCESS,
} from '../../../actions/action.types/actionTypes'

/*eslint comma-dangle: ["error", "always-multiline"]*/
const taskUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TASK_INITIATED:
      return { updateTaskInProcess: true }

    case UPDATE_TASK_SUCCESS:
      return { updateTaskInProcess: false, updatedTask: action.payload.task, updateStatus: 'SUCCESS' }

    case UPDATE_TASK_FAILED:
      return { updateTaskInProcess: false, errs: action.payload.errors }

    case RESET_TASK_UPDATE:
      return {}
    default:
      return state
  }
}

export default taskUpdateReducer
