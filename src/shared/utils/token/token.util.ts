/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyToken(token: string): JwtPayload | string {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return decoded;
  } catch (error: unknown) {
    throw `Token inválido - ${error}`;
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as JwtPayload | null;
    const currentTime = Math.floor(Date.now() / 1000);

    return decoded?.exp ? decoded.exp < currentTime : false;
  } catch (error: unknown) {
    return true;
  }
}
