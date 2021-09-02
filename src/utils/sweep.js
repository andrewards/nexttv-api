const fs = require('fs');
const path = require('path');

const sweep = (dir, cb) => {
    fs.readdirSync(dir).forEach(archive => {
        if (fs.lstatSync(path.resolve(dir, archive)).isFile()) {
            archive = archive.substr(0, archive.indexOf('.'));
        }
        if (archive !== 'index') {
            cb(archive);
        }
    });
}

module.exports = sweep;