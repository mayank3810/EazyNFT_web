import NavbarAdmin from "../components/Layout/NavbarAdmin";
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';
import UpdateSale from '../components/ListForSale/UpdateSale';

const ListToken = () => {
  return (
    <>
      <NavbarAdmin />
      <UpdateSale/>
      <Footer />
      <Copyright />
    </>
  );
};

export default ListToken;
