import Navbar from "../components/Layout/Navbar";
import TrendingArea from '../components/Common/TrendingArea';

import Copyright from '../components/Common/Copyright';

const Activity = () => {
  return (
    <>
      <Navbar />
      <TrendingArea bg="trending-area-bg-two"/>
      
      <Copyright />
    </>
  );
};

export default Activity;
