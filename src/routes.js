import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Register";
import Event from "./Components/Events";
import TopNavbar from "./Components/TopNavbar";

export default function Routes() {
  return (
    <BrowserRouter>
      <TopNavbar />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/event" exact component={Event} />
      </Switch>
    </BrowserRouter>
  );
}
