import React, { useState } from "react";
import api from "../../Services/api";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import Container from "reactstrap/lib/Container";

function Register({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
// /    console.log("result of the submit ", email, password, firstName, lastName);

    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      const response = await api.post("http://localhost:8001/user/register", {
        email,
        password,
        firstName,
        lastName,
      });

      const user = response.data.user || false;
      const user_id = response.data.user_id || false;
      

      if (user) {
        //local stroage
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);
        history.push("/dashboard");
      } else {
        const { message } = response.data;
        console.log(message);
      }
    } else {
      setError(true);
      seterrorMessage("Some fields are empty");
      setTimeout(() => {
        setError(false);
        seterrorMessage("");
      }, 2000);
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      <p>
        Please <strong>Register </strong> for a new account
      </p>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="FirstName" className="mr-sm-2">
            First Name
          </Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="LastName" className="mr-sm-2">
            Last Name
          </Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
          />
        </FormGroup>
        <br />
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
          {" "}
          <Button className="submit-btn">Submit</Button>
        </FormGroup>
        <FormGroup>
          {" "}
          <Button
            className="secondary-btn"
            onClick={() => history.push("./login")}
          >
            Login Instead?
          </Button>
        </FormGroup>
      </Form>
      {error ? <Alert color="danger">Missing some information</Alert> : " "}
    </Container>
  );
}

export default Register;
