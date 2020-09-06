import { NowRequest, NowResponse } from '@vercel/node';

module.exports = (req: NowRequest, res: NowResponse): void => {
  res.send('Hello world.');
};
