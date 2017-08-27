const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

/**
 * Current ziptool's version.
 * @const {string}
 */
const VERSION = require('../package.json').version;

/**
 * Create a zip archive from one or multiple files.
 * @param {string|Array<string>} src - The pathname(s) of the file(s) to compress.
 * @param {string} dest - The pathname of the zip archive to create.
 * @param {ziptoolCallback} callback - The function to be called after the zip archive has
 * been created or if an error occured.
 */
const zip = (src, dest, callback) => {
  // Create write stream for writting data and a zip archive to be created.
  const output = fs.createWriteStream(dest);
  const archive = archiver('zip', {
    zlib: {
      level: 9
    }
  });

  // Call the callback function with null as parameter.
  output.on('close', () => {
    callback(null);
  });

  // Call the callback with an error object when something went wrong and return.
  archive.on('warning', (err) => {
    callback(err);
    return;
  });
  archive.on('error', (err) => {
    callback(err);
    return;
  });

  // Pipe the archive data to the output stream
  archive.pipe(output);

  // Append the file(s) to the archive.
  if (typeof src === 'string') {
    archive.file(src, {name: path.basename(src)});
  } else {
    for (let file of src) {
      archive.file(file, {name: path.basename(file)});
    }
  }

  // Archive is now ready.
  archive.finalize();
};

// Exports
exports.VERSION = VERSION;
exports.zip = zip;

// Define types and stuffs
/**
 * Function to be called after a zip file has been processed.
 * @callback ziptoolCallback
 * @param {Error|null} error - An Error object if an error occured, null otherwise.
 */
