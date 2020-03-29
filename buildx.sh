PLATFORMS=linux/amd64,linux/arm64,linux/ppc64le,linux/arm/v7

source .env

docker buildx build \
  --platform ${PLATFORMS} \
  --build-arg NODE_PATH=./src \
  --build-arg REACT_APP_INFURA_API_KEY=${INFURA_API_KEY} \
  -t vbstreetz/signatory-client:latest \
  -f DockerfileRelease \
  --push \
  .
