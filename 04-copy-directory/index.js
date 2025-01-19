const fsPromises = require('node:fs/promises');
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

fsPromises.readdir(filesFolder).then((files) => {
  files.forEach((file) => {
    fsPromises
      .copyFile(getAbsPath('files', file), getAbsPath('files-copy', file))
      .then((err) => {
        if (err) throw err;
      });
  });
});
