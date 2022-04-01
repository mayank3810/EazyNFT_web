import Navbar from "../components/Layout/Navbar";
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';
import UpdateSale from '../components/ListForSale/UpdateSale';

const ListToken = () => {
  return (
    <>
      <Navbar />
      <UpdateSale/>
      <Footer />
      <Copyright />
    </>
  );
};

export default ListToken;
