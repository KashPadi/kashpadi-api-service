/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import QR from 'qrcode';
import * as crypto from 'crypto';
// import { encodeData } from 'src/utils';
import config from '../../config/config';
import QrCode from './qrcode.model';
import Note from './note.model';

const encodeData = async (data: object, key: string): Promise<string> => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(JSON.stringify(data));
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const generateQrCode = async (userId: mongoose.Types.ObjectId, data: any): Promise<any> => {
  const { denomination, quantity, visibility } = data;
  const note = await Note.create({
    denomination,
    quantity,
    visibility,
    noteId: 'vhvhvvgvgc',
    bundleId: '2213',
  });

  // const qrExist = await QrCode.findOne({ userId });
  let returnData;

  try {
    // Generate encrypted data
    const encryptedData = await encodeData(note.toJSON(), config.jwt.secret);

    // eslint-disable-next-line no-console
    console.log(encryptedData);
    const dataImage = await QR.toString(JSON.stringify(encryptedData));

    returnData = await QrCode.create({
      dataURI: dataImage,
      user: userId,
    });
    console.log('returned data', returnData);
    return { qrcode: returnData, note };
  } catch (error) {
    console.log(error);
  }
};

export const queryNotes = async (): Promise<any> => {
  const users = await Note.find({});
  return users;
};
