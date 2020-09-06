import React, { FC } from 'react';
import { Authenticated } from '../../components/Authenticated';

type Props = {};

export const IndexPageContainer: FC<Props> = () => {
  return (
    <Authenticated>
      <p>this is top page</p>
      <a href="/foo">go to foo</a>
    </Authenticated>
  );
};
