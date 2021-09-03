#!/bin/bash
rm ./node_modules -r
rm package-lock.json
npm cache clean --force
echo "== clean npm cache && install node modules =="
npm install

