import { NowRequest, NowResponse } from '@vercel/node';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const {
  GOOGLE_SPREADSHEET_SHEET_ID = '',
  GOOGLE_SERVICE_ACCOUNT_EMAIL = '',
  GOOGLE_PRIVATE_KEY = '',
} = process.env;
const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_SHEET_ID);

module.exports = async (req: NowRequest, res: NowResponse): Promise<void> => {
  const callStats = [];

  try {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    });

    callStats.push(1);

    await doc.loadInfo();

    callStats.push(2);

    const sheets = [];

    for (let i = 0; i < doc.sheetCount - 1; i++) {
      const sheet = doc.sheetsByIndex[i];

      callStats.push(3);

      if (sheet.title.startsWith('_')) {
        callStats.push(4);

        continue;
      }

      sheets.push(sheet);

      callStats.push(5);
    }

    callStats.push(6);

    res.json({ message: 'succeed.' , sheets });
  } catch (error) {
    callStats.push(7);

    console.error(error);

    res.json({
      message: 'failed.',
      error,
      callStats,
    });
  }
};
