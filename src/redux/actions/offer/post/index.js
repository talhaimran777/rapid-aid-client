import useJwt from '@src/auth/jwt/useJwt'
import { POST_OFFER_FAILED, POST_OFFER_INITIATED, POST_OFFER_SUCCESS } from '../../action.types/actionTypes'

export const initiatePostOffer = () => {
  return (dispatch) => {
    dispatch({ type: POST_OFFER_INITIATED })
  }
}

export const postOfferSuccess = (data) => {
  return (dispatch) => {
    dispatch({ type: POST_OFFER_SUCCESS, payload: data })
  }
}

export const handlePostOffer = (data, id) => {
  return async (dispatch) => {
    dispatch(initiatePostOffer())

    try {
      const response = await useJwt.postOffer(data, id)
      if (response && response.data) {
        dispatch(postOfferSuccess(response.data))
        console.log(response.data)
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: POST_OFFER_FAILED, payload: err.response.data })
        console.log(err.response.data)
      }
    }
    // dispatch({ type: 'POST_OFFER_INITIATED' })
  }
}
