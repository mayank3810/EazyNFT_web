import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import Copyright from "../../components/Common/Copyright";
import BlogDetailsArea from "../../components/BlogDetails/BlogDetailsArea";
import { getAllPostIds } from "../../utils/blogHelper/getAllPosts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";

const BlogDetails = () => {
  const { query } = useRouter();
  const [data, setData] = useState();
  const [relatedPosts, setRelatedPosts] = useState();

  useEffect(async () => {
    const result = await fetch(
      process.env.NEXT_PUBLIC_CMS_API_URL + "/blogs/" + query.id
    );
    const postData = await result.json();
    const ids = await postData?.data?.relatedPosts.iv.toString();
    const result2 = await fetch(
      process.env.NEXT_PUBLIC_CMS_API_URL + "/blogs/?ids=" + ids
    );
    const relatedPosts = await result2.json();

    setData(postData);
    setRelatedPosts(relatedPosts);
  }, [query]);

  return (
    <>
      <Navbar />
      {data && relatedPosts ? (
        <BlogDetailsArea relatedPostsData={relatedPosts?.items} data={data} />
      ) : (
        <Loading />
      )}

      <Footer />
      <Copyright />
    </>
  );
};

export default BlogDetails;
