import { DefaultUserAgent } from "discord.js";
import logger from "./logger";

const defaultHeaders = { 'User-Agent': DefaultUserAgent };
const formHeaders = { 'Content-Type': 'application/x-www-form-urlencoded' };

export async function authenticate(baseUrl: string, username: string, password: string): Promise<string> {
  const url = new URL('/login', baseUrl);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'User-Agent': DefaultUserAgent,
      ...formHeaders
    },
    redirect: 'manual',
    body: new URLSearchParams({
      'Username': username,
      'Password': password
    }).toString()
  });
    
  if (res.status != 302) throw Error("Authentication failed");

  const cookie = res.headers.getSetCookie().slice(-1)[0];
  return cookie;
}

export async function getChampionshipInfo(baseUrl: string, cookie: string, championshipId: string): Promise<any> {
  const url = new URL(`/championship/${championshipId}/export`, baseUrl);
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      cookie,
      ...defaultHeaders
    }
  });
  
  return await res.json();
}
