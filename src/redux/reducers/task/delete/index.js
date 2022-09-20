import { DELETE_TASK_INITIATED, DELETE_TASK_SUCCESS, DELETE_TASK_FAILED } from '../../../actions/action.types/actionTypes'

/*eslint comma-dangle: ["error", "always-multiline"]*/
const taskDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TASK_INITIATED:
      return { deleteTaskInProcess: true }

    case DELETE_TASK_SUCCESS:
      return { deleteTaskInProcess: false, deleteStatus: 'SUCCESS' }

    case DELETE_TASK_FAILED:
      return { deleteTaskInProcess: false, deleteTaskError: action.payload }

    default:
      return state
  }
}

export default taskDeleteReducer
