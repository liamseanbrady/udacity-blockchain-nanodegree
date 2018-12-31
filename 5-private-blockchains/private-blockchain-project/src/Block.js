/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class Block {
	constructor(data){
    this.hash = ''
    this.timestamp = ''
    this.previousBlockHash = ''
    this.height = ''
    this.data = data
	}
}

module.exports.Block = Block;
