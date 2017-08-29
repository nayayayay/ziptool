const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const {Extract} = require('unzip');

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
  });
  archive.on('error', (err) => {
    callback(err);
  });

  // Pipe the archive data to the output stream
  archive.pipe(output);

  // Append the file(s) to the archive.
  if (typeof src === 'string') {
    archive.file(src, {name: path.basename(src)});
  } else {
    src.forEach(filepath => {
      archive.file(filepath, {name: path.basename(filepath)});
    });
  }

  // Archive is now ready.
  archive.finalize();
};

/**
 * Extract a zip archive to a specified location.
 * @param {string} src - The zip archive filepath to be extracted.
 * @param {string} dest - The directory path to extract the zip archive to.
 * @param {ziptoolCallback} callback - The function to be called after the zip archive has
 * been extracted or if an error occured.
 */
const unzip = (src, dest, callback) => {
  // Create stream and extracter
  const stream = fs.createReadStream(src);
  const extract = Extract({path: dest});

  // Read the src zip archive, extract it in the dest directory.
  stream.pipe(extract);

  // Error handler
  extract.on('error', (err) => {
    callback(err);
  });

  // Success handler
  extract.on('close', () => {
    callback(null);
  });
};

// Exports
exports.VERSION = VERSION;
exports.zip = zip;
exports.unzip = unzip;

// Define types and stuffs
/**
 * Function to be called after a zip file has been processed.
 * @callback ziptoolCallback
 * @param {Error|null} error - An Error object if an error occured, null otherwise.
 */
