import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Alert } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'
import { useSelector } from "react-redux";
import { LoadingSpinner } from '../../utils/helpers/helpers';
import './movie-list.scss'

export const MovieList = ({ loading }) => {

  // get the states from the store
  const hasSearched = useSelector((state) => state.movies.hasSearched)
  const movies = useSelector((state) => state.movies.list)
  const filter = useSelector(state => state.movies.filter).trim().toLowerCase();

  const [showScrollButton, setShowScrollButton] = useState(false)

  const filteredMovies = movies.filter(movie => {
    return movie.Title.toLowerCase().includes(filter);
  });

  useEffect(() => {
    setShowScrollButton(filteredMovies.length > 8)
  }, [filteredMovies.length])

  return (
    <>
      <Row>
        {movies.length === 0 ? (
          <Col className='text-center'>
            <LoadingSpinner loading={loading} />
            <p>The list is empty</p>
          </Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col
              className="mb-4"
              key={movie.id}
              md={3}
              sm={6}
              xs={12}
            >
              <MovieCard
                movie={movie}
              />
            </Col>
          ))
        )}
        {filteredMovies.length === 0 && hasSearched && (
          <Row className="justify-content-md-center text-center">
            <Col md={6} className="mt-5">
              <Alert
                variant="info"
                className="text-center mt-5"
                style={{ background: '#0dcaf0', color: 'black' }}
              >
                Unfortunately, no movie matches your search.
              </Alert>
            </Col>
          </Row>
        )}
        {showScrollButton && (
          <Row className="justify-content-md-center text-center">
            <Col>
              <Button
                variant="info"
                className="scroll-button mb-4"
                onClick={() => {
                  window.scrollTo(0, 0)
                }}
              >
                Scroll to Top
              </Button>
            </Col>
          </Row>
        )}
      </Row>
    </>
  )
}