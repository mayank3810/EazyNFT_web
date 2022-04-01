import React, { useState, useEffect } from "react";
import "../public/fonts/remixicon.css";
import "../public/css/bootstrap.min.css";
import "../public/css/style.css";
import "../public/css/responsive.css";
import "../public/css/style_custom.css";

import Head from "next/head";
import GoTop from "../components/Shared/GoTop";
import Loader from "../components/Shared/Loader";
// import { Web3ReactProvider } from "@web3-react/core";
// import getLibrary from "../utils/getLibrary";
import { wrapper } from "../redux/store";
import { ToastContainer } from "react-toastify";
// import ConnectWallet from "../components/CollectWallet/CollectWallet";
import CustomConfetti from "../components/CustomConfetti/CustomConfetti";
import InitialPhase from "../components/InitialPhase/InitialPhase";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
const ConnectWalletModal = dynamic(
  () => import("../components/Modals/ConnectWallet"),
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    // <Web3ReactProvider getLibrary={getLibrary}>
    <>
      <Head>
        <title>Polyone</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <InitialPhase />
      <ConnectWalletModal />
      <ToastContainer />
      <CustomConfetti />
      <Component {...pageProps} />
      {/* Preloader */}
      <Loader loading={loading} />
      {/* go top */}
      {/* <GoTop scrollStepInPx="100" delayInMs="10.50" /> */}
    </>
    //  </Web3ReactProvider>
  );
}

export default wrapper.withRedux(MyApp);
