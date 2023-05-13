# pjs (JSON File Helper)

pjs is a helper class for reading and writing JSON data to files in JavaScript/Node.js.

## Installation

```bash
npm i p-js-rsr


import {pjs} from 'p-js';

// Example usage
const data = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
];

// Write JSON data to a file
pjs.write(data, 'output')
  .then(() => {
    // Read JSON data from the file
    return pjs.read('output.json');
  })
  .then((jsonData) => {
    console.log('Read JSON data:', jsonData);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
