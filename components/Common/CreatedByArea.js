import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const Tabs = dynamic(
  import('react-tabs').then((mod) => mod.Tabs),
  { ssr: false }
);
import { resetIdCounter, Tab, TabList, TabPanel } from 'react-tabs';
import Pagination from './Pagination';

resetIdCounter();

const CreatedByArea = ({ items, author, pagination }) => {

  return (
    <>
      <div className="discover-area pt-50 pb-70">
        <div className='container'>
          <div className="section-title">

            <div className='featured-user'>
                <a className='featured-user-author'>
                  <img
                    src={author.profilePic || "../images/profile-picture.webp"}
                    alt='Images'
                  />
                </a>
            </div>


            <h2>{author?.name}</h2>
          </div>

          {
            items && items.length < 1 &&
            <div className="row pt-45">
              <div className='col-12'>

                <div className='error-area ptb-100'>
                  <div className='d-table'>
                    <div className='d-table-cell'>
                      <div className='error-content'>
                        <h3>No collection found</h3>
                        <p>
                          Create, curate, and manage collections of unique NFTs to share and sell.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          <div className="row pt-45">
            {
              items && items.length > 0 && items.map(i =>
                <div key={i._id} className='col-lg-3 col-md-6'>
                  <div className='featured-item'>
                    <div className='featured-item-img'>
                      <Link href={"asset/" + (i?.tokenId ? `${i?.tokenId}` : "")}>
                        <a style={{ height: "306px" }}>
                          <img
                            src={i.metaData.thumbnail}
                            style={{
                              height: "100%",
                              width: "100%",
                              objectFit: "cover"
                            }}
                            alt='Images'
                          />
                        </a>
                      </Link>
                    </div>

                    <div className='content'>
                      <h3>
                        <Link href={"asset/" + (i?.tokenId ? `${i?.tokenId}` : "")}>
                          <a>{i.title}</a>
                        </Link>
                      </h3>
                      {i.initialPrice
                        &&
                        <div className='content-in'>
                          ETH {i.initialPrice.noExponents()}
                        </div>
                      }
                    </div>
                  </div>
                </div>
              )
            }


          </div>
        </div>
      </div>
    </>
  );
};

export default CreatedByArea;
