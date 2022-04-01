import Navbar from "../../components/Layout/Navbar";
import ItemDetailsArea from "../../components/ItemDetails/ItemDetailsArea";
import TrendingArea from "../../components/Common/TrendingArea";
import Footer from "../../components/Layout/Footer";
import Copyright from "../../components/Common/Copyright";

const ItemDetails = () => {
  return (
    <>
      <Navbar />
      <ItemDetailsArea />
      <TrendingArea bg="trending-area-bg-two" />
      <Footer />
      <Copyright />
    </>
  );
};

export default ItemDetails;
