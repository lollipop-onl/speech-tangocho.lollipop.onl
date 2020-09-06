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

    await doc.loadInfo();

    const sheets = [];

    for (let i = 0; i < doc.sheetCount - 1; i++) {
      const sheet = doc.sheetsByIndex[i];

      if (sheet.title.startsWith('_')) {
        continue;
      }

      sheets.push(sheet);
    }

    const results = await Promise.all(sheets.map(async (sheet) => {
      const rows = await sheet.getRows();

      return {
        id: sheet.sheetId,
        title: sheet.title,
        sheets: rows
          .map((row) => {
            const { id, english, japanese } = row;

            return { id, english, japanese };
          })
          .filter(({ english, japanese }) => english && japanese),
      };
    }));

    res.json(results);
  } catch (error) {
    console.error(error);

    res.json({
      message: 'failed.',
      error,
    });
  }
};
