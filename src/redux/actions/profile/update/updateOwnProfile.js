/*eslint comma-dangle: ["error", "always-multiline"]*/
import useJwt from '@src/auth/jwt/useJwt'
import {
  UPDATE_OWN_PROFILE_FAILED,
  UPDATE_OWN_PROFILE_INITIATED,
  UPDATE_OWN_PROFILE_SUCCESS,
} from '../../action.types/actionTypes'

// ** INITIATING TASKS FETCHING
export const initiateUpdateOwnProfile = () => {
  return (dispatch) => {
    dispatch({ type: UPDATE_OWN_PROFILE_INITIATED })
  }
}

export const handleUpdateOwnProfile = (data) => {
  return async (dispatch) => {
    dispatch(initiateUpdateOwnProfile())
    try {
      const res = await useJwt.updateOwnProfile(data)

      if (res && res.data) {
        console.log(res.data)
        dispatch({ type: UPDATE_OWN_PROFILE_SUCCESS, payload: res.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        // console.log(err.response.data)
        dispatch({ type: UPDATE_OWN_PROFILE_FAILED, payload: err.response.data })
      }
    }
  }
}
