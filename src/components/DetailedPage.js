import React, { useEffect, useState } from 'react'
import Services from "../services/movieData";
import { useSearchParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const DetailedPage = () => {
  const [urlParams, setUrlParams] = useSearchParams()
  const [details, setDetails] = useState('')
  const [credits, setCredits] = useState('')
  const [images, setImages] = useState('')
  const [videos, setVideos] = useState('')
  const [recommendations, setRecommendations] = useState('')

  const backdropStyle = {
    backgroundImage: `url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${details.backdrop_path}')`,
    // backgroundPosition: 'right -200px top',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(0,0,0,.5)',
    backgroundBlendMode: 'darken',
    height: '380px',    
  }

  useEffect (() => {
    // Get Details
    Services.get(`${urlParams.get('type')}/${urlParams.get('id')}`, ``, `&language=${urlParams.get('language')}`).then(res =>setDetails(res))
    // Get Credits
    Services.get(`${urlParams.get('type')}/${urlParams.get('id')}/credits`, ``, ``).then(res =>setCredits(res))
    // Get Images
    Services.get(`${urlParams.get('type')}/${urlParams.get('id')}/images`, ``, `&language=en,hu`)
      .then(res => {
        const langDefault = res.posters.filter(poster => poster.iso_639_1 === urlParams.get('language'))
        const langEn = res.posters.filter(poster => poster.iso_639_1 === 'en' )
        langDefault.length !== 0 ? setImages(langDefault) : setImages(langEn)
      })
    // Get Videos
    Services.get(`${urlParams.get('type')}/${urlParams.get('id')}/videos`, ``, `&language=en,hu`)
      .then(res => {
        const langDefault = res.results.filter(video => video.iso_639_1 === urlParams.get('language') && video.type === 'Trailer')
        const langEn = res.results.filter(video => video.iso_639_1 === 'en' && video.type === 'Trailer')
        langDefault.length !== 0 ? setVideos(langDefault) : setVideos(langEn)
      })
      // Get Recommendations
      Services.get(`${urlParams.get('type')}/${urlParams.get('id')}/recommendations`, ``, `&language=${urlParams.get('language')}`).then(res =>setRecommendations(res))
  }, [urlParams])

  console.log('DETAILS', details)
  console.log('CREDITS', credits)
  console.log('IMAGES', images)
  console.log('VIDEOS', videos)
  console.log('RECOMMENDATIONS', recommendations)

  return (
  <>
    <Container>
      <Row className='text-white' style={backdropStyle}>
        <Col>
            <Row className='d-flex flex-column'>
              <Col className='pt-2'>
                <h1>
                  <strong>
                    {details.title ? details.title : details.name} {' '}
                    {!details.release_date ? '' : `(${ details.release_date.slice(0, 4) })`}
                  </strong>             
                </h1>
                <p style={{fontSize: '.9rem'}}>
                  {urlParams.get('type') === 'tv' 
                    ? <><strong>First air date:</strong> {details.first_air_date} <br/> <strong>Last air date:</strong> {details.last_air_date}</>
                    : '' 
                  }
                </p>
                <p>{!details ? '' : details.genres.map(genre => ` ${genre.name}`).toString()}</p>   
              </Col>
              <Col md="6" className='mt-0'>
                <p><em>"{details.tagline}"</em></p>
                <h2><strong>Overview</strong></h2>
                <p>{details.overview}</p>
              </Col>
            </Row>
            
            
            
            
        </Col>
        {/* <Col>        
        </Col> */}

      </Row>
      <Row>
        {/* <Col>
          <h1>{details.title} ({details ? details.release_date.slice(0, 4) : ''})</h1>
          <p>{details ? details.genres.map(genre => ` ${genre.name}`).toString() : ''}</p>
          <h2>Overview</h2>
          <p>{details.overview}</p>
        </Col> */}
      </Row>
      <Row>
        <h2>Cast</h2>
      </Row>
      <Row className='bg-light text-dark overflow-scroll flex-nowrap px-1 py-4'>
        {/* <Col lg="12"> */}
          {/* <h2>Cast</h2> */}
          {!credits ? '' : 
            credits.cast.map(credit => (
              <Card style={{ width: '9.2rem', fontSize: '.9rem', boxShadow: '0px 1px 7px 3px #afaeae' }} className='mx-2 px-0 lh-sm'>
                <Card.Img variant="top" className='mx-0'
                  src={credit.profile_path ? `https://www.themoviedb.org/t/p/w276_and_h350_face${credit.profile_path}` 
                  : `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`} 
                  />
                <Card.Body>
                  {/* <Card.Title>{credit.known_for_department !== 'Acting' ? '' : credit.name}</Card.Title> */}
                  <Card.Text>
                    {credit.known_for_department !== 'Acting' ? '' 
                      : <><strong>{credit.name}</strong><br />{credit.character}</>
                      }
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          }
          
        {/* </Col> */}
      </Row>
      <Row>
        <h2>Media</h2>
      </Row>
      <Row className='bg-light text-dark'>
          
        {/* <Col>Media</Col> */}
      </Row>
      <Row className='bg-light text-dark'>
        <Col>Recommendations
        </Col>
      </Row>
    </Container>
  </>
  )
}

export default DetailedPage