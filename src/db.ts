import mongoose from 'mongoose';
import { MONGO_URI } from './config';
import { Logger } from './logger';

const logger = new Logger('DB');

export async function connectToMongo() {
  if (!MONGO_URI) throw Error('Unable to connect to DB: MONGO_URI environment variable not set.');
  await mongoose.connect(MONGO_URI);

  const dbName = mongoose.connection.db.databaseName;
  
  logger.info(`Connected to database: ${dbName}`);
}
