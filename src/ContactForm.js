import React from "react";
import { Grid, Image } from "semantic-ui-react";
import Iframe from "react-iframe";

const Contact = () => (
  <div>
    <h1>WELCOME TO PV HERRERA MUSIC</h1>
    <h2>
      QUESTIONS OR COMMENTS, USE THE CONTACT FORM & WE WILL GET BACK TO YOU.
    </h2>

    <h3>Contact Form</h3>
    <Grid.Column width={4}>
      <Iframe
        url="https://us2.list-manage.com/contact-form?u=5e7453cb53f918e59a06d5e5a&form_id=3540c183f95598cd8f5ba5f5b91e7fe0"
        width="320px"
        height="320px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    </Grid.Column>
  </div>
);
export default Contact;
