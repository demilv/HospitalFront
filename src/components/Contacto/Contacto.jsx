import { useState } from "react";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contacto.css";
import { Link } from "react-router-dom";

function Contacto() {
    const form = useRef();

    const sendEmail = (e) => {
        console.log("enviando email");
        emailjs
        .sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          form.current,
          process.env.REACT_APP_EMAILJS_USER_ID
        )
        .then(
          (result) => {
            console.log("email sent:", result.text);
          },
          (error) => {
            console.log("Error sending email", error.text);
          }
        );
    }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [statusForm, setStatusForm] = useState("");


  const messages = {
    name: "Recuerde no dejar el campo vacío y escribir su nombre completo correctamente",
    email: "Debes introducir una dirección correcta",
  };

  const patterns = {
    name: /^[a-z ,.'-]+$/i,
    email:
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  };

  const handlerReset = () => {
    setName("");
    setEmail("");
    setMessage("");
  };
  //

  const isFormValid = () => {
    return (
      name !== "" &&
      email !== "" &&
      patterns.name.test(name) &&
      patterns.email.test(email)
    );
  };

  const submitForm = (ev) => {
    ev.preventDefault();

    if (isFormValid()) {
      console.log("Enviando mensaje con su petición");
      sendEmail();
      handlerReset();
      setStatusForm("El mensaje se envió con éxito")       
    } else {
      console.log("Debes rellenar los campos con información correcta");
      setStatusForm("No se envió el mensaje, revise los campos y rellénelos correctamente")      
    }
  };
  return (
    <>
      <h1 className="contactTitle">Contáctanos</h1>
      <form className="contactForm" ref={form} onSubmit={submitForm}>
        <div className="contactFormContainer">          
          <div className="contactFormInputContainer">
            <input
              className="contactFormInput"
              type="text"
              name="nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Escriba aquí su nombre"
              required
            />
            {name !== "" && !patterns.name.test(name) && (
              <span style={{ color: "orange" }}>{messages.name}</span>
            )}          

            <input
              className="contactFormInput"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escriba aquí su email"
              required
            />
            {email !== "" && !patterns.email.test(email) && (
              <span style={{ color: "orange" }}>{messages.email}</span>
            )}
          </div>
          <div className="contactFormTextareaContainer">
            <textarea
              className="contactFormTextarea"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="20"
              cols="50"
              placeholder="Escriba aquí su mensaje"
              required
            ></textarea>
          </div>    

          <div className="contactFormDivconfirm">
            <button
              className="contactFormButton"
              type="submit"
              onClick={(ev) => {
                submitForm(ev);
              }}
            >
              Enviar
            </button>
          </div>

          <p
            className="success"
            style={{
              color: statusForm.startsWith("No") ? "red" : "green",
            }}
          >
            {statusForm}
          </p>

        </div>
      </form>
    </>
  );
}
export default Contacto;