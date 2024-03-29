import LeftNav from "../../../components/Admin/LeftNav";
import CreateDrop from "../../../components/Admin/drop/CreateDrop";
import NavbarAdmin from "../../../components/Layout/NavbarAdmin";

const CreateDropArea = () => {
  return (
    <>
      <NavbarAdmin />
      <LeftNav />
      <div className="admin-main">
        <CreateDrop />
      </div>
    </>
  );
};

export default CreateDropArea;
