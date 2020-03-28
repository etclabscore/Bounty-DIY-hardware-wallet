FROM node:10.18.0

WORKDIR /tmp

ADD package.json .
RUN yarn install --prod --network-timeout 100000
# && \
#  cd /tmp/node_modules/\@etclabscore/signatory/ && \
#  npm run build && \
#  cp /tmp/node_modules/\@etclabscore/signatory/openrpc.json /tmp/node_modules/\@etclabscore/signatory/build/ && \
#  ln -s /tmp/node_modules/\@etclabscore/signatory/build/src/cli/index.js /tmp/node_modules/.bin/signatory && \
#  chmod +x /tmp/node_modules/.bin/signatory
