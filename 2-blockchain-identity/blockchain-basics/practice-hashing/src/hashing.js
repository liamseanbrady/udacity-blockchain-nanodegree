const sha256 = require('crypto-js/sha256')

const generateHash = function(secretToHash) {
  const stringSecret = JSON.stringify(secretToHash)
  return sha256(stringSecret).toString()
}

// Generate some data for hashing (for testing purposes)
const data1 = "Blockchain Rock!";
const dataObject = {
  id: 1,
    body: "With Object Works too",
    time: new Date().getTime().toString().slice(0,-3)
};

// Just some testing of the function
// console.log(`SHA256 Hash: ${generateHash(data1)}`);
// console.log(`SHA256 Hash: ${generateHash(dataObject)}`);

module.exports = generateHash
