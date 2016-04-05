// Compiled by ClojureScript 1.8.41 {:target :nodejs}
goog.provide('clojurescript.core');
goog.require('cljs.core');
goog.require('cljs.pprint');
goog.require('cljs.js');
goog.require('cljs.tools.reader');
goog.require('clojure.string');
cljs.core.enable_console_print_BANG_.call(null);
clojurescript.core.read = cljs.tools.reader.read;
goog.exportSymbol('clojurescript.core.read', clojurescript.core.read);
clojurescript.core.readString = cljs.tools.reader.read_string;
goog.exportSymbol('clojurescript.core.readString', clojurescript.core.readString);
clojurescript.core.node_fs = require("fs");
clojurescript.core.node_path = require("path");
clojurescript.core.standard_library_path = "cljs";
clojurescript.core.__dirname = __dirname;
clojurescript.core.file_readable_QMARK_ = (function clojurescript$core$file_readable_QMARK_(path){
try{clojurescript.core.node_fs.accessSync(path,(clojurescript.core.node_fs["F_OK"]));

return true;
}catch (e4315){if((e4315 instanceof Error)){
var err = e4315;
return false;
} else {
throw e4315;

}
}});
clojurescript.core.first_satisfying = (function clojurescript$core$first_satisfying(pred_QMARK_,coll){
var temp__4655__auto__ = cljs.core.seq.call(null,coll);
if(temp__4655__auto__){
var vec__4317 = temp__4655__auto__;
var x = cljs.core.nth.call(null,vec__4317,(0),null);
var xs = cljs.core.nthnext.call(null,vec__4317,(1));
if(cljs.core.truth_(pred_QMARK_.call(null,x))){
return x;
} else {
return clojurescript$core$first_satisfying.call(null,pred_QMARK_,xs);
}
} else {
return null;
}
});
clojurescript.core.require_extension = (function clojurescript$core$require_extension(extension){
return clojure.string.replace.call(null,(function (){var G__4319 = extension;
switch (G__4319) {
case ".cljs":
return ".clj";

break;
case ".cljc":
return ".clj";

break;
default:
return extension;

}
})(),/\./,"");
});
clojurescript.core.mk_load_fn = (function clojurescript$core$mk_load_fn(library_paths){
return (function (name,cb){
var specified_path = name.call(null,new cljs.core.Keyword(null,"path","path",-188191168)).toLowerCase();
var specified_dir = clojurescript.core.node_path.dirname(specified_path);
var specified_file = clojurescript.core.node_path.basename(specified_path);
var extensions = cljs.core.list(".cljs",".cljc",".js");
var absolute_standard_library_path = clojurescript.core.node_path.join(clojurescript.core.__dirname,clojurescript.core.standard_library_path);
var require_paths = cljs.core.concat.call(null,library_paths,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [absolute_standard_library_path], null));
var require_paths_with_directory = cljs.core.flatten.call(null,cljs.core.map.call(null,((function (specified_path,specified_dir,specified_file,extensions,absolute_standard_library_path,require_paths){
return (function (path){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clojurescript.core.node_path.join(path,specified_dir),clojurescript.core.node_path.join(path,specified_path)], null);
});})(specified_path,specified_dir,specified_file,extensions,absolute_standard_library_path,require_paths))
,require_paths));
var require_candidates = cljs.core.flatten.call(null,cljs.core.map.call(null,((function (specified_path,specified_dir,specified_file,extensions,absolute_standard_library_path,require_paths,require_paths_with_directory){
return (function (path){
return cljs.core.map.call(null,((function (specified_path,specified_dir,specified_file,extensions,absolute_standard_library_path,require_paths,require_paths_with_directory){
return (function (p1__4321_SHARP_){
return clojurescript.core.node_path.join(path,[cljs.core.str(specified_file),cljs.core.str(p1__4321_SHARP_)].join(''));
});})(specified_path,specified_dir,specified_file,extensions,absolute_standard_library_path,require_paths,require_paths_with_directory))
,extensions);
});})(specified_path,specified_dir,specified_file,extensions,absolute_standard_library_path,require_paths,require_paths_with_directory))
,require_paths_with_directory));
var require_file = clojurescript.core.first_satisfying.call(null,clojurescript.core.file_readable_QMARK_,require_candidates);
return cb.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lang","lang",-1819677104),cljs.core.keyword.call(null,clojurescript.core.require_extension.call(null,clojurescript.core.node_path.extname(require_file))),new cljs.core.Keyword(null,"source","source",-433931539),clojurescript.core.node_fs.readFileSync(require_file,"utf8")], null));
});
});
clojurescript.core.eval = (function clojurescript$core$eval(var_args){
var args4322 = [];
var len__3480__auto___4328 = arguments.length;
var i__3481__auto___4329 = (0);
while(true){
if((i__3481__auto___4329 < len__3480__auto___4328)){
args4322.push((arguments[i__3481__auto___4329]));

var G__4330 = (i__3481__auto___4329 + (1));
i__3481__auto___4329 = G__4330;
continue;
} else {
}
break;
}

var G__4324 = args4322.length;
switch (G__4324) {
case 1:
return clojurescript.core.eval.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojurescript.core.eval.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return clojurescript.core.eval.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojurescript.core.eval.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args4322.length)].join('')));

}
});
goog.exportSymbol('clojurescript.core.eval', clojurescript.core.eval);

