import Navbar from "../components/Layout/Navbar";
import TrendingArea from '../components/Common/TrendingArea';
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';

const Activity = () => {
  return (
    <>
      <Navbar />
      <TrendingArea bg="trending-area-bg-two"/>
      <Footer />
      <Copyright />
    </>
  );
};

export default Activity;
