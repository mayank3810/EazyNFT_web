import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import NFTCard from "../NFTCard/NFTCard";
const Tabs = dynamic(
  import("react-tabs").then((mod) => mod.Tabs),
  { ssr: false }
);
import { resetIdCounter, Tab, TabList, TabPanel } from "react-tabs";
import Pagination from "./Pagination";
import Asset from "../Image/Asset";

resetIdCounter();

const FeaturedArea = ({ items, title, pagination, userWishlist }) => {
  //counter calculation
  const [readyForSale, setReadyForSale] = useState([]);
  const [selling, setSelling] = useState([]);
  const [sold, setSold] = useState([]);

  useEffect(() => {
    if (items && items.length > 0) {
      let _ros = items.filter((i) => {
        return !i.isMintOnSale;
      });
      let _selling = items.filter((i) => {
        return i.isMintOnSale && i.initialPrice;
      });
      let _sold = items.filter((i) => {
        return i.isMintOnSale && !i.initialPrice;
      });

      setReadyForSale(_ros);
      setSelling(_selling);
      setSold(_sold);
    }
  }, [items]);

  return (
    <>
      <div className="discover-area pt-150 pb-70">
        <div className="container">
          <div className="tab featured-tab-area">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-4">
                <div className="section-title">
                  <h2>{title}</h2>
                </div>
              </div>
            </div>

            <Tabs>
              <div className="col-lg-6 col-md-8">
                <ul className="tabs">
                  <TabList>
                    <Tab>
                      <a>All</a>
                    </Tab>
                    <Tab>
                      <a>My Collection</a>
                    </Tab>
                    <Tab>
                      <a>Saved</a>
                    </Tab>
                    <Tab>
                      <a>Ready for sale</a>
                    </Tab>
                    <Tab>
                      <a>Selling</a>
                    </Tab>
                    <Tab>
                      <a>Sold</a>
                    </Tab>
                  </TabList>
                </ul>
              </div>

              <div className="tab_content  pt-45">
                <TabPanel>
                  {items && items.length < 1 && (
                    <div className="tabs_item">
                      <div className="row">
                        <div className="col-12">
                          <div className="error-area ptb-100">
                            <div className="d-table">
                              <div className="d-table-cell">
                                <div className="error-content">
                                  <h3>No collection found</h3>
                                  <p>
                                    Create, curate, and manage collections of
                                    unique NFTs to share and sell.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="tabs_item">
                    <div className="row">
                      {items &&
                        items.length > 0 &&
                        items.map((i) => (
                          <div key={i._id} className="col-lg-3 col-md-6">
                            <div className="featured-item">
                              <div className="featured-item-img">
                                <Link
                                  href={
                                    "asset" +
                                    (i?.tokenId ? `/${i?.tokenId}` : "")
                                  }
                                >
                                  <a style={{ height: "440px" }}>
                                    <Asset
                                      type={i?.metaData?.type || "image"}
                                      imageSrc={i?.metaData?.preview}
                                      thumbnail={i?.metaData?.preview}
                                      videoSrc={[i?.metaData?.preview]}
                                      objectFit="cover"
                                    />
                                  </a>
                                </Link>
                                <div className="featured-user">
                                  <Link href={`/artist/${i?.createdBy}`}>
                                    <a className="featured-user-option">
                                      <img
                                        src={
                                          i.collectibleData[0]?.profilePic ||
                                          "../images/profile-picture.webp"
                                        }
                                        alt="Images"
                                      />
                                      <span>
                                        Created by @{i.collectibleData[0]?.name}
                                      </span>
                                    </a>
                                  </Link>
                                </div>
                                {/* <button
                                  type='button'
                                  className='default-btn border-radius-5'
                                >
                                  Place Bid
                                </button> 
                                 <div
                                  className='featured-item-clock'
                                  data-countdown='2021/09/09'
                                >
                                  {days}:{hours}:{minutes}:{seconds}
                                </div> */}
                              </div>

                              <div className="content">
                                <h3>
                                  <Link
                                    href={
                                      "asset" +
                                      (i?.tokenId ? `/${i?.tokenId}` : "")
                                    }
                                  >
                                    <a>{i.title}</a>
                                  </Link>
                                </h3>
                                {i.initialPrice && (
                                  <div className="content-in">
                                    ETH {i.initialPrice.noExponents()}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  {items && items.length < 1 && (
                    <div className="tabs_item">
                      <div className="row">
                        <div className="col-12">
                          <div className="error-area ptb-100">
                            <div className="d-table">
                              <div className="d-table-cell">
                                <div className="error-content">
                                  <h3>No collection found</h3>
                                  <p>
                                    Create, curate, and manage collections of
                                    unique NFTs to share and sell.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="tabs_item">
                    <div className="row">
                      {items &&
                        items.length > 0 &&
                        items.map((i) => (
                          <div key={i._id} className="col-lg-3 col-md-6">
                            <div className="featured-item">
                              <div className="featured-item-img">
                                <Link
                                  href={
                                    "asset" +
                                    (i?.tokenId ? `/${i?.tokenId}` : "")
                                  }
                                >
                                  <a style={{ height: "440px" }}>
                                    <Asset
                                      type={i?.metaData?.type || "image"}
                                      imageSrc={i?.metaData?.preview}
                                      thumbnail={i?.metaData?.preview}
                                      videoSrc={[i?.metaData?.preview]}
                                      objectFit="cover"
                                    />
                                  </a>
                                </Link>
                                <div className="featured-user">
                                  <Link href="/author-profile">
                                    <a className="featured-user-option">
                                      <img
                                        src={
                                          i.collectibleData[0]?.profilePic ||
                                          "../images/profile-picture.webp"
                                        }
                                        alt="Images"
                                      />
                                      <span>
                                        Created by @{i.collectibleData[0]?.name}
                                      </span>
                                    </a>
                                  </Link>
                                </div>
                              </div>

                              <div className="content">
                                <h3>
                                  <Link href="/author-profile">
                                    <a>{i.title}</a>
                                  </Link>
                                </h3>
                                {i.initialPrice && (
                                  <div className="content-in">
                                    <span>
                                      ETH {i.initialPrice.noExponents()}{" "}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  {userWishlist && userWishlist.length < 1 && (
                    <div className="tabs_item">
                      <div className="row">
                        <div className="col-12">
                          <div className="error-area ptb-100">
                            <div className="d-table">
                              <div className="d-table-cell">
                                <div className="error-content">
                                  <h3>No items found</h3>
                                  <p>You don't have anything save yet.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="tabs_item">
                    <div className="row">
                      {userWishlist?.map((i) => (
                        <div key={i._id} className="col-lg-3 col-md-6">
                          <NFTCard token={i} />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  {readyForSale && readyForSale.length < 1 && (
                    <div className="tabs_item">
                      <div className="row">
                        <div className="col-12">
                          <div className="error-area ptb-100">
                            <div className="d-table">
                              <div className="d-table-cell">
                                <div className="error-content">
                                  <h3>No items found</h3>
                                  <p>
                                    You don't have anything for sale yet. Start
                                    creating your first NFT.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="tabs_item">
                    <div className="row">
                      {readyForSale &&
                        readyForSale.length > 0 &&
                        readyForSale.map((i) => (
                          <div key={i._id} className="col-lg-3 col-md-6">
                            <div className="featured-item">
                              <div className="featured-item-img">
                                <Link
                                  href={
                                    "asset" +
                                    (i?.tokenId ? `/${i?.tokenId}` : "")
                                  }
                                >
                                  <a style={{ height: "440px" }}>
                                    <Asset
                                      type={i?.metaData?.type || "image"}
                                      imageSrc={i?.metaData?.preview}
                                      thumbnail={i?.metaData?.preview}
                                      videoSrc={[i?.metaData?.preview]}
                                      objectFit="cover"
                                    />
                                  </a>
                                </Link>
                                <div className="featured-user">
                                  <Link href="/author-profile">
                                    <a className="featured-user-option">
                                      <img
                                        src={
                                          i.collectibleData[0]?.profilePic ||
                                          "../images/profile-picture.webp"
                                        }
                                        alt="Images"
                                      />
                                      <span>
                                        Created by @{i.collectibleData[0]?.name}
                                      </span>
                                    </a>
                                  </Link>
                                </div>
                                {/* <button
                                  type='button'
                                  className='default-btn border-radius-5'
                                >
                                  Place Bid
                                </button> 
                                 <div
                                  className='featured-item-clock'
                                  data-countdown='2021/09/09'
                                >
                                  {days}:{hours}:{minutes}:{seconds}
                                </div> */}
                              </div>

                              <div className="content">
                                <h3>
                                  <Link href="/author-profile">
                                    <a>{i.title}</a>
                                  </Link>
                                </h3>
                                {i.initialPrice && (
                                  <div className="content-in">
                                    <span>
                                      ETH {i.initialPrice.noExponents()}{" "}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  {selling && selling.length < 1 && (
                    <div className="tabs_item">
                      <div className="row">
                        <div className="col-12">
                          <div className="error-area ptb-100">
                            <div className="d-table">
                              <div className="d-table-cell">
                                <div className="error-content">
                                  <h3>No items found</h3>
                                  <p>
                                    You don't have anything for sale yet. Start
                                    creating your first NFT.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="tabs_item">
                    <div className="row">
                      {selling &&
                        selling.length > 0 &&
                        selling.map((i) => (
                          <div key={i._id} className="col-lg-3 col-md-6">
                            <div className="featured-item">
                              <div className="featured-item-img">
                                <Link
                                  href={
                                    "asset" +
                                    (i?.tokenId ? `/${i?.tokenId}` : "")
                                  }
                                >
                                  <a style={{ height: "440px" }}>
                                    <Asset
                                      type={i?.metaData?.type || "image"}
                                      imageSrc={i?.metaData?.preview}
                                      thumbnail={i?.metaData?.preview}
                                      videoSrc={[i?.metaData?.preview]}
                                      objectFit="cover"
                                    />
                                  </a>
                                </Link>
                                <div className="featured-user">
                                  <Link href="/author-profile">
                                    <a className="featured-user-option">
                                      <img
                                        src={
                                          i.collectibleData[0]?.profilePic ||
                                          "../images/profile-picture.webp"
                                        }
                                        alt="Images"
                                      />
                                      <span>
                                        Created by @{i.collectibleData[0]?.name}
                                      </span>
                                    </a>
                                  </Link>
                                </div>
                                {/* <button
                                  type='button'
                                  className='default-btn border-radius-5'
                                >
                                  Place Bid
                                </button> 
                                 <div
                                  className='featured-item-clock'
                                  data-countdown='2021/09/09'
                                >
                                  {days}:{hours}:{minutes}:{seconds}
                                </div> */}
                              </div>

                              <div className="content">
                                <h3>
                                  <Link href="/author-profile">
                                    <a>{i.title}</a>
                                  </Link>
                                </h3>
                                {i.initialPrice && (
                                  <div className="content-in">
                                    <span>
                                      ETH {i.initialPrice.noExponents()}{" "}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  {sold && sold.length < 1 && (
                    <div className="tabs_item">
                      <div className="row">
                        <div className="col-12">
                          <div className="error-area ptb-100">
                            <div className="d-table">
                              <div className="d-table-cell">
                                <div className="error-content">
                                  <h3>No items found</h3>
                                  <p>
                                    You have't sold any NFT yet. Start selling
                                    today!
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="tabs_item">
                    <div className="row">
                      {selling &&
                        selling.length > 0 &&
                        sold.map((i) => (
                          <div key={i._id} className="col-lg-3 col-md-6">
                            <div className="featured-item">
                              <div className="featured-item-img">
                                <Link
                                  href={
                                    "asset" +
                                    (i?.tokenId ? `/${i?.tokenId}` : "")
                                  }
                                >
                                  <a style={{ height: "440px" }}>
                                    <Asset
                                      type={i?.metaData?.type || "image"}
                                      imageSrc={i?.metaData?.preview}
                                      thumbnail={i?.metaData?.preview}
                                      videoSrc={[i?.metaData?.preview]}
                                      objectFit="cover"
                                    />
                                  </a>
                                </Link>
                                <div className="featured-user">
                                  <Link href="/author-profile">
                                    <a className="featured-user-option">
                                      <img
                                        src={
                                          i.collectibleData[0]?.profilePic ||
                                          "../images/profile-picture.webp"
                                        }
                                        alt="Images"
                                      />
                                      <span>
                                        Created by @{i.collectibleData[0]?.name}
                                      </span>
                                    </a>
                                  </Link>
                                </div>
                                {/* <button
                                  type='button'
                                  className='default-btn border-radius-5'
                                >
                                  Place Bid
                                </button> 
                                 <div
                                  className='featured-item-clock'
                                  data-countdown='2021/09/09'
                                >
                                  {days}:{hours}:{minutes}:{seconds}
                                </div> */}
                              </div>

                              <div className="content">
                                <h3>
                                  <Link href="/author-profile">
                                    <a>{i.title}</a>
                                  </Link>
                                </h3>
                                {i.initialPrice && (
                                  <div className="content-in">
                                    <span>
                                      ETH {i.initialPrice.noExponents()}{" "}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
        {/* {pagination && 
        <Pagination />
        } */}
      </div>
    </>
  );
};

export default FeaturedArea;
