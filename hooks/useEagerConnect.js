import { useState, useEffect } from 'react';
import useActiveWeb3React from '../hooks/useActiveWeb3React';

import { injected } from '../utils/connectors';

const useEagerConnect = () => {
  const { activate, active } = useActiveWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    const shouldEagerConnect = !!localStorage.getItem('signature');

    if (!shouldEagerConnect) {
      return;
    }

    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};

export default useEagerConnect;
