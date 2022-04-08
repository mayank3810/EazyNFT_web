import Navbar from "../../../components/Layout/Navbar";
import Footer from "../../../components/Layout/Footer";
import Copyright from "../../../components/Common/Copyright";
import LeftNav from "../../../components/Admin/LeftNav";
import CategoryArea from "../../../components/Admin/category/CategoryArea";

const Category = () => {
  return (
    <>
      <Navbar />
      <LeftNav />
      <div className="admin-main">
        <CategoryArea />
      </div>
    </>
  );
};

export default Category;
