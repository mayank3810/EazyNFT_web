import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";
import HelpCenterArea from "../components/HelpCenter/HelpCenterArea";
import PromoteArea from "../components/HelpCenter/PromoteArea";
import { useEffect, useState } from "react";

const HelpCenter = () => {
  const [data, setData] = useState();

  useEffect(async () => {
    const result = await fetch(
      process.env.NEXT_PUBLIC_CMS_API_URL + "/helpcenter/"
    );
    const json = await result.json();

    setData(json);
  }, []);
  return (
    <>
      <Navbar />

      <HelpCenterArea data={data?.items[0].data?.cards.iv} />
      <PromoteArea data={data?.items[0].data?.promotedArticles.iv} />

      <Footer />
      <Copyright />
    </>
  );
};

export default HelpCenter;
