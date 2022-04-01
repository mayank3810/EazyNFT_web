import { useEffect, useState } from 'react';
import useActiveWeb3React from '../hooks/useActiveWeb3React';

function UseUserAccount() {
  const [account, setAccount] = useState(null);
  const [currentLibrary, setCurrentLibrary] = useState(null);
  const {
    account: metamaskAccount, active, error, library,
  } = useActiveWeb3React();
  useEffect(() => {
    if (active && metamaskAccount) {
      setAccount(metamaskAccount);
      setCurrentLibrary(library);
    }

    if (!metamaskAccount) {
      setAccount(null);
      setCurrentLibrary(null);
    }
  }, [active, error, account, metamaskAccount, library]);
  return { account, currentLibrary };
}

export default UseUserAccount;
