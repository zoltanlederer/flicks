import React, { useEffect, useState } from 'react'
import Services from "../services/movieData";
import TrailerModal from './TrailerModal'
import { useSearchParams, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";


const DetailedPage = () => {
  const navigate = useNavigate()
  const [urlParams, setUrlParams] = useSearchParams()
  const [details, setDetails] = useState('')
  const [credits, setCredits] = useState('')
  const [images, setImages] = useState('')
  const [videos, setVideos] = useState('')
  const [recommendations, setRecommendations] = useState('')
  const [externalIds, setExternalIds] = useState('')
  const [showTrailerModal, setShowTrailerModal] = useState(false)
  const [videoKey, setVideoKey] = useState('')
  const [trailerTitle, setTrailerTitle] = useState('')
  const [videoTitle, setVideoTitle] = useState('')

  const backdropStyle = {
    backgroundImage: `url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${details.backdrop_path}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(0,0,0,.5)',
    backgroundBlendMode: 'darken',
  }


  useEffect (() => {
    window.scrollTo(0, 0);
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
       // Get External IDs
       Services.get(`${urlParams.get('type')}/${urlParams.get('id')}/external_ids`, ``, `&language=${urlParams.get('language')}`).then(res =>setExternalIds(res))
  }, [urlParams])

  // console.log('DETAILS', details)
  console.log('CREDITS', credits)
  // console.log('IMAGES', images)
  // console.log('VIDEOS', videos)
  // console.log('RECOMMENDATIONS', recommendations)
  // console.log('EXTERNALIDS', externalIds)

  const handleTrailer = (key, title) => {
    console.log(key)
    setVideoKey(key)
    setVideoTitle(details.title ? details.title : details.name)
    setTrailerTitle(title)
    setShowTrailerModal(true)
  }

  const handleRecommendations = (id, media) => {
    navigate(`/details?type=${media}&id=${id}&language=${urlParams.get('language')}`)
  }

  const handleActor = (id) => {
    navigate(`/person?id=${id}&language=${urlParams.get('language')}`)
  }

  return (
  <>
    <Container className='mb-5'>

      {/* HEADER WITH BACKPOSTER */}

      <Row className='text-white overflow-auto d-flex flex-column' style={backdropStyle}>
        <Col className='pt-2'>
          <h1>
            <strong>
              {details.title ? details.title : details.name} {' '}
              {!details.release_date ? '' : `(${ details.release_date.slice(0, 4) })`}
            </strong>             
          </h1>

          <p>
            <a href={`https://www.imdb.com/title/${externalIds.imdb_id}`} target='_blank' rel="noreferrer">
              <img
                src={require(`../images/imdb-icon.png`)}
                width="40"
                height="20"
                alt="imdb logo"
                className='me-2'
              />  
            </a>
            <a href={`https://www.themoviedb.org/${urlParams.get('type')}/${externalIds.id}`} target='_blank' rel="noreferrer">
             <img
                src={require(`../images/tmdb-icon.png`)}
                width="40"
                height="17"
                alt="tmdb logo"
              />  
            </a>
            
          </p>

          <p style={{fontSize: '.9rem'}}>
            {urlParams.get('type') === 'tv' 
              ? <><strong>First air date:</strong> {details.first_air_date} <br/> <strong>Last air date:</strong> {details.last_air_date}</>
              : '' 
            }
          </p>
          <p>{!details ? '' : details.genres.map(genre => ` ${genre.name}`).toString()}</p>   
        </Col>
        <Col md="6" className='mt-0'>
          {!details.tagline ? '' : <p><em>"{details.tagline}"</em></p>}
          <h2><strong>Overview</strong></h2>
          <p>{details.overview}</p>
        </Col>
      </Row>

      {/* CAST */}

      <Row className='my-2'>
        <h2>Cast</h2>
      </Row>
      <Row className='bg-light text-dark overflow-auto flex-nowrap px-1 py-4'>
          {!credits ? '' : 
            credits.cast.map(credit => ( credit.known_for_department === 'Acting' &&
              <Card key={credit.id}
               style={{ width: '9.2rem', fontSize: '.9rem', boxShadow: '0px 1px 7px 3px #afaeae', border: 'none', backgroundColor: 'initial', cursor: 'pointer'}} className='mx-2 px-0 lh-sm'
               onClick={() => handleActor(credit.id)}
               >
                <Card.Img variant="top" className='mx-0'
                  src={credit.profile_path ? `https://www.themoviedb.org/t/p/w276_and_h350_face${credit.profile_path}` 
                  : require(`../images/no-image-available.jpg`)} 
                  alt={credit.name}
                  height='186px'
                />
                
                <Card.Body>
                  <Card.Text>
                    {credit.known_for_department !== 'Acting' ? '' 
                      : <><strong>{credit.name}</strong><br />{credit.character}</>
                      }
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          }
      </Row>


      {/* MEDIA: TRAILRES & POSTERS */}

      {!images || images.length === 0 ? '' : 
        <Row>
          <Tabs variant='pills' defaultActiveKey="posters" className="bg-dark my-2 p-0">
            <Tab eventKey="contact" title="Media" disabled tabClassName={'tabtitle'} />

            <Tab  eventKey="posters" title="Posters" tabClassName={'customtab'}>
              <Row className='bg-light text-dark overflow-auto flex-nowrap justify-content-start p-2'>
                {!images ? '' : 
                  images.map(image => (
                    <Card key={image.file_path} style={{ width: '200px', border: 'none', backgroundColor: 'initial' }} className='m-2 p-0 custom-poster'>
                      <a href={`https://www.themoviedb.org/t/p/original${image.file_path}`} target='_blank' rel="noreferrer">
                        <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${image.file_path}`} width='200px' alt={details.title ? details.title : details.name} style={{boxShadow: 'rgb(175, 174, 174) 0px 1px 7px 3px'}} />
                      </a>                    
                    </Card>
                  ))
                }       
              </Row>
            </Tab>

            {!videos || videos.length === 0 ? '' : 
              <Tab  eventKey="trailers" title="Trailers" tabClassName={'customtab'}>
                <Row className='bg-light text-dark overflow-auto flex-nowrap justify-content-start p-2'>
                    {!videos ? '' : 
                      videos.map(video => (
                        <Card key={video.id} style={{ width: '350px', border: 'none', backgroundColor: 'initial' }} className='m-2 p-0'>
                          <div className='crop' style={{boxShadow: 'rgb(175, 174, 174) 0px 1px 7px 3px'}}>
                            <div className='videos-cover crop-img' onClick={() => handleTrailer(video.key, video.name)}>
                            <i className="bi bi-play-circle"></i>
                              <img src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`} width='350px' alt={video.name} />
                            </div>  
                          </div>
                        </Card>
                      ))
                    }       
                </Row>
              </Tab>
            } 
  
          </Tabs>
        </Row>
      }


      {/* RECOMMENDATIONS */}

      {!recommendations || recommendations.results.length === 0 ? '' :      
        <>
        <Row className='my-2'>
          <h2>Recommendations</h2>
        </Row>

        <Row className='bg-light text-dark overflow-auto flex-nowrap justify-content-start p-2'>
          {!recommendations.results ? '' : 
            recommendations.results.map(recommendation => (
              <Card key={recommendation.id} style={{ width: '200px', border: 'none', backgroundColor: 'initial' }} className='m-2 p-0 custom-poster'>
                  <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${recommendation.poster_path}`} width='200px' alt={recommendation.title ? recommendation.title : recommendation.name} style={{boxShadow: 'rgb(175, 174, 174) 0px 1px 7px 3px'}}
                    onClick={() => handleRecommendations(recommendation.id, recommendation.media_type)}
                  />
                <Card.Text className='lh-sm text-center mt-2'>
                  <strong>{recommendation.title ? recommendation.title : recommendation.name}</strong>
                </Card.Text>
              </Card>
            ))
          }       
        </Row>
        </>
      }
 
      
      {/* TRAILER MODAL */}
      <TrailerModal 
        show={showTrailerModal}
        onHide={() => setShowTrailerModal(false)}
        videokey={videoKey}
        trailertitle={trailerTitle}
        videotitle={videoTitle}
      />

    </Container>
  </>
  )
}

export default DetailedPage