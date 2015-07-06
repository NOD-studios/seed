import dotenv from 'dotenv';
import fs from 'fs';

let env = [
  '.env.local',
  '.env.production',
  '.env.test',
  '.env.development',
  '.env',
  '.env.nod'
]

env.forEach(envFile => {
  if (fs.existsSync(`${__dirname}/../${envFile}`)) {
    dotenv.config({
      path : `${__dirname}/../${envFile}`
    });
    dotenv.load();
  }
});

env = process.env;
export default env;
