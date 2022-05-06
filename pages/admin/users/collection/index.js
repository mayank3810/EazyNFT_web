// import NavbarTwo from "../../../../components/Layout/NavbarTwo";
import Footer from "../../../../components/Layout/Footer";
import Copyright from "../../../../components/Common/Copyright";
import LeftNav from "../../../../components/Admin/LeftNav";
import EditCollection from "../../../../components/Admin/Collection/EditCollection";

const Users = () => {
  return (
    <>
      {/* <Navbar /> /> */}
      <LeftNav />
      <div className="admin-main" style={{ paddingRight: "50px" }}>
        <EditCollection />
        <Footer />
        <Copyright />
      </div>
    </>
  );
};

export default Users;
