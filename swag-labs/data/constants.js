require('dotenv').config();

export const CREDENTIALS = {
  VALID_USERNAME: process.env.VALID_USERNAME,
  VALID_PASSWORD: process.env.VALID_PASSWORD,
  INVALID_USERNAME: process.env.INVALID_USERNAME,
  INVALID_PASSWORD: process.env.INVALID_PASSWORD,
};

export const MAILING_INFO = {
  FIRST_NAME: 'John',
  LAST_NAME: 'Smith',
  ZIP_CODE: '78240',
};
