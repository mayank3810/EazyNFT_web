import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Copyright from "../components/Common/Copyright";

export default function Launch() {
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
      {" "}
      <div
        className="launch-container"
        style={{
          backgroundImage: 'url("/images/home-one/mint-bg.png")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 launch-detail-col">
              <img src="/images/Logo-big.svg" alt="Logo" />
              <h2>Launching soon</h2>
              <h4>
                Working on a few little bugs and reopening <br /> shortly for
                Presale & Minting 🚀{" "}
              </h4>
              <h1>Get on the List</h1>

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
            <div className="col-lg-6 col-center">
              {/* <img
                style={{ float: "right" }}
                src="/images/home-one/banner-planets.svg"
              /> */}

              <div className="planet-card">
                <div className="planet-card-conatiner card-big">
                  {/* <video
                    loop="true"
                    autoPlay="true"
                    playsInline=""
                    loading="lazy"
                    src="/images/PolyOne_Moon_03_nn.mp4"
                    className="asset-img-wrapper"
                    controlslist="nodownload"
                    disablepictureinpicture=""
                    style={{ objectFit: "cover" }}
                  /> */}

                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="asset-img-wrapper"
                    style={{ objectFit: "cover" }}
                  >
                    <source
                      src="/images/PolyOne_Moon_03_nn.mp4"
                      type="video/mp4"
                    />
                  </video>

                  <div className="planet-card-footer cursor-pointer">
                    <span>
                      Planet <span className="text-capitalize">Moon</span>{" "}
                      {/* */}0.3 ETH
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </>
  );
}
