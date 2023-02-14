import { Document, Model } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export interface IQrCode {
  user: string;
  dataURI: string;
  lastUsedDate: Date;
  isActive: boolean;
  disabled: boolean;
}

export type NewQrCode = Omit<IQrCode, 'blacklisted'>;

export interface IQrCodeDoc extends IQrCode, Document {}

export interface IQrCodeModel extends Model<IQrCodeDoc> {}

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
