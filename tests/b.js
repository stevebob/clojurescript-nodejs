/* Requires a library and calls some functions from it */

var cljs = require('../lib/clojurescript');

var code = [
'(ns test.b',
'     (:require [testlib.lib :as lib]))',
'(+ (lib/add 1 2) (lib/multiply 3 4))'
].join('\n');

if (cljs.eval(code, [__dirname]) == 15) {
    console.log("success");
} else {
    console.log("fail");
}
