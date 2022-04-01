import { useRouter } from "next/router";
import Footer from "../../../components/Layout/Footer";
import Copyright from "../../../components/Common/Copyright";
import LeftNav from "../../../components/Admin/LeftNav";
import DropList from "../../../components/Admin/drop/DropList";
import Navbar from "../../../components/Layout/Navbar";

const Users = () => {
  return (
    <>
      <Navbar />
      <LeftNav />
      <div className="admin-main">
        <DropList />
        <Footer />
        <Copyright />
      </div>
    </>
  );
};

export default Users;
