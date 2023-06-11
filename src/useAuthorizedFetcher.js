import { useAuth0 } from '@auth0/auth0-react';

export function useAuthorizedFetcher() {
  const { getAccessTokenSilently } = useAuth0();

  return (url) => {
    return getAccessTokenSilently()
      .then((accessToken) =>
        fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }),
      ).then(r => r.json());
  };
}

