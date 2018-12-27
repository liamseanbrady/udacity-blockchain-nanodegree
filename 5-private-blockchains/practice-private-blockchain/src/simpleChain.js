const sha256 = require('crypto-js/sha256')

class Block {
  constructor(data) {
    this.height = 0
    this.timeStamp = 0
    this.data = data
    this.previousBlockHash = "0x"
    this.hash = ""
  }
}

class Blockchain {
  constructor() {
    this.chain = []
    this.addBlock(this.createGenesisBlock())
  }

  createGenesisBlock() {
    return new Block('First block in the chain - Genesis block')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    const isGenesisBlock = this.chain.length === 0
    if (!isGenesisBlock) {
      newBlock.previousBlockHash = this.getLatestBlock().hash
    }
    newBlock.height = this.chain.length
    newBlock.timeStamp = new Date().getTime().toString().slice(0, -3)
    newBlock.hash = sha256(JSON.stringify(newBlock)).toString()
    this.chain.push(newBlock)
  }
}

module.exports = { Block, Blockchain }
