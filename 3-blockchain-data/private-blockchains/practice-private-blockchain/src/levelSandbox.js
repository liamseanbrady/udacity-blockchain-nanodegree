const level = require('level')
const chainDB = './chaindata.db'
const keyEncoding = require('bytewise')
const db = level(chainDB, { keyEncoding })

const addLevelDBData = function(key, value) {
  db.put(key, value, function(err) {
    if (err) console.log(`Block ${key} submission failed`, err)
    else console.log(`Updating Value = ${value}`)
  })
}

const getLevelDBData = function(key) {
  db.get(key, function(err) {
    if (err) console.log('Not found', err)
    else console.log(`Value = ${value}`)
  })
}

const test = function() {
  (function addDataLoop(i) {
    setTimeout(function() {
      console.log("Calling addDataToLevelDB function")
      addLevelDBData(i, `Testing data ${i}`)
      if (--i) {
        console.log(`Calling the loop again with i at ${i}`)
        addDataLoop(i)
      } else {
        db.createReadStream().on('data', console.log)
        return
      }
    }, 100)
  })(10)
}

test()
