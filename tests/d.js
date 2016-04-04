/* Use a nodejs library */

var cljs = require('../lib/clojurescript');

var code = [
'(ns test.d)',
'(def path (js/require "path"))',
'(.extname path "index.html")'
].join('\n');

if (cljs.eval(code, [__dirname]) == ".html") {
    console.log("success");
} else {
    console.log("fail");
}
