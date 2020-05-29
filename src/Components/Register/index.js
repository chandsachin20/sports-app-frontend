import React, { useState } from "react";
import api from "../../Services/api";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Container from "reactstrap/lib/Container";

function Register({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("result of the submit ", email, password, firstName, lastName);

    const response = await api.post("/user/register", {
      email,
      password,
      firstName,
      lastName,
    });

    const userId = response.data._id || false;

    if (userId) {
      //local stroage
      localStorage.setItem("user", userId);
      history.push("/login");
    } else {
      const { message } = response.data;
      console.log(message);
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      <p>
        Please <strong>Register </strong> for a new account
      </p>
      <Form onSubmit={handleSubmit} inline>
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
            Password
          </Label>
          <Input
            type="text"
            name="lastName"
            id="examplePassword"
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
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default Register;
