import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8888/.netlify/functions"

export default axios