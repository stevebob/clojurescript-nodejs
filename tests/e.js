/* Requires a library and calls some functions from it */

var cljs = require('../lib/clojurescript');

var code = [
'(ns test.e',
'     (:require [testlib.otherlib :as otherlib]))',
'(+ (otherlib/square 12) (otherlib/dbl 3))'
].join('\n');

if (cljs.eval(code, [__dirname]) == 150) {
    console.log("success");
} else {
    console.log("fail");
}
