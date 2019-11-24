#!/bin/bash

convert () {
	for f in `pwd`/*; do
		echo "examining $f for .js extension"
		if [[ $f == *.js ]]; then
  			echo "changing extension"
			mv "$f" "${f%.js}.ts"
		fi
	done
}

export function convert
