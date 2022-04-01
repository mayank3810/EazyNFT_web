import React, { useEffect, useState } from "react";
import moment from "moment";
import API from "../../../services/API";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../Loading/Loading";
import routes from "../../../config/routes";

export default function CategoryArea() {
  const [type, settype] = useState("nft");
  const [isLoading, setisLoading] = useState(false);
  const [list, setlist] = useState([]);
  const [editData, seteditData] = useState(null);
  useEffect(() => {
    seteditData(null);
    fetchCategories(type);
  }, [type]);

  const fetchCategories = async (type) => {
    setisLoading(true);
    let result = await API.adminAllCategories({
      type,
    });
    seteditData(null);
    setisLoading(false);
    setlist(result?.data?.category);
  };

  const handleEditButton = (index, value) => {
    window.scroll(0, 0);
    const _list = [...list];
    _list[index]["isEditable"] = value;
    setlist(_list);
    seteditData(_list[index]);
  };

  const handleEditChanges = (key, value) => {
    if (!editData) return;
    const _editData = { ...editData };
    _editData[key] = value;
    seteditData(_editData);
  };

  const handleSave = async (isDelete) => {
    try {
      const { categoryName, description, status, _id } = editData;
      if (!categoryName) {
        toast.error("Category name is required");
        return;
      }
      const data = {
        categoryName,
        description,
        status,
        isDelete,
        _id,
        type,
      };
      if (_id) await API.adminUpdateCategory(data);
      else await API.adminCreateCategory(data);
      fetchCategories(type);
      toast.success(`Category ${_id ? "updated" : "created"} successfully`);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="discover-area pt-20 pb-70 admin-user-list">
      <div className="container">
        <div className="section-title position-relative d-lg-flex">
          <h2>( Admin ) Category</h2>
          <div
            className="nav-widget-form nav-widget-form-bg position-absolute d-flex"
            style={{ right: 0, color: "white" }}
          >
            <div style={{ marginLeft: "15px" }}>
              <div
                role="button"
                onClick={() => settype("nft")}
                className={"mt-2 pt-1"}
                style={{
                  borderBottom:
                    type === "nft" ? "2px solid var(--pinkColor)" : "",
                  padding: "10px 20px",
                }}
              >
                NFT Categories
              </div>
            </div>
            <div style={{ marginLeft: "15px" }}>
              <div
                role="button"
                onClick={() => settype("collection")}
                className={" mt-2 pt-1"}
                style={{
                  borderBottom:
                    type === "collection" ? "2px solid var(--pinkColor)" : "",
                  padding: "10px 20px",
                }}
              >
                Collection Categories
              </div>
            </div>
            <div style={{ marginLeft: "15px" }}>
              <button
                className="default-btn"
                onClick={() => seteditData({ status: true })}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="pt-45">
          {/* <div className="d-flex justify-content-end mb-4">
            <button
              className="default-btn"
              onClick={() => seteditData({ status: true })}
            >
              Add
            </button>
          </div> */}
          {editData ? (
            <div
              className="row contact-form"
              style={{ backgroundColor: "white" }}
            >
              <div className="col-lg-6">
                <div className="form-group">
                  <label style={{ height: "auto" }}>Category Name</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      handleEditChanges("categoryName", e?.target?.value)
                    }
                    value={editData?.categoryName}
                    name="name"
                    className="form-control"
                    required
                    data-error="Please Enter Your Username"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  <div className="d-flex justify-content-end">
                    <span>Active:</span>
                  </div>
                  <div className="d-flex justify-content-end mt-2">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={editData.status}
                        onClick={() =>
                          handleEditChanges("status", !editData.status)
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mt-4 mt-3">
                <div className="form-group">
                  <label style={{ height: "auto" }}>Category Desciption</label>
                  <textarea
                    type="text"
                    value={editData?.description}
                    onChange={(e) =>
                      handleEditChanges("description", e?.target?.value)
                    }
                    name="description"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <div>
                  {editData?._id && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleSave(true)}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div>
                  <button
                    className="btn btn-success"
                    onClick={() => handleSave(false)}
                  >
                    {!editData?._id ? "Create" : "Save"}
                  </button>
                  <button
                    className="btn btn-secondary ml-2"
                    onClick={() => seteditData(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="mt-5 m-5 text-center">
              <Loading />
            </div>
          ) : (
            <table className="mb-5">
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{ paddingLeft: "20px", width: "100px" }}
                  >
                    #
                  </th>
                  <th scope="col" style={{ paddingLeft: "20px" }}>
                    Name
                  </th>
                  <th scope="col">Status</th>

                  <th scope="col">Created At</th>
                  <th scope="col" style={{ width: "200px" }}>
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((value, index) => (
                  <tr key={index}>
                    <td style={{ paddingLeft: "20px", width: "100px" }}>
                      {index + 1}
                    </td>
                    <td
                      className="avatar-wrapper"
                      style={{ marginLeft: "20px" }}
                    >
                      {value.categoryName || "Unnamed"}
                    </td>
                    <td data-label="Status">
                      <span role="button">
                        {value.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td data-label="Created At">
                      {moment(value?.createdAt).format("MMMM DD YYYY")}
                    </td>
                    <td data-label="Edit">
                      <div
                        role="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleEditButton(index, true)}
                      >
                        Edit
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
