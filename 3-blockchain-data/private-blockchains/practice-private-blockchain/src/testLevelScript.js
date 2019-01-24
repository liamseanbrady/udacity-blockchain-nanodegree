const level = require('level')
const chainDB = './chaindata.db'
const keyEncoding = require('bytewise')
const db = level(chainDB, { keyEncoding })

db.put('greeting', 'jello pudding', function(err) {
  if (err) console.log(`greeting submission failed`)
  else console.log('ok')
})

db.get('greeting', function(err, value) {
  if (err) console.log(`Failed to get data for greeting`)
  else console.log(`Value for greeting is ${value}`)
})

db.del('greeting', function(err) {
  if (err) console.log(`Failed to delete key greeting`)
  else console.log(`Deleted ok`)
})

db.get('greeting', function(err, value) {
  if (err) console.log(`Failed to get data for greeting`)
  else console.log(`Value for greeting is ${value}`)
})

db.batch([
  { type: 'put', key: 'some', value: 'thing' },
  { type: 'put', key: 'other', value: 'weeeee' },
  { type: 'put', key: 'kasper', value: 'cool value' }
], function(err) {
  if (err) console.log(`Failed to enter the batched key-value pairs`)
  else console.log(`Batch ok`)
})

db.get('other', function(err, value) {
  if (err) console.log(`Failed to get data for greeting`)
  else console.log(`Value for other is ${value}`)
})

db.createReadStream({ gt: 'j', lt: 's' })
  .on('data', (data) => console.log(`Subset: ${data.key}: ${data.value}`))

db.createReadStream()
  .on('data', (data) => console.log(`All: ${data.key}: ${data.value}`))
