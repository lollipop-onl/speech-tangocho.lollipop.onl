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

    const sheets = [];

    for (let i = 0; i < doc.sheetCount - 1; i++) {
      const sheet = doc.sheetsByIndex[i];

      if (sheet.title.startsWith('_')) {
        continue;
      }

      sheets.push(sheet);
    }

    res.json({ count: sheets.length });
  } catch (err) {
    res.json(err);
  }
};
