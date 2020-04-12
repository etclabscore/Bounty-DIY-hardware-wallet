run:
	@cp .env.sample .env | xargs echo
	@docker-compose -f docker-compose-release.yml -p sc-release rm -f -v | xargs echo
	@docker pull vbstreetz/signatory-client:latest
	@docker rmi `docker images | grep "vbstreetz" | grep "<none>" | awk '{print $$3}'` | xargs echo
	@docker-compose -f docker-compose-release.yml -p sc-release up -d

client:
	@yarn start

server:
	@yarn $@

dev:
	@docker-compose -f docker-compose-dev.yml -p sc-dev up --build

.PHONY: push dev server client run
