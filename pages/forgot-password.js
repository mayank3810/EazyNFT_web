import Navbar from '../components/Layout/Navbar';

import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";
import { useState } from "react";
import axios from "axios";
import { useStateIfMounted } from "use-state-if-mounted";

const ForgotPassword = () => {
  const [count, setCount] = useStateIfMounted(0);
  // States for registration
  const [email, setEmail] = useState("");
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    var data = JSON.stringify({
      email: email,
    });

    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/general/forgotPassword`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        //browserHistory.push("/profile");
        setRedirect(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>Email sent successfully to {email}!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };
  if (redirect) {
    return (
    <>
        <Navbar /> />
    

        <div className="user-area pt-100 pb-70">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="user-all-form">
                  <div className="contact-form">
                    <h3>Email sent successfully...</h3>
                    <div className="bar"></div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <Copyright />
      </>
      );
  } else {
    return (
      <>
        <Navbar /> />
    
        <div className="user-area pt-100 pb-70">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="user-all-form">
                  <div className="contact-form">
                    <h3>Forget Password</h3>
                    <div className="bar"></div>
                    <div className="messages">
                      {errorMessage()}
                      {successMessage()}
                    </div>
                    <form id="contactForm" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-12 ">
                          <div className="form-group">
                            <label>Username or Email</label>
                            <input
                              type="text"
                              name="email"
                              id="email"
                              onChange={handleEmail}
                              value={email}
                              className="form-control"
                              required
                              data-error="Please enter your Username or Email"
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12 text-center">
                          <button type="submit" className="default-btn">
                            Reset Now
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <Copyright />
      </>
    );
  }
};

export default ForgotPassword;
