/*eslint comma-dangle: ["error", "always-multiline"]*/
import useJwt from '@src/auth/jwt/useJwt'
import {
  ADD_COMMENT_FAILED,
  ADD_COMMENT_INITIATED,
  ADD_COMMENT_SUCCESS,
  TASKS_FETCH_INITIATED,
  TASKS_FETCH_SUCCESS,
  TASK_FETCH_FAILED,
  TASK_FETCH_INITIATED,
  TASK_FETCH_SUCCESS,
} from '../../action.types/actionTypes'
import { handleFetchTaskNoUpdatesVersion } from '../../task/fetch'

// ** INITIATING TASKS FETCHING
export const initiateAddComment = () => {
  return (dispatch) => {
    dispatch({ type: ADD_COMMENT_INITIATED })
  }
}

// export const initiateAddComment = () => {
//   return (dispatch) => {
//     dispatch({ type: ADD_COMMENT_INITIATED })
//   }
// }

export const handleAddComment = (data) => {
  return async (dispatch) => {
    dispatch(initiateAddComment())

    // console.log(data)
    try {
      const res = await useJwt.addComment(data)

      if (res && res.data) {
        // dispatch({ type: TASKS_FETCH_SUCCESS, payload: res.data.tasks })

        dispatch(handleFetchTaskNoUpdatesVersion(data.taskId))
        dispatch({ type: ADD_COMMENT_SUCCESS })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: ADD_COMMENT_FAILED, payload: err.response.data })
        console.log(err.response.data)
      }
    }
  }
}
