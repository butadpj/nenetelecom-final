(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[216],{3727:(e,t,n)=>{"use strict";n.d(t,{VK:()=>f,rU:()=>y});var r=n(6550),a=n(1788),i=n(7294),o=n(9731),c=(n(5697),n(2122)),l=n(9756),u=n(2177),f=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).history=(0,o.lX)(t.props),t}return(0,a.Z)(t,e),t.prototype.render=function(){return i.createElement(r.F0,{history:this.history,children:this.props.children})},t}(i.Component);i.Component;var s=function(e,t){return"function"==typeof e?e(t):e},v=function(e,t){return"string"==typeof e?(0,o.ob)(e,null,null,t):e},p=function(e){return e},h=i.forwardRef;void 0===h&&(h=p);var m=h((function(e,t){var n=e.innerRef,r=e.navigate,a=e.onClick,o=(0,l.Z)(e,["innerRef","navigate","onClick"]),u=o.target,f=(0,c.Z)({},o,{onClick:function(e){try{a&&a(e)}catch(t){throw e.preventDefault(),t}e.defaultPrevented||0!==e.button||u&&"_self"!==u||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)||(e.preventDefault(),r())}});return f.ref=p!==h&&t||n,i.createElement("a",f)})),y=h((function(e,t){var n=e.component,a=void 0===n?m:n,o=e.replace,f=e.to,y=e.innerRef,d=(0,l.Z)(e,["component","replace","to","innerRef"]);return i.createElement(r.s6.Consumer,null,(function(e){e||(0,u.Z)(!1);var n=e.history,r=v(s(f,e.location),e.location),l=r?n.createHref(r):"",m=(0,c.Z)({},d,{href:l,navigate:function(){var t=s(f,e.location);(o?n.replace:n.push)(t)}});return p!==h?m.ref=t||y:m.innerRef=y,i.createElement(a,m)}))})),d=function(e){return e},C=i.forwardRef;void 0===C&&(C=d),C((function(e,t){var n=e["aria-current"],a=void 0===n?"page":n,o=e.activeClassName,f=void 0===o?"active":o,p=e.activeStyle,h=e.className,m=e.exact,R=e.isActive,Z=e.location,g=e.sensitive,k=e.strict,w=e.style,E=e.to,K=e.innerRef,N=(0,l.Z)(e,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return i.createElement(r.s6.Consumer,null,(function(e){e||(0,u.Z)(!1);var n=Z||e.location,o=v(s(E,n),n),l=o.pathname,b=l&&l.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),A=b?(0,r.LX)(n.pathname,{path:b,exact:m,sensitive:g,strict:k}):null,x=!!(R?R(A,n):A),D=x?function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return e})).join(" ")}(h,f):h,S=x?(0,c.Z)({},w,{},p):w,X=(0,c.Z)({"aria-current":x&&a||null,className:D,style:S,to:o},N);return d!==C?X.ref=t||K:X.innerRef=K,i.createElement(y,X)}))}))}}]);