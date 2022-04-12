import NavbarAdmin from "../../components/Layout/NavbarAdmin";
import LeftNav from "../../components/Admin/LeftNav";
import ItemDetailsArea from "../../components/ItemDetails/ItemDetailsArea";

const ItemDetails = () => {
  return (

    <>
      <NavbarAdmin />
      <LeftNav />
      <div className="admin-main">
      <ItemDetailsArea />
      </div>
    </>
  );
};

export default ItemDetails;
