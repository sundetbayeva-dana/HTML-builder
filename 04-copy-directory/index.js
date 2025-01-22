const fsPromises = require('node:fs/promises');
const fs = require('fs');
const path = require('node:path');

const filesFolder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files-copy');

function getAbsPath(dir, fileName) {
  return path.join(__dirname, dir, fileName);
}

async function makeDirectory() {
  const dirCreation = await fsPromises.mkdir(destFolder, {
    recursive: true,
  });

  return dirCreation;
}

makeDirectory().catch(console.error);

function deleteOldFiles() {
  return fsPromises.readdir(destFolder).then((files) => {
    files.forEach((file) => {
      fs.unlink(getAbsPath('files-copy', file), (err) => {
        if (err) throw err;
      });
    });
  });
}

deleteOldFiles().then(() => {
  fsPromises.readdir(filesFolder).then((files) => {
    files.forEach((file) => {
      fsPromises
        .copyFile(getAbsPath('files', file), getAbsPath('files-copy', file))
        .then((err) => {
          if (err) throw err;
        });
    });
  });
});
