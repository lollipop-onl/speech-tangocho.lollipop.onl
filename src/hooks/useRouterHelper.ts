import { useState, useEffect, useCallback, useMemo } from 'react';
import { Route } from '../types';

export const useRouterHelper = (): Route => {
  const [path, setPath] = useState('/');
  const hashChangeHandler = useCallback(() => {
    const hash = window.location.hash.replace(/^#/, '');
    const { [0]: path } = hash.split(/#|\?/);

    setPath(path || '/')
  }, []);

  useEffect(() => {
    hashChangeHandler();

    window.addEventListener('hashchange', hashChangeHandler);

    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    }
  }, []);

  const matcher = useCallback((targetPath: string) => {
    if (!/^[a-zA-Z0-9:-_/]+$/.test(targetPath)) {
      return false;
    }

    const optimizedPath = path === '/' ? path : path.replace(/\/$/, '');

    return new RegExp(`^${targetPath.replace(/\/:[^/]+/g, '/[^/]+')}$`).test(optimizedPath);
  }, [path]);

  return {
    path,
    matcher,
  };
};
