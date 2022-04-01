import { useRouter } from "next/router";
import Footer from "../../../components/Layout/Footer";
import Copyright from "../../../components/Common/Copyright";
import LeftNav from "../../../components/Admin/LeftNav";
import UserList from "../../../components/Admin/User/UserList";
import Navbar from "../../../components/Layout/Navbar";

const Users = () => {

  return (
    <>
      <Navbar />
      <LeftNav />
      <div className="admin-main">
        <UserList />
        <Footer />
        <Copyright />
      </div>
    </>
  );
};

export default Users;
