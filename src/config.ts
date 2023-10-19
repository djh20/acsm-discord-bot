import 'dotenv/config';
import path from 'path';

export const BOT_TOKEN = process.env.BOT_TOKEN;
export const DB_DIR = process.env.DB_DIR ?? path.join(__dirname, '../db');
