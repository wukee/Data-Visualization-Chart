const path = require('path');
const PROJECT_ROOT = path.resolve(__dirname, '../');

module.exports = {
    title:'webpack 4 starter',
    projectRoot: PROJECT_ROOT,
    outputPath: path.join(PROJECT_ROOT, 'dist'),
    appEntry: path.join(PROJECT_ROOT, 'src/Client')
};