clojurescript.core.eval.cljs$core$IFn$_invoke$arity$1 = (function (in_str){
return clojurescript.core.eval.call(null,in_str,cljs.core.PersistentVector.EMPTY);
});

clojurescript.core.eval.cljs$core$IFn$_invoke$arity$2 = (function (in_str,library_paths){
return clojurescript.core.eval.call(null,in_str,library_paths,false);
});

clojurescript.core.eval.cljs$core$IFn$_invoke$arity$3 = (function (in_str,library_paths,expr){
return clojurescript.core.eval.call(null,in_str,library_paths,expr,null);
});

clojurescript.core.eval.cljs$core$IFn$_invoke$arity$4 = (function (in_str,library_paths,expr,sourcename){
return cljs.js.eval_str.call(null,cljs.js.empty_state.call(null),in_str,sourcename,(function (){var options = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"eval","eval",-1103567905),cljs.js.js_eval,new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320),true,new cljs.core.Keyword(null,"load","load",-1318641184),clojurescript.core.mk_load_fn.call(null,library_paths)], null);
if(cljs.core.truth_(expr)){
return cljs.core.assoc.call(null,options,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291));
} else {
return options;
}
})(),(function (p__4325){
var map__4326 = p__4325;
var map__4326__$1 = ((((!((map__4326 == null)))?((((map__4326.cljs$lang$protocol_mask$partition0$ & (64))) || (map__4326.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__4326):map__4326);
var error = cljs.core.get.call(null,map__4326__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var value = cljs.core.get.call(null,map__4326__$1,new cljs.core.Keyword(null,"value","value",305978217));
if(cljs.core.not.call(null,error)){
return value;
} else {
return console.error(error);
}
}));
});

clojurescript.core.eval.cljs$lang$maxFixedArity = 4;
clojurescript.core.compile = (function clojurescript$core$compile(var_args){
var args4332 = [];
var len__3480__auto___4338 = arguments.length;
var i__3481__auto___4339 = (0);
while(true){
if((i__3481__auto___4339 < len__3480__auto___4338)){
args4332.push((arguments[i__3481__auto___4339]));

var G__4340 = (i__3481__auto___4339 + (1));
i__3481__auto___4339 = G__4340;
continue;
} else {
}
break;
}

var G__4334 = args4332.length;
switch (G__4334) {
case 1:
return clojurescript.core.compile.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojurescript.core.compile.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return clojurescript.core.compile.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojurescript.core.compile.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args4332.length)].join('')));

}
});
goog.exportSymbol('clojurescript.core.compile', clojurescript.core.compile);

clojurescript.core.compile.cljs$core$IFn$_invoke$arity$1 = (function (in_str){
return clojurescript.core.compile.call(null,in_str,cljs.core.PersistentVector.EMPTY);
});

clojurescript.core.compile.cljs$core$IFn$_invoke$arity$2 = (function (in_str,library_paths){
return clojurescript.core.compile.call(null,in_str,library_paths,false);
});

clojurescript.core.compile.cljs$core$IFn$_invoke$arity$3 = (function (in_str,library_paths,expr){
return clojurescript.core.compile.call(null,in_str,library_paths,expr,null);
});

