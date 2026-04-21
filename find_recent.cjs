const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            if (!file.includes('node_modules') && !file.includes('.git')) {
                results = results.concat(walk(file));
            }
        } else { 
            const mtime = stat.mtimeMs;
            const now = Date.now();
            if (now - mtime < 1000 * 60 * 60) { // 1 hour
                results.push(file);
            }
        }
    });
    return results;
}

console.log(walk('.'));
