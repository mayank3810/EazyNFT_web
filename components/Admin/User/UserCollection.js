import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Pagination from "../../Common/Pagination";
import { connect } from "react-redux";
import Link from "next/link";
import API from "../../../services/API";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

const UserCollection = (props) => {
  const router = useRouter();
  const [list, setlist] = useState([]);
  const [page, setpage] = useState(0);
  const [lastPage, setlastPage] = useState(0);
  const userHash = props?.userinfo?.allUsersHash || {};
  const [isLoading, setisLoading] = useState(false);
  const owner = router?.query?.index;
  useEffect(async () => {
    if (owner) getAllCollectiables(0);
  }, [owner]);

  const getAllCollectiables = (page) => {
    if (isLoading) return;
    let data = {
      page,
      userWallet: owner,
    };
    window.scroll(0, 0);
    setisLoading(true);
    API.getCollections(data)
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

  const handlePage = (page) => {
    if (isLoading) return;
    setpage(page);
    getAllCollectiables(page);
  };

  return (
    <>
      <div className="discover-area pt-50 pb-70">
        <div className="container">
          <div className="section-title">
            <h5 style={{ display: "inline" }}>Collections </h5>
          </div>

          <div className="row pt-45">
            {isLoading ? (
              <div className="mt-5 mb-5 text-center">
                <Loading />
              </div>
            ) : (
              <div className="col-lg-12">
                <div className="row">
                  {list.map((value, index) => (
                    <div key={index} className="col-lg-3 col-md-6">
                      <div className="featured-card box-shadow">
                        <div
                          className="featured-card-img"
                          role="button"
                          onClick={() =>
                            router.push(
                              `/admin/users/collection?name=${value?.name}`
                            )
                          }
                        >
                          <Link
                            href={`/admin/users/collection?name=${value?.name}`}
                          >
                            <>
                              <a style={{ height: "150px" }}>
                                <img
                                  src={value?.banner}
                                  alt="Images"
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </a>
                              <div className="text-center">
                                <span className="collection-card-logo">
                                  <img
                                    src={value?.logo}
                                    alt="Images"
                                    style={{
                                      height: "100%",
                                      width: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </span>
                              </div>
                            </>
                          </Link>
                        </div>

                        <div className="content text-center">
                          <h3>
                            <Link
                              href={`/admin/users/collection?name=${value?.name}`}
                            >
                              <a>{value?.name}</a>
                            </Link>
                          </h3>

                          <Link href={`/artist/${value?.owner}`}>
                            <a>
                              by @
                              {userHash[value?.createdBy]?.name || "Unnamed"}
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!isLoading && !!list.length && lastPage > 1 && (
                    <Pagination
                      onChange={handlePage}
                      page={page}
                      lastPage={lastPage}
                    />
                  )}

                  {!isLoading && !list.length && (
                    <div className="tabs_item">
                      <div className="row">
                        <div className="col-12">
                          <div className="error-area ptb-100">
                            <div className="d-table">
                              <div className="d-table-cell">
                                <div className="error-content">
                                  <h3>No Collection Found</h3>
                                  <p>
                                    You don't have anything for sale yet. Start
                                    creating your first Collection.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    main: state.main,
    userinfo: state.user,
    collectibles: state.collectibles,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(UserCollection);
