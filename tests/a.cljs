(ns test.a)

(defn square [x] (* x x))
(println (if (= (square 12) 144)
             "success"
             "fail"))
