import fs from 'fs';
const zlib = require('zlib');

/**
 * Helper class for reading and writing JSON data to files.
 */
export class pjs {
  /**
   * Writes JSON data to a file.
   * @param data - The JSON data to write.
   * @param fileName - The name of the file (without the file extension).
   * @param indent - The number of spaces to use for indentation (default: 2).
   * @returns A promise that resolves when the file has been written successfully.
   */

  static write(data: any, fileName: string, indent: number = 2): Promise<void> {
    const jsonString = JSON.stringify(data, null, indent);
    return fs.promises.writeFile(`${fileName}.json`, jsonString, 'utf-8')
      .then(() => {
        console.log('JSON file has been exported successfully.');
      })
      .catch((err) => {
        console.error('Error writing JSON file:', err);
        throw err;
      });
  }

  static writeCompressed(data: any, fileName: string): Promise<void> {
    const jsonString = JSON.stringify(data, null, 2);
    const compressedData = zlib.gzipSync(jsonString);

    return fs.promises.writeFile(`${fileName}.json.gz`, compressedData)
      .then(() => {
        console.log('Compressed JSON file has been written successfully.');
      })
      .catch((err) => {
        console.error('Error writing compressed JSON file:', err);
        throw err;
      });
  }
  /**
   * Reads JSON data from a file.
   * @param fileName - The name of the file to read.
   * @returns A promise that resolves with the JSON data from the file.
   */
  static read(fileName: string): Promise<any> {
    return fs.promises.readFile(fileName, 'utf-8')
      .then((data) => {
        console.log('JSON file has been read successfully.');
        return JSON.parse(data);
      })
      .catch((err) => {
        console.error('Error reading JSON file:', err);
        throw err;
      });
  }

  static readCompressed(fileName: string): Promise<any> {
    return fs.promises.readFile(fileName)
      .then((compressedData) => {
        const decompressedData = zlib.gunzipSync(compressedData);
        const jsonData = decompressedData.toString('utf-8');
        console.log('Compressed JSON file has been read successfully.');
        return JSON.parse(jsonData);
      })
      .catch((err) => {
        console.error('Error reading compressed JSON file:', err);
        throw err;
      });
  }

}
