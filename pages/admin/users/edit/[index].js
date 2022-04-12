import Footer from "../../../../components/Layout/Footer";
import Copyright from "../../../../components/Common/Copyright";
import LeftNav from "../../../../components/Admin/LeftNav";
import EditUser from "../../../../components/Admin/User/EditUser";
import DetailsArea from "../../../../components/Admin/User/DetailsArea";
import Navbar from "../../../../components/Layout/Navbar";
import NavbarAdmin from "../../../../components/Layout/NavbarAdmin";

const Users = () => {
  return (
    <>
      <NavbarAdmin />
      <LeftNav />
      <div className="admin-main">
        <EditUser />
      </div>
    </>
  );
};

export default Users;
