#!/bin/bash

git pull origin main
npm i 
npm run build
cp dist -r /srv/www