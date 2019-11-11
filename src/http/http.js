import axIos from 'axios'

axIos.interceptors.response.use(response => {
  return response
}, error => {
  console.log(error.response)
  return error.response
})
