/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import QR from 'qrcode';
import QrCode from './qrcode.model';
import Note from './note.model';

export const generateQrCode = async (userId: mongoose.Types.ObjectId, data: any): Promise<any> => {
  const { denomination, quantity, visibility } = data;

  const note = Note.create({
    denomination,
    quantity,
    visibility,
    noteId: '1233',
    bundle: '2213',
  });

  const qrExist = await QrCode.findOne({ userId });
  let returnData;

  // If qr exist, update disable to true and then create a new qr record
  if (!qrExist) {
    // Generate encrypted data
    const encryptedData = jwt.sign(note, 'process.env.TOKEN_KEY', {
      expiresIn: '1d',
    });
    const dataImage = await QR.toDataURL(encryptedData);
    returnData = await QrCode.create({
      dataURI: dataImage,
      user: userId,
    });
  } else {
    returnData = await QrCode.findOneAndUpdate({ userId }, { $set: { disabled: true } });
  }

  return returnData;
};
