FROM node:10.18.0

WORKDIR /tmp

ADD package.json package.json
RUN yarn install --unsafe-perm

ADD src src
ADD public public
ADD .env .env
