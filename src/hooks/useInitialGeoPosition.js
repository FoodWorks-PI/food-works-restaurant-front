// @flow strict

import {useState, useEffect} from 'react';

function load(positionOptions?: PositionOptions): Promise<Position> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      },
      positionOptions,
    ),
  );
}

export default function useInitialGeoPosition(): [?Position, ?PositionError, boolean] {
  const [position, setPosition] = useState<?Position>(undefined);
  const [error, setError] = useState<?PositionError>(undefined);
  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    // useEffect callbacks should be synchronous to prevent race conditions
    async function fetchLocation(): Promise<void> {
      try {
        const location = await load();
        setPosition(location);
      } catch (e) {
        setError(e);
      } finally {
        setFetching(false);
      }
    }

    fetchLocation();
  }, [setError, setPosition, setFetching]);

  return [position, error, isFetching];
}
