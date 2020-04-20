docker buildx build \
  --platform linux/amd64,linux/arm/v7,linux/arm64 \
  --tag $1 \
  --file ./DockerfileRelease \
  --cache-to=type=local,dest=~/docker-cache \
  --push \
  ./
