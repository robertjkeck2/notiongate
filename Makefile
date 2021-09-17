.PHONY: build_loconotion run_loconotion

dev:
	@yarn dev

build_loconotion:
	@docker-compose build loconotion

run_loconotion:
	@docker-compose run loconotion $(url)
	@node utils/htmlToTsx.js

