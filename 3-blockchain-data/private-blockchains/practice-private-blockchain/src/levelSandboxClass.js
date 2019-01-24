const level = require('level')
const keyEncoding = require('bytewise')

class LevelSandbox {
  constructor() {
    this.db = level('./chaindata.db', { keyEncoding })
  }

  getLevelDBData(key) {
    const self = this

    return new Promise(function(resolve, reject) {
      self.db.get(key, function(err, value) {
        if (err) return reject(err)
        else return resolve(value)
      })
    })
  }

  addLevelDBData(key, value) {
    const self = this

    return new Promise(function(resolve, reject) {
      self.db.put(key, value, function(err) {
        if (err) return reject(err)
        else return resolve('ok')
      })
    })
  }

  getBlocksCount() {
    const self = this
    let counter = 0

    return new Promise(function(resolve, reject) {
      self.db.createReadStream().on('data', function(data) {
        counter++
      }).on('error', function(error) {
        return reject(error)
      }).on('close', function(data) {
        return resolve(counter)
      })
    })
  }
}

const sandbox = new LevelSandbox()

sandbox.addLevelDBData('elfs', 'elfatron').then(function(data) {
  console.log(data)
}).catch(function(error) {
  console.log(error)
})

sandbox.addLevelDBData('jayne', 'jayney').then(function(data) {
  console.log(data)
}).catch(function(error) {
  console.log(error)
})

sandbox.addLevelDBData('tom', 'tom tom').then(function(data) {
  console.log(data)
}).catch(function(error) {
  console.log(error)
})

sandbox.getLevelDBData('elfs').then(function(data) {
  console.log(data)
}).catch(function(error) {
  console.log(error)
})

sandbox.getBlocksCount().then(function(data) {
  console.log(data)
}).catch(function(error) {
  console.log(error)
})
