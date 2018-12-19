const blockexplorer = require('blockexplorer')
const blockHeight = parseInt(process.argv[2])

if (Number.isNaN(blockHeight)) {
  throw new Error('The argument you pass to this program must be a number greater than 0')
}

const getBlock = function(blockHeight) {
  const block = blockexplorer.blockIndex(blockHeight).then(function(result) {
    const blockHash = JSON.parse(result).blockHash
    return blockexplorer.block(blockHash)
  })

  return block
}

const getBlocks = function(blockHeight) {
  const blockLimit = blockHeight + 3;

  // IIFE
  (function loopBlocks(index, originalBlockHeight) {
    setTimeout(function() {
      getBlock(index).then(function(block) {
        console.log(block)
      }).catch(function(error) {
        console.log(error)
      })

      index++

      if (index < blockLimit) loopBlocks(index)
    }, 3600)
  })(blockHeight, blockLimit)
}

getBlocks(blockHeight)
