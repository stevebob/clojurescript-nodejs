(ns test.b
     (:require [testlib.lib :as lib]))

(println (if (= (+ (lib/add 1 2) (lib/multiply 3 4)) 15)
             "success"
             "fail"))
