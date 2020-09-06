import React, { FC } from 'react';

type Props = {
  children: React.ReactNode;
};

export const Authenticated: FC<Props> = ({ children }) => {
  return <>{children}</>;
};
