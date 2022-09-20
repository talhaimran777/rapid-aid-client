import useJwt from '@src/auth/jwt/useJwt'
import { POST_TASK_FAILED, POST_TASK_INITIATED, POST_TASK_SUCCESS } from '../../action.types/actionTypes'

export const initiatePostTask = () => {
  return (dispatch) => {
    dispatch({ type: POST_TASK_INITIATED })
  }
}

export const postTaskSuccess = (data) => {
  return (dispatch) => {
    dispatch({ type: POST_TASK_SUCCESS, payload: data })
  }
}

export const handlePostTask = (data) => {
  return async (dispatch) => {
    dispatch(initiatePostTask())

    try {
      const response = await useJwt.postTask(data)
      if (response && response.data) {
        dispatch(postTaskSuccess(response.data))
        console.log(response.data)
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: POST_TASK_FAILED, payload: err.response.data })
        console.log(err.response.data)
      }
    }
    // dispatch({ type: 'POST_TASK_INITIATED' })
  }
}
