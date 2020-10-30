#!/bin/bash
pid=$(ps -ax | grep mongo | awk '{print $1}'| head -n 1)
kill $pid