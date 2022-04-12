import NavbarAdmin from "../components/Layout/NavbarAdmin";
import LeftNav from "../components/Admin/LeftNav";
import DiscoverArea from '../components/Discover/DiscoverArea';

const DiscoverTwo = () => {
  return (
    <>
      <NavbarAdmin />
      <LeftNav />
      <div className="admin-main">
        <DiscoverArea />
      </div>
    </>
  );
};

export default DiscoverTwo;
