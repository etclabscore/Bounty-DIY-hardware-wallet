PLATFORMS=linux/amd64,linux/arm64,linux/ppc64le,linux/arm/v7

source .env

docker buildx build \
  --platform ${PLATFORMS} \
  --build-arg NODE_PATH=./src \
  --build-arg REACT_APP_INFURA_API_KEY=${INFURA_API_KEY} \
  -t vbstreetz/sc-frontend:latest \
  -f frontend/DockerfileRelease \
  --push \
  ./frontend

docker buildx build \
  --platform ${PLATFORMS} \
  -t vbstreetz/sc-daemon:latest \
  --push \
  ./daemon

docker buildx build \
  --platform ${PLATFORMS} \
  -t vbstreetz/sc-nginx:latest \
  --push \
  .
