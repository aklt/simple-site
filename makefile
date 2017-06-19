

all: style.css

%.css: %.scss
	sassc --style expanded --sourcemap $< > $@

.PHONY: dev clean

dev:
	npm run freshen

clean:
	rm -f style.css
