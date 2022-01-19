import axios from 'axios'

const baseUrl = 'https://api.themoviedb.org/3';
const key = process.env.REACT_APP_KEY

const get = (urlSecondPart, query = '') => {
  return axios.get(`${baseUrl}/${urlSecondPart}${key}${query}`).then(res => res.data)
}
   
export default { get }