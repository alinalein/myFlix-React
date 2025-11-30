import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './movie-card.scss'
import { FavoriteToggle } from '../toggle-favorite/toggle-favorite'

export const MovieCard = ({ movie }) => {

  return (
    <>
      <Card className="h-100 card__shadow">
        <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
        <Card.Body className="card__body">
          <Card.Title style={{ color: 'white' }} className=" text-center mb-4">
            {movie.Title}
          </Card.Title>
          <div className="d-flex justify-content-between">
            <Link to={`/movies/${movie.id}`}>
              <Button variant="outline-info">Details</Button>
            </Link>
            <FavoriteToggle
              movie={movie}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Actors: PropTypes.string.isRequired,
  }).isRequired,
}
