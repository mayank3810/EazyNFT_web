import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";
import Loading from "../components/Loading/Loading";
import { useState, useEffect } from "react";

const About = () => {
  const [data, setData] = useState();

  useEffect(async () => {
    const result = await fetch(process.env.NEXT_PUBLIC_CMS_API_URL + "/about/");
    const json = await result.json();

    setData(json);
  }, []);
  // console.log(json);
  return (
    <>
      <Navbar />
      {data ? (
        <>
          <AboutArea data={data?.items[0]?.data} />
          <AboutWidget data={data?.items[0]?.data.widget.iv} />
        </>
      ) : (
        <Loading />
      )}

      <Footer />
      <Copyright />
    </>
  );
};

// export async function getStaticProps({ preview = null }) {
//   const res = await fetch(
//     "https://cloud.squidex.io/api/content/polyone/about/"
//   );
//   const json = await res.json();

//   return {
//     props: {
//       preview,
//       json,
//     },
//   };
// }

export default About;
