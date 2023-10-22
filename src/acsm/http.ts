import { DefaultUserAgent } from 'discord.js';

export const defaultHeaders = { 'User-Agent': DefaultUserAgent };
export const formHeaders = { 'Content-Type': 'application/x-www-form-urlencoded' };

export function getResponseCookie(res: Response): string {
  const cookie: string = res.headers.getSetCookie().slice(-1)[0];
  return cookie;
}

export interface WebAuth {
  username: string;
  password: string;
  cookie?: string;
}
