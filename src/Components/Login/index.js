import React, { useState } from "react";
import api from "../../Services/api";
import axios from "axios";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Badge,
} from "reactstrap";
import Container from "reactstrap/lib/Container";

function Login({ history }) {
  /*  */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("result of the submit ", email, password);

    if (email !== "" && password !== "") {
      try {
        console.log("login");
        const response = await axios.post("http://localhost:8001/login", { email, password });
        const userId = response.data._id || false;
        console.log("user id:", userId);
        if (userId) {
          //local stroage
          localStorage.setItem("user", userId);
          history.push("/dashboard");
        } else {
          const { message } = response.data;
          setError(true);
          seterrorMessage(message);
          setTimeout(() => {
            setError(false);
            seterrorMessage("");
          }, 2000);
          console.log(message);
        }
      } catch (error) {
        setError(true);
        console.log("error");
      }
    } else {
      setError(true);
      seterrorMessage("empty input fields");
      setTimeout(() => {
        setError(false);
        seterrorMessage("");
      }, 2000);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {error ? <Alert color="danger">{errorMessage}</Alert> : " "}

        <FormGroup className="from-group"></FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="something@idk.cool"
            onChange={(evnt) => setEmail(evnt.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-2">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="don't tell!"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Button className="submit-btn">Submit</Button>
        </FormGroup>

        <FormGroup>
          <Button
            className="secondary-btn"
            onClick={() => history.push("./register")}
          >
            Register
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
}

export default Login;
