import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import OnSale from "./Tabs/OnSale";
import API from "../../services/API";
import { UpdateUser } from "../../redux/actions/user";

function Tabs(props) {
  const [activeTab, setactiveTab] = useState("On sale");
  const [countvalue, setcountvalue] = useState({});
  const [tabs, setTabs] = useState(["On sale", "Owned"]);
  const [newTabs, setNewTabs] = useState(["Collections"]);
  const { query } = useRouter();
  const { owner } = query;

  useEffect(() => {
    if (props?.collection?.name) getCountDetails();
  }, [props?.collection?.name]);

  const getCountDetails = async () => {
    let filter = [
      {
        // isMintOnSale: true,
        collectionName:
          props?.collection.name == "Erbil Collection"
            ? undefined
            : props?.collection?.name,
      },
      {
        collectionName: props?.collection?.name,
        createdBy: { $ne: props?.collection?.owner },
      },
    ];
    let result = await API.getCollectionsCount({
      filter,
    });
    setcountvalue({
      "On sale": result?.data?.response[0],
      Owned: result?.data?.response[1],
    });
  };

  const getDetail = () => {
    switch (activeTab) {
      case "On sale":
        return <OnSale type={activeTab} collection={props?.collection} />;
      case "Owned":
        return <OnSale type={activeTab} collection={props?.collection} />;
    }
  };

  return (
    <>
      <div
        id="artist-nft-card-area"
        style={{ borderBottom: "1px solid #ffb302" }}
      >
        <div className="author-nav-tab-wrapper">
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
      {props?.collection?.name && <div>{getDetail()}</div>}
    </>
  );
}

const NavTabWrapper = (props) => {
  return (
    <div
      className="author-nav-tab"
      style={props?.active ? { borderBottom: "4px solid #fff" } : {}}
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
