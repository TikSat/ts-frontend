#!/bin/bash

trap "echo Exited!; exit;" SIGINT SIGTERM
trap "exit" TERM INT QUIT
trap "exit" EXIT

stringContain() { [ -z "${2##*$1*}" ]; }

# If cli, run and exit
if stringContain "bash" $@; then
  exec $@
  exit
fi

set -e

# echo 'Preparing Backend'
# command

# Run original command
echo 'Starting application'
exec $@
