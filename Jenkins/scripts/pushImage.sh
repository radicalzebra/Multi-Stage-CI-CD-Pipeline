#!/bin/bash

set -e #ensures the script exits immediately on non-zero return codes.


# Trivy scan built image
docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /var/jenkins_home/trivy-cache:/root/.cache/ \
  aquasec/trivy:latest image \
  --severity HIGH,CRITICAL \
  --exit-code 1 \
  "$DOCKER_USER/bankist:latest"




#Full Trivy report (JSON, saved for logs)
mkdir -p trivy-reports
docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /var/jenkins_home/trivy-cache:/root/.cache/ \
  aquasec/trivy:latest image \
  --format json \
  --output trivy-reports/full-scan.json \
  "$DOCKER_USER/bankist:latest"




#If scan is successfull then push to docker hub
docker push "$DOCKER_USER/bankist:$BUILD_NUMBER"
docker push "$DOCKER_USER/bankist:latest"