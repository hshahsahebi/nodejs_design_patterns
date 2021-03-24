import { listNestedFiles } from './lister.js';

let requestedDir = process.cwd();

listNestedFiles(requestedDir, (err, files) => {
  if (err) {
    return console.log(err);
  }

  return console.log(files);
});