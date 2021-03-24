import { FindRegex } from './finder.js';
import path from 'path';
import { fileURLToPath } from 'url';

const regexFinder = new FindRegex(/hello \w+/);
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets');

regexFinder
  .addFile(path.join(dir, 'file3-1-1.txt'))
  .addFile(path.join(dir, 'file3-1-2.txt'))
  .addFile(path.join(dir, 'file3-1-3.txt'))
  .find()
  .on('started', files => {
    let fileNames = files.map(f => path.basename(f));
    console.log(`Starting the search in ${fileNames.join(', ')}`)
  })
  .on('found', (file, match) => console.log(`Matched "${match}" in file ${path.basename(file)}`))
  .on('error', err => console.error(`Error emitted ${err.message}`));