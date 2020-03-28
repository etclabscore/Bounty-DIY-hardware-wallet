run:
	@docker-compose -f docker-compose-dev.yml -p sc-dev up --build

release-dev:
	@docker-compose -f docker-compose-release-dev.yml -p sc-release-dev up --build

release:
	@docker-compose -f docker-compose-release.yml -p sc-release up --build

push:
	@docker-compose -f docker-compose-release-dev.yml -p sc-release-dev push

.PHONY: push release release-dev run
