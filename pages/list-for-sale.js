import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';
import ListForSale from '../components/ListForSale/ListForSale';

const ListToken = () => {
  return (
    <>
      <Navbar />
      <ListForSale/>
      <Footer />
      <Copyright />
    </>
  );
};

export default ListToken;
