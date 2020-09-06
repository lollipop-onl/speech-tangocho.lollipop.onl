import { NowRequest, NowResponse } from '@vercel/node';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const {
  GOOGLE_SPREADSHEET_SHEET_ID = '',
  GOOGLE_SERVICE_ACCOUNT_EMAIL = '',
  GOOGLE_PRIVATE_KEY = '',
} = process.env;
const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_SHEET_ID);

module.exports = async (req: NowRequest, res: NowResponse): Promise<void> => {
  try {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    const sheets = Object.fromEntries(Object.entries(doc.sheetsByTitle).filter(([title]) => !title.startsWith('_')));

    res.json(doc.sheetsByTitle);
  } catch (err) {
    res.json(err);
  }
};
