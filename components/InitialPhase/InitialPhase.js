import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories, fetchETHBalance } from "../../redux/actions/main";
import {
  getAllUsers,
  getAllUserMediaDetails,
  LogoutUser,
  updateUserRedux,
} from "../../redux/actions/user";
import { CHAINS } from "../../chains.ts";
import Web3 from "web3";
import {
  PreSaleMoonContractABI,
  PreSaleEarthContractABI,
  PreSaleSunContractABI,
} from "../../utils/abs/abs";
import config from "../../config/config";

function InitialPhase({
  getCategories,
  getAllUsers,
  getAllUserMediaDetails,
  userinfo,
  LogoutUser,
  fetchETHBalance,
  main,
  updateUserRedux,
}) {
  // const { library, account } = useActiveWeb3React();
  const { web3 } = main;
  const { provider, desiredChainId, account } = web3;
  const [oldAccount, setoldAccount] = useState("");
  const [sunCount, setsunCount] = useState(0);
  const [earthCount, setearthCount] = useState(0);
  const [moonCount, setmoonCount] = useState(0);
  const { user } = userinfo;
  let _desiredChainId = CHAINS[desiredChainId] ? desiredChainId : 1;

  useEffect(() => {
    setPrototypes();
    getCategories();
    getAllUsers();
    fetchETHBalance("ETH");
    fetchETHBalance("MATIC");
  }, []);

  useEffect(() => {
    let _currentTime = Date.now();
    let endTime = 1649116800000;
    if (_currentTime < endTime) {
      if (account) {
        getPlanetCount();
      }
    } else {
      updateUserRedux({
        key: "isUserEligible",
        value: true,
      });
    }
  }, [desiredChainId, account]);

  useEffect(() => {
    if (user?.walletAddress) {
      let data = {
        walletAddress: user?.walletAddress,
        signature: user?.signature,
      };
      getAllUserMediaDetails(data);
    }
  }, [user]);

  useEffect(() => {
    if (!account && oldAccount && user?.walletAddress) {
      LogoutUser();
    } else if (account) {
      setoldAccount(account);
    }
  }, [account, user]);

  const getPlanetCount = () => {
    fetchUserRemainig("sun", _desiredChainId, account);
    fetchUserRemainig("earth", _desiredChainId, account);
    fetchUserRemainig("moon", _desiredChainId, account);
  };

  const fetchUserRemainig = async (token, chainId, account) => {
    let web3 = new Web3(config.infure[chainId]);
    const configs = getContractConfig(token, chainId);
    let contract = await new web3.eth.Contract(configs.abi, configs.address);
    let data = await contract.methods.tokenPerUser(account).call();
    data = data ? Number(data) : 0;
    if (token === "moon") setmoonCount(data);
    if (token === "sun") setsunCount(data);
    if (token === "earth") setearthCount(data);
  };

  const getContractConfig = (token = "moon", chainId) => {
    switch (token) {
      case "moon":
        return {
          address: config.preSale[chainId]?.moon,
          abi: PreSaleMoonContractABI,
        };
      case "sun":
        return {
          address: config.preSale[chainId]?.sun,
          abi: PreSaleSunContractABI,
        };
      case "earth":
        return {
          address: config.preSale[chainId]?.earth,
          abi: PreSaleEarthContractABI,
        };
    }
  };

  useEffect(() => {
    if (sunCount && earthCount && moonCount) {
      updateUserRedux({
        key: "isUserEligible",
        value: true,
      });
    } else {
      updateUserRedux({
        key: "isUserEligible",
        value: false,
      });
    }
  }, [sunCount, earthCount, moonCount]);

  const setPrototypes = () => {
    Number.prototype.noExponents = function () {
      var data = String(this || "").split(/[eE]/);
      if (data.length == 1) return data[0];

      var z = "",
        sign = this < 0 ? "-" : "",
        str = data[0]?.replace(".", ""),
        mag = Number(data[1]) + 1;

      if (mag < 0) {
        z = sign + "0.";
        while (mag++) z += "0";
        return z + str.replace(/^\-/, "");
      }
      mag -= str.length;
      while (mag--) z += "0";
      return str + z;
    };
    String.prototype.noExponents = function () {
      var data = String(this || "").split(/[eE]/);
      if (data.length == 1) return data[0];

      var z = "",
        sign = this < 0 ? "-" : "",
        str = data[0]?.replace(".", ""),
        mag = Number(data[1]) + 1;

      if (mag < 0) {
        z = sign + "0.";
        while (mag++) z += "0";
        return z + str.replace(/^\-/, "");
      }
      mag -= str.length;
      while (mag--) z += "0";
      return str + z;
    };
  };

  return null;
}

const mapStateToProps = (state) => {
  return {
    userinfo: state.user,
    main: state.main,
  };
};

const mapDispatchToProps = {
  getCategories,
  getAllUsers,
  getAllUserMediaDetails,
  LogoutUser,
  fetchETHBalance,
  updateUserRedux,
};
export default connect(mapStateToProps, mapDispatchToProps)(InitialPhase);
