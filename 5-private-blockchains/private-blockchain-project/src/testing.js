/* ===== Executable Test ==================================
|  Use this file to test your project.
|  =========================================================*/

const BlockChain = require('./BlockChain.js');
const Block = require('./Block.js');


/******************************************
 ** Function for Create Tests Blocks   ****
 ******************************************/

class Testing {
  constructor() {
    this.myBlockChain = new BlockChain.Blockchain();
  }

  createBlocks(numberOfBlocks=8) {
    const self = this
    return new Promise(function(resolve, reject) {
      (function theLoop (i) {
        console.log('creating blocks')
        setTimeout(function () {
          let blockTest = new Block.Block("Test Block - " + (i + 1));
          // Be careful this only will work if your method 'addBlock' in the Blockchain.js file return a Promise
          self.myBlockChain.addBlock(blockTest).then((result) => {
            console.log(result);
            i++;
            if (i < numberOfBlocks) theLoop(i);
          });
        }, 2000);
      })(0);
    })
  }

  /***********************************************
   ** Function to get the Height of the Chain ****
   ***********************************************/

  // Be careful this only will work if `getBlockHeight` method in Blockchain.js file return a Promise
  getHeightOfChain() {
    const self = this
    return new Promise(function(resolve, reject) {
      self.myBlockChain.getBlockHeight().then((height) => {
        resolve(height);
      }).catch((err) => { reject(err);});
    })
  }

  /***********************************************
   ******** Function to Get a Block  *************
   ***********************************************/

  // Be careful this only will work if `getBlock` method in Blockchain.js file return a Promise
  getBlock() {
    const self = this
    return new Promise(function(resolve, reject) {
      self.myBlockChain.getBlock(0).then((block) => {
        resolve(JSON.stringify(block));
      }).catch((err) => { reject(err);});
    })
  }

  /***********************************************
   ***************** Validate Block  *************
   ***********************************************/

  // Be careful this only will work if `validateBlock` method in Blockchain.js file return a Promise
  validateBlock() {
    const self = this
    return new Promise(function(resolve, reject) {
      self.myBlockChain.validateBlock(0).then((valid) => {
        resolve(valid);
      })
      .catch((error) => {
        reject(error);
      })
    })
  }

  /** Tampering a Block this is only for the purpose of testing the validation methods */
  tamperBlock() {
    const self = this
    return new Promise(function(resolve, reject) {
      self.myBlockChain.getBlock(5).then((block) => {
        let blockAux = block;
        self.myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
          if(blockModified){
            self.myBlockChain.validateBlock(blockAux.height).then((valid) => {
              resolve(`Block #${blockAux.height}, is valid? = ${valid}`);
            })
            .catch((error) => {
              console.log(error);
            })
          } else {
            resolve("The Block wasn't modified");
          }
        }).catch((err) => { console.log(err);});
      }).catch((err) => { console.log(err);});
    })
  }

  tamperBlockTwo() {
    const self = this
    return new Promise(function(resolve, reject) {
      self.myBlockChain.getBlock(6).then((block) => {
        let blockAux = block;
        blockAux.previousBlockHash = "jndininuud94j9i3j49dij9ijij39idj9oi";
        self.myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
          if(blockModified){
            resolve("The Block was modified");
          } else {
            resolve("The Block wasn't modified");
          }
        }).catch((err) => { console.log(err);});
      }).catch((err) => { console.log(err);});
    })
  }

  /***********************************************
   ***************** Validate Chain  *************
   ***********************************************/

  // Be careful this only will work if `validateChain` method in Blockchain.js file return a Promise
  validateChain() {
    const self = this
    return new Promise(function(resolve, reject) {
      self.myBlockChain.validateChain().then((errorLog) => {
        if(errorLog.length > 0){
          resolve("The chain is not valid:");
          errorLog.forEach(error => {
            reject(error);
          });
        } else {
          resolve("No errors found, The chain is Valid!");
        }
      })
      .catch((error) => {
        reject(error);
      })
    })
  }

  async runTests() {
    const height = await this.getHeightOfChain()
    const block = await this.getBlock()
    const blockValid = await this.validateBlock()
    const validateChain = await this.validateChain()
    const tamperResult = await this.tamperBlock()
    const tamperResultTwo = await this.tamperBlockTwo()
    console.log("****HEIGHT****")
    console.log(height)
    console.log("\r\n")
    console.log("****BLOCK****")
    console.log(block)
    console.log("\r\n")
    console.log("****VALID****")
    console.log(blockValid)
    console.log("\r\n")
    console.log("****Validate Chain****")
    console.log(validateChain)
    console.log("\r\n")
    console.log("****Tamper one****")
    console.log(tamperResult)
    console.log("\r\n")
    console.log("****Tamper two****")
    console.log(tamperResultTwo)
    console.log("\r\n")
  }
}

new Testing().runTests()
