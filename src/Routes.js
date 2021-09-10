import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Homepage";
import Login from "./containers/SignIn.js";
import Music from "./Music";
import MusicFriends from "./MusicalFriends";
import NewNote from "./containers/NewNotes";
import Notes from "./containers/Notes";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Contact from "./ContactForm";
import LiveShows from "./containers/LiveShowsCompo";
import NewShows from "./containers/NewShows";
import Shows from "./containers/Shows"
import ProductApp from "./ProductApp"





export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/notes/new">
        <NewNote />
      </Route>
      <Route exact path="/notes/:id">
        <Notes />
      </Route>
      <Route exact path="/shows/new">
        <NewShows />
      </Route>
      <Route exact path="/shows/:id">
        <Shows />
      </Route>
      <Route exact path="/friends">
        <MusicFriends />
      </Route>
      <Route exact path="/music">
        <Music />
      </Route>
      <Route exact path="/shows">
        <LiveShows />
      </Route>
      <Route exact path="/contact">
        <Contact></Contact>
      </Route>
      <Route exact path="/photos">

      </Route>
      <Route exact path="/buy">
       <ProductApp></ProductApp>

      </Route>
    
    </Switch>
  );
}
