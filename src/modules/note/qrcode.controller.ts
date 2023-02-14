/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { catchAsync } from '../../utils';
import * as qrcodeService from './qrcode.service';

export const createQrCode = catchAsync(async (req: Request, res: Response) => {
  const user = await qrcodeService.generateQrCode(new mongoose.Types.ObjectId(req.params['userId']), req.body);
  res.status(httpStatus.CREATED).send(user);
});

export const getQrcodes = catchAsync(async (_req: Request, res: Response) => {
  const result = await qrcodeService.queryNotes();
  res.send(result);
});
