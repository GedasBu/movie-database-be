.PHONY: build-BravoMoviesApiFunction

build-BravoMoviesApiFunction:
	rm -rf dist
	npm install
	cp -r ./node_modules "$(ARTIFACTS_DIR)/"
	npm run test
	cp -r ./dist/src/* "$(ARTIFACTS_DIR)/"
