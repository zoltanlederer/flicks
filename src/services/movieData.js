import axios from 'axios'

// https://cors-anywhere.herokuapp.com/

// https://api.themoviedb.org/3/movie/550?api_key=ba0c945c141b8fb9b78869c1c9811e6b

const baseUrl = 'https://api.themoviedb.org/3';
const key = process.env.REACT_APP_KEY

const get = (urlSecondPart, query = '') => {
  return axios.get(`${baseUrl}/${urlSecondPart}${key}${query}`).then(res => res.data)
}
   
export default { get }