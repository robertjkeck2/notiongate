#!/bin/bash -e

python loconotion --chromedriver /chromedriver/chromedriver --timeout 20 $1

# Loconotion's static output location in the Docker image
LOCONOTION_DIR='/app/loconotion/dist'
OUTPUT_DIR=$LOCONOTION_DIR/$(ls -t1 $LOCONOTION_DIR | head -n 1)
echo "Deploying $OUTPUT_DIR to Netlify..."

# This need $NETLIFY_AUTH_TOKEN and $NETLIFY_SITE_ID to be set
netlify deploy --dir=$OUTPUT_DIR --prod
