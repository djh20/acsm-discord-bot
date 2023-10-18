import { Command } from './types';
import ping from './commands/ping';
import championship from './commands/championship';
import authenticate from './commands/authenticate';

export const commands: Command[] = [
  ping,
  championship,
  authenticate
];
