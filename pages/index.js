import React, { useEffect, useState } from "react";
import WalletButton from "../components/CollectWallet/WalletButton";
import { connect, useDispatch } from "react-redux";
import { setRedirect, openConnectModal } from "../redux/actions/main";
import { wrapper } from "../redux/store";

function HomeNew(ctx) {
  const currentUser = ctx?.user?.user;
  const isAdmin = (currentUser.roles || []).includes("admin");

  return (
    <>
    <div style={{paddingTop: '25vh', height: '100vh'}}>

      <h1 className="text-center"> Get started with Authenticatior Certificates.</h1>
      <p className="text-center"> Please connect your metamask wallet to mint certificates.</p>
      <div className="connect-btn-center">
        <WalletButton showMore={true} isAdmin={isAdmin} />
      </div>
    </div>

    </>
  );
}

export const getInitialPageProps = wrapper.getInitialPageProps(
  ({ store, req, res }) => {
    const state = store.getState();
  }
);

const mapStateToProps = (state) => {
  return { main: state.main, user: state.user };
};

const mapDispatchToProps = {
  setRedirect,
  openConnectModal,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeNew);
