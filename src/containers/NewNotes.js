import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import Noteconfig from "../Noteconfig";
import "./NewNotes.css";


export default function NewNote() {
  const file = useRef(null);
  const history = useHistory();
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > Noteconfig.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          Noteconfig.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createNote({ content, attachment });
      history.push("/");
    } catch (e) {
      setIsLoading(false);
    }
  }

  function createNote(note) {
    return API.post("notes", "/notes", {
      body: note,
    });
  }

  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
        <h3>Content</h3>
          <Form.Control
            value={content}
            as="textarea"
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <h3>Post a Link</h3>
        <Form.Group controlId="link">
          <Form.Control
            value={link}
            as="textarea"
            onChange={(e) => setLink(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>Attachment</Form.Label>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
}
