import fs from 'fs';
import path from 'path';

const targetFiles = new Set();

export function recursiveFind(dir, keyword, queue, cb) {
  queue.on('error', err => cb(err))
       .on('empty', () => cb(null, targetFiles));

  queue.pushTask((done) => {
    startExploringDir(dir, keyword, queue, done);
  });
}

function startExploringDir(dir, keyword, queue, cb) {
  fs.readdir(dir, {withFileTypes: true}, (err, files) => {
    if (err) {
      return cb(err);
    }

    for (let f of files) {
      let accessPath = path.join(dir, f.name);

      if (f.isDirectory()) {
        queue.pushTask(done => startExploringDir(accessPath, keyword, queue, done));
      } else {
        queue.pushTask(done => startExploringFile(accessPath, keyword, done));
      }
    }

    return cb();
  });
}

function startExploringFile(file, keyword, cb) {
  fs.readFile(file, 'utf-8', (err, content) => {
    if(err) {
      return cb(err);
    }

    let myRegEx = new RegExp(keyword);

    if (content.match(myRegEx)) {
      targetFiles.add(file);
    }

    return cb();
  });
}

