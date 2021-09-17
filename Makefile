.PHONY: dev build_next build_loconotion run_loconotion

dev:
	@yarn dev

build_next:
	@yarn build

build_loconotion:
	@docker-compose build loconotion

run_loconotion:
	@docker-compose run loconotion $(url)
	@node utils/htmlToTsx.js

