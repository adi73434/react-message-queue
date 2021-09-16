#!/bin/sh


echo "I couldn't get this working" || pm2 start build/server/src/index.js --node-args="--es-module-specifier-resolution=node"