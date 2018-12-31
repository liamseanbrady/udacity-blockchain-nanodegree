/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';

class LevelSandbox {
  constructor() {
    this.db = level(chainDB, { valueEncoding: 'json' });
  }

  // Get data from levelDB with key (Promise)
  getLevelDBData(key){
    const self = this;
    return new Promise(function(resolve, reject) {
      self.db.get(key, function(err, value) {
        if (err) return reject(err)
        else return resolve(value)
      })
    });
  }

  // Add data to levelDB with key and value (Promise)
  addLevelDBData(key, value) {
    const self = this;
    return new Promise(function(resolve, reject) {
      self.db.put(key, value, function(err) {
        if (err) return reject(err)
        else return resolve(`Successfully added ${key}: ${JSON.stringify(value)} to database`)
      })
    });
  }

  // Method that return the height
  getBlocksCount() {
    const self = this;
    let blockCount = 0
    return new Promise(function(resolve, reject){
      self.db.createReadStream().on('data', function(data) {
        return blockCount++
      }).on('error', function(error) {
        return reject(error)
      }).on('close', function() {
        return resolve(blockCount)
      })
    });
  }
}

module.exports.LevelSandbox = LevelSandbox;
