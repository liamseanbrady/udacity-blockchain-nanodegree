const sha256 = require('js-sha256')

// Transactions from block with height 160511
txs = [ 'c15e72a09a8d0ca77f48f5e8215b9f6e179b31b6336a21f1b274b10e060fe453',
  'e79aa16037b23e3e9401ab797bf95c3ae038affc10db05341da400777edafd6d',
  '274645b65907d1d077e2049ae51e06b8237b555fad8c2d32f91789a30e78133d',
  '87e36e1c1c78cc3331467bb2c62c4155a0d5d4fb68946687e7ad03259300615d',
  'a823ff027cab7c069b9ce4b0af1f99879a623f3fc4e48f3b5fc83d877cda1d67',
  '33a2ca6288d2ce8a796874850365873bf416687bca804d83fecec596e43e8400' ]

console.log('')
console.log('Zeroth level hashes (all transaction IDs)')
console.log('*******************************************')
console.log('')
txs.forEach((tx) => console.log(tx))
console.log('')

const pairs = Array.from(Array(Math.ceil(txs.length / 2)), (_, i) => txs.slice(i * 2, i * 2 + 2));

const firstPairHexSwitched = `${pairs[0][1]}${pairs[0][0]}`
const firstPairBytePairs = firstPairHexSwitched.match(/../g)
const firstPairBytePairsDecimal = firstPairBytePairs.reduce((acc, hex) => [...acc, parseInt(hex, 16)], [])
const littleEndianFirstPairBytePairsDecimal = firstPairBytePairsDecimal.reverse()
// Worth noting here that even though we have a byte array being passed into sha256.array, sha256.array just takes any ascii characters and converts them to a byte array before hashing, so sha256.array([120, 121]) is the same as sha256('xy') because 'xy' just gets converted to [120, 121] anyway.
const sha256dLittleEndianFirstPairBytePairsDecimal = sha256.array(sha256.array(littleEndianFirstPairBytePairsDecimal))
const reversedSha256dLittleEndianFirstPairBytePairsDecimal = sha256dLittleEndianFirstPairBytePairsDecimal.reverse()
const hexReversedSha256dLittleEndianFirstPairBytePairsDecimal = reversedSha256dLittleEndianFirstPairBytePairsDecimal.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')

const secondPairHexSwitched = `${pairs[1][1]}${pairs[1][0]}`
const secondPairBytePairs = secondPairHexSwitched.match(/../g)
const secondPairBytePairsDecimal = secondPairBytePairs.reduce((acc, hex) => [...acc, parseInt(hex, 16)], [])
const littleEndianSecondPairBytePairsDecimal = secondPairBytePairsDecimal.reverse()
const sha256dLittleEndianSecondPairBytePairsDecimal = sha256.array(sha256.array(littleEndianSecondPairBytePairsDecimal))
const reversedSha256dLittleEndianSecondPairBytePairsDecimal = sha256dLittleEndianSecondPairBytePairsDecimal.reverse()
const hexReversedSha256dLittleEndianSecondPairBytePairsDecimal = reversedSha256dLittleEndianSecondPairBytePairsDecimal.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')

const thirdPairHexSwitched = `${pairs[2][1]}${pairs[2][0]}`
const thirdPairBytePairs = thirdPairHexSwitched.match(/../g)
const thirdPairBytePairsDecimal = thirdPairBytePairs.reduce((acc, hex) => [...acc, parseInt(hex, 16)], [])
const littleEndianThirdPairBytePairsDecimal = thirdPairBytePairsDecimal.reverse()
const sha256dLittleEndianThirdPairBytePairsDecimal = sha256.array(sha256.array(littleEndianThirdPairBytePairsDecimal))
const reversedSha256dLittleEndianThirdPairBytePairsDecimal = sha256dLittleEndianThirdPairBytePairsDecimal.reverse()
const hexReversedSha256dLittleEndianThirdPairBytePairsDecimal = reversedSha256dLittleEndianThirdPairBytePairsDecimal.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')

