// @flow strict

import {useState, useEffect} from 'react';

function useNetworkState(): [boolean, ?Date] {
  const [isOnline, setOnline] = useState<boolean>(navigator.onLine);
  const [connectedAt, setConnectedAt] = useState<?Date>(undefined);

  useEffect(() => {
    function listenOnline() {
      setOnline(true);
      setConnectedAt(new Date());
    }

    function listenOffline() {
      setOnline(false);
      setConnectedAt(undefined);
    }

    window.addEventListener('online', listenOnline);
    window.addEventListener('offline', listenOffline);

    return function () {
      window.removeEventListener('online', listenOnline);
      window.removeEventListener('offline', listenOffline);
    };
  }, []);

  return [isOnline, connectedAt];
}

export default useNetworkState;
