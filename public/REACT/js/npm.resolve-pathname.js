(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[779],{8273:(n,t,r)=>{"use strict";function e(n){return"/"===n.charAt(0)}function f(n,t){for(var r=t,e=r+1,f=n.length;e<f;r+=1,e+=1)n[r]=n[e];n.pop()}r.d(t,{Z:()=>o});const o=function(n,t){void 0===t&&(t="");var r,o=n&&n.split("/")||[],i=t&&t.split("/")||[],s=n&&e(n),u=t&&e(t),h=s||u;if(n&&e(n)?i=o:o.length&&(i.pop(),i=i.concat(o)),!i.length)return"/";if(i.length){var l=i[i.length-1];r="."===l||".."===l||""===l}else r=!1;for(var a=0,c=i.length;c>=0;c--){var p=i[c];"."===p?f(i,c):".."===p?(f(i,c),a++):a&&(f(i,c),a--)}if(!h)for(;a--;a)i.unshift("..");!h||""===i[0]||i[0]&&e(i[0])||i.unshift("");var v=i.join("/");return r&&"/"!==v.substr(-1)&&(v+="/"),v}}}]);