console.log('First level hashes')
console.log('*******************************************')
console.log('')
console.log(hexReversedSha256dLittleEndianFirstPairBytePairsDecimal)
console.log(hexReversedSha256dLittleEndianSecondPairBytePairsDecimal)
console.log(hexReversedSha256dLittleEndianThirdPairBytePairsDecimal)
console.log('')

const secondLevelFirstPairHexSwitched = `${hexReversedSha256dLittleEndianSecondPairBytePairsDecimal}${hexReversedSha256dLittleEndianFirstPairBytePairsDecimal}`
const secondLevelFirstPairBytePairs = secondLevelFirstPairHexSwitched.match(/../g)
const secondLevelFirstPairBytePairsDecimal = secondLevelFirstPairBytePairs.reduce((acc, hex) => [...acc, parseInt(hex, 16)], [])
const littleEndianSecondLevelFirstPairBytePairsDecimal = secondLevelFirstPairBytePairsDecimal.reverse()
// Worth noting here that even though we have a byte array being passed into sha256.array, sha256.array just takes any ascii characters and converts them to a byte array before hashing, so sha256.array([120, 121]) is the same as sha256('xy') because 'xy' just gets converted to [120, 121] anyway.
const sha256dLittleEndianSecondLevelFirstPairBytePairsDecimal = sha256.array(sha256.array(littleEndianSecondLevelFirstPairBytePairsDecimal))
const reversedSha256dLittleEndianSecondLevelFirstPairBytePairsDecimal = sha256dLittleEndianSecondLevelFirstPairBytePairsDecimal.reverse()
const hexReversedSha256dLittleEndianSecondLevelFirstPairBytePairsDecimal = reversedSha256dLittleEndianSecondLevelFirstPairBytePairsDecimal.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')

const secondLevelSecondPairHexSwitched = `${hexReversedSha256dLittleEndianThirdPairBytePairsDecimal}${hexReversedSha256dLittleEndianThirdPairBytePairsDecimal}`
const secondLevelSecondPairBytePairs = secondLevelSecondPairHexSwitched.match(/../g)
const secondLevelSecondPairBytePairsDecimal = secondLevelSecondPairBytePairs.reduce((acc, hex) => [...acc, parseInt(hex, 16)], [])
const littleEndianSecondLevelSecondPairBytePairsDecimal = secondLevelSecondPairBytePairsDecimal.reverse()
const sha256dLittleEndianSecondLevelSecondPairBytePairsDecimal = sha256.array(sha256.array(littleEndianSecondLevelSecondPairBytePairsDecimal))
const reversedSha256dLittleEndianSecondLevelSecondPairBytePairsDecimal = sha256dLittleEndianSecondLevelSecondPairBytePairsDecimal.reverse()
const hexReversedSha256dLittleEndianSecondLevelSecondPairBytePairsDecimal = reversedSha256dLittleEndianSecondLevelSecondPairBytePairsDecimal.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')

console.log('Second level hashes')
console.log('*******************************************')
console.log('')
console.log(hexReversedSha256dLittleEndianSecondLevelFirstPairBytePairsDecimal)
console.log(hexReversedSha256dLittleEndianSecondLevelSecondPairBytePairsDecimal)
console.log('')