clojurescript.core.compile.cljs$core$IFn$_invoke$arity$4 = (function (in_str,library_paths,expr,sourcename){
return cljs.js.compile_str.call(null,cljs.js.empty_state.call(null),in_str,sourcename,(function (){var options = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"eval","eval",-1103567905),cljs.js.js_eval,new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320),true,new cljs.core.Keyword(null,"load","load",-1318641184),clojurescript.core.mk_load_fn.call(null,library_paths)], null);
if(cljs.core.truth_(expr)){
return cljs.core.assoc.call(null,options,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291));
} else {
return options;
}
})(),(function (p__4335){
var map__4336 = p__4335;
var map__4336__$1 = ((((!((map__4336 == null)))?((((map__4336.cljs$lang$protocol_mask$partition0$ & (64))) || (map__4336.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__4336):map__4336);
var error = cljs.core.get.call(null,map__4336__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var value = cljs.core.get.call(null,map__4336__$1,new cljs.core.Keyword(null,"value","value",305978217));
if(cljs.core.not.call(null,error)){
return value;
} else {
return console.error(error);
}
}));
});

clojurescript.core.compile.cljs$lang$maxFixedArity = 4;
clojurescript.core.evalfile = (function clojurescript$core$evalfile(var_args){
var args4342 = [];
var len__3480__auto___4345 = arguments.length;
var i__3481__auto___4346 = (0);
while(true){
if((i__3481__auto___4346 < len__3480__auto___4345)){
args4342.push((arguments[i__3481__auto___4346]));

var G__4347 = (i__3481__auto___4346 + (1));
i__3481__auto___4346 = G__4347;
continue;
} else {
}
break;
}

var G__4344 = args4342.length;
switch (G__4344) {
case 1:
return clojurescript.core.evalfile.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojurescript.core.evalfile.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return clojurescript.core.evalfile.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args4342.length)].join('')));

}
});
goog.exportSymbol('clojurescript.core.evalfile', clojurescript.core.evalfile);

clojurescript.core.evalfile.cljs$core$IFn$_invoke$arity$1 = (function (filename){
return clojurescript.core.evalfile.call(null,filename,cljs.core.PersistentVector.EMPTY,false);
});

clojurescript.core.evalfile.cljs$core$IFn$_invoke$arity$2 = (function (filename,library_paths){
return clojurescript.core.evalfile.call(null,filename,library_paths,false);
});

clojurescript.core.evalfile.cljs$core$IFn$_invoke$arity$3 = (function (filename,library_paths,expr){
return clojurescript.core.eval.call(null,clojurescript.core.node_fs.readFileSync(filename,"utf8"),library_paths,expr,filename);
});

clojurescript.core.evalfile.cljs$lang$maxFixedArity = 3;
clojurescript.core.compilefile = (function clojurescript$core$compilefile(var_args){
var args4349 = [];
var len__3480__auto___4352 = arguments.length;
var i__3481__auto___4353 = (0);
while(true){
if((i__3481__auto___4353 < len__3480__auto___4352)){
args4349.push((arguments[i__3481__auto___4353]));

var G__4354 = (i__3481__auto___4353 + (1));
i__3481__auto___4353 = G__4354;
continue;
} else {
}
break;
}

var G__4351 = args4349.length;
switch (G__4351) {
case 1:
return clojurescript.core.compilefile.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojurescript.core.compilefile.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return clojurescript.core.compilefile.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args4349.length)].join('')));

}
});
goog.exportSymbol('clojurescript.core.compilefile', clojurescript.core.compilefile);

clojurescript.core.compilefile.cljs$core$IFn$_invoke$arity$1 = (function (filename){
return clojurescript.core.compilefile.call(null,filename,cljs.core.PersistentVector.EMPTY,false);
});

clojurescript.core.compilefile.cljs$core$IFn$_invoke$arity$2 = (function (filename,library_paths){
return clojurescript.core.compilefile.call(null,filename,library_paths,false);
});

clojurescript.core.compilefile.cljs$core$IFn$_invoke$arity$3 = (function (filename,library_paths,expr){
return clojurescript.core.compile.call(null,clojurescript.core.node_fs.readFileSync(filename,"utf8"),library_paths,expr,filename);
});

clojurescript.core.compilefile.cljs$lang$maxFixedArity = 3;
cljs.core._STAR_main_cli_fn_STAR_ = (function (){
return null;
});

//# sourceMappingURL=core.js.map