const sha256 = require('crypto-js/sha256')

const generateHash = function(secretToHash) {
  const stringSecret = JSON.stringify(secretToHash)
  return sha256(stringSecret).toString()
}

const data1 = "Blockchain Rock!";
const dataObject = {
  id: 1,
    body: "With Object Works too",
    time: new Date().getTime().toString().slice(0,-3)
};

console.log(`SHA256 Hash: ${generateHash(data1)}`);
console.log("************************************");
console.log(`SHA256 Hash: ${generateHash(dataObject)}`);
