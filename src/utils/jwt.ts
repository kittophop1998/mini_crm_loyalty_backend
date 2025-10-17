import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { config } from '../config/app';

export interface JwtPayload {
  userId: string;
  phone: string;
  email?: string;
}

export const signToken = (payload: JwtPayload): string => {
  const secret = config.jwt.secret as Secret;
  const options: SignOptions = {
    expiresIn: config.jwt.expiresIn,
  };
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const secret = config.jwt.secret as Secret;
    const decoded = jwt.verify(token, secret);
    return decoded as JwtPayload;
  } catch {
    return null;
  }
};
