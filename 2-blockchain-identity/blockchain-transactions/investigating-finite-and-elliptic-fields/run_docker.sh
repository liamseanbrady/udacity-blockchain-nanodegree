#! /bin/bash

# From personal experience, Windows needs some extra help getting Docker started
if [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" ||  "$OSTYPE" == "win32" ]]; then
  docker machine start
  eval "$(docker-machine env default)"
fi

# Make sure we can run this regardless of what directory is currently pwd
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
# Set up the volume mapping (i.e., what files/dirs we want to be mapped into the container in real-time)
VOLUME_MAPPING="${DIR}/src:/investigating-finite-and-elliptic-fields/src"
# Build the Docker image
echo "Building the Docker image for this project..."
docker build --tag investigating-finite-and-elliptic-fields $DIR/.
# Run the container with a shell by default, and make sure it gets removed from Docker when it exits
echo "We'll now try to run the container for this project..."
docker container run --rm --interactive --tty --volume $VOLUME_MAPPING --name investigating-finite-and-elliptic-fields investigating-finite-and-elliptic-fields sh
