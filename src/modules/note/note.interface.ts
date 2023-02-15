import { Document, Model } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export interface INote {
  denomination: string;
  quantity: string;
  redeemDate: Date;
  redeemed: boolean;
  visibility: string;
  noteId: string;
  bundleId: string;
}

export type NewQrCode = Omit<INote, 'blacklisted'>;

export interface INoteDoc extends INote, Document {}

export interface INoteModel extends Model<INoteDoc> {}

export interface IPayload extends JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  type: string;
}

export interface TokenPayload {
  token: string;
  expires: Date;
}

export interface AccessAndRefreshTokens {
  access: TokenPayload;
  refresh: TokenPayload;
}
