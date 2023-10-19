import { LunaDB } from './luna';
import { DB_DIR } from './config';

export const db = new LunaDB(DB_DIR);

export interface GuildSchema {
  acsm?: {
    baseUrl: string;
    username: string;
    password: string;
  }
}
