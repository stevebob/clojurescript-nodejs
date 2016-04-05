ClojureScript bootstrapped into JavaScript
==========================================

Making the ClojureScript language usable from nodejs

Command Line Tool Example
-------------------------
```bash
$ echo '(ns cljs.user (:require [clojure.string :as str])) (println (str/reverse "hello"))' > a.cljs
$ runcljs a.cljs
olleh
```

JavaScript API Example
----------------------

```javascript
var cljs = require('clojurescript-nodejs');

var code = [
    '(ns cljs.user',
    '     (:require [clojure.string :as str]))',
    '(println (str/reverse "hello"))'
].join('\n');

/* Evaluate ClojureScript programs */
cljs.eval(code); // prints olleh

/* Compile ClojureSCript programs
 * prints:
 * goog.provide('cljs.user');
 * goog.require('cljs.core');
 * goog.require('clojure.string');
 * cljs.core.println.call(null,clojure.string.reverse.call(null,"hello"));
 */
process.stdout.write(cljs.compile(code));
```

REPL
----
This has somewhat limited functionality.
You can evaluate expressions and define functions and variables, but you
can't require additional namespaces.

```clojure
$ cljsrepl
> (defn square [x] (* x x))
#'global.user/square
> (square 12)
144
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
* a REPL
* the source files used to generate a thin wrapper around the compiler and
  supply it with a means of resolving required files
* a script for bootstrapping the compiler from the java-based ClojureScript
  compiler and generating a fresh standard library
* unit tests

All the functionality except for bootstrapping can be used without java
installed.


API
---
```javascript
eval(code, libraryPaths=[], isExpression=false, filename=null)
```
Evaluates ClojureScript from a string.
Returns the value of the last expression.

`code` the string to evaluate

`libraryPaths` an array of library paths can optionally be provided.
These should be paths to directories containing ClojureScript
files that will be searched when require statements are
encountered. For more information, see
[Require Name Resolution](#require-name-resolution).

`isExpression` a boolean determining whether to treat the string as
an expression or an entire program

`filename` filename displayed in error messages

```javascript
compile(code, libraryPaths=[], isExpression=false, filename=null)
```
Compiles a ClojureScript program into JavaScript, returning the result as a string.

Arguments have the same meaning as those of `eval`.

```javascript
evalfile(path, libraryPaths=[], isExpression=false)
```
Evaluates a ClojureScript program in a file.
Returns the value of the last expression.

`path` path to the file to be evaluated

All other arguments are the same as those of `eval`.

```javascript
compilefile(path, libraryPaths=[], isExpression=false)
```
Compiles a ClojureScript program from a file into JavaScript, returning the result as a string.

Arguments have the same meaning as those of `evalfile`.

Require Name Resolution
-----------------------

Programs evaluated or compiled with this tool may import code from other files.

```clojure
(ns hello.world
  (:require [clojure.string]
            [foo.bar.baz]))

(println (clojure.string/reverse "Hello, World!"))
(foo.bar.baz/my-fn 1 2 3)
```

The above ClojureScript program requires code from 2 external files.

- `clojure.string` is part of the ClojureScript standard library
- `foo.bar.baz` is a user-provided file containing (at least) a function called "my-fn"

`clojure.string` and `foo.bar.baz` are namespaces.
This tool implements a policy for converting namespaces like these into paths to files
which are loaded by the runtime. This policy is based on observing the directory structure
of the standard library and the namespaces used within it. `:require` statements get compiled
into calls to `goog.require` from
[Google's Closure Library](https://developers.google.com/closure/library/).
Short on documentation on exactly how namespaces are resolved into file paths, I resorted
to reverse engineering. This may be incorrect according to some spec. If someone knows about
such a spec, please contact me and I'll fix this tool!

### The Policy

This will explain how namespaces are convert to the path to a ClojureScript,
Clojure, or JavaScirpt file.

- Start with a namespace (such as `foo.bar.baz`). It must contain at least 2
  parts (this is a requirement of the clo*S*ure library).
- Replace periods with path files separators (e.g. "/") and convert to lowercase. `foo/bar/baz`
- Search the library paths for the files `foo/bar/baz.EXT` and
  `foo/bar/baz/baz.EXT` where `EXT` is one of `.cljs`, `.cljc` or `.js`. The
  spec does specify that the extensions should be searched for in this order.
  Thus, the list of paths to search for is 
  `foo/bar/baz.cljs`, `foo/bar/baz/baz.cljs`,
  `foo/bar/baz.cljc`, `foo/bar/baz/baz.cljc`,
  `foo/bar/baz.js`, `foo/bar/baz/baz.js`.
- The process searches for these files relative to a number of library paths.
  Library paths are supplied as arguments to the compilation/evaluation
  functions. The `runcljs` tool uses the directory of the file being evaluated
  as a library path. Additional library paths can be supplied to `runcljs` with
  the `-p` argument. The last library path to be searched is the standard
  library. This tool has the location of the standard library baked into it.
  It expects a directory called `cljs` in the same directory as the `core.js`
  file. These are located inside the `lib` directory in this repo. `cljs`
  contains the standard library and is searched last to allow other libraries to
  override the standard library's namespaces.

For some examples of files including external files, consult the test directory or
the standard library.


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
