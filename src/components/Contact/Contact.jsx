import { useState } from "react";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import { Link } from "react-router-dom";

function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        console.log("enviando email");
        emailjs
        .sendForm(
          "service_rkmpoja",
          "template_wupc8ft",
          form.current,
          "xPRp0jnjm0Umc_tl0"
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
      <h1 className="contact_title">Contáctanos</h1>
      <form className="contact_form" ref={form} onSubmit={submitForm}>
        <div className="form-container">
          <div className="form-data">
            <input
              className="input"
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
              className="input"
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

            <textarea
              className="textarea"
              name="mensaje"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="20"
              cols="50"
              placeholder="Escriba aquí su mensaje"
              required
            ></textarea>
              
          </div>

          <div className="div_confirm">
            <button
              className="button"
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
export default Contact;