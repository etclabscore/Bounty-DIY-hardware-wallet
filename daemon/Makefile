test: node_modules
	@node src/test.js

server: node_modules
	@./node_modules/.bin/signatory -d ./data

node_modules:
	@npm i

.PHONY: server test
