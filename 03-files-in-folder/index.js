const fsPromises = require('node:fs/promises');
const path = require('path');
const stat = require('node:fs');

const secretFolderPath = path.join(__dirname, 'secret-folder');

fsPromises
  .readdir(secretFolderPath, { withFileTypes: true })
  .then((files) => {
    return files.filter((file) => file.isFile());
  })
  .then((res) => {
    res.forEach((file) => {
      stat.stat(path.join(secretFolderPath, file.name), (err, stats) => {
        if (err) throw err;
        console.log(
          `${path.parse(file.name).name} - ${path
            .extname(file.name)
            .slice(1)} - ${stats.size}b`,
        );
      });
    });
  });
