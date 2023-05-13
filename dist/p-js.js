"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pjs = void 0;
const fs_1 = __importDefault(require("fs"));
const zlib = require('zlib');
/**
 * Helper class for reading and writing JSON data to files.
 */
class pjs {
    /**
     * Writes JSON data to a file.
     * @param data - The JSON data to write.
     * @param fileName - The name of the file (without the file extension).
     * @param indent - The number of spaces to use for indentation (default: 2).
     * @returns A promise that resolves when the file has been written successfully.
     */
    static write(data, fileName, indent = 2) {
        const jsonString = JSON.stringify(data, null, indent);
        return fs_1.default.promises.writeFile(`${fileName}.json`, jsonString, 'utf-8')
            .then(() => {
            console.log('JSON file has been exported successfully.');
        })
            .catch((err) => {
            console.error('Error writing JSON file:', err);
            throw err;
        });
    }
    static writeCompressed(data, fileName) {
        const jsonString = JSON.stringify(data, null, 2);
        const compressedData = zlib.gzipSync(jsonString);
        return fs_1.default.promises.writeFile(`${fileName}.json.gz`, compressedData)
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
    static read(fileName) {
        return fs_1.default.promises.readFile(fileName, 'utf-8')
            .then((data) => {
            console.log('JSON file has been read successfully.');
            return JSON.parse(data);
        })
            .catch((err) => {
            console.error('Error reading JSON file:', err);
            throw err;
        });
    }
    static readCompressed(fileName) {
        return fs_1.default.promises.readFile(fileName)
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
exports.pjs = pjs;
