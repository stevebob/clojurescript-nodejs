#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
RUNCLJS="$DIR/../bin/runcljs"

cd $DIR

for testfile in *.js; do
    echo -n "Running $testfile..."
    result=`node $testfile`
    if [ "$result" = "success" ]; then
        echo -e "\e[32m$result\e[39m"
    else
        echo -e "\e[31m$result\e[39m"
    fi
done

for testfile in *.cljs; do
     echo -n "Running $testfile..."
    result=`$RUNCLJS $testfile`
    if [ "$result" = "success" ]; then
        echo -e "\e[32m$result\e[39m"
    else
        echo -e "\e[31m$result\e[39m"
    fi
done
