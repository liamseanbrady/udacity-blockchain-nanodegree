## Practice Hashing

This is a very simple project which consists of practicing
using the `SHA256` module from the `crypto-js` npm package.

You can generate a hash using my `generateHash` function, by
doing the following in the terminal

```
# This will set everything up in Docker
sh docker_run.sh
# Run the Node repl from inside the container
node
# Grabe the hashGenerator function which is exported from
hashing.js
const hashGenerator = require('./src/hashing')
# You can now hash something...
generateHash('something to hash')
# Output here will be a SHA256 hash of 'something to hash'
```

