import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/api";
import { Button,Alert, Form, FormGroup, Label, Input, Badge } from "reactstrap";
import Container from "reactstrap/lib/Container";
import Profilepic from "../../assests/profilr.png";

import "../Events/events.css";

export default function Events() {
  const [sports, setSports] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [date, setDate] = useState("");
  const[errorMessage, setErrorMessage] = useState(false);


  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const handleSubmit = async (event) => {
    const user_id = localStorage.getItem("user");

    console.log(user_id);
    const eventData = new FormData();
    eventData.append("thumnail", thumbnail);
    eventData.append("price", price);
    eventData.append("description", description);
    eventData.append("title", title);
    eventData.append("sports", sports);
    eventData.append("date", date);
    event.preventDefault();
    try {
      if (
        title !== "" &&
        description !== "" &&
        price !== "" &&
        sports !== "" &&
        date !== "" &&
        thumbnail !== null
      ) {
        await api.post("/event", eventData, { headers: { user_id } });
        console.log("eventdata", eventData);
        console.log("data has been saved");
      }
      else{
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, (2000));
      }
      
    } catch (error) {
      console.log("missing  required data");
    }
  };


  return (
    <Container>
      <h1>Create your Event</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label for="thumbnail">Upload image</label>
          <label
            id="thumbnail"
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? "has-thumbnail" : ""}
          >
            <input
              type="file"
              onChange={(event) => setThumbnail(event.target.files[0])}
            />
            <img
              src={Profilepic}
              style={{ maxWidth: "50px" }}
              alt="uplaod image"
            />
          </label>
        </FormGroup>
        <FormGroup>
          <label for="sports">Sports</label>
          <input
            type="text"
            id="sports"
            placeholder="Enter sports Name"
            value={sports}
            onChange={(event) => setSports(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter title Name"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label for="price">Price</label>
          <input
            type="text"
            id="price"
            placeholder="Enter price in INR"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label for="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            placeholder="Enter description"
            onChange={(event) => setDescription(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label for="date">Date</label>
          <input
            type="date"
            id="date"
            placeholder="date Name"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </FormGroup>

        <Button>Create Event</Button>
      </form>
      {errorMessage ? (
         <Alert color="danger">
        Missing some information
      </Alert>
      ): " "}
    </Container>
  );
}
