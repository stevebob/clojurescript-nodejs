(ns test.e
     (:require [testlib.otherlib :as otherlib]))

(+ (otherlib/square 12) (otherlib/dbl 3))

(println (if (= (+ (otherlib/square 12) (otherlib/dbl 3)) 150)
             "success"
             "fail"))
