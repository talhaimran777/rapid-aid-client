/*eslint comma-dangle: ["error", "always-multiline"]*/
// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import {
  CLEAR_ERRORS,
  LOGIN_FAILED,
  LOGIN_INITIATED,
  LOGIN_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_INITIATED,
  REGISTRATION_SUCCESS,
  SET_CURRENT_USER,
  VALIDATIION_ERRORS,
} from '../action.types/actionTypes'
import jwt_decode from 'jwt-decode'

const config = useJwt.jwtConfig

// ** Handle User Login
export const handleLogin = (data, history) => {
  return async (dispatch) => {
    try {
      // const res = await axios.post('/api/v1/auth/login', { email, password })

      const response = await useJwt.login(data)
      // const response = axios.get('/api')

      if (response && response.data) {
        // console.log(res.data)
        const { token } = response.data
        // console.log(token)
        useJwt.setToken(token)
        const decoded = jwt_decode(token)
        // console.log(decoded)
        dispatch({ type: LOGIN_SUCCESS, payload: decoded })
        dispatch({ type: SET_CURRENT_USER, payload: decoded })

        history.push('/')
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: VALIDATIION_ERRORS, payload: err.response.data })
        dispatch({ type: LOGIN_FAILED })

        console.log(err.response.data)
      }
    }
    // dispatch({
    //   type: 'LOGIN',
    //   data,
    //   config,
    //   [config.storageTokenKeyName]: data[config.storageTokenKeyName],
    //   [config.storageRefreshTokenKeyName]:
    //     data[config.storageRefreshTokenKeyName],
    // })
    // // ** Add to user, accessToken & refreshToken to localStorage
    // localStorage.setItem('userData', JSON.stringify(data))
    // localStorage.setItem(
    //   config.storageTokenKeyName,
    //   JSON.stringify(data.accessToken)
    // )
    // localStorage.setItem(
    //   config.storageRefreshTokenKeyName,
    //   JSON.stringify(data.refreshToken)
    // )
  }
}

// ** Handle User SIGNUP
export const handleRegister = (data) => {
  return async (dispatch) => {
    try {
      // const res = await axios.post('/api/v1/auth/login', { email, password })

      const response = await useJwt.register(data)
      // const response = axios.get('/api')

      if (response && response.data) {
        console.log(response.data)
        // const { token } = response.data
        // console.log(token)
        // useJwt.setToken(token)
        // const decoded = jwt_decode(token)
        // console.log(decoded)
        dispatch({ type: REGISTRATION_SUCCESS, payload: response.data })
        dispatch({ type: CLEAR_ERRORS })
        // dispatch({ type: SET_CURRENT_USER, payload: decoded })

        // history.push('/')
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: VALIDATIION_ERRORS, payload: err.response.data })
        dispatch({ type: REGISTRATION_FAILED })

        // console.log(err.response.data)
      }
    }
    // dispatch({
    //   type: 'LOGIN',
    //   data,
    //   config,
    //   [config.storageTokenKeyName]: data[config.storageTokenKeyName],
    //   [config.storageRefreshTokenKeyName]:
    //     data[config.storageRefreshTokenKeyName],
    // })
    // // ** Add to user, accessToken & refreshToken to localStorage
    // localStorage.setItem('userData', JSON.stringify(data))
    // localStorage.setItem(
    //   config.storageTokenKeyName,
    //   JSON.stringify(data.accessToken)
    // )
    // localStorage.setItem(
    //   config.storageRefreshTokenKeyName,
    //   JSON.stringify(data.refreshToken)
    // )
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return (dispatch) => {
    localStorage.removeItem('accessToken')
    dispatch({
      type: 'LOGOUT',
    })
  }
}

// ** LOGIN INITIATED
export const loginInitiated = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_INITIATED })
  }
}

// ** REGISTER INITIATED
export const initiateRegistration = () => {
  return (dispatch) => {
    dispatch({ type: REGISTRATION_INITIATED })
  }
}
