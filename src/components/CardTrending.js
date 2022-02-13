import React, { useState } from "react"
import ModalMovieInfo from "./ModalMovieInfo"

import Card from 'react-bootstrap/Card'

const CardTrending = ({data}) => {
  const [modalShow, setModalShow] = useState(false)
  const [modalId, setModalId] = useState('')
  const handelModal = (e) => {
    setModalId(e.target.parentElement.id)
    setModalShow(true)
  }

  return (
    <>
      { data === undefined ? '' :
        data.map(item => (
          <Card key={item.id} id={item.id} style={{ width: '194px' }} className="bg-light text-dark m-3" onClick={handelModal}>
            <Card.Img variant="top"           
              src={
                item.profile_path ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.profile_path}` 
                : item.poster_path ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`
                : `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
              }
              alt={item.title || item.name}
            />
            <Card.Text className="d-flex flex-column justify-content-center align-items-center text-center" style={{height: '72px'}}>
                { item.name ? item.name : item.title }
            </Card.Text>

          </Card>
        ))
      }

      <ModalMovieInfo 
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={data}
        id={modalId}
      />

      </>
  )
}

export default CardTrending