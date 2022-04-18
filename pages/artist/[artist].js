import React from "react";
import "react-toastify/dist/ReactToastify.css";
import ArtistArea from "../../components/Artist/index";
import LeftNav from "../../components/Admin/LeftNav";
import NavbarAdmin from "../../components/Layout/NavbarAdmin";
export default function Author() {
  return (

    <>
    <NavbarAdmin />
    <LeftNav />
    <div className="admin-main">
    <ArtistArea />
      </div>
      </>
  );
}
