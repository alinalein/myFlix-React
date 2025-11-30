import React from "react";
import { useState } from "react";
import { Toast } from "react-bootstrap";
import { BookmarkStar, BookmarkStarFill } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import "./toggle-favorite.scss";
import { baseUrl } from "../../utils/helpers/helpers";

export const FavoriteToggle = ({ movie }) => {
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const [toastDelete, setToastDelete] = useState(false);

  // const showToastDelete = () => {
  //   setToastDelete(true);
  //   setTimeout(() => {
  //     setToastDelete(false);
  //   }, 5000); // Adjust the timeout as needed
  // };

  const isMovieInFavorites = user.FavoriteMovies.includes(movie.id);

  const addToFavorites = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/users/${user.Username}/movies/add/${movie.id}	`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        // Movie successfully added to favorites
        const updatedUser = {
          ...user,
          FavoriteMovies: [...user.FavoriteMovies, movie.id],
        };
        // has to set token:token(means token stays same) as setUser expect an object with user & token
        dispatch(setUser({ user: updatedUser, token: token }));
        localStorage.setItem("user", JSON.stringify(updatedUser));
        console.log("Movie added to favorites");
      } else {
        console.error("Failed to add movie to favorites");
      }
    } catch (error) {
      console.error("Error adding movie to favorites", error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/users/${user.Username}/movies/remove/${movie.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // create copy of object user & keeps all movies from fav except the one where id is id of movie the user clicked on
        const updatedUser = {
          ...user,
          FavoriteMovies: user.FavoriteMovies.filter((id) => id !== movie.id),
        };
        // update global state
        dispatch(setUser({ user: updatedUser, token: token }));
        localStorage.setItem("user", JSON.stringify(updatedUser));
        console.log("Movie removed from favorites");
      } else {
        console.error("Failed to remove movie from favorites");
      }
    } catch (error) {
      console.error("Error removing movie from favorites", error);
    }
  };

  return (
    <>
      {isMovieInFavorites ? (
        <>
          <BookmarkStarFill
            className="favorite__icon"
            color="#0dcaf0"
            size={35}
            onClick={() => {
              removeFromFavorites();
              // showToastDelete();
            }}
          />
          {/* <Toast

            show={toastDelete}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <Toast.Body>DELETED!!</Toast.Body>
          </Toast> */}
        </>
      ) : (
        <BookmarkStar
          className="favorite__icon"
          color="white"
          size={35}
          onClick={addToFavorites}
        />
      )}
    </>
  );
};
