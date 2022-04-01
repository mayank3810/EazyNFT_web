import Navbar from "../components/Layout/Navbar";
import PageBanner from '../components/Common/PageBanner';
import AuctionArea from '../components/Auction/AuctionArea';
import InvolvedArea from '../components/Common/InvolvedArea';
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';

const Auction = () => {
  return (
    <>
      <Navbar />
  
      <AuctionArea />
      
      <Footer />
      <Copyright />
    </>
  );
};

export default Auction;
