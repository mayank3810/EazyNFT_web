import CreateNFTArea from "../components/CreateNFTArea/CreateNFTArea";
import NavbarAdmin from "../components/Layout/NavbarAdmin";
import LeftNav from "../components/Admin/LeftNav";

const CreateCollection = () => {
  return (
    <>
      <NavbarAdmin />
      <CreateNFTArea />

      {/* <LeftNav />
      <div className="admin-main">
      </div> */}
    </>
  );
};

export default CreateCollection;
