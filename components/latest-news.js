import Link from "next/link";
import { useState, useEffect } from "react";
import Loading from "./Loading/Loading";

export default function LatestNews() {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const result = await fetch(process.env.NEXT_PUBLIC_CMS_API_URL + "/blogs/");
    const json = await result.json();

    setData(json.items.slice(0, 3));
  }, []);
  return (
    <>
      <div className="bg-darker pb-5">
        <div className="container spacer">
          <div className="row ">
            <div className="col-6">
              <h2 className="title-gradient title-h2 mb-4">Latest News</h2>
            </div>
            {data.length > 0 ? (
              <div className="row pt-45">
                {data?.map((data, index) => (
                  <div className="col-sm-4 p-0 justify-content-center d-flex">
                    <div className="news-card ">
                      <div
                        className="news-image"
                        style={{
                          backgroundImage: `url('https://cloud.squidex.io/api/assets/polyone/${data.data.displayImage.iv[0]}')`,
                        }}
                      ></div>
                      <div className="news-tag">
                        <button className="btn btn-opacity">
                          {data.data.tags.iv[0]}
                        </button>
                      </div>
                      <div className="news-detail">
                        <h6>
                          <Link href={`/blog/${data.id}`}>
                            <a>{data.data?.title.iv}</a>
                          </Link>
                        </h6>

                        <span>
                          {new Date(data.data.date?.iv).toDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* <Pagination /> */}
              </div>
            ) : (
              <Loading />
            )}
            <div className="row mt-5">
              {/* <div className="col-12 col-sm-4">
              <div className="news-card">
                <div
                  className="news-image"
                  style={{
                    backgroundImage: "url(/images/home-v1/news-img.png)",
                  }}
                ></div>
                <div className="news-tag">
                  <button className="btn btn-opacity">Gen Art</button>
                </div>
                <div className="news-detail">
                  <h6>
                    Generative Art arrives on PolyOne with $3M of Sales on the
                    first month
                  </h6>

                  <span>Feb 11,2022</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="news-card">
                <div
                  className="news-image"
                  style={{
                    backgroundImage: "url(/images/home-v1/news-img.png)",
                  }}
                ></div>
                <div className="news-tag">
                  <button className="btn btn-opacity">Gen Art</button>
                </div>
                <div className="news-detail">
                  <h6>
                    Generative Art arrives on PolyOne with $3M of Sales on the
                    first month
                  </h6>

                  <span>Feb 11,2022</span>
                </div>
              </div>
            </div> */}
              {/* <div className="trending-btn text-end mt-5">
                <Link href="#">
                  <a className="default-btn border-radius-5">More</a>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="line"></div>
    </>
  );
}