const rootLevelPairHexSwitched = `${hexReversedSha256dLittleEndianSecondLevelSecondPairBytePairsDecimal}${hexReversedSha256dLittleEndianSecondLevelFirstPairBytePairsDecimal}`
const rootLevelPairBytePairs = rootLevelPairHexSwitched.match(/../g)
const rootLevelPairBytePairsDecimal = rootLevelPairBytePairs.reduce((acc, hex) => [...acc, parseInt(hex, 16)], [])
const littleEndianRootLevelPairBytePairsDecimal = rootLevelPairBytePairsDecimal.reverse()
// Worth noting here that even though we have a byte array being passed into sha256.array, sha256.array just takes any ascii characters and converts them to a byte array before hashing, so sha256.array([120, 121]) is the same as sha256('xy') because 'xy' just gets converted to [120, 121] anyway.
const sha256dLittleEndianRootLevelPairBytePairsDecimal = sha256.array(sha256.array(littleEndianRootLevelPairBytePairsDecimal))
const reversedSha256dLittleEndianRootLevelPairBytePairsDecimal = sha256dLittleEndianRootLevelPairBytePairsDecimal.reverse()
const hexReversedSha256dLittleEndianRootLevelPairBytePairsDecimal = reversedSha256dLittleEndianRootLevelPairBytePairsDecimal.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')

console.log('Root level hash')
console.log('*******************************************')
console.log('')
console.log(hexReversedSha256dLittleEndianRootLevelPairBytePairsDecimal)
console.log('')


const merkleProof = function(txs, tx, proof = []) {
  if (txs.length === 1) {
    return proof
  }

  const tree = []
  
  const pairs = Array.from(Array(Math.ceil(txs.length / 2)), (_, i) => txs.slice(i * 2, i * 2 + 2))
  pairs.forEach(function(pair) {
    if (pair.length === 1) {
      pair.push(pair[0])
    }

    const pairHexSwitched = `${pair[1]}${pair[0]}`
    const bytePairs = pairHexSwitched.match(/../g)
    const bytePairsDecimal = bytePairs.reduce((acc, hex) => [...acc, parseInt(hex, 16)], [])
    const littleEndianBytePairsDecimal = bytePairsDecimal.reverse()
    const sha256dLittleEndianBytePairsDecimal = sha256.array(sha256.array(littleEndianBytePairsDecimal))
    const reversedSha256dLittleEndianBytePairsDecimal = sha256dLittleEndianBytePairsDecimal.reverse()
    const hexReversedSha256dLittleEndianBytePairsDecimal = reversedSha256dLittleEndianBytePairsDecimal.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')

    if (pair.includes(tx)) {
      const idx = pair[0] === tx | 0
      proof.push([idx, pair[idx]])
      console.log({pair, idx})
      tx = hexReversedSha256dLittleEndianBytePairsDecimal
    }

    tree.push(hexReversedSha256dLittleEndianBytePairsDecimal)
  })

  return merkleProof(tree, tx, proof)
}

const randomTx = txs[Math.floor(Math.random() * txs.length)]

const proof = merkleProof(txs, randomTx)
console.log(`Proving tx ID: ${randomTx}`)
console.log(proof)

const merkleProofRoot = function(proof, tx) {
  console.log({proof, tx})
  return proof.reduce(function(root, [idx, tx]) {
    let pairHexSwitched

    if (idx === 0) {
     pairHexSwitched = `${root}${tx}` 
    } else {
     pairHexSwitched = `${tx}${root}` 
    }

    const bytePairs = pairHexSwitched.match(/../g)
    const bytePairsDecimal = bytePairs.reduce((acc, hex) => [...acc, parseInt(hex, 16)], [])
    const littleEndianBytePairsDecimal = bytePairsDecimal.reverse()
    const sha256dLittleEndianBytePairsDecimal = sha256.array(sha256.array(littleEndianBytePairsDecimal))
    const reversedSha256dLittleEndianBytePairsDecimal = sha256dLittleEndianBytePairsDecimal.reverse()
    return reversedSha256dLittleEndianBytePairsDecimal.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')
  }, tx)
}

const rootFromProof = merkleProofRoot(proof, randomTx)
console.log(rootFromProof)
console.log(hexReversedSha256dLittleEndianRootLevelPairBytePairsDecimal)
const isValid = rootFromProof === hexReversedSha256dLittleEndianRootLevelPairBytePairsDecimal
console.log(isValid)
