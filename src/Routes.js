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
    
      <Route exact path="/friends">
        <MusicFriends />
      </Route>
      <Route exact path="/music">
        <Music />
      </Route>
    </Switch>
  );
}
