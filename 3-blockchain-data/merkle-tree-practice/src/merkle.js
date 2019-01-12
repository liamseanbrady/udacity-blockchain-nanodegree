const sha256 = require('crypto-js/sha256')
const blockexplorer = require('blockexplorer')

const getBlock = function(blockIndex) {
  return new Promise(async function(resolve, reject) {
    try {
      const blockHashData = await blockexplorer.blockIndex(blockIndex)
      const blockHash = JSON.parse(blockHashData).blockHash
      resolve(JSON.parse(await blockexplorer.block(blockHash)))
    } catch(error) {
      reject(error)
    }
  })
}

const getTransactionIdsForBlock = function(blockIndex) {
  return new Promise(async function(resolve, reject) {
    try {
      const block = await getBlock(blockIndex)
      console.log(block.merkleroot)
      resolve(block.tx)
    } catch(error) {
      reject(error)
    }
  })
}

const toBytes = function(hexString) {
  const bytes = hexString.match(/../g).map(function(hexByte) {
    return parseInt(hexByte, 16)
  })

  return bytes
}

const toHex = function(byteArray) {
  const byteString = byteArray.reduce(function(acc, byte) {
    return acc += parseInt(byte).toString(16).padStart(2, '0')
  }, '')

  return byteString
}

const toPairs = function(transactionsIds) {
  return Array.from(Array(Math.ceil(arr.length/2)), function(_, i) { return arr.slice(i * 2, i * 2 + 2) })
}

const buildMerkleRoot = function(ids) {
  if ((ids.length % 2) === 1) {
    ids.push(ids[ids.length - 1])
  }

  while (ids.length !== 1) {
    firstTransaction = ids.shift()
    secondTransaction = ids.shift()
    //const transactionConcat = Array.from(`${firstTransaction}${secondTransaction}`).reverse().join('')
    const transactionConcat = toBytes(`${secondTransaction}${firstTransaction}`).reverse()
    const transactionHash = sha256(sha256(transactionConcat)).toString
    ids.push(hexHash)
  }

  return ids
}

getTransactionIdsForBlock(160511).then(function(ids) {
  const merkleRoot = buildMerkleRoot(ids)
  console.log(merkleRoot)
}).catch(function(error) {
  console.error(error)
})
