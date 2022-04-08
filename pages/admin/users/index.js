import { useRouter } from "next/router";
import Footer from "../../../components/Layout/Footer";
import Copyright from "../../../components/Common/Copyright";
import LeftNav from "../../../components/Admin/LeftNav";
import UserList from "../../../components/Admin/User/UserList";
import NavbarAdmin from "../../../components/Layout/NavbarAdmin";

const Users = () => {

  return (
    <>
      <NavbarAdmin />
      <LeftNav />
      <div className="admin-main">
        <UserList />
      </div>
    </>
  );
};

export default Users;
