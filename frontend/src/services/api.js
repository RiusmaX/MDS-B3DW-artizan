import axios from 'axios'

const publicUrls = ['/auth/local', '/auth/local/register']

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

/**
 * Add a request interceptor
 * Add the Authorization header to the request if the user is authenticated
 */
axiosInstance.interceptors.request.use(function (config) {
  if (publicUrls.includes(config.url)) return config

  const authState = window.localStorage.getItem('AUTH')
  if (authState) {
    const { jwt } = JSON.parse(authState)
    config.headers.Authorization = `Bearer ${jwt}`
  }
  return config
})

/**
 * Call API Login route
 * @param {object} credentials { identifier, password }
 * @return {object} { jwt, user }
 */
const loginApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/local', credentials)
  return response?.data
}

/**
 * Call API Register route
 * @param {object} user { username, email, password }
 * @return {object} { jwt, user }
 */
const registerApi = async (user) => {
  const response = await axiosInstance.post('/auth/local/register', user)
  if (response?.data?.user && user.artisanName && user.artisanName !== '') {
    // Création d'un artisan
    const artisan = {
      name: user.artisanName,
      user: response.data.user.id
    }
    const artisanResponse = await createArtisan(artisan, response?.data?.jwt)
    console.log(artisanResponse)
  }
  return response?.data
}

/**
 * Call API Create Artisan route
 * @param {object} artisan { name, user }
 * @param {string} jwt
 * @return {object} { id, name, user }
 */
const createArtisan = async (artisan, jwt) => {
  const response = await axiosInstance.post('/artisans', { data: artisan }, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  return response?.data
}

const updateProfileApi = async (user, id) => {
  const response = await axiosInstance.put(`/users/${id}`, user)
  return response?.data
}

const updateProductApi = async (id, product) => {
  const response = await axiosInstance.put(`/products/${id}`, { data: product })
  return response?.data
}

export {
  loginApi,
  registerApi,
  updateProfileApi,
  updateProductApi
}
