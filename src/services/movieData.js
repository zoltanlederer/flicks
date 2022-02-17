import axios from 'axios'

const baseUrl = 'https://api.themoviedb.org/3';
const key = '?api_key=ba0c945c141b8fb9b78869c1c9811e6b'

const get = (urlSecondPart, query = '', lang = 'en') => {
  return axios.get(`${baseUrl}/${urlSecondPart}${key}${query}${lang}`).then(res => res.data)
}
   
export default { get }