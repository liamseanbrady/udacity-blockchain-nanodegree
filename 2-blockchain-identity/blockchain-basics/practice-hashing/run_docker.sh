#! /bin/bash

if [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" ||  "$OSTYPE" == "win32" ]]; then
  docker machine start
  eval "$(docker-machine env default)"
fi

# Make sure we can run this regardless of what directory is currently pwd
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
# Set up the volume mapping (i.e., what files/dirs we want to be mapped into the container in real-time)
VOLUME_MAPPING="${DIR}/src:/practice-hashing/src"
# Build the Docker image
echo "Building the Docker image for this project..."
docker build --tag practice-hashing $DIR/.
# Run the container with a shell by default, and make sure it gets removed from Docker when it exits
echo "We'll now try to run the container for this project..."
docker container run --rm --interactive --tty --volume $VOLUME_MAPPING --name practice-hashing practice-hashing sh
