import React from "react";
import "./Contact.css";
import { Input, Form, TextArea, Label } from "semantic-ui-react";
require("dotenv").config();


function ButtonSubmit() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const { name, email, message } = event.target;

    const endpoint = `${process.env.REACT_APP_ENDPOINT}`;
    const body = JSON.stringify({
      senderName: name.value,
      senderEmail: email.value,
      message: message.value,
    });
    const requestOptions = {
      method: "POST",
      body,
    };

    fetch(endpoint, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Error in fetch");
        return response.json();
      })
      .then((response) => {
        document.getElementById("result-text").innerText =
          "Email sent successfully!";
      })
      .catch((error) => {
        document.getElementById("result-text").innerText =
          "An unkown error occured.";
      });
  });
}

function Contact() {
  return (
    <div className="center">
      <div className="form">
        <h2>Contact Me</h2>
        <Form>
          <Label style={{ color: "blue" }} for="name">
            Name:
          </Label>
          <Input placeholder="Your Name" name="name" type="name" />
          <br />
          <br />
          <Label style={{ color: "blue" }} for="email">
            Email:
          </Label>
          <Input placeholder="Your Email..." name="email" type="email" />
          <br />
          <br />
          <Label style={{ color: "blue" }} for="name">
            Message:
          </Label>
          <TextArea placeholder="Tell us more" name="message" type="message" />

          <br />
          <br />
          <button id="submit" onClick={ButtonSubmit}>
            Send Message
          </button>
          <div>
            <p id="result-text"></p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Contact;
