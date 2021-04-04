import { recursiveFind } from './lookup.js';
import { Concurrency } from './concurrency.js';

const dir = process.cwd();
const keyword = process.argv[2] || 'Hello';
const concurrency_limit = process.argv[3] || 4;
const queue = new Concurrency(concurrency_limit);

recursiveFind(dir, keyword, queue, (err, files) => {
  if (err) {
    return console.log(`Error concatenating files: ${err.message}`);
  }

  console.log('Keyword found in the following files: ', files);
});