import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";

export default function Shows() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [show, setNote] = useState(null);
  const [venue, setVenue] = useState("");
  const [town, setTown] = useState("");
  const [showDate, setShowDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadNote() {
      return API.get("Shows", `/Shows/${id}`);
    }

    async function onLoad() {
      try {
        const show = await loadNote();
        const { venue, showDate, town } = show;

        setVenue(venue);
        setShowDate(showDate);

        setNote(show);
      } catch (e) {}
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return venue.length && showDate.length && town.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function saveNote(show) {
    return API.put("Shows", `/Shows/${id}`, {
      body: show,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await saveNote({
        venue,
        showDate,
      });
      history.push("/");
    } catch (e) {
      setIsLoading(false);
    }
  }

  function deleteNote() {
    return API.del("Shows", `/Shows/${id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteNote();
      history.push("/");
    } catch (e) {
      setIsDeleting(false);
    }
  }

  return (
    <div className="Shows">
      {show && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="venue">
            <Form.Control
              as="textarea"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="showDate">
            <Form.Control
              as="textarea"
              value={showDate}
              onChange={(e) => setShowDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="town">
            <Form.Control
              as="textarea"
              value={town}
              onChange={(e) => setTown(e.target.value)}
            />
          </Form.Group>
          <LoaderButton
            block
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            size="lg"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </Form>
      )}
    </div>
  );
}
