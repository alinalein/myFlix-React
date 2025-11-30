import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieList } from "../movie-list/movie-list";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { UserProfile } from "../profile-view/user-profile";
import { EditProfile } from "../profile-view/edit-profile";
import { FavoriteMovies } from "../favorite-movies/favorite-movies";
import { DeleteProfile } from "../profile-view/delete-profile";
import { MoviesDrama } from "../movies-genre/drama-genre";
import { MoviesAction } from "../movies-genre/action-genre";
import { MoviesBiography } from "../movies-genre/biography-genre";
import { MoviesCrime } from "../movies-genre/crime-genre";
import { MoviesSciFi } from "../movies-genre/sci-fi-genre";
import { setMovies } from "../../redux/reducers/movies";
import { baseUrl } from "../../utils/helpers";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const MainView = () => {
  const { user, token } = useSelector((state) => state.user);
  const movies = useSelector((state) => state.movies.list);
  const dispatch = useDispatch();

  // send it to movie-list
  const [loading, setLoading] = useState(false);

  /*populate the movies array with the movies from the API */
  useEffect(() => {
    if (!token) {
      return;
    }

    setLoading(true);

    fetch(`${baseUrl}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          const featutedStatus = movie.Featured ? "Yes" : "No";
          return {
            id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre.Name,
            Director: movie.Director.Name,
            Actors: movie.Actors.join(", "),
            ImagePath: movie.ImagePath,
            Featured: featutedStatus,
          };
        });
        dispatch(setMovies(moviesFromApi));
      })
      // Set loading to false once the movies are fetched
      .finally(() => {
        setLoading(false);
        document.body.classList.remove("background-image");
      });
  }, [token]);

  return (
    <BrowserRouter>
      {/* Call NavivationBar component */}
      <NavigationBar />
      <Container>
        <Row className="justify-content-center mt-4  ">
          <Routes>
            {/* Route to register */}
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            {/* Route to login */}
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView />
                    </Col>
                  )}
                </>
              }
            />
            {/* Route to show all movies  */}
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col>
                      <MovieList loading={loading} />
                    </Col>
                  )}
                </>
              }
            />
            {/* Route to selected movie  */}
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col>
                      <MovieView />
                    </Col>
                  )}
                </>
              }
            />
            {/* Route to the profile of the user  */}
            <Route
              path="/user-profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col md={5}>
                      <UserProfile />
                    </Col>
                  )}
                </>
              }
            />
            {/* Route to edit the profile */}
            <Route
              path="/edit-profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col md={5}>
                      <EditProfile />
                    </Col>
                  )}
                </>
              }
            />
            {/* Route to users favorite movies */}
            <Route
              path="/favorite-movies"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col>
                      <FavoriteMovies />
                    </Col>
                  )}
                </>
              }
            />
            {/* Route to delete the profile */}
            <Route
              path="/delete-profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col md={5}>
                      <DeleteProfile />
                    </Col>
                  )}
                </>
              }
            />
            {/* Routes to movie Genres */}
            <Route
              path="/drama"
              element={
                <>
                  {!user ? <Navigate to="/login" replace /> : <MoviesDrama />}
                </>
              }
            />
            <Route
              path="/crime"
              element={
                <>
                  {!user ? <Navigate to="/login" replace /> : <MoviesCrime />}
                </>
              }
            />
            <Route
              path="/biography"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <MoviesBiography />
                  )}
                </>
              }
            />
            <Route
              path="/sci-fi"
              element={
                <>
                  {!user ? <Navigate to="/login" replace /> : <MoviesSciFi />}
                </>
              }
            />
            <Route
              path="/action"
              element={
                <>
                  {!user ? <Navigate to="/login" replace /> : <MoviesAction />}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
