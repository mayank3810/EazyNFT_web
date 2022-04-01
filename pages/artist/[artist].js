import React from "react";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../components/Layout/Navbar";
import ArtistArea from "../../components/Artist/index";
import InvolvedArea from "../../components/Common/InvolvedArea";
import Footer from "../../components/Layout/Footer";
import Copyright from "../../components/Common/Copyright";

export default function Author() {
  return (
    <>
      <Navbar />
      <ArtistArea />
      <InvolvedArea />
      <Footer />
      <Copyright />
    </>
  );
}
