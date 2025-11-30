import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { baseUrl, formatDate } from "../../utils/helpers/helpers";
import { LoadingSpinner } from "../../utils/helpers/helpers";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

export const EditProfile = () => {
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveClick = async (event) => {
    event.preventDefault();
    setLoading(true);

    const updatedUser = {
      Username: username,
      Email: email,
      Birthday: birthday,
    };

    console.log("updated user:", updatedUser);
    try {
      const response = await fetch(`${baseUrl}/users/update/${user.Username}`, {
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // If the update is successful, get tha response data from server & update localstorage
        const data = await response.json();
        dispatch(setUser({ user: data, token: token }));
        localStorage.setItem("user", JSON.stringify(data));
        alert("You successfully updated your profile");
        // navigate to the user profile when update successfull
        navigate("/user-profile");
      } else if (response.status === 401) {
        const data = await response.json();
        console.error("Unauthorized:", data.error);
        alert(data.error);
      } else if (response.status === 422) {
        const data = await response.json();
        console.error("Validation Error:", data.errors);
      } else {
        console.error("Failed to update user information");
      }
    } catch (error) {
      console.error("Error updating user information", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="mt-2 profile_component mb-3">
      <h2 className="text-center mb-4 h2__text">EDIT YOUR PROFILE</h2>
      <Form onSubmit={handleSaveClick}>
        <LoadingSpinner loading={loading} />
        <Form.Group controlId="formUsername" className="mb-2 form__text">
          <Form.Label>
            <strong> Current Username:</strong>{" "}
            <span className="profile__details">{user.Username}</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="5"
            required
          />
          <small className="small__text">
            Username, please choose at least 5 characters, only letters and
            numbers
          </small>
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-2 form__text">
          <Form.Label>
            <strong>Current Email: </strong>
            <span className="profile__details">{user.Email}</span>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small>Optional field</small>
        </Form.Group>
        <Form.Group controlId="formBirtday" className="mb-3 form__text">
          <Form.Label>
            <strong>Current Birthday: </strong>
            <span className="profile__details">
              {formatDate(user.Birthday)}
            </span>
          </Form.Label>
          <Form.Control
            type="date"
            placeholder="Birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="form__input"
          />
          <small>Optional field</small>
        </Form.Group>
        <div className="text-center mb-2">
          <Button variant="info" type="submit" disabled={loading}>
            Save Changes
          </Button>
        </div>
      </Form>
    </Row>
  );
};
