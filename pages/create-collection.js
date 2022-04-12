import CollectionArea from '../components/CreateCollection/CollectionArea';
import NavbarAdmin from "../components/Layout/NavbarAdmin";
import LeftNav from "../components/Admin/LeftNav";
const Collection = () => {
  return (

    <>
      <NavbarAdmin />
      <LeftNav />
      <div className="admin-main">
      <CollectionArea/>
      </div>
    </>
  );
};

export default Collection;
