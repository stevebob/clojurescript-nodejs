/* Defines a function and then calls it */

var cljs = require('../lib/clojurescript');

var code = [
'(ns test.a)',
'(defn square [x] (* x x))',
'(square 12)'
].join('\n');

if (cljs.eval(code) == 144) {
    console.log("success");
} else {
    console.log("fail");
}
