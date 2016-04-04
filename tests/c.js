/* Requires and uses a standard library function */

var cljs = require('../lib/clojurescript');

var code = [
'(ns test.c',
'     (:require [clojure.string :as str]))',
'(str/reverse "Hello, World!")'
].join('\n');

if (cljs.eval(code, [__dirname]) == "!dlroW ,olleH") {
    console.log("success");
} else {
    console.log("fail");
}
