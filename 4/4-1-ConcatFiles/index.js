import { concatFiles } from './concater.js';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(fileURLToPath(path.dirname(import.meta.url)), 'assets');

concatFiles((err) => {
  if (err) {
    return console.log(`Error concatenating files: ${err.message}`);
  }

  console.log('Output is ready!');
}, path.join(dir, 'out.txt'), 
    path.join(dir, 'in1.txt'), 
    path.join(dir, 'in2.txt'), 
    path.join(dir, 'in3.txt'));