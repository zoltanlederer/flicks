import React, { useState, useEffect, useContext } from "react"
import Services from "../services/movieData";
import { GlobalStateContext } from '../states/GlobalStates'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ModalMovieInfo = (props) => {
  const state = useContext(GlobalStateContext)
  const [language, setLanguage] = state.selectedLanguage
  const [selectedItem, setSelectedItem] = useState([])
  const [video, setVideo] = useState([])
  const [credits, setCredits] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    try {
      const item = props.data.filter(i => i.id === Number(props.id))
      
      if (item.length !== 0 && item[0].media_type !== 'person') {
        // Trailer
          Services
          .get(`${item[0].media_type}/${props.id}/videos`, ``, `&language=en,hu`)
          .then(res => {
            const data =  res.results.find(e => e.type === 'Trailer' && e.iso_639_1 === language) || res.results.find(e => e.type === 'Trailer' && e.iso_639_1 === 'en')
            console.log('DATA', data)
            setVideo(data)
          })
        // Credits 
          Services
          .get(`${item[0].media_type}/${props.id}/credits`, ``, `&language=${language}`)
          .then(res => {
            const data = res.cast.slice(0, 10)
            setCredits(data)
          })
        // Genres 
          Services
          .get(`${item[0].media_type}/${props.id}`, ``, `&language=${language}`)
          .then(res => {
            setGenres(res.genres)
          })
      }  
      setSelectedItem(item)
    } catch (err) {
      console.log(err)
    }
    
  }, [props.data, props.id, language, setSelectedItem])

  console.log('selectedItem', selectedItem)
  console.log('video', video)

  return (
    <>
    {selectedItem.length === 0 ? '' 
    : selectedItem[0].media_type !== 'person' ?  
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton className="bg-light text-dark"> */}
          {/* <Modal.Title id="contained-modal-title-vcenter">
            {item[0].title}
          </Modal.Title> */}
        {/* </Modal.Header> */}
        <Modal.Body className="show-grid bg-light text-dark" >
        
        {/* <Button variant="outline-dark" onClick={props.onHide} className='text-end'>X</Button> */}
          <Container>
            <Row>
              <Col className="text-end mb-2">
                {/* <button type="button" class="btn-close" aria-label="Close" onClick={props.onHide}></button>                */}
              </Col>
            </Row>
            <Row>
              <Col>
                {
                  video === undefined ? 
                    <img src="https://smex.org/wp-content/uploads/2018/06/Youtube-Blocked.jpg" alt='Trailer not available' width='100%' />
                  : <iframe
                      // width = "560"
                      width = "100%"
                      height = "315"
                      src = {`https://www.youtube-nocookie.com/embed/${video.key}`}
                      title = "YouTube video player"
                      frameBorder = "0"
                      allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen >
                    </iframe>
                 }
              </Col>
            </Row>
            <Row className="my-3">
              <hr className="m-0" />
              <Col className="text-center pt-2">
                {/* <p className="m-0"><strong>{selectedItem[0].title || selectedItem[0].name}</strong></p> */}
                <h5>{selectedItem[0].title || selectedItem[0].name}</h5>
              </Col>
              <Col className="text-end">
                <Button variant="outline-dark" size="sm" className='m-1'>More</Button>
              </Col>
              <hr className="m-0" />
            </Row>
            {/* className="flex-column justify-content-center align-items-center align-self-center align-content-center" */}
            <Row className="align-items-center justify-content-center align-self-center align-content-center">
              <Col lg={4} className="text-center">
                
                <div><img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${selectedItem[0].poster_path}`} alt='Trailer not available' width='180px' /></div>
                
              </Col>
              <Col lg={8}>
                
                {/* <p><strong>Plot</strong></p> */}
                <p>{selectedItem[0].overview}</p>
                <p>{
                  selectedItem[0].release_date
                    ? <em>Release Date: {selectedItem[0].release_date}</em>
                    : <em>First Air Date: {selectedItem[0].first_air_date}</em>
                }</p>
                <p><strong>Genres</strong></p>
                 {
                   genres.map(e => <Button key={e.id} variant="outline-dark" size="sm" className='m-1' disabled>{e.name}</Button>)
                 }
                {/* <p>{selectedItem[0].overview}</p> */}
                <p><strong>Actors</strong></p>
                {
                  credits.map(e => <Button key={e.id} variant="outline-dark" size="sm" className='m-1'>{e.name}</Button>)
                }
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      : ''
    }
    </>
  )
}

export default ModalMovieInfo