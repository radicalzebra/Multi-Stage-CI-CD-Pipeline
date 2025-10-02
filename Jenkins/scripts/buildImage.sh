#!/bin/bash

set -e  #ensures the script exits immediately on non-zero return codes.

echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

docker build -t "$DOCKER_USER/bankist:$BUILD_NUMBER" .
docker build -t "$DOCKER_USER/bankist:latest" .




