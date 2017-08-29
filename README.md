# Ziptool
A simple tool to zip and unzip from the command line or from your code.

# Requirements

  - Node.js
  https://nodejs.org


# Installation
Ziptool can be installed **globally**: `npm install ziptool -g`

or **locally** into your npm project: `npm install ziptool --save`


# Usage
- ## CLI
  ### Globally installed
    Ziptool can be used directly from the command line to zip/unzip files:

    ```bash  
    # Zip file-1.txt and file-2.png into a new zip archive 'zip-archive':
    ziptool --zip file-1.txt file-2.png -o zip-archive.zip

    # Extract the files from my-archive.zip into the directory 'my-directory':
    ziptool --unzip my-archive.zip -o zip-archive.zip
    ```


    **For more information, run the command:**
    `ziptool --help`

  ### Locally installed
    If ziptool is installed locally, you need to replace the 'ziptool' command
    by `node node_modules/ziptool/bin/ziptool`
    or by adding scripts into your package.json file:
    ```javascript
      "scripts": [
        "ziptool": "ziptool"
      ]
    ```

- ## Code
  ## Example
    Ziptool's api is also available to use in your Node.js javascript files, simply require it:
    ```javascript
    const ziptool = require('ziptool');
    ```
    You can also require only the functions you need:
    ```javascript
    const {zip} = require('zip');
    ```



  ## References
  * **VERSION**: constant
    ```javascript
    /**
     * Current ziptool's version.
     * @const {string}
     */
     ```
     *Example*:
      ```javascript
      console.log(ziptool.VERSION); // Will print the package's version you are using
      ```

  * **zip (src, dest, callback)**: function
    ```javascript
    /**
     * Create a zip archive from one or multiple files.
     * @param {string|Array<string>} src - The pathname(s) of the file(s) to compress.
     * @param {string} dest - The pathname of the zip archive to create.
     * @param {Function} callback - The function called after the zip archive has
     * been created or if an error occured.
     */
    ```
    *Example*:
      ```javascript
      zip(['file1.jpg', 'file2.png', 'file4.mp3'], 'idk.zip', (err) => {
        // err is given to the callback as an argument.
        // It is either null (= no error) or an Error instance (= error)
        if (err) throw err;
      });
      ```

  * **unzip (src, dest, callback)**: function
    ```javascript
    /**
     * Extract a zip archive to a specified location.
     * @param {string} src - The zip archive filepath to be extracted.
     * @param {string} dest - The directory path to extract the zip archive to.
     * @param {Function} callback - The function called after the zip archive has
     * been extracted or if an error occured.
     */
    ```
    *Example*:
      ```javascript
      unzip('idk.zip', 'a-directory', (err) => {
        // err is given to the callback as an argument.
        // It is either null (= no error) or an Error instance (= error)
        if (err) throw err;
      });
      ```

--------------

# <3.
