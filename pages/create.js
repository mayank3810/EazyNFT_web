import CreateNFTArea from "../components/CreateNFTArea/CreateNFTArea";
import NavbarAdmin from "../components/Layout/NavbarAdmin";
import LeftNav from "../components/Admin/LeftNav";

const CreateCollection = () => {
  return (
    <>
      <NavbarAdmin />
      <LeftNav />
      <div className="admin-main">
        <CreateNFTArea />
      </div>
    </>
  );
};

export default CreateCollection;
