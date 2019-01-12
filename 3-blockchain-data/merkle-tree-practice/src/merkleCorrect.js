const blockexplorer = require('blockexplorer')
const sha256 = require('js-sha256')

const getBlock = function() {
  return new Promise(async function(resolve, reject) {
    try {
      const blockHashData = await blockexplorer.blockIndex(160511)
      const blockHash = JSON.parse(blockHashData).blockHash
      resolve(JSON.parse(await blockexplorer.block(blockHash)))
    } catch(error) {
      reject(error)
    }
  })
}

const fetchMerkleRootAndTransactions = function(block) {
  return [block.merkleroot, block.tx];
}

const toBytes = hex =>
  hex.match(/../g).reduce((acc, hex) => [...acc, parseInt(hex, 16)], []);

const toHex = bytes =>
  bytes.reduce((acc, bytes) => acc + bytes.toString(16).padStart(2, '0'), '');

const toPairs = function(arr) {
  const pairs = Array.from(Array(Math.ceil(arr.length / 2)), (_, i) => arr.slice(i * 2, i * 2 + 2));
  return pairs
}

const hashPair = (a, b = a) => {
  const bytes = toBytes(`${b}${a}`).reverse();
  const hashed = sha256.array(sha256.array(bytes));
  return toHex(hashed.reverse());
};

const merkleRoot = function(txs) {
  if (txs.length === 1)
    return txs[0]
  else {
    const hashedPairs = toPairs(txs).reduce((tree, pair) => {
      return [...tree, hashPair(...pair)] 
    }, [])
    console.log(hashedPairs)
    return merkleRoot(hashedPairs)
  }
}

getBlock().then(async function(block) {
  const [root, txs] = await fetchMerkleRootAndTransactions(block)
  const isValid = merkleRoot(txs) === root;
  console.log(isValid);
}).catch(function(error) {
  console.error(error)
})


