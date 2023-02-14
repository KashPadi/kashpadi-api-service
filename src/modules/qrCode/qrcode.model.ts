import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import { ITokenDoc, ITokenModel } from './token.interfaces';

const qrCodeSchema = new mongoose.Schema<ITokenDoc, ITokenModel>(
  {
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    dataURI: {
      type: String,
      required: true,
    },
    lastUsedDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
qrCodeSchema.plugin(toJSON);

const QrCode = mongoose.model<ITokenDoc, ITokenModel>('qrCode', qrCodeSchema);

export default QrCode;
