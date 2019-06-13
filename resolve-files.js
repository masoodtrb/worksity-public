var path = require('path'),
  fs = require('fs');

/**
 * @param {string} startPath
 * @param {string} filter
 * @return {Array}
 */
function fromDir(startPath, filter) {
  //console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  var result = [];
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      result.push({
        path: filename,
        filename: files[i],
      });
    }
  }
  return result;
}

console.log(fromDir('./src', '.html'));

module.exports = fromDir;
