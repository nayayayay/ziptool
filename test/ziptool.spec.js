const fs = require('fs');
const { expect } = require('chai');
const rimraf = require('rimraf');
const { zip, unzip } = require('../src/index.js');

describe('ziptool', () => {
  // Create tmp dir and files
  before(() => {
    fs.mkdirSync('tmp');
    fs.writeFileSync('tmp/foo.txt', 'foo');
    fs.writeFileSync('tmp/bar.txt', 'bar');
  });

  // Remove the tmp directory
  after(() => {
    rimraf.sync('tmp');
  });

  describe('#zip()', () => {
    it('should zip a file', () => {
      zip('tmp/foo.txt', 'tmp/foo.zip', (err) => {
        expect(err).to.be.null;
        expect(fs.existsSync('tmp/foo.zip')).to.be.true;
        done();
      });
    });

    it('should zip multiple files', () => {
      zip(['tmp/foo.txt', 'tmp/bar.txt'], 'tmp/foobar.zip', (err) => {
        expect(err).to.be.null;
        expect(fs.existsSync('tmp/foobar.zip')).to.be.true;
        done();
      });
    });
  });

  describe('#unzip()', () => {
    it('should create a directory and exctract the zip in there', () => {
      unzip('tmp/foobar.zip', 'tmp/foobar', (err) => {
        expect(err).to.be.null;
        expect(fs.existsSync('tmp/foobar/foo.txt')).to.be.true;
        expect(fs.existsSync('tmp/foobar/bar.txt')).to.be.true;
        done();
      });
    });
  });
});
