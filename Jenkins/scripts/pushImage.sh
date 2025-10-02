#!/bin/bash

set -e #ensures the script exits immediately on non-zero return codes.


# Left trivy due to issue with windows annd temporary filesystem size issue
# docker run --rm \
#   -v /var/run/docker.sock:/var/run/docker.sock \
#   -v /var/jenkins_home/trivy-cache:/root/.cache/ \
#   -v /var/jenkins_home/tmp:/tmp \
#   aquasec/trivy:latest image \
#   --severity HIGH,CRITICAL \
#   --exit-code 1 \
#   "$DOCKER_USER/bankist:latest"


#If scan is successfull then push to docker hub
docker push "$DOCKER_USER/bankist:$BUILD_NUMBER"
docker push "$DOCKER_USER/bankist:latest"