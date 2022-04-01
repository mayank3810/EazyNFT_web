import Footer from "../../../components/Layout/Footer";
import Copyright from "../../../components/Common/Copyright";
import LeftNav from "../../../components/Admin/LeftNav";
import CreateDrop from "../../../components/Admin/drop/CreateDrop";
import Navbar from "../../../components/Layout/Navbar";

const CreateDropArea = () => {
  return (
    <>
      <Navbar />
      <LeftNav />
      <div className="admin-main">
        <CreateDrop />
        <Footer />
        <Copyright />
      </div>
    </>
  );
};

export default CreateDropArea;
