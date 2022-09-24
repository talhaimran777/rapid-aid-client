// ** Router Import
import { useDispatch } from 'react-redux'
import Router from './router/Router'
import useJwt from '@src/auth/jwt/useJwt'
import jwt_decode from 'jwt-decode'
import socketClient  from "socket.io-client";

import { SET_CURRENT_USER, SET_IO } from './redux/actions/action.types/actionTypes'

const SERVER = "https://creepy-toad-gaiters.cyclic.app";
const App = () => {
  const dispatch = useDispatch()
  var socket = socketClient (SERVER);
      socket.on('connection', () => {
          console.log(`I'm connected with the back-end`);
  });

  if (useJwt.getToken()) {
    const token = useJwt.getToken()
    const decoded = jwt_decode(token)
    dispatch({ type: SET_CURRENT_USER, payload: decoded })
    dispatch({ type: SET_IO, payload: socket })
  }
  return <Router />
}

export default App
