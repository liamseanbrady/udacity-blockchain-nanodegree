const Block = require('./simpleChain').Block
const Blockchain = require('./simpleChain').Blockchain
const chain = new Blockchain()
chain.addBlock(new Block('This is some data'))
chain.addBlock(new Block('This is some even newer data'))
chain.addBlock(new Block('Data here which is the newest of the new'))
console.log(chain.chain)
