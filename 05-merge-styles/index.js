const fsPromises = require('node:fs/promises');
const path = require('path');
const fs = require('fs');

const styleFolderPath = path.join(__dirname, 'styles');
const buildFile = path.join(__dirname, 'project-dist', 'bundle.css');

async function logChunks(readable) {
  let result = '';
  for await (const chunk of readable) {
    result += chunk;
  }
  return result;
}

function writeFile(data) {
  return new Promise(() => {
    fs.appendFile(buildFile, data, (err) => {
      if (err) throw err;
    });
  });
}

fsPromises
  .readdir(styleFolderPath, { withFileTypes: true })
  .then((files) => {
    return files.filter(
      (file) => file.isFile() && path.extname(file.name) === '.css',
    );
  })
  .then((files) => {
    files.forEach((file) => {
      const readStream = fs.createReadStream(
        styleFolderPath + `/${file.name}`,
        'utf-8',
      );
      const str = logChunks(readStream);

      str.then((res) => {
        readStream.close();
        writeFile(res).then(() => readStream.read());
      });
    });
  })
  .catch((err) => console.log(err));
