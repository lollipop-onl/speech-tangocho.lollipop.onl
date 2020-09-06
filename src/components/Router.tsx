import React, { FC, useEffect } from 'react';
import { IndexPageContainer } from '../containers/IndexPage';
import { useRouterHelper } from '../hooks';

type Props = {};

export const Router: FC<Props> = () => {
  const route = useRouterHelper();

  useEffect(() => {
    document.addEventListener('click', (event) => {
      const paths = event.composedPath();
      const anchor = paths.find((path) => path instanceof HTMLAnchorElement);

      if (!anchor || !(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      event.preventDefault();

      const href = anchor.getAttribute('href');
      const targetUrl = !href || href === '/' ? '/' : `#/${href}`.replace(/\/+/g, '/');

      history.pushState(null, '', targetUrl);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
  }, []);

  return (
    <>
      { route.matcher('/') ? (
        <IndexPageContainer />
      ) : route.matcher('/foo') ? (
        <p>Foo</p>
      ) : (
        <p>404 not found.</p>
      ) }
    </>
  );
};
