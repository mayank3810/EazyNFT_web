import React from 'react';
import Pagination from '../Common/Pagination';
import Link from 'next/link'

const AuthorArea = ({ topSellers }) => {
  return (
    <>
      <div className='author-widget-bg author-area-bg pt-50 pb-70'>
        <div className='container'>
          <div className='section-title'>
            <h2>Top Author</h2>
          </div>

          <div className='row pt-45 justify-content-center'>
            {
              topSellers.map((data, index) => (
                <div key={index} className='col-lg-3 col-6'>
                  <div className='author-card box-shadow'>
                    <Link
                      href={`/artist/${data?.users[0]?.walletAddress}`}
                    >
                      <a>
                        <img src={data.users[0]?.profilePic || 'https://po-web-prod.vercel.app/images/profile-picture.webp'} alt='Images' />
                      </a>
                    </Link>
                    <div className='content'>
                      <h3 className='mt-3' >
                        <Link
                          href={`/artist/${data?.users[0]?.walletAddress}`}
                        >
                          <a>{data?.users[0]?.name}</a>
                        </Link>
                      </h3>
                      <span>@{data?.users[0]?.userName}</span>

                      <div className='author-content'>
                        <div className='content-left'>
                          <span> ETH {String(data?.avgAmount).substring(0, 10)}</span>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>

              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorArea;
