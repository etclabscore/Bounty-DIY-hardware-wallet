FROM node:10.16.0

WORKDIR /tmp

RUN npm install -g yarn
ADD package.json package.json
RUN npm install --unsafe-perm

ADD src src
ADD public public
ADD .env .env
