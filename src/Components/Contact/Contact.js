import React, { useEffect, useState } from "react";
import "./Contact.css";
import MailingUtil, {
  getWithExpiry,
  setWithExpiry,
} from "../../utils/Mailing.js";
import TextField from "@material-ui/core/TextField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import validate from "../../utils/Validate.js";

function Contact({ nameProp, emailId, about }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendResponseHandler = async (e) => {
    e.preventDefault();

    let msg = validate(name, email, message, phone, subject);
    if (msg.length > 0) {
      const messageEl = document.querySelector(".form__message");
      messageEl.querySelector("p").innerHTML = msg.join("<br/>");
      messageEl.classList.add("message__active");
      return;
    }

    if (!getWithExpiry(process.env.REACT_APP_LOCALSTORAGEID)) {
      setWithExpiry(process.env.REACT_APP_LOCALSTORAGEID);
    }

    if (getWithExpiry(process.env.REACT_APP_LOCALSTORAGEID)) {
      let some = await MailingUtil(name, email, phone, subject, message);
      if (some.status === 200) {
        setWithExpiry(process.env.REACT_APP_LOCALSTORAGEID);
        const messageEl = document.querySelector(".form__message");
        messageEl.querySelector(
          "p"
        ).textContent = `Your message has been sent to ${nameProp?.firstName}`;
        messageEl.classList.add("message__active");

        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        const messageEl = document.querySelector(".form__message");
        messageEl.querySelector(
          "p"
        ).textContent = `There was an error while submitting your message to ${nameProp?.firstName}. Please try emailing!`;
        messageEl.classList.add("message__active");
      }
    } else {
      const messageEl = document.querySelector(".form__message");
      messageEl.querySelector(
        "p"
      ).textContent = `You cannot submit more than 2 responses in a day. Please try emailing!`;
      messageEl.classList.add("message__active");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let str = document.querySelector(".contact__description").textContent;
      if (str) {
        document.querySelector(".contact__description").innerHTML = str
          .split(",")
          .join(", <br/>");
        clearInterval(interval);
      }
    }, 100);

    window.addEventListener("scroll", () => {
      const screenPosition = window.innerHeight;
      const submitBtn = document
        .querySelector(".btn.btn-primary")
        .getBoundingClientRect().top;

      if (submitBtn < screenPosition) {
        document
          .querySelector(".btn.btn-primary")
          .classList.add("submit__appearEffect");
      }

      const planeIcon = document
        .querySelector(".email__container")
        .getBoundingClientRect().bottom;

      if (planeIcon < screenPosition) {
        document
          .querySelector(".fa-paper-plane")
          .classList.add("plane__appearEffect");
      }
    });
  }, []);

  return (
    <div className="contact">
      <h1 className="section__header">Contact me</h1>
      <p className="contact__description">{about?.getInTouch}</p>
      <div className="contact__container">
        <div className="contact__form">
          <div className="form__top">
            <i className="fas fa-envelope"></i>
          </div>
          <form action="" method="post">
            <div className="form__row">
              <TextField
                className="textfield"
                required
                id="contact__name"
                label="Name"
                defaultValue="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form__row">
              <TextField
                className="textfield"
                required
                id="contact__email"
                label="Email"
                defaultValue="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form__row_phone">
              <PhoneInput
                enableSearch
                inputStyle={{ width: "80%" }}
                required
                country={"in"}
                value={phone}
                onChange={(e) => setPhone(e)}
              />
            </div>
            <div className="form__row">
              <TextField
                className="textfield"
                id="contact__subject"
                label="Subject"
                defaultValue="Subject"
                variant="outlined"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="form__row">
              <TextField
                required
                className="textfield"
                id="contact__message"
                label="Message"
                multiline
                rows={6}
                variant="outlined"
              />
            </div>
            <button
              onClick={sendResponseHandler}
              className="btn btn-primary"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="contact__email">
          <div className="email__container">
            <i className="far fa-paper-plane"></i>
            <h2 className="section__header">Get in touch by sending mail!</h2>
            <a className="email email-primary" href={`mailto:${emailId}`}>
              Say hello
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
