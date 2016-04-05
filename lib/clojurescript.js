var core = require("./core").clojurescript.core;

/* Calling the module as a function will be an
 * alias for evalfile. */
function clojurescript(filename, libraryPaths, isExpression) {
    return core.evalfile(filename, libraryPaths, isExpression);
}

clojurescript.eval = core.eval;
clojurescript.compile = core.compile;
clojurescript.evalfile = core.evalfile;
clojurescript.compilefile = core.compilefile;

module.exports = clojurescript;
