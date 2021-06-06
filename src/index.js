import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Album from "./Album";
import Footer from "./Footer";
import "./index.css";
import { Amplify } from "aws-amplify";
import Noteconfig from "./Noteconfig";
import Showconfig from "./Showconfig";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: Noteconfig.cognito.REGION,
    userPoolId: Noteconfig.cognito.USER_POOL_ID,
    identityPoolId: Noteconfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: Noteconfig.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: Noteconfig.s3.REGION,
    bucket: Noteconfig.s3.BUCKET,
    identityPoolId: Noteconfig.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: Noteconfig.apiGateway.URL,
        region: Noteconfig.apiGateway.REGION,
      },
      {
        name: "Shows",
        endpoint: Showconfig.apiGateway.URL,
        region: Showconfig.apiGateway.REGION,
      },
    ],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Album></Album>
      <Footer></Footer>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
