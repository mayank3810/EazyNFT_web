import NavbarAdmin from "../components/Layout/NavbarAdmin";
import LeftNav from "../components/Admin/LeftNav";
import CollectionsArea from "../components/Collections/CollectionsArea";

const Collections = () => {
  return (
    <>
      <NavbarAdmin />
      <LeftNav />
      <div className="admin-main">
        <CollectionsArea />
      </div>
    </>
  );
};

export default Collections;
