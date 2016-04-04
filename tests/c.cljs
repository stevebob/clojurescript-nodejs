(ns test.c
     (:require [clojure.string :as str]))

(println (if (= (str/reverse "Hello, World!") "!dlroW ,olleH")
             "success"
             "fail"))
