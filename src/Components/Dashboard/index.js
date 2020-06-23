import React, { useEffect, useState, useMemo } from "react";
import {
  Alert,
  Button,
  Dropdown,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import moment from "moment";
import "./dashboard.css";
import Axios from "axios";
import socketio from "socket.io-client";

function Dashboard({ history }) {
  const [events, setEvents] = useState([]);
  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");

  const [rSelected, setRSelected] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [messageHandler, setMessageHandler] = useState("");
  const [eventsRequest, setEventRequest] = useState([]);

  const [dropdownOpen, setDropDownOpen] = useState(false);

  const toggle = () => setDropDownOpen(!dropdownOpen);

  useEffect(() => {
    getEvents();
  }, []);

  const socket = useMemo(
    () =>
      socketio("http://localhost:8001", {
        query: {
          user: user_id,
        },
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on("registration request", (data) =>
      setEventRequest([...eventsRequest, data])
    );
  }, [eventsRequest, socket]);

  const filterHandler = (query) => {
    setRSelected(query);
    getEvents(query);
  };

  const myEventsHandler = async () => {
    try {
      setRSelected("myevents");
      const response = await Axios.get("http://localhost:8001/user/events", {
        headers: { user: user },
      });
      setEvents(response.data.events);
    } catch (error) {
      history.push("/login");
    }
  };

  const getEvents = async (filter) => {
    try {
      const url = filter ? `/dashboard/${filter}` : "/dashboard";
      const response = await Axios.get(url, { headers: { user } });

      setEvents(response.data.event);
    } catch (error) {
      history.push("/login");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    history.push("/login");
  };

  const registrationRequestHandler = async (event) => {
    try {
      await Axios.post(`http://localhost:8001/register/${event.id}`, {
        headers: { user },
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setMessageHandler(
          `the request for the event ${event.title} was successfully!`
        );
        filterHandler(null);
      }, 2500);
    } catch (error) {
      setError(true);
      setMessageHandler(
        `the request for the event ${event.title} wasn't successfully!`
      );
      setTimeout(() => {
        setError(false);
        setMessageHandler("");
      }, 2000);
    }
  };

  const deleteEventHandler = async (eventId) => {
    try {
      await Axios.delete(`http://localhost:8001/event/${eventId}`, {
        headers: {
          user: user,
        },
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setMessageHandler("Event deleted succesfully");
        filterHandler(null);
      }, 2500);
    } catch (error) {
      setError(true);
      setMessageHandler("Error in deleting event");
      setTimeout(() => {
        setError(false);
        setMessageHandler("");
      }, 2000);
    }
  };

  return (
    <>
      <ul className="notifications">
        {eventsRequest.map((event) => {
          return (
            <li key={event.id}>
              <div>
                <strong>event.user.email</strong>
                is Requesting to register to your event
                <strong>{event.title}</strong>
              </div>
              <ButtonGroup>
                <Button color="secondary" onClick={() => {}}>
                  Accept
                </Button>
                <Button color="danger" onClick={() => {}}>
                  Cancel
                </Button>
              </ButtonGroup>
            </li>
          );
        })}
      </ul>

      <div className="filter-panel">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary" caret>
            Filter
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => filterHandler(null)}
              active={rSelected === null}
            >
              {" "}
              All sports
            </DropdownItem>
            <DropdownItem
              onClick={myEventsHandler}
              active={rSelected === "myevents"}
            >
              My events
            </DropdownItem>
            <DropdownItem
              onClick={() => filterHandler("running")}
              active={rSelected === "running"}
            >
              Running
            </DropdownItem>

            <DropdownItem   onClick={() => filterHandler("cycling")}
            active={rSelected === "cycling"}>
              Cycling
            </DropdownItem>
            <DropdownItem  onClick={() => filterHandler("swimming")}
            active={rSelected === "swimming"}>
              Swimming
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

       
      </div>
      <ul className="events-list">
        {events.map((event) => (
          <li key={event._id}>
            <header style={{ backgroundImage: `url(${event.thumbnail_url})` }}>
              {event.user === user_id ? (
                <div>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => deleteEventHandler(event._id)}
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                ""
              )}
            </header>
            <strong>{event.title}</strong>
            <span>Event Date: {moment(event.date).format("l")}</span>
            <span>Event Price: {parseFloat(event.price).toFixed(2)}</span>
            <span>Event Description: {event.description}</span>
            <Button color="primary" onClick={registrationRequestHandler}>
              Registration request
            </Button>
          </li>
        ))}
      </ul>
      {error ? (
        <Alert className="event-validation" color="danger">
          {" "}
          Error when deleting event!{" "}
        </Alert>
      ) : (
        ""
      )}
      {success ? (
        <Alert className="event-validation" color="success">
          The event was deleted successfully!
        </Alert>
      ) : (
        ""
      )}
    </>
  );
}

export default Dashboard;
