const SHA256 = require('crypto-js/sha256')

//const Block = function(contents) {
//  this.contents = contents
//  this.hash = ''
//}
//
//Block.prototype.generateHash = function() {
//  const self = this
//
//  return new Promise(function(resolve, reject) {
//    self.hash = SHA256(JSON.stringify(self)).toString()
//    resolve(self)
//  }).then(function(block) {
//    return `Hash of ${JSON.stringify(block)} is ${block.hash}`
//  }, function(error) {
//  })
//}

class Block {
  constructor(data) {
    this.id = 0
    this.nonce = 144444
    this.body = data
    this.hash = ''
  }

  generateHash() {
    const self = this
  
    return new Promise(function(resolve, reject) {
      self.hash = SHA256(JSON.stringify(self)).toString()
      resolve(self)
    }).then(function(block) {
      return `Hash of ${JSON.stringify(block)} is ${block.hash}`
    }, function(error) {
    })
  }
}

module.exports = Block
