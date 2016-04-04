goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__5533__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__5533 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__5534__i = 0, G__5534__a = new Array(arguments.length -  0);
while (G__5534__i < G__5534__a.length) {G__5534__a[G__5534__i] = arguments[G__5534__i + 0]; ++G__5534__i;}
  args = new cljs.core.IndexedSeq(G__5534__a,0);
} 
return G__5533__delegate.call(this,args);};
G__5533.cljs$lang$maxFixedArity = 0;
G__5533.cljs$lang$applyTo = (function (arglist__5535){
var args = cljs.core.seq(arglist__5535);
return G__5533__delegate(args);
});
G__5533.cljs$core$IFn$_invoke$arity$variadic = G__5533__delegate;
return G__5533;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__5536__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__5536 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__5537__i = 0, G__5537__a = new Array(arguments.length -  0);
while (G__5537__i < G__5537__a.length) {G__5537__a[G__5537__i] = arguments[G__5537__i + 0]; ++G__5537__i;}
  args = new cljs.core.IndexedSeq(G__5537__a,0);
} 
return G__5536__delegate.call(this,args);};
G__5536.cljs$lang$maxFixedArity = 0;
G__5536.cljs$lang$applyTo = (function (arglist__5538){
var args = cljs.core.seq(arglist__5538);
return G__5536__delegate(args);
});
G__5536.cljs$core$IFn$_invoke$arity$variadic = G__5536__delegate;
return G__5536;
})()
;

return null;
});
