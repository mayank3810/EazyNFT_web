import LeftNav from "../../../components/Admin/LeftNav";
import CategoryArea from "../../../components/Admin/category/CategoryArea";
import NavbarAdmin from "../../../components/Layout/NavbarAdmin";

const Category = () => {
  return (
    <>
      <NavbarAdmin />
      <LeftNav />
      <div className="admin-main">
        <CategoryArea />
      </div>
    </>
  );
};

export default Category;
