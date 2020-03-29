PLATFORMS=linux/arm/v7,linux/arm64/v8,linux/ppc64le,linux/s390x

source .env

docker buildx build \
  --platform ${PLATFORMS} \
  --build-arg REACT_APP_INFURA_API_KEY=${INFURA_API_KEY} \
  -t vbstreetz/signatory-client:latest \
  -f DockerfileRelease \
  --push \
  .
