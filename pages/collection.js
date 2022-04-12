import Navbar from "../components/Layout/Navbar";
import PageBanner from '../components/Common/PageBanner';
import CollectionArea from '../components/Collection/CollectionArea';
import InvolvedArea from '../components/Common/InvolvedArea';
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';

const Collection = () => {
  return (
    <>
      <Navbar />
      <CollectionArea/>
      <Copyright />
    </>
  );
};

export default Collection;
