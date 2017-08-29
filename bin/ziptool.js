#!/usr/bin/env node
const {VERSION, zip, unzip} = require('../src/index.js');

// CLI Tool vars
let proc = {
  command: '',
  args: [],
  message: ''
};

// Utils
const commands = {
  'help': () => {
    return `
    ZIPTOOL CLI - Zip and unzip files from the command line.

    ----------

    USAGE: ziptool <--command> [<source> -o <destination>]

    Commands available:
        -h, --help     => Prints this message.
        -z, --zip      => Zip all files from <source> to <destination>
                          (the last argument is considered the destination).
        -u, --unzip    => Unzip a zip archive from <source> to the target directory <destination>
                          (the last argument is considered the destination).
        -v, --version  => Prints ziptool version currently running.
        -o, --output   => Prefix the output file/directory (see example below).

    ----------

    Example usage:
      - Creating a zip archive from one or more files:
          ziptool --zip file1.txt file2.png file3.wav -o archive.zip

      - Extracting a zip archive to a directory:
          ziptool --unzip archive.zip -o my/awesome/directory
    `;
  },
  'zip': zip,
  'unzip': unzip,
  'version': () => {
    return `ziptool v${VERSION}`;
  }
};

const getCommand = (argList) => {
  for (const value in commands) {
    if (argList.indexOf(`--${value}`) !== -1 || argList.indexOf(`-${value.substr(0, 1)}`) !== -1) {
      return value.replace(/^\-\-?/, '');
    }
  };

  return null;
};

const setProc = (command, params) => {
  let isValid;
  let message = '';

  if (['zip', 'unzip'].indexOf(command) !== -1) {
    let output = params.indexOf('-o');

    if (output === -1) output = params.indexOf('-o');

    if (output !== -1) {
      if (params.length > output + 1) {
        proc.command = command;
        proc.args.push(params[output + 1]);

        for (let i = 0; i < params.length; i++) {
          if (getCommand(params[i]) === proc.command ||
              proc.args.indexOf(params[i]) !== -1 ||
              i === output)
            continue;

          proc.args.push(params[i]);
        }

        if (proc.args.length > 1) {
          isValid = true;
        } else {
          proc.message = 'No input file specified. See Usage and example:\n\n';
        }
      } else {
        message = `No output file specified after ${params[output]}. See Usage and examples:\n\n`;
      }
    } else {
      message = 'No output specified. See Usage and examples:\n\n';
    }
  } else if (commands[command] !== -1) {
    isValid = true;
  } else {
    isValid = false;
  }

  if (!isValid) {
    proc.message = message;
  }

  proc.command = commands[command] ? command : 'help';
};

const getProc = () => {
  if (['zip', 'unzip'].indexOf(proc.command) !== -1) {
    let args = proc.args.slice(1);

    if (proc.command === 'unzip') args = args[0];

    commands[proc.command](args, proc.args[0], (err) => {
      if (err) {
        console.log('An error occured while processing your files:');
        console.error(err);
      } else {
        console.log('Your files were successfully processed.');
      }
    });
  } else {
    console.log(proc.message, commands[proc.command]());
  }
};

// Process
const run = () => {
  let argv = process.argv.slice(2);

  switch (argv[0]) {
    case 'ziptool':
      argv = argv.slice(1);
      break;
    case 'node':
      argv = argv.slice(2);
      break;
    case 'npm':
      argv = argv.slice(3);
      break;
    default:
      break;
  }

  setProc(getCommand(argv), argv);
  getProc();

  return 0;
}

run();
