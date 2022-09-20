/* eslint-disable */
import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // ** Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        // ** Get token from localStorage
        const accessToken = this.getToken()

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign

          console.log(accessToken)
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // ** Add request/response interceptor
    // axios.interceptors.response.use(
    //   response => response,
    //   error => {
    //     // ** const { config, response: { status } } = error
    //     const { config, response } = error
    //     const originalRequest = config

    //     // ** if (status === 401) {
    //     if (response && response.status === 401) {
    //       if (!this.isAlreadyFetchingAccessToken) {
    //         this.isAlreadyFetchingAccessToken = true
    //         this.refreshToken().then(r => {
    //           this.isAlreadyFetchingAccessToken = false

    //           // ** Update accessToken in localStorage
    //           this.setToken(r.data.accessToken)
    //           this.setRefreshToken(r.data.refreshToken)

    //           this.onAccessTokenFetched(r.data.accessToken)
    //         })
    //       }
    //       const retryOriginalRequest = new Promise(resolve => {
    //         this.addSubscriber(accessToken => {
    //           // ** Make sure to assign accessToken according to your response.
    //           // ** Check: https://pixinvent.ticksy.com/ticket/2413870
    //           // ** Change Authorization header
    //           originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
    //           resolve(this.axios(originalRequest))
    //         })
    //       })
    //       return retryOriginalRequest
    //     }
    //     return Promise.reject(error)
    //   }
    // )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args)
  }

  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args)
  }

  getTasks(searchKeyword = null) {
    let endPoint = this.jwtConfig.getTasksEndpoint

    if (searchKeyword) {
      endPoint = `${endPoint}?searchKeyword=${searchKeyword}`
    }

    console.log(endPoint)
    return axios.get(endPoint)
  }

  getTask(id) {
    const endPoint = `${this.jwtConfig.getTaskEndpoint}/${id}`
    return axios.get(endPoint)
  }

  updateTask(data, id) {
    const endPoint = `${this.jwtConfig.updateTaskEndPoint}/${id}`
    return axios.patch(endPoint, data)
  }

  postTask(data) {
    return axios.post(this.jwtConfig.postTaskEndPoint, data)
  }

  addComment(data) {
    const endPoint = `${this.jwtConfig.addCommentEndPoint}/${data.taskId}`

    return axios.post(endPoint, data)
  }

  getOwnProfile() {
    return axios.get(this.jwtConfig.getOwnProfileEndPoint)
  }

  updateOwnProfile(data) {
    return axios.patch(this.jwtConfig.updateOwnProfileEndPoint, data)
  }

  getConversations() {
    return axios.get(this.jwtConfig.getConversationsEndPoint)
  }

  getMessages(id) {
    const endPoint = `${this.jwtConfig.getMessagesEndPoint}/${id}`
    return axios.get(endPoint)
  }

  sendMessage(data) {
    const endPoint = `${this.jwtConfig.sendMessageEndPoint}`
    return axios.post(endPoint, data)
  }

  deleteTask(id) {
    const endPoint = `${this.jwtConfig.deleteTaskEndPoint}/${id}`
    return axios.delete(endPoint)
  }

  postOffer(data, id) {
    const endPoint = `${this.jwtConfig.postOfferEndPoint}/${id}`
    return axios.post(endPoint, data)
  }

  getOrder() {
    const endPoint = `${this.jwtConfig.getOrderEndPoint}`
    return axios.get(endPoint)
  }

  hireWorker(data) {
    const endPoint = `${this.jwtConfig.createOrderEndPoint}`
    return axios.post(endPoint, data)
  }

  markOrderComplete(data) {

    const {orderId} = data
    const endPoint = `${this.jwtConfig.markOrderCompleteEndPoint}/${orderId}`
    return axios.put(endPoint, data)
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    })
  }
}
