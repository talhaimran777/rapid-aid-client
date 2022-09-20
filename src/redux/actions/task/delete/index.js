import useJwt from '@src/auth/jwt/useJwt'
import { DELETE_TASK_INITIATED, DELETE_TASK_SUCCESS, DELETE_TASK_FAILED } from '../../action.types/actionTypes'
export const handleDeleteTask = id => {
  return async dispatch => {
    dispatch({ type: DELETE_TASK_INITIATED })

    try {
      const response = await useJwt.deleteTask(id)
      if (response && response.data) {
        dispatch({ type: DELETE_TASK_SUCCESS, payload: response.data })
        console.log(response.data)
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: DELETE_TASK_FAILED, payload: err.response.data })
        console.log(err.response.data)
      }
    }
    // dispatch({ type: 'POST_TASK_INITIATED' })
  }
}
