const axios = require('axios')

export const baseURL = 'http://localhost:3000'
export const api = axios.create({ baseURL })

export default api