import Navbar from "../components/Layout/Navbar";
import Copyright from "../components/Common/Copyright";
import Loading from "../components/Loading/Loading";
import Link from "next/link";
import { useState, useEffect } from "react";

const BlogOne = () => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const result = await fetch(process.env.NEXT_PUBLIC_CMS_API_URL + "/blogs/");
    const json = await result.json();

    setData(json.items);
  }, []);
  return (
    <>
      <Navbar />

      <div className="blog-area-two pt-50 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>From Our Blog</h2>
          </div>

          {data.length > 0 ? (
            <div className="row pt-45">
              {data?.map((data, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="blog-card box-shadow">
                    <div className="blog-img">
                      <Link href={`/blog/${data.id}`}>
                        <a>
                          <img
                            src={
                              "https://cloud.squidex.io/api/assets/polyone/" +
                              data.data.displayImage.iv[0]
                            }
                            alt="Images"
                          />
                        </a>
                      </Link>
                      <div className="blog-user">
                        <a className="blog-user-option">
                          <img
                            src={
                              "https://cloud.squidex.io/api/assets/polyone/" +
                              data.data.author.iv.image[0]
                            }
                            alt="Images"
                          />
                          <span>Created by @{data.data.author.iv.name}</span>
                        </a>
                      </div>
                      <a className="blog-tag-btn">{data.data.tags.iv[0]}</a>
                    </div>

                    <div className="content">
                      <h3>
                        <Link href={`/blog/${data.id}`}>
                          <a>{data.data?.title.iv}</a>
                        </Link>
                      </h3>
                      <ul>
                        <li>{new Date(data.data.date?.iv).toDateString()}</li>
                        {/* <li>No Comments</li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              {/* <Pagination /> */}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>

      

      <Copyright />
    </>
  );
};

// export async function getStaticProps({ preview = null }) {
//   const res = await fetch(
//     "https://cloud.squidex.io/api/content/polyone/blogs/"
//   );
//   const json = await res.json();

//   return {
//     props: {
//       preview,
//       json,
//     },
//   };
// }

export default BlogOne;
