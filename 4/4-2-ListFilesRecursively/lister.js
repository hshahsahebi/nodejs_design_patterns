import fs from 'fs';
import path from 'path';

let activeDir = 0;
let foundFiles = [];

export function listNestedFiles(dir, cb) {
  readDir(dir, (err, files) => {
    if (err) {
      return cb(err);
    }

    return cb(null, files);
  });
}

function readDir(dir, cb) {
  activeDir++;
  
  fs.readdir(dir, {withFileTypes: true}, (err, files) => {
    if (err) {
      return cb(err);
    }

    for (let f of files) {
      if (f.isDirectory()) {
        readDir(path.join(dir, `/${f.name}`), cb);
      } else {
        foundFiles.push(path.join(dir, `/${f.name}`));
      }
    }

    activeDir--;

    if (activeDir <= 0) {
      return cb(null, foundFiles);
    }
  });
}

