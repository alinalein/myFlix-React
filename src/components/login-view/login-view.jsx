import { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoadingSpinner, baseUrl } from "../../utils/helpers/helpers";
import { setUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import "./login-view.scss";

export const LoginView = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // send this data with the body of POST request
    const data = {
      Username: username,
      Password: password,
    };

    fetch(`${baseUrl}/users/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          // set the user and token global state
          dispatch(setUser({ user: data.user, token: data.token }));
          document.body.classList.remove("background-image");
        } else {
          setLoading(false);
          alert("Username or password is wrong");
        }
      })
      .catch((error) => {
        console.error("Error occurred during login:", error);
        alert("An error occurred during login. Please try again.");
      });
  };

  return (
    <Row className="login_component mt-2 mb-2">
      <Form onSubmit={handleSubmit} className="mx-auto">
        <h2 className="text-center mb-4 h2__text">LOGIN</h2>
        <LoadingSpinner loading={loading} />
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label className="form__text">
            <strong> Username:</strong>
          </Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className="form__text">
            <strong>Password: </strong>
          </Form.Label>
          <div className="mb-4">
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </Form.Group>
        <div className="d-flex justify-content-between">
          {/* button will be disabled while loading */}
          <Button variant="info" type="submit" disabled={loading}>
            Submit
          </Button>
          <p>
            New to myFlix? <Link to="/signup">Signup!</Link>
          </p>
        </div>
      </Form>
    </Row>
  );
};
