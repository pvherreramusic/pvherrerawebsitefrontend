import React, { useState, useEffect, useCallback } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { API } from "aws-amplify";
import { Grid, Header, Table } from "semantic-ui-react";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";
import Paginations from "./Paginations";
import "./LiveShowsCompo.css";

export default function LiveShows() {
  const [shows, setShows] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  let NUM_OF_RECORDS = shows.length;
  let LIMIT = 5;
  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData = shows.slice(
    (currentPage - 1) * LIMIT,
    (currentPage - 1) * LIMIT + LIMIT
  );

  function renderShowsList(shows) {
    return (
      <>
        <LinkContainer to="/shows/new">
          <ListGroup.Item action className="py-5 text-wrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new Show</span>
          </ListGroup.Item>
        </LinkContainer>
        {shows.sort((a, b) => (a.qty > b.qty) ? 1 : -1).map(({ showsId, venue, town, showDate }) => (
          <LinkContainer key={showsId} to={`/Shows/${showsId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {venue.trim().split("\n")[0]}
                {showDate.trim().split("\n")[0]}
               
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderNewShows() {
    return (
      <div className="Home">
        <h1>Upcoming Shows</h1>
        {currentData.sort((a, b) => (a.qty > b.qty) ? 1 : -1).map(({ showsId, createdAt, venue,  town, showDate }) => (
          <Card key={showsId} to={`/Shows/${showsId}`}>
            <Card.Body action>
        
              <br />
              <Table celled fixed singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Venue</Table.HeaderCell>
                    <Table.HeaderCell>Show Date</Table.HeaderCell>
                    <Table.HeaderCell>Town</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>{venue}</Table.Cell>
                    <Table.Cell>{showDate}</Table.Cell>
                    <Table.Cell>{town}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Body>
          </Card>
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

  function renderUserShows() {
    return (
      <div className="shows">
        <h2 className="pb-3 mt-4 mb-4 border-bottom"></h2>

        <ListGroup>{!isLoading && renderShowsList(shows)}</ListGroup>
      </div>
    );
  }

  useEffect(() => {
    async function onLoad() {
      if (isAuthenticated && !isAuthenticated) {
        return;
      }

      try {
        const shows = await loadNotes();
        setShows(shows);
      } catch (e) {}

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("Shows", "/Shows");
  }

  return (
    <div>
      <h1>WELCOME TO PV HERRERA MUSIC</h1>

      <Grid columns={2}>
        <Grid.Row>
          <div className="HomeCentered">
            <Grid.Column width={10}>
              <div className="Home">
                {isAuthenticated ? renderUserShows() : renderNewShows()}
              </div>
            </Grid.Column>
          </div>
        </Grid.Row>
      </Grid>
    </div>
  );
}
