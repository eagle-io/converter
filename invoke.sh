#!/bin/bash
set -e

# aws sam provides a method of invoking a function in a local container that mimics the lambda execution environment
# this script invokes the specified converter, passing the specified file as input in the expected format
# e.g. ./invoke.sh Sample lib/sample/test/input.dat

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 converter file"
  echo "converters: `sam local invoke 2>&1 | grep -o '\[.*]'`"
  exit 1;
fi

converter="$1"
input="$2"

# gzip + base64 encode input
jq -n -f request.jq --arg payload `cat $input |gzip -c |base64` > request.json

# invoke converter with pre-baked request
sam local invoke $converter --event request.json > response.json

# base64 decode + gunzip output
jq -r .payload response.json |base64 --decode |gzip -dc |jq
