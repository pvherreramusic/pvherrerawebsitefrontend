import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import "./NewShows.css";

export default function NewShows() {
  const history = useHistory();
  const [venue, setVenue] = useState("");
  const [showDate, setShowDate] = useState("");
  const [town, setTown] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return venue.length > 0 && showDate.length > 0 && town.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createNote({ venue, showDate, town });
      history.push("/");
    } catch (e) {
      setIsLoading(false);
    }
  }

  function createNote(note) {
    return API.post("Shows", "/Shows", {
      body: note,
    });
  }

  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="venue">
          <h2>Name of the venue</h2>
          <Form.Control
            value={venue}
            as="textarea"
            onChange={(e) => setVenue(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="showDate">
          <h2>Enter Date of the show (MM-DD-YYYY)</h2>
          <Form.Control
            value={showDate}
            as="textarea"
            onChange={(e) => setShowDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="town">
          <h2>Enter Town of the show </h2>
          <Form.Control
            value={town}
            as="textarea"
            onChange={(e) => setTown(e.target.value)}
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create Show
        </LoaderButton>
      </Form>
    </div>
  );
}
