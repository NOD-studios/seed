import fs from 'fs';

let options = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'));
options.modules = 'system';

export default options;
