import CollectionArea from '../components/CreateCollection/CollectionArea';
import NavbarAdmin from "../components/Layout/NavbarAdmin";
import LeftNav from "../components/Admin/LeftNav";
const Collection = () => {
  return (

    <>
      <NavbarAdmin />
      <CollectionArea/>

      {/* <LeftNav />
      <div className="admin-main">
      </div> */}
    </>
  );
};

export default Collection;
