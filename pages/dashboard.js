import Navbar from "../components/Layout/Navbar";

import FeaturedArea from "../components/Common/FeaturedArea";
import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getCollection, getUserWishlist } from "../redux/actions/collection";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../components/Dashboard";

const DiscoverOne = (props) => {
  return (
    <>
      <Navbar />
      <Dashboard />
      <Copyright />
    </>
  );
};

const mapStateToProps = (state) => {
  return { collectibles: state.collectibles, userinfo: state.user };
};

const mapDispatchToProps = {
  getCollection,
  getUserWishlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverOne);
