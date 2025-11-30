import { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, LoadingSpinner } from "../../utils/helpers/helpers";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`${baseUrl}/users/signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          alert("You have been signed up");
          navigate("/login");
        } else if (response.status === 401) {
          alert(`Username ${data.Username} already exists`);
        } else if (response.status === 422) {
          return response.json();
        } else {
          console.error("Error during signup:", response.statusText);
          alert("An error occurred during signup");
        }
      })
      .then((data) => {
        if (data && data.errors && data.errors.length > 0) {
          data.errors.forEach((error) => {
            alert(error.msg);
            console.error("Validation Error:", error.msg);
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Row className="login_component mt-2 mb-2">
      <Form onSubmit={handleSubmit} className="mx-auto ">
        <h2 className="text-center mb-4 h2__text">SIGNUP</h2>
        <LoadingSpinner loading={loading} />
        <Form.Group controlId="formUsername" className="mb-2">
          <Form.Label className="form__text">
            <strong> Username: </strong>
          </Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
          />
          <small className="small__text ">
            Please choose at least 5 characters.
          </small>
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-2">
          <Form.Label className="form__text">
            <strong>Password:</strong>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
          />
          <small className="small__text ">
            Please choose at least 8 characters
          </small>
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label className="form__text">
            <strong>Email: </strong>
          </Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBirtday">
          <Form.Label className="form__text">
            <strong>Birthday:</strong>
          </Form.Label>
          <div className="mb-4">
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <Button variant="info" type="submit" disabled={loading}>
              Submit
            </Button>
            <p>
              Have an account? <Link to="/login">Login!</Link>
            </p>
          </div>
        </Form.Group>
      </Form>
    </Row>
  );
};
