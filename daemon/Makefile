PWD=$(shell pwd)

test: node_modules
	@node src/test.js

server: node_modules
	@npm run start

node_modules:
	@yarn install
	@post-yarn-install

post-yarn-install:
	@cd $(PWD)/node_modules/\@etclabscore/signatory/ && \
	  npm run build && \
	  cp $(PWD)/node_modules/\@etclabscore/signatory/openrpc.json $(PWD)/node_modules/\@etclabscore/signatory/build/ && \
	  ln -s $(PWD)/node_modules/\@etclabscore/signatory/build/src/cli/index.js $(PWD)/node_modules/.bin/signatory && \
	  chmod +x $(PWD)/node_modules/.bin/signatory

.PHONY: post-yarn-install server test
