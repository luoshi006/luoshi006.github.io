#!/bin/bash

echo "update service-worker.js with _sw-precache-config.js."
sw-precache --config=_sw-precache-config.js
