const crpto = require('crypto');

const key1 = crpto.randomBytes(32).toString('hex');
const key2 = crpto.randomBytes(32).toString('hex');

console.table({key1, key2});