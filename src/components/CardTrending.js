import React, { useState } from "react"
import ModalMovieInfo from "./ModalMovieInfo"

import '../styles/cardPopular.css'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const CardTrending = ({popular, mediaType}) => {
  const [modalShow, setModalShow] = useState(false)
  const [modalId, setModalId] = useState('')
  const handelModal = (e) => {
    setModalId(e.target.parentElement.id)
    setModalShow(true)
  }
  // console.log(popular)
  // console.log(mediaType)
  return (
    <>
      {
        popular.map(item => (
          <Card key={item.id} id={item.id} style={{ width: '194px' }} className="bg-light text-dark m-3" onClick={handelModal}>
            <Card.Img variant="top" 
            src={mediaType === 'person' && item.profile_path !== null ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.profile_path}`
                : mediaType === 'person' && item.profile_path === null ? `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
                : mediaType === 'movie' && item.poster_path !== null ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`
                : mediaType === 'movie' && item.poster_path === null ? `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
                : mediaType === 'tv' && item.poster_path !== null ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`
                : mediaType === 'tv' && item.poster_path === null ? `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
                : mediaType === 'multi' && item.poster_path !== null ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`
                : `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
                }              
              alt={item.title}
            />
            <Card.Text className="d-flex flex-column justify-content-center align-items-center text-center" style={{height: '72px'}}>
            { item.media_type === 'tv' || item.media_type === 'person' ? item.name 
                : item.media_type === 'movie' ? item.title : '' }
            </Card.Text>

          </Card>
        ))
      }

      <ModalMovieInfo 
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={popular}
        id={modalId}
      />

      </>
  )
}

export default CardTrending



// {
//   popular.map(item => (
//     <Card key={item.id} style={{ width: '194px' }} className="bg-light text-dark my-3 ">
//       <Card.Img variant="top" 
//       src={mediaType === 'person' && item.profile_path !== null ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.profile_path}`
//           : mediaType === 'person' && item.profile_path === null ? `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
//           : mediaType === 'movie' && item.poster_path !== null ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`
//           : mediaType === 'movie' && item.poster_path === null ? `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
//           : mediaType === 'tv' && item.poster_path !== null ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`
//           : mediaType === 'tv' && item.poster_path === null ? `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
//           : mediaType === 'multi' && item.poster_path !== null ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`
//           : `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
//           }              
//         alt={item.title}
//       />
//       <Card.Text className="d-flex flex-column justify-content-center align-items-center text-center" style={{height: '72px'}}>
//       { item.media_type === 'tv' || item.media_type === 'person' ? item.name 
//           : item.media_type === 'movie' ? item.title : '' }
//       </Card.Text>
//     </Card>
//   ))
// }