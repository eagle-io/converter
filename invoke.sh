#!/bin/bash
set -e

# aws sam provides a method of invoking a function in a local container that mimics the lambda execution environment
# this script invokes the specified converter, passing the specified file as input in the expected format
# e.g. ./invoke.sh Sample lib/sample/test/input.dat

if [ -z "$1" ]; then
    echo "ERROR: must specify converter"
    exit 1;
fi
converter="$1"

if [ -z "$2" ]; then
    echo "ERROR: must specify input file"
    exit 1;
fi
input="$2"

echo {\"payload\":\"`base64 -i $input`\"} > event.json
sam local invoke $converter --event event.json
