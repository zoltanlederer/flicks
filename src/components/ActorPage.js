import React, { useState, useEffect} from "react";
import Services from "../services/movieData";
import { useSearchParams, Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";


const ActorPage = () => {
  // const navigate = useNavigate()
  const [urlParams, setUrlParams] = useSearchParams()
  const [details, setDetails] = useState('')
  const [knownFor, setKnownFor] = useState('')

  const [movielist, setMovielist] = useState('')
  // const [movieCredits, setMovieCredits] = useState('')
  // const [tvCredits, setTvCredits] = useState('')
  // const [combinedCredits, setCombinedCredits] = useState('')

  useEffect (() => {
    window.scrollTo(0, 0);
    // Get Details
    Services.get(`person/${urlParams.get('id')}`, `&append_to_response=movie_credits,tv_credits,combined_credits`, `&language=en`)
      .then(res => {
        res.movie_credits.cast.sort((a,b) => {
          const yearA = a.release_date
          const yearB = b.release_date
          if (yearA > yearB) {
            return -1
          }
          if (yearA < yearB) {
            return 1
          }
          return 0
        })

        res.tv_credits.cast.sort((a,b) => {
          const yearA = a.first_air_date
          const yearB = b.first_air_date
          if (yearA > yearB) {
            return -1
          }
          if (yearA < yearB) {
            return 1
          }
          return 0
        })

        return setDetails(res) 
      })
    // Get Known For
    Services.get(`discover/movie`, `&sort_by=vote_count.desc&with_cast=${urlParams.get('id')}`, `&language=${urlParams.get('language')}`)
      .then(res =>setKnownFor(res))
    // // Get Movie Credits
    // Services.get(`person/${urlParams.get('id')}/movie_credits`, ``, `&language=${urlParams.get('language')}`).then(res =>setMovieCredits(res))
    // // Get TV Credits
    // Services.get(`person/${urlParams.get('id')}/tv_credits`, ``, `&language=${urlParams.get('language')}`).then(res =>setTvCredits(res))
    // // Get Combined Credits
    // Services.get(`person/${urlParams.get('id')}/combined_credits`, ``, `&language=${urlParams.get('language')}`).then(res =>setCombinedCredits(res))
    Services.get(`discover/movie`, `&sort_by=primary_release_date.desc&with_cast=${urlParams.get('id')}`, `&language=${urlParams.get('language')}`)
      .then(res =>setMovielist(res))


  },[urlParams])


  // console.log('DETAILS', details)
  // console.log('KNOWN FOR', knownFor)
  // console.log('MOVIE LIST', movielist)

  // const handleGoToSelected = (id, media) => {
  //   console.log('ID', id)
  //   console.log('MEDIA', media)
  //   navigate(`/details?type=${media}&id=${id}&language=${urlParams.get('language')}`)
  // }
  

  return (
    <Container className='mb-5'>
      <Row className="bg-light text-dark px-3 pt-4">
        <Col md={3}>
          <h1 className='text-center'>{details.name}</h1>
        <img
          src={details.profile_path ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${details.profile_path}` 
          : require(`../images/no-image-available.jpg`)} 
          alt={details.name}
          width='100%'
          className="my-3"
          style={{borderRadius: '15px'}}
        />
        <p>
          <strong>Birthday</strong><br />
          {details.birthday}
        </p>
        {details.deathday && 
          <p>
            <strong>Deathday</strong><br />
            {details.deathday}
          </p>
        }
        <p>
          <strong>Place of Birth</strong><br />
          {details.place_of_birth} 
        </p>
        
        </Col>

        <Col md={9}>
          <h1 className="mb-4">Biography</h1>
          {details.biography}

          
          <div className="mt-3"><h2>Known For</h2></div>
          <Row className='bg-light text-dark overflow-auto flex-nowrap justify-content-start p-2'>
          
            {knownFor && knownFor.results.map(known => (
              <Link to={`/details?type=movie&id=${known.id}&language=${urlParams.get('language')}`} style={{all: 'unset'}}>
                <Card key={known.id} 
                  style={{ width: '150px', border: 'none', backgroundColor: 'initial' }}
                  className='m-2 p-0 custom-poster'
                  // onClick={() => handleGoToSelected(known.id, 'movie')}
                  >
                    <img src={known.poster_path ?
                      `https://www.themoviedb.org/t/p/w220_and_h330_face${known.poster_path}`
                      : require(`../images/no-image-available.jpg`)
                      }
                      alt={known.title ? known.title : known.name} 
                      width='150px'
                      height='219px'
                      style={{boxShadow: 'rgb(175, 174, 174) 0px 1px 7px 3px'}}
                    />
                  <Card.Text className='lh-sm text-center mt-2'>
                    <strong>{known.title}</strong>
                  </Card.Text>
                </Card>  
              </Link>
              
              ))
            }
          </Row>

          <Row>
            <Tabs variant='pills' defaultActiveKey="movies" className="my-2 p-0">
              <Tab eventKey="contact" title="Acting" disabled tabClassName={'tabtitle-actor'} />

              {/* Movies */}

              <Tab eventKey="movies" title="Movies" tabClassName={'customtab-actor'}>
                <Row className='bg-light text-dark overflow-auto justify-content-around p-2'>
                  {details &&
                    details.movie_credits.cast.map(movie => (
                      <Link to={`/details?type=movie&id=${movie.id}&language=${urlParams.get('language')}`} style={{all: 'unset'}}>
                        <Card key={`${movie.id}`}
                          style={{ width: '150px', border: 'none', backgroundColor: 'initial' }}
                          className='my-2 mx-2 text-center custom-poster'
                          // onClick={() => handleGoToSelected(movie.id, 'movie')}
                        >
                          <img src={movie.poster_path ?
                            `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`
                            : require(`../images/no-image-available.jpg`)
                            }
                            alt={movie.title}
                            width='150px'
                            height="218px"
                            style={{boxShadow: 'rgb(175, 174, 174) 0px 1px 7px 3px'}}
                            />
                            <strong>{movie.title}</strong>
                        </Card>
                      </Link>
                    ))
                  }
                </Row>
              </Tab>

              
              {/* TVs */}
              <Tab eventKey="tvs" title="TVs" tabClassName={'customtab-actor'}>
                <Row className='bg-light text-dark overflow-auto justify-content-around p-2'>
                  {details &&
                    details.tv_credits.cast.map(tv => (
                      <Link to={`/details?type=tv&id=${tv.id}&language=${urlParams.get('language')}`} style={{all: 'unset'}}>
                        <Card key={Math.floor(Math.random() * 100000)}
                            style={{ width: '150px', border: 'none', backgroundColor: 'initial' }}
                            className='my-2 mx-2 text-center custom-poster'
                            // onClick={() => handleGoToSelected(tv.id, 'tv')}
                          >
                          <img src={tv.poster_path ?
                            `https://www.themoviedb.org/t/p/w220_and_h330_face${tv.poster_path}`
                            : require(`../images/no-image-available.jpg`)
                            }
                            alt={tv.name}
                            width='150px'
                            height="218px"
                            style={{boxShadow: 'rgb(175, 174, 174) 0px 1px 7px 3px'}}
                            />
                            <strong>{tv.name}</strong>
                        </Card>
                      </Link>
                    ))
                  }
                </Row>
              </Tab>
            </Tabs>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default ActorPage








{/* <Tab eventKey="movies" title="Movies" tabClassName={'customtab-actor'}>
  <Row className='bg-light text-dark overflow-auto justify-content-around p-2'>
    {movielist &&
      movielist.results.map(movie => (
        <Card key={`${movie.id}`}
          style={{ width: '150px', border: 'none', backgroundColor: 'initial' }}
          className='my-2 mx-2 text-center custom-poster'
          onClick={() => handleGoToSelected(movie.id, 'movie')}
        >
          <img src={movie.poster_path ?
            `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`
            : `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
            }
            alt={movie.title}
            width='150px'
            height="218px"
            style={{boxShadow: 'rgb(175, 174, 174) 0px 1px 7px 3px'}}
            />
            <strong>{movie.title}</strong>
        </Card>
      ))
    }
  </Row>
</Tab>  */}