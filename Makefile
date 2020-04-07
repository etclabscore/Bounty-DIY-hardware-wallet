client:
	@yarn start

server:
	@yarn $@

dev:
	@docker-compose -f docker-compose-dev.yml -p sc-dev up --build

build:
	@docker-compose -f docker-compose-build.yml -p sc-build build

run:
	@docker-compose -f docker-compose-release.yml -p sc-release rm -f -s --all
	@docker pull vbstreetz/signatory-client:latest
	@docker rmi $(docker images | grep "vbstreetz" | grep "<none>" | awk "{print $3}")
	@docker-compose -f docker-compose-release.yml -p sc-release up -d

push:
	@docker-compose -f docker-compose-build.yml -p sc-build push

.PHONY: push run build dev server client
