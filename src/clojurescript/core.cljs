(ns clojurescript.core
  (:require [cljs.pprint :refer [pprint]]
            [cljs.js :as cljs]
            [cljs.tools.reader :as r]
            [clojure.string :as str]))

(enable-console-print!)

(def ^:export read r/read)

(def ^:export readString r/read-string)

;;; node js imports
(def node-fs (js/require "fs"))
(def node-path (js/require "path"))

;;; path relative to core.js containing standard library namespace
(def standard-library-path "cljs")

;;; the directory containing this script (core.js)
(def __dirname (js* "__dirname"))

;;; predicate returns true iff the file at "path" is readable
(defn file-readable? [path]
  (try
    (do
      (.accessSync node-fs path (aget node-fs "F_OK"))
      true)
    (catch js/Error err false)))

;;; returns the first element of "coll" satisfying the predicate
;;; "pred?" or nil if no such elements exist
(defn first-satisfying [pred? coll]
  (if-let [[x & xs] (seq coll)]
    (if (pred? x)
        x
        (first-satisfying pred? xs))
    nil))

;;; converts from the extension of a file to the expected file type
;;; (clj or js) for a given extension
(defn require-extension [extension]
  (str/replace
    (case extension
          ".cljs" ".clj"
          ".cljc" ".clj"
          extension)
    #"\." ""))

;;; takes a list of library paths and returns a function suitable
;;; for use as a *load-fn* that searches for imported files in
;;; the library paths and a global standard library path
(defn mk-load-fn [library-paths]
  (fn [name cb]
    (let [
          specified-path (.toLowerCase (name :path))
          specified-dir (.dirname node-path specified-path)
          specified-file (.basename node-path specified-path)
          extensions '(".cljs" ".cljc" ".js")
          absolute-standard-library-path (.join node-path __dirname standard-library-path)
          require-paths (concat [absolute-standard-library-path] library-paths)
          require-paths-with-directory (flatten (map (fn [path] [(.join node-path path specified-dir)
                                                                 (.join node-path path specified-path)])
                                                     require-paths))

          require-candidates (flatten (map
                                        (fn [path] (map #(.join node-path path (str specified-file %)) extensions))
                                        require-paths-with-directory))
          require-file (first-satisfying file-readable? require-candidates)]
      (do
        (cb {
          :lang (keyword (require-extension (.extname node-path require-file)))
          :source (.readFileSync node-fs require-file "utf8")
        })))))

(defn ^:export eval ([in-str library-paths]
  (cljs/eval-str (cljs/empty-state)
                 in-str 'bar
                 {:eval cljs/js-eval
                  :def-emits-var true
                  :load (mk-load-fn library-paths)}
                 (fn [{:keys [error value]}]
                   (if-not error
                     value
                     (do
                       (.error js/console error)))))))

(defn ^:export compile [in-str library-paths]
  (cljs/compile-str (cljs/empty-state)
                    in-str 'bar
                    {:eval cljs/js-eval
                     :def-emits-var true
                     :load (mk-load-fn library-paths)}
                    (fn [{:keys [error value]}]
                      (if-not error
                        value
                        (do
                          (.error js/console error))))))

(set! *main-cli-fn*
      (fn []))
