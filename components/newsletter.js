import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = JSON.stringify({
      email: email,
    });

    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/general/subscribe`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.success("Subscribed to newsletter", {
          duration: 5,
          type: "success",
        });
      })
      .catch(function (error) {
        toast.error("Failed. Please try again", {
          duration: 5,
          type: "error",
        });
      })
      .finally(() => {
        setEmail("");
      });
  };

  return (
    <>
      <div className="bg-darker newsletter font-tomica">
        <div className="from-container">
          <h1 className="text-center section-heading m-5 font-druk mt-0 mb-2">
            Catch Every Drop
          </h1>

          <p>
            Receive our newsletters for updates on our artist drops and
            events
          </p>
          <form className="email-input" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              onChange={handleEmail}
              value={email}
              required
              data-error="Please Enter Your Email"
            />
            <button className="default-btn btn-subscribe" type="submit">
              Subscribe
            </button>
            <div className="help-block with-errors"></div>
          </form>
        </div>
      </div>
    </>
  );
}
