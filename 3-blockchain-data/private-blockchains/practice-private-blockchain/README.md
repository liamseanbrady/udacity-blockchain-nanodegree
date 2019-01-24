## Testing persisting a blockchain using LevelDB

This project consists of `simpleChain.js`, which allows for the creation of a very
simple blockchain, and `levelSandbox.js`which uses the `level` library to store
blockchain data.  The `levelSandbox` is the main testing ground in this project.
It uses an IIFE, along with `setTimeout` to create a number of blocks. Since LevelDB
sorts lexicographically (meaning '10' comes before '2' in sorting), I'm also using
the bytewise library to do the `keyEncoding`.

```
# This will set everything up in Docker
sh docker_run.sh
# Create a simple blockchain
node src/simpleChain.js
# Create a bunch of data in LevelDB and then print it out
node src/levelSandbox.js
```

