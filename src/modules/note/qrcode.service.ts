/* eslint-disable no-plusplus */
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
  const { denomination, quantity, visibility } = data;

  function dataURItoBlob(dataURI: any) {
    const byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString: any = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  const note = await Note.create({
    denomination,
    quantity: 100,
    visibility,
    noteId: 'vhvhvvgvgc',
    bundleId: '2213',
  });

  // const qrExist = await QrCode.findOne({ userId });
  let returnData;

  try {
    // Generate encrypted data
    const encryptedData = jwt.sign(note.toJSON(), config.jwt.secret, {
      expiresIn: 604800, // 1 week
    });
    // eslint-disable-next-line no-console
    console.log(encryptedData);
    const dataImage = await QR.toString(JSON.stringify(encryptedData));
    const blob = dataURItoBlob(dataImage);
    const resultFile = new File([blob], 'file_name');
    returnData = await QrCode.create({
      dataURI: resultFile,
      user: userId,
    });
    console.log('returned data', returnData);
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
