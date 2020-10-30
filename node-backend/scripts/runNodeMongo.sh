#!/bin/bash
cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1
cd ..
mongo_count=$(ps -ax | grep mongo -c)
if [ $mongo_count == 1 ]
then
  echo "Running mongo"
  nohup mongod --dbpath=data &>/dev/null &
  sleep 3
else
  echo "Mongo already running"
fi
node app.js
