run: node_modules
	@concurrently "BROWSER=none npm run start" "wait-on http://localhost:5557 && electron bin/electron.js"

node_modules:
	@npm i

.PHONY: run
