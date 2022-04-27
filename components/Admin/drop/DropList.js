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

function DropList(props) {
  const [list, setlist] = useState([]);
  const [lastPage, setlastPage] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [page, setpage] = useState(0);
  const [search, setsearch] = useState("");
  const _currentTime = Date.now();

  useEffect(() => {
    getUser({ page, search });
  }, [page, search, props?.userinfo?.user]);

  const debounceSearch = useCallback(
    debounce((q) => setsearch(q), 500),
    []
  );

  const getUser = ({ page, search }) => {
    setisLoading(true);
    let filter = { isDrop: true };
    if (search)
      filter = {
        $or: [
          { title: { $regex: `${search}`, $options: "i" }, isDrop: true },
          { walletAddress: search, isDrop: true },
        ],
      };
    const filterSection = { filter };
    let data = {
      page,
      ...filterSection,
    };
    window.scroll(0, 0);
    API.getAllCollectiables(data)
      .then((response) => {
        setlist(response?.data?.result);
        setlastPage(Math.ceil(response?.data?.total / 12));
      })
      .catch((error) => {
        toast.error(error?.response?.data?.msg);
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
    <div className="discover-area pt-20 pb-70 ">
      <div className="section-title position-relative d-flex">
        <h2>Manage Drops</h2>
        <div
          className="d-flex nav-widget-form nav-widget-form-bg position-absolute"
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
          </div>
          <div style={{ marginLeft: "15px" }}>
            <Link href={routes?.admin?.drop?.create}>
              <button className="default-btn">Create Drop</button>
            </Link>
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
                  <th scope="col">Owner</th>
                  <th scope="col">Admin</th>
                  <th scope="col" style={{ width: "130px" }}>
                    Views
                  </th>
                  <th scope="col" style={{ width: "130px" }}>
                    Listed
                  </th>
                  <th scope="col" style={{ width: "150px" }}>
                    Status
                  </th>
                  <th scope="col" style={{ width: "130px" }}></th>
                </tr>
              </thead>
              <tbody>
                {list.map((value, index) => (
                  <tr key={index}>
                    <td>
                      <Link href={`/asset/${value?.tokenId}`}>
                        {/*<div role="button">
                         <span className="profile-pic">
                              <img
                                src={value?.contentImage}
                                alt={value?.contentImage}
                              />
                            </span> 
                        </div>*/}
                        {value.title || "Unnamed"}

                      </Link>
                    </td>
                    <td data-label="Owner">
                      <Link
                        href={`/artist/${value?.createdBy?.[0]?.walletAddress}`}
                      >
                        <span role="button">
                          {value?.createdBy?.[0].name}
                        </span>
                      </Link>
                    </td>
                    <td
                      data-label="Admin"
                      onClick={() => copyLink(value?.dropDetails?.through)}
                    >
                      <span role="button">
                        {walletShotener(value?.dropDetails?.through)}
                      </span>
                    </td>
                    <td data-label="Views">{value?.totalViews || "-"}</td>

                    <td data-label="Listed">
                      {value?.isMintOnSale ? (
                        <span className="badge badge-danger text-success">
                          Listed
                        </span>
                      ) : (
                        <span className="badge badge-danger text-danger">
                          Not Listed
                        </span>
                      )}
                    </td>
                    <td data-label="Created At">
                      {value?.dropDetails?.liveAt < _currentTime ? (
                        <span className="badge badge-danger text-success">
                          Live
                        </span>
                      ) : (
                        <span className="badge badge-danger text-danger">
                          {moment(value?.dropDetails?.liveAt).format(
                            "hh:mm   MMMM DD YY"
                          )}
                        </span>
                      )}
                    </td>
                    <td data-label="">
                      <Link href={`/asset/${value?.tokenId}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!isLoading && !!list.length && lastPage > 1 && (
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
  );
}

const mapStateToProps = (state) => {
  return { userinfo: state.user };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(DropList);
