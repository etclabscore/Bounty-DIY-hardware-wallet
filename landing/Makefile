now=$(shell date)

develop:
	@npm run $@

build:
	@gatsby clean && gatsby build --prefix-paths

push:
	@rm -rf tmp/gh
	@cp -r public tmp/gh
	@cp -r ../../signatory-client-gh/.git tmp/gh/.git
	@rm -rf ../../signatory-client-gh
	@mv tmp/gh ../../signatory-client-gh/
	@cd ../../signatory-client-gh/ && git rm -rf --cached . > /dev/null && git add --all && git commit -m "$(now)" && git push

.PHONY: push build develop
