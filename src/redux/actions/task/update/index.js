/*eslint comma-dangle: ["error", "always-multiline"]*/
import useJwt from '@src/auth/jwt/useJwt'
import {
  POST_TASK_FAILED,
  POST_TASK_INITIATED,
  POST_TASK_SUCCESS,
  UPDATE_TASK_FAILED,
  UPDATE_TASK_INITIATED,
  UPDATE_TASK_SUCCESS,
} from '../../action.types/actionTypes'

export const initiateUpdateTask = () => {
  return (dispatch) => {
    dispatch({ type: UPDATE_TASK_INITIATED })
  }
}

export const updateTaskSuccess = (data) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_TASK_SUCCESS, payload: data })
  }
}

export const handleUpdateTask = (data, taskId) => {
  return async (dispatch) => {
    dispatch(initiateUpdateTask())

    try {
      const response = await useJwt.updateTask(data, taskId)
      if (response && response.data) {
        dispatch(updateTaskSuccess(response.data))
        console.log(response.data)
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: UPDATE_TASK_FAILED, payload: err.response.data })
        console.log(err.response.data)
      }
    }
    // dispatch({ type: 'POST_TASK_INITIATED' })
  }
}
