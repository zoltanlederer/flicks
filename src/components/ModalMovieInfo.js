import React, { useState, useEffect, useContext } from "react"
import Services from "../services/movieData";
import { GlobalStateContext } from '../states/GlobalStates'
import { useSearchParams, useNavigate } from "react-router-dom";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ModalMovieInfo = (props) => {
  const navigate = useNavigate()
  const state = useContext(GlobalStateContext)
  const [language, setLanguage] = state.selectedLanguage
  const [urlParams, setUrlParams] = useSearchParams()
  const [selectedItem, setSelectedItem] = useState([])
  const [video, setVideo] = useState([])
  const [credits, setCredits] = useState([])
  const [genres, setGenres] = useState([])
  const [mediaType, setMediaType] = useState('')

  useEffect(() => {
    try {
      const item = props.data.filter(i => i.id === Number(props.id))
      setMediaType(urlParams.get('type'))
      if (item.length !== 0 && mediaType !== 'person') {        
        // Trailer
        Services
        .get(`${mediaType === 'upcoming' ? 'movie' : mediaType}/${props.id}/videos`, ``, `&language=en,hu`)
        .then(res => {
          const data =  res.results.find(e => e.type === 'Trailer' && e.iso_639_1 === language) || res.results.find(e => e.type === 'Trailer' && e.iso_639_1 === 'en')
          setVideo(data)
        })
        // Credits 
        Services
        .get(`${mediaType === 'upcoming' ? 'movie' : mediaType}/${props.id}/credits`, ``, `&language=${language}`)
        .then(res => {
          const data = res.cast.slice(0, 10)
          setCredits(data)
        })
        // Genres 
        Services
        .get(`${mediaType === 'upcoming' ? 'movie' : mediaType}/${props.id}`, ``, `&language=${language}`)
        .then(res => {
          setGenres(res.genres)
        })
      }  
      setSelectedItem(item)
    } catch (err) {
      console.log(err)
    }
    
  }, [props.data, props.id, language, setSelectedItem, urlParams, mediaType])

  const handleDetailedPage = () => {
    console.log('ID', selectedItem[0].id)
    console.log('MEDIATYPE', mediaType === 'upcoming' ? 'movie' : mediaType)
    console.log('MEDIATYPE!!', mediaType)
    navigate(`/details?type=${mediaType === 'upcoming' ? 'movie' : mediaType}&id=${selectedItem[0].id}&language=${language}`)
  }

  const handleActor = (id) => {
    navigate(`/person?id=${id}&language=${urlParams.get('language')}`)
  }

  console.log('selectedItem', selectedItem)
  // console.log('video', video)
  // console.log('credits', credits)
  // console.log('genres', genres)

  return (
    <>
    {selectedItem.length === 0 ? '' 
    : mediaType !== 'person' ?  
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="show-grid bg-light text-dark" >
        
          <Container>
            <Row>
              <Col>
                {
                  video === undefined ? 
                    <img src={require(`../images/no-trailer-available.jpg`)} alt='Trailer not available' width='100%' />
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
                <h5>{selectedItem[0].title || selectedItem[0].name}</h5>
              </Col>
              <Col className="text-end">
                <Button variant="outline-dark" size="sm" className='m-1' onClick={handleDetailedPage}>More</Button>
              </Col>
              <hr className="m-0" />
            </Row>
            <Row className="align-items-center justify-content-center align-self-center align-content-center">
              <Col lg={4} className="text-center">
                
                <div>
                  <img src={selectedItem[0].poster_path ?
                    `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${selectedItem[0].poster_path}`
                    : require(`../images/no-image-available.jpg`)
                  }
                  alt='Trailer not available' width='180px' />
                </div>
                
              </Col>
              <Col lg={8}>                
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
                <p className="mt-2"><strong>Actors</strong></p>
                {
                  credits.map(e => (
                    <Button key={e.id} variant="outline-dark" size="sm" className='m-1' onClick={() => handleActor(e.id)}>{e.name}</Button>
                  ))
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