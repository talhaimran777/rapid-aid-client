/*eslint comma-dangle: ["error", "always-multiline"]*/
import {
  HIRE_WORKER_FAILED,
  HIRE_WORKER_INITIATED,
  HIRE_WORKER_SUCCESS,
  RESET_HIRE_WORKER,
} from '../../../actions/action.types/actionTypes'

const hireWorkerReducer = (state = {}, action) => {
  switch (action.type) {
    case HIRE_WORKER_INITIATED:
      return { isHiringInProcess: true }

    case HIRE_WORKER_SUCCESS:
      return { isHiringInProcess: false, order: action.payload, isHired: true }

    case HIRE_WORKER_FAILED:
      return { isHiringInProcess: false, error: action.payload, isHired: false }
    case RESET_HIRE_WORKER:
      return {}
    default:
      return state
  }
}

export default hireWorkerReducer
