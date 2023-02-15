/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import QR from 'qrcode';
import config from '../../config/config';
import QrCode from './qrcode.model';
import Note from './note.model';
// import { IOptions, QueryResult } from '../paginate/paginate';

export const generateQrCode = async (userId: mongoose.Types.ObjectId, data: any): Promise<any> => {
  const { denomination, quantity } = data;

  const note = Note.create({
    denomination,
    quantity,
    visibility: 'public',
    noteId: 'vhvhvvgvgc',
    bundleId: '2213',
  });

  // const qrExist = await QrCode.findOne({ userId });
  let returnData;

  try {
    // Generate encrypted data
    const encryptedData = jwt.sign(note, config.jwt.secret);
    // eslint-disable-next-line no-console
    console.log(encryptedData);
    const dataImage = await QR.toDataURL(JSON.stringify(encryptedData));
    returnData = await QrCode.create({
      dataURI: dataImage,
      user: userId,
    });
    return { qrcode: returnData, note };
  } catch (error) {
    console.log(error);
  }
  // If qr exist, update disable to true and then create a new qr record
  // if (!qrExist) {
  //   // Generate encrypted data
  //   const encryptedData = jwt.sign(note, config.jwt.secret);
  //   // eslint-disable-next-line no-console
  //   console.log(encryptedData);
  //   const dataImage = await QR.toDataURL(JSON.stringify(encryptedData));
  //   returnData = await QrCode.create({
  //     dataURI: dataImage,
  //     user: userId,
  //   });
  // } else {
  //   returnData = await QrCode.findOneAndUpdate({ userId }, { $set: { disabled: true } });
  // }
};

export const queryNotes = async (): Promise<any> => {
  const users = await Note.find({});
  return users;
};
