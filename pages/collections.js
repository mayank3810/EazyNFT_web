import Navbar from "../components/Layout/Navbar";
import PageBanner from "../components/Common/PageBanner";
import CollectionsArea from "../components/Collections/CollectionsArea";
import InvolvedArea from "../components/Common/InvolvedArea";
import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";
import Header from "../components/Header/header";

const Collections = () => {
  return (
    <>
      <Navbar />
      <CollectionsArea />
      <Copyright />
    </>
  );
};

export default Collections;
