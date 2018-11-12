import axios from 'axios'

export const baseURL = 'https://goweek-twitter-backend.herokuapp.com'
export const api = axios.create({ baseURL })

export default api