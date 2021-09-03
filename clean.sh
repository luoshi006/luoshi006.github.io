#!/bin/bash
rm ./node_modules -r
rm package-lock.json
npm cache clean --force
echo "clean npm cache... then install"
npm install

