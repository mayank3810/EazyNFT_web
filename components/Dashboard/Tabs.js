import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import OnSale from "./Tabs/OnSale";
import API from "../../services/API";
import { UpdateUser } from "../../redux/actions/user";
import Collections from "./Tabs/Collections";

function Tabs(props) {
  const [activeTab, setactiveTab] = useState("Owned");
  const [countvalue, setcountvalue] = useState({});
  const [tabs, setTabs] = useState(["Owned"]);
  const [newTabs, setNewTabs] = useState(["Collections"]);
  const artist = props?.userinfo?.user?.walletAddress;

  useEffect(() => {
    if (artist) getCountDetails();
  }, [artist]);

  const getCountDetails = async () => {
    let result = await API.getUserAllBalance();
    setcountvalue({
      Owned: result?.data,
    });
  };

  const getDetail = () => {
    switch (activeTab) {
      case "Owned":
        return <OnSale type={activeTab} artist={artist} />;
    }
  };

  return (
    <>
      <div
        id="artist-nft-card-area"
        style={{ borderBottom: "1px solid white" }}
      >
        <div className="author-nav-tab-wrapper" style={{ marginLeft: "30px" }}>
          {tabs.map((value, index) => (
            <NavTabWrapper
              key={index}
              value={value}
              active={value === activeTab}
              setactiveTab={setactiveTab}
              new={newTabs.includes(value)}
              count={countvalue[value]}
            />
          ))}
        </div>
      </div>
      <div>{getDetail()}</div>
    </>
  );
}

const NavTabWrapper = (props) => {
  return (
    <div
      className="author-nav-tab"
      style={props?.active ? { borderBottom: "2px solid white" } : {}}
      onClick={() => props.setactiveTab(props?.value)}
    >
      <span style={{ color: "white" }}>{props?.value}</span>
      {props?.count !== undefined && (
        <span className="tab-batch" style={{ color: "97979B" }}>
          {props?.count}
        </span>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { userinfo: state.user };
};

const mapDispatchToProps = {
  UpdateUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
