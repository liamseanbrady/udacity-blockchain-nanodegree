## Grabbing blockchain data for 3 contiguous blocks on the bitcoin blockchain

This project is not part of Udacity's Blockchain Nanodegree. I wanted to more
full understand Merkle trees and how they function in the context of the Bitcoin
blockchain.

The culmination of this project can be found in `src/stepByStepMerkle.js`. In
this file, I took transactions from a block on the Bitcoin blockchain, in order
to make the output of the chain more deterministic.

The `src/stepByStepMerkle.js` includes a basic implementation of producing
a merkle root based on a number of transactions. It also contains a basic
implementation of building a Merkle proof based upon being given a transaction
to generate a Merkle proof for. Finally, it contains a basic implemenation of
using a Merkle proof for a given transaction for SPV (simple payment verification).

The Merkle tree is based upon the implementation from [this](https://www.youtube.com/watch?v=1pasjSinXDs)
YouTube tutorial.

```
# This will set everything up in Docker
sh docker_run.sh
# Print out various details about the process of producing a Merkle root
# based on a number of transactions, and also produce a Merkle proof and
# verify a particular transaction based on a Merkle proof.
node src/stepByStepMerkle.js
```

