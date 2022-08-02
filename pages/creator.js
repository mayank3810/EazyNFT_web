import Navbar from '../components/Layout/Navbar';import CreatedByArea from '../components/Common/CreatedByArea';
import InvolvedArea from '../components/Common/InvolvedArea';

import Copyright from '../components/Common/Copyright';
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux"
import { getCollection } from "../redux/actions/collection";
import 'react-toastify/dist/ReactToastify.css';
import API from "../services/API";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";

const Author = (props) => {

  const router = useRouter()

  const [collectibles, setCollectibles] = useState("");
  const [author, setAuthor] = useState("");


  useEffect(() => {
    if(router.query.createdBy) {
      API.getCollectiblesCreatedBy(router.query.createdBy).then((res) => {
        setCollectibles(res?.data?.collectibles);
        setAuthor(res?.data?.author);
      }).catch(function (error) {
        toast.error(error);
      });
    }
  }, [router.query])



  return (
    <>
      <Navbar /> />

      <CreatedByArea items={collectibles} author={author} pagination={true} />
      
      
      <Copyright />
    </>
  );
};


const mapStateToProps = state => {
  return { collectibles: state.collectibles, userinfo: state.user }
}

const mapDispatchToProps = {
  getCollection
}

export default connect(mapStateToProps, mapDispatchToProps)(Author)