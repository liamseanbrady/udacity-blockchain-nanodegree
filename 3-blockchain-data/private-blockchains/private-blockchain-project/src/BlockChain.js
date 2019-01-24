/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain {
  constructor() {
    this.bd = new LevelSandbox.LevelSandbox();
    this.generateGenesisBlock();
  }

  // Helper method to create a Genesis Block (always with height= 0)
  // You have to options, because the method will always execute when you create your blockchain
  // you will need to set this up statically or instead you can verify if the height !== 0 then you
  // will not create the genesis block
  async generateGenesisBlock() {
    try {
      const blockHeight = await this.getBlockHeight()
      if (blockHeight < 1) {
        const genesisBlock = new Block.Block()
        genesisBlock.height = '0'
        genesisBlock.timestamp = new Date().getTime().toString().slice(0, -3)
        genesisBlock.data = 'This is the genesis block'
        genesisBlock.previousBlockHash = '0x00'
        genesisBlock.hash = SHA256(JSON.stringify(genesisBlock)).toString()
        this.bd.addLevelDBData(genesisBlock.height, genesisBlock)
      }
    } catch(error) {
      console.log(error)
    }
  }

  // Get block height, it is a helper method that return the height of the blockchain
  getBlockHeight() {
    return this.bd.getBlocksCount()
  }

  // Add new block
  async addBlock(newBlock) {
    try {
      let previousBlockHeight = await this.getBlockHeight()

      if (previousBlockHeight < 1) {
        await this.generateGenesisBlock()
        previousBlockHeight = await this.getBlockHeight()
      }

      const previousBlock = await this.getBlock(previousBlockHeight - 1)

      newBlock.height = previousBlockHeight
      newBlock.timestamp = new Date().getTime().toString().slice(0, -3)
      newBlock.previousBlockHash = previousBlock.hash
      newBlock.hash = SHA256(JSON.stringify(newBlock)).toString()

      return this.bd.addLevelDBData(newBlock.height, newBlock)
    } catch(error) {
      console.log(error)
    }
  }

  // Get Block By Height
  getBlock(height) {
    return this.bd.getLevelDBData(height)
  }

  // Validate if Block is being tampered by Block Height
  async validateBlock(height) {
    try {
      const blockData = await this.getBlock(height)

      return new Promise(function(resolve, reject) {
        const block = blockData
        const blockCopy = Object.assign({}, block)
        blockCopy.hash = ''
        resolve(block.hash === SHA256(JSON.stringify(blockCopy)).toString())
      })
    } catch(error) {
      console.log(error)
    }
  }

  // Validate Blockchain
  async validateChain() {
    try {
      const self = this
      const blockHeight = await this.getBlockHeight()
      const promises = []

      for (let i = 0; i < blockHeight; i++) {
        let promise
        if (i > 0) {
          promise = new Promise(async function(resolve, reject) {
            const previousBlock = await self.getBlock(i - 1)
            const currentBlock = await self.getBlock(i)
            const currentBlockValidity = await self.validateBlock(currentBlock.height)
            return resolve(currentBlock.previousBlockHash === previousBlock.hash && currentBlockValidity)
          })
        } else {
          promise = await self.validateBlock(i)
        }

        promises.push(promise)
      }

      const results = await Promise.all(promises)
      return results.filter((result) => !result)
    } catch(error) {
      console.log(error)
    }
  }

  // Utility Method to Tamper a Block for Test Validation
  // This method is for testing purpose
  _modifyBlock(height, block) {
    let self = this;
    return new Promise(async (resolve, reject) => {
      try {
        const blockModified = await self.bd.addLevelDBData(height, block) 
        resolve(blockModified);
      } catch(error) {
        console.log(error)
        resolve(error)
      }
    })
  }
}

module.exports.Blockchain = Blockchain;
