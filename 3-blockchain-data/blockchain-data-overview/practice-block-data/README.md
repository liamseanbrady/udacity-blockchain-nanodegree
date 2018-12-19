## Grabbing blockchain data for 3 contiguous blocks on the bitcoin blockchain

This project consists of using the `blockexplorer.js` library to to get information
for any 3 contiguous blocks on the bitcoin blockchain.

```
# This will set everything up in Docker
sh docker_run.sh
# Find the block with height N (4 in the example below) and also grab the next two 
continguous blocks (check src/blockexplorer.js for details)
node src/blockexplorer.js 4
```

