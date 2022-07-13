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
import Mobile from "./mobileVer";
import MediaQuery from 'react-responsive'
import { useMediaQuery } from 'react-responsive'
import DesktopSite from "./Destopsite";
require("dotenv").config();
let linkPhoto = process.env.REACT_APP_PHOTOLINK;





export default function Homepage() {
  const useDesktopMediaQuery = () =>
  useMediaQuery({ query: "(min-width: 1280px)" })

const useTabletAndBelowMediaQuery = () =>
  useMediaQuery({ query: "(max-width: 1279px)" })

const Desktop = ({ children }) => {
  const isDesktop = useDesktopMediaQuery()

  return isDesktop ? children : null
}

const TabletAndBelow = ({ children }) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return isTabletAndBelow ? children : null
}

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
    <Desktop>
    <Mobile></Mobile>
    </Desktop>
    <TabletAndBelow>
<Mobile></Mobile>
</TabletAndBelow>

  </div>
  

  )
}








