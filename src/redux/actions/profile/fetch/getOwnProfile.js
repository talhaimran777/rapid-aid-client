/*eslint comma-dangle: ["error", "always-multiline"]*/
import useJwt from '@src/auth/jwt/useJwt'
import {
  FETCH_OWN_PROFILE_FAILED,
  FETCH_OWN_PROFILE_INITIATED,
  FETCH_OWN_PROFILE_SUCCESS,
  TASKS_FETCH_INITIATED,
  TASKS_FETCH_SUCCESS,
  TASK_FETCH_FAILED,
  TASK_FETCH_INITIATED,
  TASK_FETCH_INITIATED_NO_UPDATES_VERSION,
  TASK_FETCH_SUCCESS,
  TASK_FETCH_SUCCESS_NO_UPDATES_VERSION,
} from '../../action.types/actionTypes'

// ** INITIATING TASKS FETCHING
export const initiateFetchOwnProfile = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_OWN_PROFILE_INITIATED })
  }
}

export const handleFetchOwnProfile = () => {
  return async (dispatch) => {
    dispatch(initiateFetchOwnProfile())
    try {
      const res = await useJwt.getOwnProfile()

      if (res && res.data) {
        console.log(res.data)
        dispatch({ type: FETCH_OWN_PROFILE_SUCCESS, payload: res.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        // console.log(err.response.data)
        dispatch({ type: FETCH_OWN_PROFILE_FAILED, payload: err.response.data })
      }
    }
  }
}
