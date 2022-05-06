import Navbar from '../components/Layout/Navbar';

import CollectionArea from "../components/CreateCollection/CollectionArea";
import InvolvedArea from "../components/Common/InvolvedArea";
import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";

const Collection = () => {
  return (
    <>
      <Navbar /> />
      <CollectionArea />
      
      <Footer />
      <Copyright />
    </>
  );
};

export default Collection;
