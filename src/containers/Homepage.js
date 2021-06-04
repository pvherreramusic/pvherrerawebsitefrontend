import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { API } from "aws-amplify";
import { Grid, GridColumn, Image, Container, Header } from "semantic-ui-react";
import Iframe from "react-iframe";
import "./Homepage.css";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";
import "./Homepage.css";
require('dotenv').config()
let linkPhoto = process.env.REACT_APP_PHOTOLINK


export default function Homepage() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  function renderNotesList(notes) {
    return (
      <>
        <LinkContainer to="/notes/new">
          <ListGroup.Item action className="py-5 text-wrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new note</span>
          </ListGroup.Item>
        </LinkContainer>
        {notes.map(({ noteId, content, createdAt }) => (
          <LinkContainer key={noteId} to={`/notes/${noteId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderNews() {
  
    return (
      <div className="Home">
        <h1>News</h1>
        {notes.map(({ noteId, createdAt, content, attachment }) => (
          <Card key={noteId} to={`/notes/${noteId}`}>
            <Card.Body action>
              <Header>Posted on {new Date(createdAt).toLocaleString()}</Header>
              <br />
              {content} {<Image src={linkPhoto + `${attachment}`} size='medium'   alt="" /> }
            </Card.Body>
            
          </Card>
        ))}
      </div>
    )
     } 
  function renderNotes() {
    return (
      <div className="notes">
        <h2 className="pb-3 mt-4 mb-4 border-bottom"></h2>

        <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
      </div>
    );
  }

  useEffect(() => {
    async function onLoad() {
      if (isAuthenticated && !isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {}

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/notes");
  }

  return (
    <div>
      <h1>WELCOME TO PV HERRERA MUSIC</h1>

      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={6}>
            <Image
              src="https://i.ibb.co/WHWdkHK/Screen-Shot-2020-02-24-at-9-32-32-AM.png"
              width="520px"
              height="320px"
            />
          </Grid.Column>

          <Grid.Column width={4}> </Grid.Column>

          <Grid.Column width={4}>
            <h2>Music Player</h2>
            <Iframe
              url="https://bandcamp.com/EmbeddedPlayer/album=40784967/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
              width="320px"
              height="320px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          </Grid.Column>

          <div className="HomeCentered">
          <Grid.Column width={10}>
            <div className="Home">
              {isAuthenticated ? renderNotes() : renderNews()}
            </div>
          </Grid.Column>
          </div>
        </Grid.Row>
      </Grid>
      
    </div>
  );
}