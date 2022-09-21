// ** Router Import
import { useDispatch } from 'react-redux'
import Router from './router/Router'
import useJwt from '@src/auth/jwt/useJwt'
import jwt_decode from 'jwt-decode'
import { io } from 'socket.io-client'
import { SET_CURRENT_USER, SET_IO } from './redux/actions/action.types/actionTypes'

const App = () => {
  const dispatch = useDispatch()
  const socket = io.connect("wss://creepy-toad-gaiters.cyclic.app")

  if (useJwt.getToken()) {
    const token = useJwt.getToken()
    const decoded = jwt_decode(token)
    dispatch({ type: SET_CURRENT_USER, payload: decoded })
    dispatch({ type: SET_IO, payload: socket })
  }
  return <Router />
}

export default App
