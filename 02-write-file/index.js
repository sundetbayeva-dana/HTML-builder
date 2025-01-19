const fs = require('fs');
const path = require('path');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

let str = '';
const textPath = path.join(__dirname, 'text.txt');
const rl = readline.createInterface({ input, output });

writeFile();

rl.question('You are welcome to type the text \n', (data) => writeFile(data));
rl.on('line', (input) => writeFile(input));

rl.on('SIGINT', () => {
  output.write('Goodbye!');
  rl.pause();
});

function writeFile(data) {
  data = data ? data + '\n' : '';
  str += data;
  fs.writeFile(textPath, str, (err) => {
    if (err) throw err;
  });
}
