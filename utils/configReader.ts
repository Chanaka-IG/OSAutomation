import fs from 'fs';

export function readConfig(path = './config/env.ts') {
  if (!fs.existsSync(path)) return {};
  // simple placeholder
  return require(path);
}
