import Link from "next/link";

const TopSeller = ({ topSellers }) => {
  return (
    <>
      <div className={`top-sellers-area pb-4`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-7">
              <div className="section-title">
                <h2>Top Sellers</h2>
              </div>
            </div>

            {/* <div className='col-lg-4 col-md-5'>
              <div className='trending-btn text-end'>
                <Link href='/authors'>
                  <a className='default-btn border-radius-5'>Explore More</a>
                </Link>
              </div>
            </div> */}
          </div>

          <div className="row pt-45">
            {topSellers?.map((data, index) => (
              <div key={index} className="col-lg-3 col-6 col-md-4">
                <div className="top-sellers-item">
                  <div className="number">{index + 1}.</div>
                  <div className="top-sellers-img">
                    <Link
                      href={`/artist/${data?.users[0]?.walletAddress}`}
                    >
                      <a>
                        <img
                          style={{ width: "65px", height: "65px" }}
                          src={data.users[0]?.profilePic || 'https://po-web-prod.vercel.app/images/profile-picture.webp'}
                          alt="Images"
                        />
                      </a>
                    </Link>
                    <i className="ri-check-line"></i>
                  </div>
                  <div className="content">
                    <h3>
                      <Link
                        href={`/artist/${data?.users[0]?.walletAddress}`}
                      >
                        <a>{data?.users[0]?.name}</a>
                      </Link>
                    </h3>
                    <span> ETH {String(data?.avgAmount).substring(0,10)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSeller;
