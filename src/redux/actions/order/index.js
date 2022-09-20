/*eslint comma-dangle: ["error", "always-multiline"]*/
import useJwt from '@src/auth/jwt/useJwt'
import {
  FETCH_ORDER_FAILED,
  FETCH_ORDER_INITIATED,
  FETCH_ORDER_SUCCESS,
  HANDLE_MARK_ORDER_COMPLETE_FAILED,
  HANDLE_MARK_ORDER_COMPLETE_INITIATED,
  HANDLE_MARK_ORDER_COMPLETE_SUCCESS,
  HIRE_WORKER_FAILED,
  HIRE_WORKER_INITIATED,
  HIRE_WORKER_SUCCESS,
} from '../action.types/actionTypes'
// import { FETCH_ORDER_FAILED, FETCH_ORDER_INITIATED, FETCH_ORDER_SUCCESS } from '../../../action.types/actionTypes'

export const initiateFetchOrder = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_ORDER_INITIATED })
  }
}

export const fetchOrderSuccess = (data) => {
  return (dispatch) => {
    dispatch({ type: FETCH_ORDER_SUCCESS, payload: data })
  }
}

export const handleFetchActiveOrder = () => {
  return async (dispatch) => {
    dispatch(initiateFetchOrder())

    try {
      const response = await useJwt.getOrder()
      if (response && response.data) {
        dispatch(fetchOrderSuccess(response.data.data))
        console.log(response.data)
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: FETCH_ORDER_FAILED, payload: err.response.data })
        console.log(err.response.data)
      }
    }
    // dispatch({ type: 'FETCH_ORDER_INITIATED' })
  }
}

export const handleHireWorker = (data) => {
  return async (dispatch) => {
    // dispatch(initiateFetchOrder())
    dispatch({ type: HIRE_WORKER_INITIATED })

    try {
      const response = await useJwt.hireWorker(data)
      if (response && response.data) {
        dispatch({ type: HIRE_WORKER_SUCCESS, payload: data })
        console.log(response.data)
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: HIRE_WORKER_FAILED, payload: err.response.data })
        console.log(err.response.data)
      }
    }
  }
}

export const handleOrderComplete = (data) => {
  return async (dispatch) => {
    // dispatch(initiateFetchOrder())
    dispatch({ type: HANDLE_MARK_ORDER_COMPLETE_INITIATED })

    try {
      const response = await useJwt.markOrderComplete(data)
      if (response && response.data) {
        dispatch({ type: HANDLE_MARK_ORDER_COMPLETE_SUCCESS, payload: data })
        console.log(response.data)
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: HANDLE_MARK_ORDER_COMPLETE_FAILED, payload: err.response.data })
        console.log(err.response.data)
      }
    }
  }
}
