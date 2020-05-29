#!/usr/bin/env bash

set -euxo pipefail

cd backend
npm install --prune
PORT=3000 bin/www &
trap "kill %1" EXIT
cd ..

cd front
yarn
PORT=3001 yarn start
