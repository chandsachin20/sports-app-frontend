import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Register";
import Event from "./Components/Events";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login"  component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/event" component={Event} />
      </Switch>
    </BrowserRouter>
  );
}
