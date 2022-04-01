import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
const useActiveWeb3React = () => {
  // const { library, chainId, ...web3React } = useWeb3React();
  // const refEth = useRef(library);
  // const [provider, setprovider] = useState(library);

  // useEffect(() => {
  //   if (library !== refEth.current) {
  //     setprovider(library);
  //     refEth.current = library;
  //   }
  // }, [library]);

  const [data, setdata] = useState({});

  const setData = (value)=>{

  }

  // console.log(data);

  return {data, setData};
};

export default useActiveWeb3React;
