import fs from 'fs';

export function concatFiles(cb, dest, ...sources) {
  readContents(sources, (err, contentArr) => {
    if (err) {
      return cb(err);
    }

    let content = contentArr.join('');

    fs.writeFile(dest, content, err => {
      if (err) {
        return cb(err);
      }

      return cb(null);
    });
  });
}

function readContents(files, cb) {
  let outputArr = [];
  
  for (let i in files) {
    fs.readFile(files[i], 'utf-8', (err, content) => {
      if (err) {
        return cb(err);
      }

      outputArr[i] = content;

      if (readCompleted(outputArr, files.length)) {
        return cb(null, outputArr);
      }
    });
  }
}

function readCompleted(contents, files_length) {
  if (contents.length < files_length) {
    return false;
  }

  let empties = contents.filter(value => typeof value !== 'string');

  return empties.length === 0;
}