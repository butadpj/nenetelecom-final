/*! For license information please see npm.react-is.js.LICENSE.txt */
(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[220],{9921:(e,t)=>{"use strict";var r="function"==typeof Symbol&&Symbol.for,o=r?Symbol.for("react.element"):60103,n=r?Symbol.for("react.portal"):60106,c=r?Symbol.for("react.fragment"):60107,f=r?Symbol.for("react.strict_mode"):60108,s=r?Symbol.for("react.profiler"):60114,u=r?Symbol.for("react.provider"):60109,a=r?Symbol.for("react.context"):60110,i=r?Symbol.for("react.async_mode"):60111,y=r?Symbol.for("react.concurrent_mode"):60111,l=r?Symbol.for("react.forward_ref"):60112,m=r?Symbol.for("react.suspense"):60113,p=r?Symbol.for("react.suspense_list"):60120,b=r?Symbol.for("react.memo"):60115,S=r?Symbol.for("react.lazy"):60116,$=r?Symbol.for("react.block"):60121,d=r?Symbol.for("react.fundamental"):60117,C=r?Symbol.for("react.responder"):60118,w=r?Symbol.for("react.scope"):60119;function M(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case o:switch(e=e.type){case i:case y:case c:case s:case f:case m:return e;default:switch(e=e&&e.$$typeof){case a:case l:case S:case b:case u:return e;default:return t}}case n:return t}}}function h(e){return M(e)===y}t.AsyncMode=i,t.ConcurrentMode=y,t.ContextConsumer=a,t.ContextProvider=u,t.Element=o,t.ForwardRef=l,t.Fragment=c,t.Lazy=S,t.Memo=b,t.Portal=n,t.Profiler=s,t.StrictMode=f,t.Suspense=m,t.isAsyncMode=function(e){return h(e)||M(e)===i},t.isConcurrentMode=h,t.isContextConsumer=function(e){return M(e)===a},t.isContextProvider=function(e){return M(e)===u},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===o},t.isForwardRef=function(e){return M(e)===l},t.isFragment=function(e){return M(e)===c},t.isLazy=function(e){return M(e)===S},t.isMemo=function(e){return M(e)===b},t.isPortal=function(e){return M(e)===n},t.isProfiler=function(e){return M(e)===s},t.isStrictMode=function(e){return M(e)===f},t.isSuspense=function(e){return M(e)===m},t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===c||e===y||e===s||e===f||e===m||e===p||"object"==typeof e&&null!==e&&(e.$$typeof===S||e.$$typeof===b||e.$$typeof===u||e.$$typeof===a||e.$$typeof===l||e.$$typeof===d||e.$$typeof===C||e.$$typeof===w||e.$$typeof===$)},t.typeOf=M},9864:(e,t,r)=>{"use strict";e.exports=r(9921)}}]);