#!/bin/bash

git pull origin main
npm run build
cp dist -r /srv/www