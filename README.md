ClojureScript bootstrapped into JavaScript
==========================================

Making the ClojureScript language usable from nodejs

Command Line Tool
-----------------
```bash
$ echo '(ns hello.world (:require [clojure.string :as str])) (println (str/reverse "Hello, World"))' > a.cljs
$ bin/runcljs a.cljs
dlroW ,olleH
```

JavaScript API
--------------

```javascript
cljs = require('clojurescript-nodejs');

var code = [
    '(ns hello.world',
    '     (:require [clojure.string :as str]))',
    '(str/reverse "Hello, World!")'
].join('\n');

var result = cljs.eval(code);

console.log(result); // prints ""!dlroW ,olleH"
```

The Problem
-----------

I want to write a program in ClojureScript.

I want to break it up into multiple files, and include functions from the
standard library.


I don't want to install java.

I don't want to bootstrap my own compiler.


I just want to write some ClojureScript. Is that too much to ask?


The Solution
------------

This is the [ClojureScript](https://github.com/clojure/clojurescript) compiler
bootstrapped into JavaScript. It can be used to compile non-trivial programs
that require functions defined in external files including the standard library.

This package includes:

* a bootstrapped compiler (ie. a JavaScript library that can
  compile/evaluate ClojureScript programs)
* the ClojureScript standard library
* a script (runcljs) for running cljs files
* the source files used to generate a thin wrapper around the compiler and
  supply it with a means of resolving required files
* a script for bootstrapping the compiler from the java-based ClojureScript
  compiler and generating a fresh standard library
* unit tests

All the functionality except for bootstrapping can be used without java
installed.

Bootstrapping
-------------

The script bootstrap/bootstrap.sh is used for generating a javascript file
containing the clojure compiler (lib/core.js), and the directory structure
containing the standard library (lib/cljs). When run (with no arguments), it:

* downloads a .jar containing the java-based ClojureScript compiler
* generates a build config file
* compiles the file at src/clojurescript/core.cljs to javascript, bundled with
  libraries it includes, storing the result in lib/core.js
* compiles src/clojurescript/core.cljs a second time, configured to spit out the
  stand library as separate files. The standard library is then copied to
  lib/cljs.

This is the only part of this tool that requires java be installed. Running this
script is only necessary after changing src/clojurescript/core.cljs.

Todo
----

Get the generated compiler into such a state that it can recompile
src/clojurescript/core.cljs without needing java at all.
