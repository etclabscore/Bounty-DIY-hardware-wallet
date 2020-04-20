now=$(shell date)

develop:
	@npm run $@

build:
	@gatsby clean && gatsby build --prefix-paths

push:
	@cd tmp/gh && \
		find . -not -path '*.git*' -delete && \
		cp -r ../../public/* . && \
		git rm -rf --cached . > /dev/null && \
		git add --all && \
		git commit -m "$(now)" && \
		git push

.PHONY: push build develop
