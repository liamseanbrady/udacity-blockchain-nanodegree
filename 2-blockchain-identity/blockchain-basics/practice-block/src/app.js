const Block = require('./block.js')

const block = new Block('Test Block')

block.generateHash().then(function(hashData) {
  console.log(`Block Hash: ${block.hash}`)
  console.log(`Block: ${JSON.stringify(block)}`)
}).catch(function(error) {
  console.log(error)
})
