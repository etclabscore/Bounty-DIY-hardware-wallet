run:
	@docker-compose -f docker-compose-dev.yml -p sc-dev up --build

build:
	@docker-compose -f docker-compose-release-build.yml -p sc-release-build up --build

release:
	@docker-compose -f docker-compose-release.yml -p sc-release pull
	@docker-compose -f docker-compose-release.yml -p sc-release up

push:
	@docker-compose -f docker-compose-release-dev.yml -p sc-release-dev build
	@docker-compose -f docker-compose-release-dev.yml -p sc-release-dev push

.PHONY: push release build run
