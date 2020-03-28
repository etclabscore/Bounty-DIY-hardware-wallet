FROM node:10.18.0

WORKDIR /tmp

ADD package.json package.json
RUN yarn install --unsafe-perm --network-timeout 100000

ADD src src
ADD public public
