import React, { useState, useEffect, useCallback } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { API } from "aws-amplify";
import { Grid, Image, Header, Container } from "semantic-ui-react";
import Iframe from "react-iframe";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";
import Paginations from "./Paginations";
import AudioPlayer from "./AudioPlayer"
import tracks from "./tracks";
import "./Homepage.css"
import {isMobile} from 'react-device-detect';
require("dotenv").config();
let linkPhoto = process.env.REACT_APP_PHOTOLINK;





export default function Mobile() {


  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showImage, setShowImage] = useState(false)
  let NUM_OF_RECORDS = notes.sort((a, b) => b.createdAt - a.createdAt).length;
  let LIMIT = 2;
  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData = notes.slice(
    (currentPage - 1) * LIMIT,
    (currentPage - 1) * LIMIT + LIMIT
  );

  function renderNotesList(notes) {
    return (
      <>
        <Container href="/notes/new">
          <ListGroup.Item action className="py-5 text-wrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new note</span>
          </ListGroup.Item>
        </Container>
        {notes.sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1).map(({ noteId, content, createdAt }) => (
          <Container key={noteId} to={`/notes/${noteId}`}>
          <Container textAlign='center'>
          {content.trim().split("\n")[0]}



          </Container>
            
          </Container>
        ))}
      </>
    );
  }

  function renderNews() {
    return (
      <div className="Home">
        <h1>News</h1>
        {currentData.sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1).map(({ createdAt, noteId, content, attachment }) => (
          <Container key={noteId} a={`/notes/${noteId}`}>
            <Container action>
              <h2>Posted on {new Date(createdAt).toLocaleString()}</h2>
              <br />
              {content}

              {showImage ? <Image src={linkPhoto + `${attachment}`} size="medium" /> : null}
            </Container>
          </Container>
        ))}
        <div className="pagination-wrapper">
          <Paginations
            totalRecords={NUM_OF_RECORDS}
            pageLimit={LIMIT}
            pageNeighbours={2}
            onPageChanged={onPageChanged}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
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
      } catch (e) { }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/notes");
  }


    return (
      <div className="big-screen">
        <h1>WELCOME TO PV HERRERA MUSIC...and tech</h1>
  
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={6}>
              <Image
                src="https://i.ibb.co/WHWdkHK/Screen-Shot-2020-02-24-at-9-32-32-AM.png"
                width="520px"
                height="320px"
              />
            </Grid.Column>
  
  
            <Container text>
      <Header as='h2'>About P.V. Herrera</Header>
      <p>
      P.V. Herrera is an musician from California who also is deaf. His instrument of choice is guitar but has played piano and has taken up lap steel. He has played music for almost 15 years and played guitar since 2004. P.V. Herrera was born with special needs , such as restrictive airway disease and a rare called genetic syndrome Treacher Collins. He has a degree in Enviornmental Health and Safety and certificate in Web Development from Fullstack Academy in 2020, which makes this website possibe. Enjoy the music and please checkout my musical friends on their own dedicated tab.
      </p>
    </Container>
    <br></br>
    <br></br>
           
  
            <Header as='h2'>Music Player</Header>
  
           
            <Iframe
            url="https://bandcamp.com/EmbeddedPlayer/album=4202389029/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
            width="320px"
            height="320px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
  
  
          
  
  
  
            
            <Container text>
      {isAuthenticated ? renderNotes() : renderNews()}
    </Container>
               
          </Grid.Row>
        </Grid>
      </div>
    );
    }