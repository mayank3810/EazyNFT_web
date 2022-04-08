import LeftNav from "../../../components/Admin/LeftNav";
import DropList from "../../../components/Admin/drop/DropList";
import NavbarAdmin from "../../../components/Layout/NavbarAdmin";

const Users = () => {
  return (
    <>
      <NavbarAdmin />
      <LeftNav />
      <div className="admin-main">
        <DropList />
      </div>
    </>
  );
};

export default Users;
