(ns test.d)

(def path (js/require "path"))

(println (if (= (.extname path "index.html") ".html")
             "success"
             "fail"))
