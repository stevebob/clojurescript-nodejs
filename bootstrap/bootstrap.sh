#!/bin/bash

# Download a jar containing the clojurescript compiler.
# This will be used to bootstrap the javascript compiler
# which can be used from then on to compile clojurescript
# without java.

CLJS_JAR_FILE='cljs.jar'
CLJS_BUILD_FILE='node.clj'
CLJS_JAR_URL='https://github.com/clojure/clojurescript/releases/download/r1.8.40/cljs.jar'
CLJS_JAR_MD5='9257a4df42b94194f60b8d5fd848fe7a'
BOOTSTRAP_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CLJS_JAR_PATH="$BOOTSTRAP_DIR/$CLJS_JAR_FILE"
CLJS_BUILD_PATH="$BOOTSTRAP_DIR/$CLJS_BUILD_FILE"
SOURCE_DIR="$BOOTSTRAP_DIR/../src"
TARGET="$BOOTSTRAP_DIR/../lib/core.js"
OUT_DIR="$BOOTSTRAP_DIR/out"
STDLIB_DIR="$BOOTSTRAP_DIR/../lib/cljs"

# This must correlate to the location of the source file relative to the source directory
CLJS_NAMESPACE="clojurescript.core"

cd $BOOTSTRAP_DIR

# Download the clojurescript jar if necessary

function download_jar {
    wget -O $CLJS_JAR_PATH $CLJS_JAR_URL
}

echo -n "Checking for $CLJS_JAR_PATH ... "

if [ -e "$CLJS_JAR_PATH" ]; then
    if [ "`md5sum $CLJS_JAR_PATH | cut -d' ' -f1`" = "$CLJS_JAR_MD5" ]; then
        echo "exists"
    else
        echo "invalid hash - downloading ..."
        rm $CLJS_JAR_PATH
        download_jar
    fi
else
    echo "doesn't exist - downloading ..."
    download_jar
fi


# Generate a build configuration file

function bootstrap {

    target=$1
    optimizations=$2

cat > $CLJS_BUILD_PATH <<- EOM
(require 'cljs.build.api)
(cljs.build.api/build "$SOURCE_DIR"
  { :main '$CLJS_NAMESPACE
    :output-to "$target"
    :target :nodejs
    :optimizations :$optimizations
   })
EOM

    echo "Generated build configuration file $CLJS_BUILD_PATH"
    cat $CLJS_BUILD_PATH


    # Invoke the clojurescript compiler

    BOOTSTRAP_CMD="java -cp $CLJS_JAR_PATH:$SOURCE_DIR clojure.main $CLJS_BUILD_PATH"
    echo $BOOTSTRAP_CMD
    `$BOOTSTRAP_CMD`
}


# Compile clojurescript compiler

echo -e "\nBootstrapping clojurescript:"
bootstrap $TARGET simple


# Compile again with no optimizations (this generates a directory containing the standard library)

echo -e "\nGenerating standard library:"
rm -rf $OUT_DIR
bootstrap `mktemp` none
rm -rf $STDLIB_DIR
cp -r $OUT_DIR $STDLIB_DIR


# Clean up

rm -rf $OUT_DIR
rm -rf $CLJS_BUILD_PATH
