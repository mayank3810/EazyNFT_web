import Footer from "../../../../components/Layout/Footer";
import Copyright from "../../../../components/Common/Copyright";
import LeftNav from "../../../../components/Admin/LeftNav";
import EditUser from "../../../../components/Admin/User/EditUser";
import DetailsArea from "../../../../components/Admin/User/DetailsArea";
import Navbar from "../../../../components/Layout/Navbar";

const Users = () => {
  return (
    <>
      <Navbar />
      <LeftNav />
      <div className="admin-main">
        <EditUser />
        <DetailsArea />
        <Footer />
        <Copyright />
      </div>
    </>
  );
};

export default Users;
