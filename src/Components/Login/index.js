import React, { useState } from "react";
import api from "../../Services/api";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input , Badge} from "reactstrap";


function Login( {history}) {
/*  */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async event => {
    event.preventDefault();
    console.log("result of the submit ",  email, password );

    const response = await axios.post("/login", { email, password });
    const userId = response.data._id || false;

    if (userId) {
      //local stroage
      localStorage.setItem("user", userId);
      history.push("/dashboard");
    } else {
      const { message } = response.data;
      console.log(message);
    }
  };

  return (
    <Form  onSubmit={handleSubmit} inline>
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
      <FormGroup>
      <p>Don't have account? Register <Badge href="/register" color="primary">here</Badge></p>
      </FormGroup>
    </Form>
  );
}

export default Login;
