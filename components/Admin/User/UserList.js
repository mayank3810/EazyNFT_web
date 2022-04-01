import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { debounce } from "lodash";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import API from "../../../services/API";
import Loading from "../../Loading/Loading";
import { walletShotener } from "../../../utils/wallet";
import moment from "moment";
import Pagination from "../../Common/Pagination";
import routes from "../../../config/routes";
import { useRouter } from "next/router";

function UserList(props) {
  const [userlist, setuserlist] = useState([]);
  const [lastPage, setlastPage] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [page, setpage] = useState(0);
  const [search, setsearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    getUser({ page, search });
  }, [page, search, props?.userinfo?.user]);

  const debounceSearch = useCallback(
    debounce((q) => setsearch(q), 500),
    []
  );

  const getUser = ({ page, search }) => {
    setisLoading(true);
    let filter = {};
    if (search)
      filter = {
        $or: [
          { name: { $regex: `${search}`, $options: "i" } },
          { walletAddress: search },
        ],
      };
    API.adminGetUserList({
      walletAddress: props?.userinfo?.user?.walletAddress,
      signature: props?.userinfo?.user?.signature,
      page,
      filter,
    })
      .then((result) => {
        setuserlist(result?.data?.users);
        setlastPage(Math.ceil(result?.data?.count / 10));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((f) => {
        setisLoading(false);
      });
  };

  const copyLink = (value) => {
    const el = document.createElement("textarea");
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Address copied");
  };

  const handlePage = (page) => {
    if (isLoading) return;
    setpage(page);
  };

  return (
    <div className="discover-area pt-20 pb-70 admin-user-list">
      <div className="container">
        <div className="section-title position-relative d-flex">
          <h2>( Admin ) User List</h2>
          <div
            className="nav-widget-form nav-widget-form-bg position-absolute"
            style={{ right: 0 }}
          >
            <div className="search-form">
              <input
                type="search"
                className="form-control"
                placeholder="Search via name or address"
                onChange={(e) => {
                  debounceSearch(e?.target?.value);
                }}
              />
              {/* <button>
                <i className="ri-search-line"></i>
              </button> */}
            </div>
          </div>
        </div>
        <div className="mt-5">
          {isLoading ? (
            <div className="mt-5 mb-5 text-center">
              <Loading />
            </div>
          ) : (
            <>
              <table className="mb-5">
                <thead>
                  <tr>
                    <th scope="col" style={{ paddingLeft: "20px" }}>
                      Name
                    </th>
                    <th scope="col">Wallet</th>
                    <th scope="col">Email</th>
                    <th scope="col" style={{ width: "130px" }}></th>
                    <th scope="col">Created At</th>
                    <th scope="col" style={{ width: "100px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {userlist.map((value, index) => (
                    <tr key={index}>
                      <td
                        data-label=""
                        className="avatar-wrapper"
                        style={{ marginLeft: "20px" }}
                      >
                        <span
                          onClick={() =>
                            router.push(
                              routes?.admin?.users?.edit(value?.walletAddress)
                            )
                          }
                          role="button"
                        >
                          <span className="profile-pic">
                            <img
                              src={value?.profilePic}
                              alt={value?.profilePic}
                            />
                          </span>
                          <span style={{ position: "relative", top: "-8px" }}>
                            {value.name || "Unnamed"}
                          </span>
                        </span>
                      </td>
                      <td
                        data-label="Wallet"
                        onClick={() => copyLink(value?.walletAddress)}
                      >
                        <span role="button">
                          {walletShotener(value?.walletAddress)}
                        </span>
                      </td>
                      <td data-label="Email">{value?.email || "-"}</td>

                      <td data-label="Email Verified">
                        {value?.isEmailVerified ? (
                          <span className="badge badge-danger text-success">
                            Verified
                          </span>
                        ) : (
                          <span className="badge badge-danger text-danger">
                            Not Verified
                          </span>
                        )}
                      </td>
                      <td data-label="Created At">
                        {moment(value?.createdAt).format("MMMM DD YYYY")}
                      </td>
                      <td data-label="">
                        <Link
                          href={routes?.admin?.users?.edit(
                            value?.walletAddress
                          )}
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!isLoading && !!userlist.length && lastPage > 1 && (
                <Pagination
                  onChange={handlePage}
                  page={page}
                  lastPage={lastPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { userinfo: state.user };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
