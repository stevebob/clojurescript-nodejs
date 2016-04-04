; a test library that uses functions in lib.cljs

(ns testlib.otherlib
     (:require [testlib.lib :as lib]))

(defn square [x] (lib/multiply x x))
(defn dbl [x] (lib/add x x))
