!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.archer=e():t.archer=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){n(1),t.exports=n(2)},function(t,e,n){var r,i,r,o;(function(){t.exports=0;!function(n){var o,a,s="0.4.2",u="hasOwnProperty",l=/[\.\/]/,c=/\s*,\s*/,f="*",h=function(t,e){return t-e},d={n:{}},p=function(){for(var t=0,e=this.length;t<e;t++)if("undefined"!=typeof this[t])return this[t]},g=function(){for(var t=this.length;--t;)if("undefined"!=typeof this[t])return this[t]},v=function(t,e){t=String(t);var n,r=a,i=Array.prototype.slice.call(arguments,2),s=v.listeners(t),u=0,l=[],c={},f=[],d=o;f.firstDefined=p,f.lastDefined=g,o=t,a=0;for(var m=0,y=s.length;m<y;m++)"zIndex"in s[m]&&(l.push(s[m].zIndex),s[m].zIndex<0&&(c[s[m].zIndex]=s[m]));for(l.sort(h);l[u]<0;)if(n=c[l[u++]],f.push(n.apply(e,i)),a)return a=r,f;for(m=0;m<y;m++)if(n=s[m],"zIndex"in n)if(n.zIndex==l[u]){if(f.push(n.apply(e,i)),a)break;do if(u++,n=c[l[u]],n&&f.push(n.apply(e,i)),a)break;while(n)}else c[n.zIndex]=n;else if(f.push(n.apply(e,i)),a)break;return a=r,o=d,f};v._events=d,v.listeners=function(t){var e,n,r,i,o,a,s,u,c=t.split(l),h=d,p=[h],g=[];for(i=0,o=c.length;i<o;i++){for(u=[],a=0,s=p.length;a<s;a++)for(h=p[a].n,n=[h[c[i]],h[f]],r=2;r--;)e=n[r],e&&(u.push(e),g=g.concat(e.f||[]));p=u}return g},v.on=function(t,e){if(t=String(t),"function"!=typeof e)return function(){};for(var n=t.split(c),r=0,i=n.length;r<i;r++)!function(t){for(var n,r=t.split(l),i=d,o=0,a=r.length;o<a;o++)i=i.n,i=i.hasOwnProperty(r[o])&&i[r[o]]||(i[r[o]]={n:{}});for(i.f=i.f||[],o=0,a=i.f.length;o<a;o++)if(i.f[o]==e){n=!0;break}!n&&i.f.push(e)}(n[r]);return function(t){+t==+t&&(e.zIndex=+t)}},v.f=function(t){var e=[].slice.call(arguments,1);return function(){v.apply(null,[t,null].concat(e).concat([].slice.call(arguments,0)))}},v.stop=function(){a=1},v.nt=function(t){return t?new RegExp("(?:\\.|\\/|^)"+t+"(?:\\.|\\/|$)").test(o):o},v.nts=function(){return o.split(l)},v.off=v.unbind=function(t,e){if(!t)return void(v._events=d={n:{}});var n=t.split(c);if(n.length>1)for(var r=0,i=n.length;r<i;r++)v.off(n[r],e);else{n=t.split(l);var o,a,s,r,i,h,p,g=[d];for(r=0,i=n.length;r<i;r++)for(h=0;h<g.length;h+=s.length-2){if(s=[h,1],o=g[h].n,n[r]!=f)o[n[r]]&&s.push(o[n[r]]);else for(a in o)o[u](a)&&s.push(o[a]);g.splice.apply(g,s)}for(r=0,i=g.length;r<i;r++)for(o=g[r];o.n;){if(e){if(o.f){for(h=0,p=o.f.length;h<p;h++)if(o.f[h]==e){o.f.splice(h,1);break}!o.f.length&&delete o.f}for(a in o.n)if(o.n[u](a)&&o.n[a].f){var m=o.n[a].f;for(h=0,p=m.length;h<p;h++)if(m[h]==e){m.splice(h,1);break}!m.length&&delete o.n[a].f}}else{delete o.f;for(a in o.n)o.n[u](a)&&o.n[a].f&&delete o.n[a].f}o=o.n}}},v.once=function(t,e){var n=function(){return v.unbind(t,n),e.apply(this,arguments)};return v.on(t,n)},v.version=s,v.toString=function(){return"You are running Eve "+s},"undefined"!=typeof t&&t.exports?t.exports=v:(r=[],!(i=function(){return v}.apply(e,r)))}(this),function(n,a){r=[i],o=function(t){return a(n,t)}.apply(e,r),!(void 0!==o&&(t.exports=o))}(this,function(t,e){var n=function(e){var n={},r=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame||function(t){setTimeout(t,16)},i=Array.isArray||function(t){return t instanceof Array||"[object Array]"==Object.prototype.toString.call(t)},o=0,a="M"+(+new Date).toString(36),s=function(){return a+(o++).toString(36)},u=Date.now||function(){return+new Date},l=function(t){var e=this;if(null==t)return e.s;var n=e.s-t;e.b+=e.dur*n,e.B+=e.dur*n,e.s=t},c=function(t){var e=this;return null==t?e.spd:void(e.spd=t)},f=function(t){var e=this;return null==t?e.dur:(e.s=e.s*t/e.dur,void(e.dur=t))},h=function(){var t=this;delete n[t.id],t.update(),e("mina.stop."+t.id,t)},d=function(){var t=this;t.pdif||(delete n[t.id],t.update(),t.pdif=t.get()-t.b)},p=function(){var t=this;t.pdif&&(t.b=t.get()-t.pdif,delete t.pdif,n[t.id]=t)},g=function(){var t,e=this;if(i(e.start)){t=[];for(var n=0,r=e.start.length;n<r;n++)t[n]=+e.start[n]+(e.end[n]-e.start[n])*e.easing(e.s)}else t=+e.start+(e.end-e.start)*e.easing(e.s);e.set(t)},v=function(){var t=0;for(var i in n)if(n.hasOwnProperty(i)){var o=n[i],a=o.get();t++,o.s=(a-o.b)/(o.dur/o.spd),o.s>=1&&(delete n[i],o.s=1,t--,function(t){setTimeout(function(){e("mina.finish."+t.id,t)})}(o)),o.update()}t&&r(v)},m=function(t,e,i,o,a,u,y){var x={id:s(),start:t,end:e,b:i,s:0,dur:o-i,spd:1,get:a,set:u,easing:y||m.linear,status:l,speed:c,duration:f,stop:h,pause:d,resume:p,update:g};n[x.id]=x;var b,w=0;for(b in n)if(n.hasOwnProperty(b)&&(w++,2==w))break;return 1==w&&r(v),x};return m.time=u,m.getById=function(t){return n[t]||null},m.linear=function(t){return t},m.easeout=function(t){return Math.pow(t,1.7)},m.easein=function(t){return Math.pow(t,.48)},m.easeinout=function(t){if(1==t)return 1;if(0==t)return 0;var e=.48-t/1.04,n=Math.sqrt(.1734+e*e),r=n-e,i=Math.pow(Math.abs(r),1/3)*(r<0?-1:1),o=-n-e,a=Math.pow(Math.abs(o),1/3)*(o<0?-1:1),s=i+a+.5;return 3*(1-s)*s*s+s*s*s},m.backin=function(t){if(1==t)return 1;var e=1.70158;return t*t*((e+1)*t-e)},m.backout=function(t){if(0==t)return 0;t-=1;var e=1.70158;return t*t*((e+1)*t+e)+1},m.elastic=function(t){return t==!!t?t:Math.pow(2,-10*t)*Math.sin((t-.075)*(2*Math.PI)/.3)+1},m.bounce=function(t){var e,n=7.5625,r=2.75;return t<1/r?e=n*t*t:t<2/r?(t-=1.5/r,e=n*t*t+.75):t<2.5/r?(t-=2.25/r,e=n*t*t+.9375):(t-=2.625/r,e=n*t*t+.984375),e},t.mina=m,m}("undefined"==typeof e?function(){}:e),r=function(){function r(t,e){if(t){if(t.tagName)return k(t);if(o(t,"array")&&r.set)return r.set.apply(r,t);if(t instanceof b)return t;if(null==e)return t=B.doc.querySelector(t),k(t)}return t=null==t?"100%":t,e=null==e?"100%":e,new C(t,e)}function i(t,e){if(e){if("#text"==t&&(t=B.doc.createTextNode(e.text||"")),"string"==typeof t&&(t=i(t)),"string"==typeof e)return"xlink:"==e.substring(0,6)?t.getAttributeNS(H,e.substring(6)):"xml:"==e.substring(0,4)?t.getAttributeNS(W,e.substring(4)):t.getAttribute(e);for(var n in e)if(e[E](n)){var r=M(e[n]);r?"xlink:"==n.substring(0,6)?t.setAttributeNS(H,n.substring(6),r):"xml:"==n.substring(0,4)?t.setAttributeNS(W,n.substring(4),r):t.setAttribute(n,r):t.removeAttribute(n)}}else t=B.doc.createElementNS(W,t);return t}function o(t,e){return e=M.prototype.toLowerCase.call(e),"finite"==e?isFinite(t):!("array"!=e||!(t instanceof Array||Array.isArray&&Array.isArray(t)))||("null"==e&&null===t||e==typeof t&&null!==t||"object"==e&&t===Object(t)||_.call(t).slice(8,-1).toLowerCase()==e)}function a(t){if("function"==typeof t||Object(t)!==t)return t;var e=new t.constructor;for(var n in t)t[E](n)&&(e[n]=a(t[n]));return e}function s(t,e){for(var n=0,r=t.length;n<r;n++)if(t[n]===e)return t.push(t.splice(n,1)[0])}function u(t,e,n){function r(){var i=Array.prototype.slice.call(arguments,0),o=i.join("␀"),a=r.cache=r.cache||{},u=r.count=r.count||[];return a[E](o)?(s(u,o),n?n(a[o]):a[o]):(u.length>=1e3&&delete a[u.shift()],u.push(o),a[o]=t.apply(e,i),n?n(a[o]):a[o])}return r}function l(t,e,n,r,i,o){if(null==i){var a=t-n,s=e-r;return a||s?(180+180*T.atan2(-s,-a)/N+360)%360:0}return l(t,e,i,o)-l(n,r,i,o)}function c(t){return t%360*N/180}function f(t){return 180*t/N%360}function h(t){var e=[];return t=t.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g,function(t,n,r){return r=r.split(/\s*,\s*|\s+/),"rotate"==n&&1==r.length&&r.push(0,0),"scale"==n&&(r.length>2?r=r.slice(0,2):2==r.length&&r.push(0,0),1==r.length&&r.push(r[0],0,0)),"skewX"==n?e.push(["m",1,0,T.tan(c(r[0])),1,0,0]):"skewY"==n?e.push(["m",1,T.tan(c(r[0])),0,1,0,0]):e.push([n.charAt(0)].concat(r)),t}),e}function d(t,e){var n=it(t),i=new r.Matrix;if(n)for(var o=0,a=n.length;o<a;o++){var s,u,l,c,f,h=n[o],d=h.length,p=M(h[0]).toLowerCase(),g=h[0]!=p,v=g?i.invert():0;"t"==p&&2==d?i.translate(h[1],0):"t"==p&&3==d?g?(s=v.x(0,0),u=v.y(0,0),l=v.x(h[1],h[2]),c=v.y(h[1],h[2]),i.translate(l-s,c-u)):i.translate(h[1],h[2]):"r"==p?2==d?(f=f||e,i.rotate(h[1],f.x+f.width/2,f.y+f.height/2)):4==d&&(g?(l=v.x(h[2],h[3]),c=v.y(h[2],h[3]),i.rotate(h[1],l,c)):i.rotate(h[1],h[2],h[3])):"s"==p?2==d||3==d?(f=f||e,i.scale(h[1],h[d-1],f.x+f.width/2,f.y+f.height/2)):4==d?g?(l=v.x(h[2],h[3]),c=v.y(h[2],h[3]),i.scale(h[1],h[1],l,c)):i.scale(h[1],h[1],h[2],h[3]):5==d&&(g?(l=v.x(h[3],h[4]),c=v.y(h[3],h[4]),i.scale(h[1],h[2],l,c)):i.scale(h[1],h[2],h[3],h[4])):"m"==p&&7==d&&i.add(h[1],h[2],h[3],h[4],h[5],h[6])}return i}function p(t,e){if(null==e){var n=!0;if(e="linearGradient"==t.type||"radialGradient"==t.type?t.node.getAttribute("gradientTransform"):"pattern"==t.type?t.node.getAttribute("patternTransform"):t.node.getAttribute("transform"),!e)return new r.Matrix;e=h(e)}else e=r._.rgTransform.test(e)?M(e).replace(/\.{3}|\u2026/g,t._.transform||z):h(e),o(e,"array")&&(e=r.path?r.path.toString.call(e):M(e)),t._.transform=e;var i=d(e,t.getBBox(1));return n?i:void(t.matrix=i)}function v(t){var e=t.node.ownerSVGElement&&k(t.node.ownerSVGElement)||t.node.parentNode&&k(t.node.parentNode)||r.select("svg")||r(0,0),n=e.select("defs"),i=null!=n&&n.node;return i||(i=S("defs",e.node).node),i}function m(t){return t.node.ownerSVGElement&&k(t.node.ownerSVGElement)||r.select("svg")}function y(t,e,n){function r(t){if(null==t)return z;if(t==+t)return t;i(l,{width:t});try{return l.getBBox().width}catch(t){return 0}}function o(t){if(null==t)return z;if(t==+t)return t;i(l,{height:t});try{return l.getBBox().height}catch(t){return 0}}function a(r,i){null==e?u[r]=i(t.attr(r)||0):r==e&&(u=i(null==n?t.attr(r)||0:n))}var s=m(t).node,u={},l=s.querySelector(".svg---mgr");switch(l||(l=i("rect"),i(l,{x:-9e9,y:-9e9,width:10,height:10,class:"svg---mgr",fill:"none"}),s.appendChild(l)),t.type){case"rect":a("rx",r),a("ry",o);case"image":a("width",r),a("height",o);case"text":a("x",r),a("y",o);break;case"circle":a("cx",r),a("cy",o),a("r",r);break;case"ellipse":a("cx",r),a("cy",o),a("rx",r),a("ry",o);break;case"line":a("x1",r),a("x2",r),a("y1",o),a("y2",o);break;case"marker":a("refX",r),a("markerWidth",r),a("refY",o),a("markerHeight",o);break;case"radialGradient":a("fx",r),a("fy",o);break;case"tspan":a("dx",r),a("dy",o);break;default:a(e,r)}return s.removeChild(l),u}function x(t){o(t,"array")||(t=Array.prototype.slice.call(arguments,0));for(var e=0,n=0,r=this.node;this[e];)delete this[e++];for(e=0;e<t.length;e++)"set"==t[e].type?t[e].forEach(function(t){r.appendChild(t.node)}):r.appendChild(t[e].node);var i=r.childNodes;for(e=0;e<i.length;e++)this[n++]=k(i[e]);return this}function b(t){if(t.snap in Z)return Z[t.snap];var e,n=this.id=$();try{e=t.ownerSVGElement}catch(t){}if(this.node=t,e&&(this.paper=new C(e)),this.type=t.tagName,this.anims={},this._={transform:[]},t.snap=n,Z[n]=this,"g"==this.type&&(this.add=x),this.type in{g:1,mask:1,pattern:1})for(var r in C.prototype)C.prototype[E](r)&&(this[r]=C.prototype[r])}function w(t){this.node=t}function S(t,e){var n=i(t);e.appendChild(n);var r=k(n);return r}function C(t,e){var n,r,o,a=C.prototype;if(t&&"svg"==t.tagName){if(t.snap in Z)return Z[t.snap];var s=t.ownerDocument;n=new b(t),r=t.getElementsByTagName("desc")[0],o=t.getElementsByTagName("defs")[0],r||(r=i("desc"),r.appendChild(s.createTextNode("Created with Snap")),n.node.appendChild(r)),o||(o=i("defs"),n.node.appendChild(o)),n.defs=o;for(var u in a)a[E](u)&&(n[u]=a[u]);n.paper=n.root=n}else n=S("svg",B.doc.body),i(n.node,{height:e,version:1.1,width:t,xmlns:W});return n}function k(t){return t?t instanceof b||t instanceof w?t:t.tagName&&"svg"==t.tagName.toLowerCase()?new C(t):t.tagName&&"object"==t.tagName.toLowerCase()&&"image/svg+xml"==t.type?new C(t.contentDocument.getElementsByTagName("svg")[0]):new b(t):t}r.version="0.3.0",r.toString=function(){return"Snap v"+this.version},r._={};var B={win:t,doc:t.document};r._.glob=B;var E="hasOwnProperty",M=String,A=parseFloat,j=parseInt,T=Math,V=T.max,L=T.min,F=T.abs,N=(T.pow,T.PI),z=(T.round,""),O=" ",_=Object.prototype.toString,P=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,D="\t\n\v\f\r   ᠎             　\u2028\u2029",R=(r._.separator=new RegExp("[,"+D+"]+"),new RegExp("["+D+"]","g"),new RegExp("["+D+"]*,["+D+"]*")),q={hs:1,rg:1},X=new RegExp("([a-z])["+D+",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?["+D+"]*,?["+D+"]*)+)","ig"),G=new RegExp("([rstm])["+D+",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?["+D+"]*,?["+D+"]*)+)","ig"),I=new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)["+D+"]*,?["+D+"]*","ig"),U=0,Y="S"+(+new Date).toString(36),$=function(){return Y+(U++).toString(36)},H="http://www.w3.org/1999/xlink",W="http://www.w3.org/2000/svg",Z={},J=r.url=function(t){return"url('#"+t+"')"};r._.$=i,r._.id=$,r.format=function(){var t=/\{([^\}]+)\}/g,e=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,n=function(t,n,r){var i=r;return n.replace(e,function(t,e,n,r,o){e=e||r,i&&(e in i&&(i=i[e]),"function"==typeof i&&o&&(i=i()))}),i=(null==i||i==r?t:i)+""};return function(e,r){return M(e).replace(t,function(t,e){return n(t,e,r)})}}(),r._.clone=a,r._.cacher=u,r.rad=c,r.deg=f,r.angle=l,r.is=o,r.snapTo=function(t,e,n){if(n=o(n,"finite")?n:10,o(t,"array")){for(var r=t.length;r--;)if(F(t[r]-e)<=n)return t[r]}else{t=+t;var i=e%t;if(i<n)return e-i;if(i>t-n)return e-i+t}return e},r.getRGB=u(function(t){if(!t||(t=M(t)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:et};if("none"==t)return{r:-1,g:-1,b:-1,hex:"none",toString:et};if(!(q[E](t.toLowerCase().substring(0,2))||"#"==t.charAt())&&(t=Q(t)),!t)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:et};var e,n,i,a,s,u,l=t.match(P);return l?(l[2]&&(i=j(l[2].substring(5),16),n=j(l[2].substring(3,5),16),e=j(l[2].substring(1,3),16)),l[3]&&(i=j((s=l[3].charAt(3))+s,16),n=j((s=l[3].charAt(2))+s,16),e=j((s=l[3].charAt(1))+s,16)),l[4]&&(u=l[4].split(R),e=A(u[0]),"%"==u[0].slice(-1)&&(e*=2.55),n=A(u[1]),"%"==u[1].slice(-1)&&(n*=2.55),i=A(u[2]),"%"==u[2].slice(-1)&&(i*=2.55),"rgba"==l[1].toLowerCase().slice(0,4)&&(a=A(u[3])),u[3]&&"%"==u[3].slice(-1)&&(a/=100)),l[5]?(u=l[5].split(R),e=A(u[0]),"%"==u[0].slice(-1)&&(e/=100),n=A(u[1]),"%"==u[1].slice(-1)&&(n/=100),i=A(u[2]),"%"==u[2].slice(-1)&&(i/=100),("deg"==u[0].slice(-3)||"°"==u[0].slice(-1))&&(e/=360),"hsba"==l[1].toLowerCase().slice(0,4)&&(a=A(u[3])),u[3]&&"%"==u[3].slice(-1)&&(a/=100),r.hsb2rgb(e,n,i,a)):l[6]?(u=l[6].split(R),e=A(u[0]),"%"==u[0].slice(-1)&&(e/=100),n=A(u[1]),"%"==u[1].slice(-1)&&(n/=100),i=A(u[2]),"%"==u[2].slice(-1)&&(i/=100),("deg"==u[0].slice(-3)||"°"==u[0].slice(-1))&&(e/=360),"hsla"==l[1].toLowerCase().slice(0,4)&&(a=A(u[3])),u[3]&&"%"==u[3].slice(-1)&&(a/=100),r.hsl2rgb(e,n,i,a)):(e=L(T.round(e),255),n=L(T.round(n),255),i=L(T.round(i),255),a=L(V(a,0),1),l={r:e,g:n,b:i,toString:et},l.hex="#"+(16777216|i|n<<8|e<<16).toString(16).slice(1),l.opacity=o(a,"finite")?a:1,l)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:et}},r),r.hsb=u(function(t,e,n){return r.hsb2rgb(t,e,n).hex}),r.hsl=u(function(t,e,n){return r.hsl2rgb(t,e,n).hex}),r.rgb=u(function(t,e,n,r){if(o(r,"finite")){var i=T.round;return"rgba("+[i(t),i(e),i(n),+r.toFixed(2)]+")"}return"#"+(16777216|n|e<<8|t<<16).toString(16).slice(1)});var Q=function(t){var e=B.doc.getElementsByTagName("head")[0]||B.doc.getElementsByTagName("svg")[0],n="rgb(255, 0, 0)";return(Q=u(function(t){if("red"==t.toLowerCase())return n;e.style.color=n,e.style.color=t;var r=B.doc.defaultView.getComputedStyle(e,z).getPropertyValue("color");return r==n?null:r}))(t)},K=function(){return"hsb("+[this.h,this.s,this.b]+")"},tt=function(){return"hsl("+[this.h,this.s,this.l]+")"},et=function(){return 1==this.opacity||null==this.opacity?this.hex:"rgba("+[this.r,this.g,this.b,this.opacity]+")"},nt=function(t,e,n){if(null==e&&o(t,"object")&&"r"in t&&"g"in t&&"b"in t&&(n=t.b,e=t.g,t=t.r),null==e&&o(t,string)){var i=r.getRGB(t);t=i.r,e=i.g,n=i.b}return(t>1||e>1||n>1)&&(t/=255,e/=255,n/=255),[t,e,n]},rt=function(t,e,n,i){t=T.round(255*t),e=T.round(255*e),n=T.round(255*n);var a={r:t,g:e,b:n,opacity:o(i,"finite")?i:1,hex:r.rgb(t,e,n),toString:et};return o(i,"finite")&&(a.opacity=i),a};r.color=function(t){var e;return o(t,"object")&&"h"in t&&"s"in t&&"b"in t?(e=r.hsb2rgb(t),t.r=e.r,t.g=e.g,t.b=e.b,t.opacity=1,t.hex=e.hex):o(t,"object")&&"h"in t&&"s"in t&&"l"in t?(e=r.hsl2rgb(t),t.r=e.r,t.g=e.g,t.b=e.b,t.opacity=1,t.hex=e.hex):(o(t,"string")&&(t=r.getRGB(t)),o(t,"object")&&"r"in t&&"g"in t&&"b"in t&&!("error"in t)?(e=r.rgb2hsl(t),t.h=e.h,t.s=e.s,t.l=e.l,e=r.rgb2hsb(t),t.v=e.b):(t={hex:"none"},t.r=t.g=t.b=t.h=t.s=t.v=t.l=-1,t.error=1)),t.toString=et,t},r.hsb2rgb=function(t,e,n,r){o(t,"object")&&"h"in t&&"s"in t&&"b"in t&&(n=t.b,e=t.s,t=t.h,r=t.o),t*=360;var i,a,s,u,l;return t=t%360/60,l=n*e,u=l*(1-F(t%2-1)),i=a=s=n-l,t=~~t,i+=[l,u,0,0,u,l][t],a+=[u,l,l,u,0,0][t],s+=[0,0,u,l,l,u][t],rt(i,a,s,r)},r.hsl2rgb=function(t,e,n,r){o(t,"object")&&"h"in t&&"s"in t&&"l"in t&&(n=t.l,e=t.s,t=t.h),(t>1||e>1||n>1)&&(t/=360,e/=100,n/=100),t*=360;var i,a,s,u,l;return t=t%360/60,l=2*e*(n<.5?n:1-n),u=l*(1-F(t%2-1)),i=a=s=n-l/2,t=~~t,i+=[l,u,0,0,u,l][t],a+=[u,l,l,u,0,0][t],s+=[0,0,u,l,l,u][t],rt(i,a,s,r)},r.rgb2hsb=function(t,e,n){n=nt(t,e,n),t=n[0],e=n[1],n=n[2];var r,i,o,a;return o=V(t,e,n),a=o-L(t,e,n),r=0==a?null:o==t?(e-n)/a:o==e?(n-t)/a+2:(t-e)/a+4,r=(r+360)%6*60/360,i=0==a?0:a/o,{h:r,s:i,b:o,toString:K}},r.rgb2hsl=function(t,e,n){n=nt(t,e,n),t=n[0],e=n[1],n=n[2];var r,i,o,a,s,u;return a=V(t,e,n),s=L(t,e,n),u=a-s,r=0==u?null:a==t?(e-n)/u:a==e?(n-t)/u+2:(t-e)/u+4,r=(r+360)%6*60/360,o=(a+s)/2,i=0==u?0:o<.5?u/(2*o):u/(2-2*o),{h:r,s:i,l:o,toString:tt}},r.parsePathString=function(t){if(!t)return null;var e=r.path(t);if(e.arr)return r.path.clone(e.arr);var n={a:7,c:6,o:2,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,u:3,z:0},i=[];return o(t,"array")&&o(t[0],"array")&&(i=r.path.clone(t)),i.length||M(t).replace(X,function(t,e,r){var o=[],a=e.toLowerCase();if(r.replace(I,function(t,e){e&&o.push(+e)}),"m"==a&&o.length>2&&(i.push([e].concat(o.splice(0,2))),a="l",e="m"==e?"l":"L"),"o"==a&&1==o.length&&i.push([e,o[0]]),"r"==a)i.push([e].concat(o));else for(;o.length>=n[a]&&(i.push([e].concat(o.splice(0,n[a]))),n[a]););}),i.toString=r.path.toString,e.arr=r.path.clone(i),i};var it=r.parseTransformString=function(t){if(!t)return null;var e=[];return o(t,"array")&&o(t[0],"array")&&(e=r.path.clone(t)),e.length||M(t).replace(G,function(t,n,r){var i=[];n.toLowerCase();r.replace(I,function(t,e){e&&i.push(+e)}),e.push([n].concat(i))}),e.toString=r.path.toString,e};r._.svgTransform2string=h,r._.rgTransform=new RegExp("^[a-z]["+D+"]*-?\\.?\\d","i"),r._.transform2matrix=d,r._unit2px=y;B.doc.contains||B.doc.compareDocumentPosition?function(t,e){var n=9==t.nodeType?t.documentElement:t,r=e&&e.parentNode;return t==r||!(!r||1!=r.nodeType||!(n.contains?n.contains(r):t.compareDocumentPosition&&16&t.compareDocumentPosition(r)))}:function(t,e){if(e)for(;e;)if(e=e.parentNode,e==t)return!0;return!1};r._.getSomeDefs=v,r._.getSomeSVG=m,r.select=function(t){return k(B.doc.querySelector(t))},r.selectAll=function(t){for(var e=B.doc.querySelectorAll(t),n=(r.set||Array)(),i=0;i<e.length;i++)n.push(k(e[i]));return n},setInterval(function(){for(var t in Z)if(Z[E](t)){var e=Z[t],n=e.node;("svg"!=e.type&&!n.ownerSVGElement||"svg"==e.type&&(!n.parentNode||"ownerSVGElement"in n.parentNode&&!n.ownerSVGElement))&&delete Z[t]}},1e4),function(t){function a(t){function e(t,e){var n=i(t.node,e);n=n&&n.match(a),n=n&&n[2],n&&"#"==n.charAt()&&(n=n.substring(1),n&&(u[n]=(u[n]||[]).concat(function(n){var r={};r[e]=J(n),i(t.node,r)})))}function n(t){var e=i(t.node,"xlink:href");e&&"#"==e.charAt()&&(e=e.substring(1),e&&(u[e]=(u[e]||[]).concat(function(e){t.attr("xlink:href","#"+e)})))}for(var r,o=t.selectAll("*"),a=/^\s*url\(("|'|)(.*)\1\)\s*$/,s=[],u={},l=0,c=o.length;l<c;l++){r=o[l],e(r,"fill"),e(r,"stroke"),e(r,"filter"),e(r,"mask"),e(r,"clip-path"),n(r);var f=i(r.node,"id");f&&(i(r.node,{id:r.id}),s.push({old:f,id:r.id}))}for(l=0,c=s.length;l<c;l++){var h=u[s[l].old];if(h)for(var d=0,p=h.length;d<p;d++)h[d](s[l].id)}}function s(t,e,n){return function(r){var i=r.slice(t,e);return 1==i.length&&(i=i[0]),n?n(i):i}}function u(t){return function(){var e=t?"<"+this.type:"",n=this.node.attributes,r=this.node.childNodes;if(t)for(var i=0,o=n.length;i<o;i++)e+=" "+n[i].name+'="'+n[i].value.replace(/"/g,'\\"')+'"';if(r.length){for(t&&(e+=">"),i=0,o=r.length;i<o;i++)3==r[i].nodeType?e+=r[i].nodeValue:1==r[i].nodeType&&(e+=k(r[i]).toString());t&&(e+="</"+this.type+">")}else t&&(e+="/>");return e}}t.attr=function(t,n){var r=this;r.node;if(!t)return r;if(o(t,"string")){if(!(arguments.length>1))return e("snap.util.getattr."+t,r).firstDefined();var i={};i[t]=n,t=i}for(var a in t)t[E](a)&&e("snap.util.attr."+a,r,t[a]);return r},t.getBBox=function(t){if(!r.Matrix||!r.path)return this.node.getBBox();var e=this,n=new r.Matrix;if(e.removed)return r._.box();for(;"use"==e.type;)if(t||(n=n.add(e.transform().localMatrix.translate(e.attr("x")||0,e.attr("y")||0))),e.original)e=e.original;else{var i=e.attr("xlink:href");e=e.original=e.node.ownerDocument.getElementById(i.substring(i.indexOf("#")+1))}var o=e._,a=r.path.get[e.type]||r.path.get.deflt;try{return t?(o.bboxwt=a?r.path.getBBox(e.realPath=a(e)):r._.box(e.node.getBBox()),r._.box(o.bboxwt)):(e.realPath=a(e),e.matrix=e.transform().localMatrix,o.bbox=r.path.getBBox(r.path.map(e.realPath,n.add(e.matrix))),r._.box(o.bbox))}catch(t){return r._.box()}};var l=function(){return this.string};t.transform=function(t){var e=this._;if(null==t){for(var n,o=this,a=new r.Matrix(this.node.getCTM()),s=p(this),u=[s],c=new r.Matrix,f=s.toTransformString(),h=M(s)==M(this.matrix)?M(e.transform):f;"svg"!=o.type&&(o=o.parent());)u.push(p(o));for(n=u.length;n--;)c.add(u[n]);return{string:h,globalMatrix:a,totalMatrix:c,localMatrix:s,diffMatrix:a.clone().add(s.invert()),global:a.toTransformString(),total:c.toTransformString(),local:f,toString:l}}return t instanceof r.Matrix?this.matrix=t:p(this,t),this.node&&("linearGradient"==this.type||"radialGradient"==this.type?i(this.node,{gradientTransform:this.matrix}):"pattern"==this.type?i(this.node,{patternTransform:this.matrix}):i(this.node,{transform:this.matrix})),this},t.parent=function(){return k(this.node.parentNode)},t.append=t.add=function(t){if(t){if("set"==t.type){var e=this;return t.forEach(function(t){e.add(t)}),this}t=k(t),this.node.appendChild(t.node),t.paper=this.paper}return this},t.appendTo=function(t){return t&&(t=k(t),t.append(this)),this},t.prepend=function(t){if(t){if("set"==t.type){var e,n=this;return t.forEach(function(t){e?e.after(t):n.prepend(t),e=t}),this}t=k(t);var r=t.parent();this.node.insertBefore(t.node,this.node.firstChild),this.add&&this.add(),t.paper=this.paper,this.parent()&&this.parent().add(),r&&r.add()}return this},t.prependTo=function(t){return t=k(t),t.prepend(this),this},t.before=function(t){if("set"==t.type){var e=this;return t.forEach(function(t){var n=t.parent();e.node.parentNode.insertBefore(t.node,e.node),n&&n.add()}),this.parent().add(),this}t=k(t);var n=t.parent();return this.node.parentNode.insertBefore(t.node,this.node),this.parent()&&this.parent().add(),n&&n.add(),t.paper=this.paper,this},t.after=function(t){t=k(t);var e=t.parent();return this.node.nextSibling?this.node.parentNode.insertBefore(t.node,this.node.nextSibling):this.node.parentNode.appendChild(t.node),this.parent()&&this.parent().add(),e&&e.add(),t.paper=this.paper,this},t.insertBefore=function(t){t=k(t);var e=this.parent();return t.node.parentNode.insertBefore(this.node,t.node),this.paper=t.paper,e&&e.add(),t.parent()&&t.parent().add(),this},t.insertAfter=function(t){t=k(t);var e=this.parent();return t.node.parentNode.insertBefore(this.node,t.node.nextSibling),this.paper=t.paper,e&&e.add(),t.parent()&&t.parent().add(),this},t.remove=function(){var t=this.parent();return this.node.parentNode&&this.node.parentNode.removeChild(this.node),delete this.paper,this.removed=!0,t&&t.add(),this},t.select=function(t){return k(this.node.querySelector(t))},t.selectAll=function(t){for(var e=this.node.querySelectorAll(t),n=(r.set||Array)(),i=0;i<e.length;i++)n.push(k(e[i]));return n},t.asPX=function(t,e){return null==e&&(e=this.attr(t)),+y(this,t,e)},t.use=function(){var t,e=this.node.id;return e||(e=this.id,i(this.node,{id:e})),t="linearGradient"==this.type||"radialGradient"==this.type||"pattern"==this.type?S(this.type,this.node.parentNode):S("use",this.node.parentNode),i(t.node,{"xlink:href":"#"+e}),t.original=this,t};var c=/\S+/g;t.addClass=function(t){var e,n,r,i,o=(t||"").match(c)||[],a=this.node,s=a.className.baseVal,u=s.match(c)||[];if(o.length){for(e=0;r=o[e++];)n=u.indexOf(r),~n||u.push(r);i=u.join(" "),s!=i&&(a.className.baseVal=i)}return this},t.removeClass=function(t){var e,n,r,i,o=(t||"").match(c)||[],a=this.node,s=a.className.baseVal,u=s.match(c)||[];if(u.length){for(e=0;r=o[e++];)n=u.indexOf(r),~n&&u.splice(n,1);i=u.join(" "),s!=i&&(a.className.baseVal=i)}return this},t.hasClass=function(t){var e=this.node,n=e.className.baseVal,r=n.match(c)||[];return!!~r.indexOf(t)},t.toggleClass=function(t,e){if(null!=e)return e?this.addClass(t):this.removeClass(t);var n,r,i,o,a=(t||"").match(c)||[],s=this.node,u=s.className.baseVal,l=u.match(c)||[];for(n=0;i=a[n++];)r=l.indexOf(i),~r?l.splice(r,1):l.push(i);return o=l.join(" "),u!=o&&(s.className.baseVal=o),this},t.clone=function(){var t=k(this.node.cloneNode(!0));return i(t.node,"id")&&i(t.node,{id:t.id}),a(t),t.insertAfter(this),t},t.toDefs=function(){var t=v(this);return t.appendChild(this.node),this},t.pattern=t.toPattern=function(t,e,n,r){var a=S("pattern",v(this));return null==t&&(t=this.getBBox()),o(t,"object")&&"x"in t&&(e=t.y,n=t.width,r=t.height,t=t.x),i(a.node,{x:t,y:e,width:n,height:r,patternUnits:"userSpaceOnUse",id:a.id,viewBox:[t,e,n,r].join(" ")}),a.node.appendChild(this.node),a},t.marker=function(t,e,n,r,a,s){var u=S("marker",v(this));return null==t&&(t=this.getBBox()),o(t,"object")&&"x"in t&&(e=t.y,n=t.width,r=t.height,a=t.refX||t.cx,s=t.refY||t.cy,t=t.x),i(u.node,{viewBox:[t,e,n,r].join(O),markerWidth:n,markerHeight:r,orient:"auto",refX:a||0,refY:s||0,id:u.id}),u.node.appendChild(this.node),u};var f=function(t,e,r,i){"function"!=typeof r||r.length||(i=r,r=n.linear),this.attr=t,this.dur=e,r&&(this.easing=r),i&&(this.callback=i)};r._.Animation=f,r.animation=function(t,e,n,r){return new f(t,e,n,r)},t.inAnim=function(){var t=this,e=[];for(var n in t.anims)t.anims[E](n)&&!function(t){e.push({anim:new f(t._attrs,t.dur,t.easing,t._callback),mina:t,curStatus:t.status(),status:function(e){return t.status(e)},stop:function(){t.stop()}})}(t.anims[n]);return e},r.animate=function(t,r,i,o,a,s){"function"!=typeof a||a.length||(s=a,a=n.linear);var u=n.time(),l=n(t,r,u,u+o,n.time,i,a);return s&&e.once("mina.finish."+l.id,s),l},t.stop=function(){for(var t=this.inAnim(),e=0,n=t.length;e<n;e++)t[e].stop();return this},t.animate=function(t,r,i,a){"function"!=typeof i||i.length||(a=i,i=n.linear),t instanceof f&&(a=t.callback,i=t.easing,r=i.dur,t=t.attr);var u,l,c,h,d=[],p=[],g={},v=this;for(var m in t)if(t[E](m)){v.equal?(h=v.equal(m,M(t[m])),u=h.from,l=h.to,c=h.f):(u=+v.attr(m),l=+t[m]);var y=o(u,"array")?u.length:1;g[m]=s(d.length,d.length+y,c),d=d.concat(u),p=p.concat(l)}var x=n.time(),b=n(d,p,x,x+r,n.time,function(t){var e={};for(var n in g)g[E](n)&&(e[n]=g[n](t));v.attr(e)},i);return v.anims[b.id]=b,b._attrs=t,b._callback=a,e("snap.animcreated."+v.id,b),e.once("mina.finish."+b.id,function(){delete v.anims[b.id],a&&a.call(v)}),e.once("mina.stop."+b.id,function(){delete v.anims[b.id]}),v};var h={};t.data=function(t,n){var i=h[this.id]=h[this.id]||{};if(0==arguments.length)return e("snap.data.get."+this.id,this,i,null),i;if(1==arguments.length){if(r.is(t,"object")){for(var o in t)t[E](o)&&this.data(o,t[o]);return this}return e("snap.data.get."+this.id,this,i[t],t),i[t]}return i[t]=n,e("snap.data.set."+this.id,this,n,t),this},t.removeData=function(t){return null==t?h[this.id]={}:h[this.id]&&delete h[this.id][t],this},t.outerSVG=t.toString=u(1),t.innerSVG=u()}(b.prototype),r.parse=function(t){var e=B.doc.createDocumentFragment(),n=!0,r=B.doc.createElement("div");if(t=M(t),t.match(/^\s*<\s*svg(?:\s|>)/)||(t="<svg>"+t+"</svg>",n=!1),r.innerHTML=t,t=r.getElementsByTagName("svg")[0])if(n)e=t;else for(;t.firstChild;)e.appendChild(t.firstChild);return r.innerHTML=z,new w(e)},w.prototype.select=b.prototype.select,w.prototype.selectAll=b.prototype.selectAll,r.fragment=function(){for(var t=Array.prototype.slice.call(arguments,0),e=B.doc.createDocumentFragment(),n=0,i=t.length;n<i;n++){var o=t[n];o.node&&o.node.nodeType&&e.appendChild(o.node),o.nodeType&&e.appendChild(o),"string"==typeof o&&e.appendChild(r.parse(o).node)}return new w(e)},r._.make=S,r._.wrap=k,C.prototype.el=function(t,e){var n=S(t,this.node);return e&&n.attr(e),n},e.on("snap.util.getattr",function(){var t=e.nt();t=t.substring(t.lastIndexOf(".")+1);var n=t.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()});return ot[E](n)?this.node.ownerDocument.defaultView.getComputedStyle(this.node,null).getPropertyValue(n):i(this.node,t)});var ot={"alignment-baseline":0,"baseline-shift":0,clip:0,"clip-path":0,"clip-rule":0,color:0,"color-interpolation":0,"color-interpolation-filters":0,"color-profile":0,"color-rendering":0,cursor:0,direction:0,display:0,"dominant-baseline":0,"enable-background":0,fill:0,"fill-opacity":0,"fill-rule":0,filter:0,"flood-color":0,"flood-opacity":0,font:0,"font-family":0,"font-size":0,"font-size-adjust":0,"font-stretch":0,"font-style":0,"font-variant":0,"font-weight":0,"glyph-orientation-horizontal":0,"glyph-orientation-vertical":0,"image-rendering":0,kerning:0,"letter-spacing":0,"lighting-color":0,marker:0,"marker-end":0,"marker-mid":0,"marker-start":0,mask:0,opacity:0,overflow:0,"pointer-events":0,"shape-rendering":0,"stop-color":0,"stop-opacity":0,stroke:0,"stroke-dasharray":0,"stroke-dashoffset":0,"stroke-linecap":0,"stroke-linejoin":0,"stroke-miterlimit":0,"stroke-opacity":0,"stroke-width":0,"text-anchor":0,"text-decoration":0,"text-rendering":0,"unicode-bidi":0,visibility:0,"word-spacing":0,"writing-mode":0};e.on("snap.util.attr",function(t){var n=e.nt(),r={};n=n.substring(n.lastIndexOf(".")+1),r[n]=t;var o=n.replace(/-(\w)/gi,function(t,e){return e.toUpperCase()}),a=n.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()});ot[E](a)?this.node.style[o]=null==t?z:t:i(this.node,r)}),function(t){}(C.prototype),r.ajax=function(t,n,r,i){var a=new XMLHttpRequest,s=$();if(a){if(o(n,"function"))i=r,r=n,n=null;else if(o(n,"object")){var u=[];for(var l in n)n.hasOwnProperty(l)&&u.push(encodeURIComponent(l)+"="+encodeURIComponent(n[l]));n=u.join("&")}return a.open(n?"POST":"GET",t,!0),n&&(a.setRequestHeader("X-Requested-With","XMLHttpRequest"),a.setRequestHeader("Content-type","application/x-www-form-urlencoded")),r&&(e.once("snap.ajax."+s+".0",r),e.once("snap.ajax."+s+".200",r),e.once("snap.ajax."+s+".304",r)),a.onreadystatechange=function(){4==a.readyState&&e("snap.ajax."+s+"."+a.status,i,a)},4==a.readyState?a:(a.send(n),a)}},r.load=function(t,e,n){r.ajax(t,function(t){var i=r.parse(t.responseText);n?e.call(n,i):e(i)})};var at=function(t){var e=t.getBoundingClientRect(),n=t.ownerDocument,r=n.body,i=n.documentElement,o=i.clientTop||r.clientTop||0,a=i.clientLeft||r.clientLeft||0,s=e.top+(g.win.pageYOffset||i.scrollTop||r.scrollTop)-o,u=e.left+(g.win.pageXOffset||i.scrollLeft||r.scrollLeft)-a;return{y:s,x:u}};return r.getElementByPoint=function(t,e){var n=this,r=(n.canvas,B.doc.elementFromPoint(t,e));if(B.win.opera&&"svg"==r.tagName){var i=at(r),o=r.createSVGRect();o.x=t-i.x,o.y=e-i.y,o.width=o.height=1;var a=r.getIntersectionList(o,null);a.length&&(r=a[a.length-1]);
}return r?k(r):null},r.plugin=function(t){t(r,b,C,B,w)},B.win.Snap=r,r}();return r.plugin(function(t,e,n,r,i){function o(t,e,n,r,i,o){return null==e&&"[object SVGMatrix]"==a.call(t)?(this.a=t.a,this.b=t.b,this.c=t.c,this.d=t.d,this.e=t.e,void(this.f=t.f)):void(null!=t?(this.a=+t,this.b=+e,this.c=+n,this.d=+r,this.e=+i,this.f=+o):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0))}var a=Object.prototype.toString,s=String,u=Math,l="";!function(e){function n(t){return t[0]*t[0]+t[1]*t[1]}function r(t){var e=u.sqrt(n(t));t[0]&&(t[0]/=e),t[1]&&(t[1]/=e)}e.add=function(t,e,n,r,i,a){var s,u,l,c,f=[[],[],[]],h=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],d=[[t,n,i],[e,r,a],[0,0,1]];for(t&&t instanceof o&&(d=[[t.a,t.c,t.e],[t.b,t.d,t.f],[0,0,1]]),s=0;s<3;s++)for(u=0;u<3;u++){for(c=0,l=0;l<3;l++)c+=h[s][l]*d[l][u];f[s][u]=c}return this.a=f[0][0],this.b=f[1][0],this.c=f[0][1],this.d=f[1][1],this.e=f[0][2],this.f=f[1][2],this},e.invert=function(){var t=this,e=t.a*t.d-t.b*t.c;return new o(t.d/e,-t.b/e,-t.c/e,t.a/e,(t.c*t.f-t.d*t.e)/e,(t.b*t.e-t.a*t.f)/e)},e.clone=function(){return new o(this.a,this.b,this.c,this.d,this.e,this.f)},e.translate=function(t,e){return this.add(1,0,0,1,t,e)},e.scale=function(t,e,n,r){return null==e&&(e=t),(n||r)&&this.add(1,0,0,1,n,r),this.add(t,0,0,e,0,0),(n||r)&&this.add(1,0,0,1,-n,-r),this},e.rotate=function(e,n,r){e=t.rad(e),n=n||0,r=r||0;var i=+u.cos(e).toFixed(9),o=+u.sin(e).toFixed(9);return this.add(i,o,-o,i,n,r),this.add(1,0,0,1,-n,-r)},e.x=function(t,e){return t*this.a+e*this.c+this.e},e.y=function(t,e){return t*this.b+e*this.d+this.f},e.get=function(t){return+this[s.fromCharCode(97+t)].toFixed(4)},e.toString=function(){return"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")"},e.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},e.determinant=function(){return this.a*this.d-this.b*this.c},e.split=function(){var e={};e.dx=this.e,e.dy=this.f;var i=[[this.a,this.c],[this.b,this.d]];e.scalex=u.sqrt(n(i[0])),r(i[0]),e.shear=i[0][0]*i[1][0]+i[0][1]*i[1][1],i[1]=[i[1][0]-i[0][0]*e.shear,i[1][1]-i[0][1]*e.shear],e.scaley=u.sqrt(n(i[1])),r(i[1]),e.shear/=e.scaley,this.determinant()<0&&(e.scalex=-e.scalex);var o=-i[0][1],a=i[1][1];return a<0?(e.rotate=t.deg(u.acos(a)),o<0&&(e.rotate=360-e.rotate)):e.rotate=t.deg(u.asin(o)),e.isSimple=!(+e.shear.toFixed(9)||e.scalex.toFixed(9)!=e.scaley.toFixed(9)&&e.rotate),e.isSuperSimple=!+e.shear.toFixed(9)&&e.scalex.toFixed(9)==e.scaley.toFixed(9)&&!e.rotate,e.noRotation=!+e.shear.toFixed(9)&&!e.rotate,e},e.toTransformString=function(t){var e=t||this.split();return+e.shear.toFixed(9)?"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]:(e.scalex=+e.scalex.toFixed(4),e.scaley=+e.scaley.toFixed(4),e.rotate=+e.rotate.toFixed(4),(e.dx||e.dy?"t"+[+e.dx.toFixed(4),+e.dy.toFixed(4)]:l)+(1!=e.scalex||1!=e.scaley?"s"+[e.scalex,e.scaley,0,0]:l)+(e.rotate?"r"+[+e.rotate.toFixed(4),0,0]:l))}}(o.prototype),t.Matrix=o,t.matrix=function(t,e,n,r,i,a){return new o(t,e,n,r,i,a)}}),r.plugin(function(t,n,r,i,o){function a(r){return function(i){if(e.stop(),i instanceof o&&1==i.node.childNodes.length&&("radialGradient"==i.node.firstChild.tagName||"linearGradient"==i.node.firstChild.tagName||"pattern"==i.node.firstChild.tagName)&&(i=i.node.firstChild,d(this).appendChild(i),i=f(i)),i instanceof n)if("radialGradient"==i.type||"linearGradient"==i.type||"pattern"==i.type){i.node.id||g(i.node,{id:i.id});var a=v(i.node.id)}else a=i.attr(r);else if(a=t.color(i),a.error){var s=t(d(this).ownerSVGElement).gradient(i);s?(s.node.id||g(s.node,{id:s.id}),a=v(s.node.id)):a=i}else a=m(a);var u={};u[r]=a,g(this.node,u),this.node.style[r]=x}}function s(t){e.stop(),t==+t&&(t+="px"),this.node.style.fontSize=t}function u(t){for(var e=[],n=t.childNodes,r=0,i=n.length;r<i;r++){var o=n[r];3==o.nodeType&&e.push(o.nodeValue),"tspan"==o.tagName&&(1==o.childNodes.length&&3==o.firstChild.nodeType?e.push(o.firstChild.nodeValue):e.push(u(o)))}return e}function l(){return e.stop(),this.node.style.fontSize}var c=t._.make,f=t._.wrap,h=t.is,d=t._.getSomeDefs,p=/^url\(#?([^)]+)\)$/,g=t._.$,v=t.url,m=String,y=t._.separator,x="";e.on("snap.util.attr.mask",function(t){if(t instanceof n||t instanceof o){if(e.stop(),t instanceof o&&1==t.node.childNodes.length&&(t=t.node.firstChild,d(this).appendChild(t),t=f(t)),"mask"==t.type)var r=t;else r=c("mask",d(this)),r.node.appendChild(t.node);!r.node.id&&g(r.node,{id:r.id}),g(this.node,{mask:v(r.id)})}}),function(t){e.on("snap.util.attr.clip",t),e.on("snap.util.attr.clip-path",t),e.on("snap.util.attr.clipPath",t)}(function(t){if(t instanceof n||t instanceof o){if(e.stop(),"clipPath"==t.type)var r=t;else r=c("clipPath",d(this)),r.node.appendChild(t.node),!r.node.id&&g(r.node,{id:r.id});g(this.node,{"clip-path":v(r.id)})}}),e.on("snap.util.attr.fill",a("fill")),e.on("snap.util.attr.stroke",a("stroke"));var b=/^([lr])(?:\(([^)]*)\))?(.*)$/i;e.on("snap.util.grad.parse",function(t){t=m(t);var e=t.match(b);if(!e)return null;var n=e[1],r=e[2],i=e[3];return r=r.split(/\s*,\s*/).map(function(t){return+t==t?+t:t}),1==r.length&&0==r[0]&&(r=[]),i=i.split("-"),i=i.map(function(t){t=t.split(":");var e={color:t[0]};return t[1]&&(e.offset=parseFloat(t[1])),e}),{type:n,params:r,stops:i}}),e.on("snap.util.attr.d",function(n){e.stop(),h(n,"array")&&h(n[0],"array")&&(n=t.path.toString.call(n)),n=m(n),n.match(/[ruo]/i)&&(n=t.path.toAbsolute(n)),g(this.node,{d:n})})(-1),e.on("snap.util.attr.#text",function(t){e.stop(),t=m(t);for(var n=i.doc.createTextNode(t);this.node.firstChild;)this.node.removeChild(this.node.firstChild);this.node.appendChild(n)})(-1),e.on("snap.util.attr.path",function(t){e.stop(),this.attr({d:t})})(-1),e.on("snap.util.attr.class",function(t){e.stop(),this.node.className.baseVal=t})(-1),e.on("snap.util.attr.viewBox",function(t){var n;n=h(t,"object")&&"x"in t?[t.x,t.y,t.width,t.height].join(" "):h(t,"array")?t.join(" "):t,g(this.node,{viewBox:n}),e.stop()})(-1),e.on("snap.util.attr.transform",function(t){this.transform(t),e.stop()})(-1),e.on("snap.util.attr.r",function(t){"rect"==this.type&&(e.stop(),g(this.node,{rx:t,ry:t}))})(-1),e.on("snap.util.attr.textpath",function(t){if(e.stop(),"text"==this.type){var r,i,o;if(!t&&this.textPath){for(i=this.textPath;i.node.firstChild;)this.node.appendChild(i.node.firstChild);return i.remove(),void delete this.textPath}if(h(t,"string")){var a=d(this),s=f(a.parentNode).path(t);a.appendChild(s.node),r=s.id,s.attr({id:r})}else t=f(t),t instanceof n&&(r=t.attr("id"),r||(r=t.id,t.attr({id:r})));if(r)if(i=this.textPath,o=this.node,i)i.attr({"xlink:href":"#"+r});else{for(i=g("textPath",{"xlink:href":"#"+r});o.firstChild;)i.appendChild(o.firstChild);o.appendChild(i),this.textPath=f(i)}}})(-1),e.on("snap.util.attr.text",function(t){if("text"==this.type){for(var n=this.node,r=function(t){var e=g("tspan");if(h(t,"array"))for(var n=0;n<t.length;n++)e.appendChild(r(t[n]));else e.appendChild(i.doc.createTextNode(t));return e.normalize&&e.normalize(),e};n.firstChild;)n.removeChild(n.firstChild);for(var o=r(t);o.firstChild;)n.appendChild(o.firstChild)}e.stop()})(-1),e.on("snap.util.attr.fontSize",s)(-1),e.on("snap.util.attr.font-size",s)(-1),e.on("snap.util.getattr.transform",function(){return e.stop(),this.transform()})(-1),e.on("snap.util.getattr.textpath",function(){return e.stop(),this.textPath})(-1),function(){function n(n){return function(){e.stop();var r=i.doc.defaultView.getComputedStyle(this.node,null).getPropertyValue("marker-"+n);return"none"==r?r:t(i.doc.getElementById(r.match(p)[1]))}}function r(t){return function(n){e.stop();var r="marker"+t.charAt(0).toUpperCase()+t.substring(1);if(""==n||!n)return void(this.node.style[r]="none");if("marker"==n.type){var i=n.node.id;return i||g(n.node,{id:n.id}),void(this.node.style[r]=v(i))}}}e.on("snap.util.getattr.marker-end",n("end"))(-1),e.on("snap.util.getattr.markerEnd",n("end"))(-1),e.on("snap.util.getattr.marker-start",n("start"))(-1),e.on("snap.util.getattr.markerStart",n("start"))(-1),e.on("snap.util.getattr.marker-mid",n("mid"))(-1),e.on("snap.util.getattr.markerMid",n("mid"))(-1),e.on("snap.util.attr.marker-end",r("end"))(-1),e.on("snap.util.attr.markerEnd",r("end"))(-1),e.on("snap.util.attr.marker-start",r("start"))(-1),e.on("snap.util.attr.markerStart",r("start"))(-1),e.on("snap.util.attr.marker-mid",r("mid"))(-1),e.on("snap.util.attr.markerMid",r("mid"))(-1)}(),e.on("snap.util.getattr.r",function(){if("rect"==this.type&&g(this.node,"rx")==g(this.node,"ry"))return e.stop(),g(this.node,"rx")})(-1),e.on("snap.util.getattr.text",function(){if("text"==this.type||"tspan"==this.type){e.stop();var t=u(this.node);return 1==t.length?t[0]:t}})(-1),e.on("snap.util.getattr.#text",function(){return this.node.textContent})(-1),e.on("snap.util.getattr.viewBox",function(){e.stop();var n=g(this.node,"viewBox");return n?(n=n.split(y),t._.box(+n[0],+n[1],+n[2],+n[3])):void 0})(-1),e.on("snap.util.getattr.points",function(){var t=g(this.node,"points");return e.stop(),t?t.split(y):void 0})(-1),e.on("snap.util.getattr.path",function(){var t=g(this.node,"d");return e.stop(),t})(-1),e.on("snap.util.getattr.class",function(){return this.node.className.baseVal})(-1),e.on("snap.util.getattr.fontSize",l)(-1),e.on("snap.util.getattr.font-size",l)(-1)}),r.plugin(function(t,n,r,i,o){function a(t){return t}function s(t){return function(e){return+e.toFixed(3)+t}}var u={"+":function(t,e){return t+e},"-":function(t,e){return t-e},"/":function(t,e){return t/e},"*":function(t,e){return t*e}},l=String,c=/[a-z]+$/i,f=/^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;e.on("snap.util.attr",function(t){var n=l(t).match(f);if(n){var r=e.nt(),i=r.substring(r.lastIndexOf(".")+1),o=this.attr(i),a={};e.stop();var s=n[3]||"",h=o.match(c),d=u[n[1]];if(h&&h==s?t=d(parseFloat(o),+n[2]):(o=this.asPX(i),t=d(this.asPX(i),this.asPX(i,n[2]+s))),isNaN(o)||isNaN(t))return;a[i]=t,this.attr(a)}})(-10),e.on("snap.util.equal",function(t,n){var r=l(this.attr(t)||""),i=l(n).match(f);if(i){e.stop();var o=i[3]||"",h=r.match(c),d=u[i[1]];return h&&h==o?{from:parseFloat(r),to:d(parseFloat(r),+i[2]),f:s(h)}:(r=this.asPX(t),{from:r,to:d(r,this.asPX(t,i[2]+o)),f:a})}})(-10)}),r.plugin(function(t,n,r,i,o){var a=r.prototype,s=t.is;a.rect=function(t,e,n,r,i,o){var a;return null==o&&(o=i),s(t,"object")&&"[object Object]"==t?a=t:null!=t&&(a={x:t,y:e,width:n,height:r},null!=i&&(a.rx=i,a.ry=o)),this.el("rect",a)},a.circle=function(t,e,n){var r;return s(t,"object")&&"[object Object]"==t?r=t:null!=t&&(r={cx:t,cy:e,r:n}),this.el("circle",r)};var u=function(){function t(){this.parentNode.removeChild(this)}return function(e,n){var r=i.doc.createElement("img"),o=i.doc.body;r.style.cssText="position:absolute;left:-9999em;top:-9999em",r.onload=function(){n.call(r),r.onload=r.onerror=null,o.removeChild(r)},r.onerror=t,o.appendChild(r),r.src=e}}();a.image=function(e,n,r,i,o){var a=this.el("image");if(s(e,"object")&&"src"in e)a.attr(e);else if(null!=e){var l={"xlink:href":e,preserveAspectRatio:"none"};null!=n&&null!=r&&(l.x=n,l.y=r),null!=i&&null!=o?(l.width=i,l.height=o):u(e,function(){t._.$(a.node,{width:this.offsetWidth,height:this.offsetHeight})}),t._.$(a.node,l)}return a},a.ellipse=function(t,e,n,r){var i;return s(t,"object")&&"[object Object]"==t?i=t:null!=t&&(i={cx:t,cy:e,rx:n,ry:r}),this.el("ellipse",i)},a.path=function(t){var e;return s(t,"object")&&!s(t,"array")?e=t:t&&(e={d:t}),this.el("path",e)},a.group=a.g=function(t){var e=this.el("g");return 1==arguments.length&&t&&!t.type?e.attr(t):arguments.length&&e.add(Array.prototype.slice.call(arguments,0)),e},a.svg=function(t,e,n,r,i,o,a,u){var l={};return s(t,"object")&&null==e?l=t:(null!=t&&(l.x=t),null!=e&&(l.y=e),null!=n&&(l.width=n),null!=r&&(l.height=r),null!=i&&null!=o&&null!=a&&null!=u&&(l.viewBox=[i,o,a,u])),this.el("svg",l)},a.mask=function(t){var e=this.el("mask");return 1==arguments.length&&t&&!t.type?e.attr(t):arguments.length&&e.add(Array.prototype.slice.call(arguments,0)),e},a.ptrn=function(t,e,n,r,i,o,a,u){if(s(t,"object"))var l=t;else arguments.length?(l={},null!=t&&(l.x=t),null!=e&&(l.y=e),null!=n&&(l.width=n),null!=r&&(l.height=r),null!=i&&null!=o&&null!=a&&null!=u&&(l.viewBox=[i,o,a,u])):l={patternUnits:"userSpaceOnUse"};return this.el("pattern",l)},a.use=function(t){if(null!=t){make("use",this.node);return t instanceof n&&(t.attr("id")||t.attr({id:ID()}),t=t.attr("id")),this.el("use",{"xlink:href":t})}return n.prototype.use.call(this)},a.text=function(t,e,n){var r={};return s(t,"object")?r=t:null!=t&&(r={x:t,y:e,text:n||""}),this.el("text",r)},a.line=function(t,e,n,r){var i={};return s(t,"object")?i=t:null!=t&&(i={x1:t,x2:n,y1:e,y2:r}),this.el("line",i)},a.polyline=function(t){arguments.length>1&&(t=Array.prototype.slice.call(arguments,0));var e={};return s(t,"object")&&!s(t,"array")?e=t:null!=t&&(e={points:t}),this.el("polyline",e)},a.polygon=function(t){arguments.length>1&&(t=Array.prototype.slice.call(arguments,0));var e={};return s(t,"object")&&!s(t,"array")?e=t:null!=t&&(e={points:t}),this.el("polygon",e)},function(){function n(){return this.selectAll("stop")}function r(e,n){var r=l("stop"),i={offset:+n+"%"};return e=t.color(e),i["stop-color"]=e.hex,e.opacity<1&&(i["stop-opacity"]=e.opacity),l(r,i),this.node.appendChild(r),this}function i(){if("linearGradient"==this.type){var e=l(this.node,"x1")||0,n=l(this.node,"x2")||1,r=l(this.node,"y1")||0,i=l(this.node,"y2")||0;return t._.box(e,r,math.abs(n-e),math.abs(i-r))}var o=this.node.cx||.5,a=this.node.cy||.5,s=this.node.r||0;return t._.box(o-s,a-s,2*s,2*s)}function o(t,n){function r(t,e){for(var n=(e-f)/(t-h),r=h;r<t;r++)a[r].offset=+(+f+n*(r-h)).toFixed(2);h=t,f=e}var i,o=e("snap.util.grad.parse",null,n).firstDefined();if(!o)return null;o.params.unshift(t),i="l"==o.type.toLowerCase()?s.apply(0,o.params):u.apply(0,o.params),o.type!=o.type.toLowerCase()&&l(i.node,{gradientUnits:"userSpaceOnUse"});var a=o.stops,c=a.length,f=0,h=0;c--;for(var d=0;d<c;d++)"offset"in a[d]&&r(d,a[d].offset);for(a[c].offset=a[c].offset||100,r(c,a[c].offset),d=0;d<=c;d++){var p=a[d];i.addStop(p.color,p.offset)}return i}function s(e,o,a,s,u){var c=t._.make("linearGradient",e);return c.stops=n,c.addStop=r,c.getBBox=i,null!=o&&l(c.node,{x1:o,y1:a,x2:s,y2:u}),c}function u(e,o,a,s,u,c){var f=t._.make("radialGradient",e);return f.stops=n,f.addStop=r,f.getBBox=i,null!=o&&l(f.node,{cx:o,cy:a,r:s}),null!=u&&null!=c&&l(f.node,{fx:u,fy:c}),f}var l=t._.$;a.gradient=function(t){return o(this.defs,t)},a.gradientLinear=function(t,e,n,r){return s(this.defs,t,e,n,r)},a.gradientRadial=function(t,e,n,r,i){return u(this.defs,t,e,n,r,i)},a.toString=function(){var e,n=this.node.ownerDocument,r=n.createDocumentFragment(),i=n.createElement("div"),o=this.node.cloneNode(!0);return r.appendChild(i),i.appendChild(o),t._.$(o,{xmlns:"http://www.w3.org/2000/svg"}),e=i.innerHTML,r.removeChild(r.firstChild),e},a.clear=function(){for(var t,e=this.node.firstChild;e;)t=e.nextSibling,"defs"!=e.tagName?e.parentNode.removeChild(e):a.clear.call({node:e}),e=t}}()}),r.plugin(function(t,e,n,r){function i(t){var e=i.ps=i.ps||{};return e[t]?e[t].sleep=100:e[t]={sleep:100},setTimeout(function(){for(var n in e)e[P](n)&&n!=t&&(e[n].sleep--,!e[n].sleep&&delete e[n])}),e[t]}function o(t,e,n,r){return null==t&&(t=e=n=r=0),null==e&&(e=t.y,n=t.width,r=t.height,t=t.x),{x:t,y:e,width:n,w:n,height:r,h:r,x2:t+n,y2:e+r,cx:t+n/2,cy:e+r/2,r1:q.min(n,r)/2,r2:q.max(n,r)/2,r0:q.sqrt(n*n+r*r)/2,path:k(t,e,n,r),vb:[t,e,n,r].join(" ")}}function a(){return this.join(",").replace(D,"$1")}function s(t){var e=_(t);return e.toString=a,e}function u(t,e,n,r,i,o,a,s,u){return null==u?g(t,e,n,r,i,o,a,s):c(t,e,n,r,i,o,a,s,v(t,e,n,r,i,o,a,s,u))}function l(n,r){function i(t){return+(+t).toFixed(3)}return t._.cacher(function(t,o,a){t instanceof e&&(t=t.attr("d")),t=L(t);for(var s,l,f,h,d,p="",g={},v=0,m=0,y=t.length;m<y;m++){if(f=t[m],"M"==f[0])s=+f[1],l=+f[2];else{if(h=u(s,l,f[1],f[2],f[3],f[4],f[5],f[6]),v+h>o){if(r&&!g.start){if(d=u(s,l,f[1],f[2],f[3],f[4],f[5],f[6],o-v),p+=["C"+i(d.start.x),i(d.start.y),i(d.m.x),i(d.m.y),i(d.x),i(d.y)],a)return p;g.start=p,p=["M"+i(d.x),i(d.y)+"C"+i(d.n.x),i(d.n.y),i(d.end.x),i(d.end.y),i(f[5]),i(f[6])].join(),v+=h,s=+f[5],l=+f[6];continue}if(!n&&!r)return d=u(s,l,f[1],f[2],f[3],f[4],f[5],f[6],o-v)}v+=h,s=+f[5],l=+f[6]}p+=f.shift()+f}return g.end=p,d=n?v:r?g:c(s,l,f[0],f[1],f[2],f[3],f[4],f[5],1)},null,t._.clone)}function c(t,e,n,r,i,o,a,s,u){var l=1-u,c=U(l,3),f=U(l,2),h=u*u,d=h*u,p=c*t+3*f*u*n+3*l*u*u*i+d*a,g=c*e+3*f*u*r+3*l*u*u*o+d*s,v=t+2*u*(n-t)+h*(i-2*n+t),m=e+2*u*(r-e)+h*(o-2*r+e),y=n+2*u*(i-n)+h*(a-2*i+n),x=r+2*u*(o-r)+h*(s-2*o+r),b=l*t+u*n,w=l*e+u*r,S=l*i+u*a,C=l*o+u*s,k=90-180*q.atan2(v-y,m-x)/X;return{x:p,y:g,m:{x:v,y:m},n:{x:y,y:x},start:{x:b,y:w},end:{x:S,y:C},alpha:k}}function f(e,n,r,i,a,s,u,l){t.is(e,"array")||(e=[e,n,r,i,a,s,u,l]);var c=V.apply(null,e);return o(c.min.x,c.min.y,c.max.x-c.min.x,c.max.y-c.min.y)}function h(t,e,n){return e>=t.x&&e<=t.x+t.width&&n>=t.y&&n<=t.y+t.height}function d(t,e){return t=o(t),e=o(e),h(e,t.x,t.y)||h(e,t.x2,t.y)||h(e,t.x,t.y2)||h(e,t.x2,t.y2)||h(t,e.x,e.y)||h(t,e.x2,e.y)||h(t,e.x,e.y2)||h(t,e.x2,e.y2)||(t.x<e.x2&&t.x>e.x||e.x<t.x2&&e.x>t.x)&&(t.y<e.y2&&t.y>e.y||e.y<t.y2&&e.y>t.y)}function p(t,e,n,r,i){var o=-3*e+9*n-9*r+3*i,a=t*o+6*e-12*n+6*r;return t*a-3*e+3*n}function g(t,e,n,r,i,o,a,s,u){null==u&&(u=1),u=u>1?1:u<0?0:u;for(var l=u/2,c=12,f=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],h=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],d=0,g=0;g<c;g++){var v=l*f[g]+l,m=p(v,t,n,i,a),y=p(v,e,r,o,s),x=m*m+y*y;d+=h[g]*q.sqrt(x)}return l*d}function v(t,e,n,r,i,o,a,s,u){if(!(u<0||g(t,e,n,r,i,o,a,s)<u)){var l,c=1,f=c/2,h=c-f,d=.01;for(l=g(t,e,n,r,i,o,a,s,h);Y(l-u)>d;)f/=2,h+=(l<u?1:-1)*f,l=g(t,e,n,r,i,o,a,s,h);return h}}function m(t,e,n,r,i,o,a,s){if(!(I(t,n)<G(i,a)||G(t,n)>I(i,a)||I(e,r)<G(o,s)||G(e,r)>I(o,s))){var u=(t*r-e*n)*(i-a)-(t-n)*(i*s-o*a),l=(t*r-e*n)*(o-s)-(e-r)*(i*s-o*a),c=(t-n)*(o-s)-(e-r)*(i-a);if(c){var f=u/c,h=l/c,d=+f.toFixed(2),p=+h.toFixed(2);if(!(d<+G(t,n).toFixed(2)||d>+I(t,n).toFixed(2)||d<+G(i,a).toFixed(2)||d>+I(i,a).toFixed(2)||p<+G(e,r).toFixed(2)||p>+I(e,r).toFixed(2)||p<+G(o,s).toFixed(2)||p>+I(o,s).toFixed(2)))return{x:f,y:h}}}}function y(t,e,n){var r=f(t),i=f(e);if(!d(r,i))return n?0:[];for(var o=g.apply(0,t),a=g.apply(0,e),s=~~(o/8),u=~~(a/8),l=[],h=[],p={},v=n?0:[],y=0;y<s+1;y++){var x=c.apply(0,t.concat(y/s));l.push({x:x.x,y:x.y,t:y/s})}for(y=0;y<u+1;y++)x=c.apply(0,e.concat(y/u)),h.push({x:x.x,y:x.y,t:y/u});for(y=0;y<s;y++)for(var b=0;b<u;b++){var w=l[y],S=l[y+1],C=h[b],k=h[b+1],B=Y(S.x-w.x)<.001?"y":"x",E=Y(k.x-C.x)<.001?"y":"x",M=m(w.x,w.y,S.x,S.y,C.x,C.y,k.x,k.y);if(M){if(p[M.x.toFixed(4)]==M.y.toFixed(4))continue;p[M.x.toFixed(4)]=M.y.toFixed(4);var A=w.t+Y((M[B]-w[B])/(S[B]-w[B]))*(S.t-w.t),j=C.t+Y((M[E]-C[E])/(k[E]-C[E]))*(k.t-C.t);A>=0&&A<=1&&j>=0&&j<=1&&(n?v++:v.push({x:M.x,y:M.y,t1:A,t2:j}))}}return v}function x(t,e){return w(t,e)}function b(t,e){return w(t,e,1)}function w(t,e,n){t=L(t),e=L(e);for(var r,i,o,a,s,u,l,c,f,h,d=n?0:[],p=0,g=t.length;p<g;p++){var v=t[p];if("M"==v[0])r=s=v[1],i=u=v[2];else{"C"==v[0]?(f=[r,i].concat(v.slice(1)),r=f[6],i=f[7]):(f=[r,i,r,i,s,u,s,u],r=s,i=u);for(var m=0,x=e.length;m<x;m++){var b=e[m];if("M"==b[0])o=l=b[1],a=c=b[2];else{"C"==b[0]?(h=[o,a].concat(b.slice(1)),o=h[6],a=h[7]):(h=[o,a,o,a,l,c,l,c],o=l,a=c);var w=y(f,h,n);if(n)d+=w;else{for(var S=0,C=w.length;S<C;S++)w[S].segment1=p,w[S].segment2=m,w[S].bez1=f,w[S].bez2=h;d=d.concat(w)}}}}}return d}function S(t,e,n){var r=C(t);return h(r,e,n)&&w(t,[["M",e,n],["H",r.x2+10]],1)%2==1}function C(t){var e=i(t);if(e.bbox)return _(e.bbox);if(!t)return o();t=L(t);for(var n,r=0,a=0,s=[],u=[],l=0,c=t.length;l<c;l++)if(n=t[l],"M"==n[0])r=n[1],a=n[2],s.push(r),u.push(a);else{var f=V(r,a,n[1],n[2],n[3],n[4],n[5],n[6]);s=s.concat(f.min.x,f.max.x),u=u.concat(f.min.y,f.max.y),r=n[5],a=n[6]}var h=G.apply(0,s),d=G.apply(0,u),p=I.apply(0,s),g=I.apply(0,u),v=o(h,d,p-h,g-d);return e.bbox=_(v),v}function k(t,e,n,r,i){if(i)return[["M",+t+ +i,e],["l",n-2*i,0],["a",i,i,0,0,1,i,i],["l",0,r-2*i],["a",i,i,0,0,1,-i,i],["l",2*i-n,0],["a",i,i,0,0,1,-i,-i],["l",0,2*i-r],["a",i,i,0,0,1,i,-i],["z"]];var o=[["M",t,e],["l",n,0],["l",0,r],["l",-n,0],["z"]];return o.toString=a,o}function B(t,e,n,r,i){if(null==i&&null==r&&(r=n),t=+t,e=+e,n=+n,r=+r,null!=i)var o=Math.PI/180,s=t+n*Math.cos(-r*o),u=t+n*Math.cos(-i*o),l=e+n*Math.sin(-r*o),c=e+n*Math.sin(-i*o),f=[["M",s,l],["A",n,n,0,+(i-r>180),0,u,c]];else f=[["M",t,e],["m",0,-r],["a",n,r,0,1,1,0,2*r],["a",n,r,0,1,1,0,-2*r],["z"]];return f.toString=a,f}function E(e){var n=i(e),r=String.prototype.toLowerCase;if(n.rel)return s(n.rel);t.is(e,"array")&&t.is(e&&e[0],"array")||(e=t.parsePathString(e));var o=[],u=0,l=0,c=0,f=0,h=0;"M"==e[0][0]&&(u=e[0][1],l=e[0][2],c=u,f=l,h++,o.push(["M",u,l]));for(var d=h,p=e.length;d<p;d++){var g=o[d]=[],v=e[d];if(v[0]!=r.call(v[0]))switch(g[0]=r.call(v[0]),g[0]){case"a":g[1]=v[1],g[2]=v[2],g[3]=v[3],g[4]=v[4],g[5]=v[5],g[6]=+(v[6]-u).toFixed(3),g[7]=+(v[7]-l).toFixed(3);break;case"v":g[1]=+(v[1]-l).toFixed(3);break;case"m":c=v[1],f=v[2];default:for(var m=1,y=v.length;m<y;m++)g[m]=+(v[m]-(m%2?u:l)).toFixed(3)}else{g=o[d]=[],"m"==v[0]&&(c=v[1]+u,f=v[2]+l);for(var x=0,b=v.length;x<b;x++)o[d][x]=v[x]}var w=o[d].length;switch(o[d][0]){case"z":u=c,l=f;break;case"h":u+=+o[d][w-1];break;case"v":l+=+o[d][w-1];break;default:u+=+o[d][w-2],l+=+o[d][w-1]}}return o.toString=a,n.rel=s(o),o}function M(e){var n=i(e);if(n.abs)return s(n.abs);if(O(e,"array")&&O(e&&e[0],"array")||(e=t.parsePathString(e)),!e||!e.length)return[["M",0,0]];var r,o=[],u=0,l=0,c=0,f=0,h=0;"M"==e[0][0]&&(u=+e[0][1],l=+e[0][2],c=u,f=l,h++,o[0]=["M",u,l]);for(var d,p,g=3==e.length&&"M"==e[0][0]&&"R"==e[1][0].toUpperCase()&&"Z"==e[2][0].toUpperCase(),v=h,m=e.length;v<m;v++){if(o.push(d=[]),p=e[v],r=p[0],r!=r.toUpperCase())switch(d[0]=r.toUpperCase(),d[0]){case"A":d[1]=p[1],d[2]=p[2],d[3]=p[3],d[4]=p[4],d[5]=p[5],d[6]=+p[6]+u,d[7]=+p[7]+l;break;case"V":d[1]=+p[1]+l;break;case"H":d[1]=+p[1]+u;break;case"R":for(var y=[u,l].concat(p.slice(1)),x=2,b=y.length;x<b;x++)y[x]=+y[x]+u,y[++x]=+y[x]+l;o.pop(),o=o.concat(N(y,g));break;case"O":o.pop(),y=B(u,l,p[1],p[2]),y.push(y[0]),o=o.concat(y);break;case"U":o.pop(),o=o.concat(B(u,l,p[1],p[2],p[3])),d=["U"].concat(o[o.length-1].slice(-2));break;case"M":c=+p[1]+u,f=+p[2]+l;default:for(x=1,b=p.length;x<b;x++)d[x]=+p[x]+(x%2?u:l)}else if("R"==r)y=[u,l].concat(p.slice(1)),o.pop(),o=o.concat(N(y,g)),d=["R"].concat(p.slice(-2));else if("O"==r)o.pop(),y=B(u,l,p[1],p[2]),y.push(y[0]),o=o.concat(y);else if("U"==r)o.pop(),o=o.concat(B(u,l,p[1],p[2],p[3])),d=["U"].concat(o[o.length-1].slice(-2));else for(var w=0,S=p.length;w<S;w++)d[w]=p[w];if(r=r.toUpperCase(),"O"!=r)switch(d[0]){case"Z":u=+c,l=+f;break;case"H":u=d[1];break;case"V":l=d[1];break;case"M":c=d[d.length-2],f=d[d.length-1];default:u=d[d.length-2],l=d[d.length-1]}}return o.toString=a,n.abs=s(o),o}function A(t,e,n,r){return[t,e,n,r,n,r]}function j(t,e,n,r,i,o){var a=1/3,s=2/3;return[a*t+s*n,a*e+s*r,a*i+s*n,a*o+s*r,i,o]}function T(e,n,r,i,o,a,s,u,l,c){var f,h=120*X/180,d=X/180*(+o||0),p=[],g=t._.cacher(function(t,e,n){var r=t*q.cos(n)-e*q.sin(n),i=t*q.sin(n)+e*q.cos(n);return{x:r,y:i}});if(c)k=c[0],B=c[1],S=c[2],C=c[3];else{f=g(e,n,-d),e=f.x,n=f.y,f=g(u,l,-d),u=f.x,l=f.y;var v=(q.cos(X/180*o),q.sin(X/180*o),(e-u)/2),m=(n-l)/2,y=v*v/(r*r)+m*m/(i*i);y>1&&(y=q.sqrt(y),r*=y,i*=y);var x=r*r,b=i*i,w=(a==s?-1:1)*q.sqrt(Y((x*b-x*m*m-b*v*v)/(x*m*m+b*v*v))),S=w*r*m/i+(e+u)/2,C=w*-i*v/r+(n+l)/2,k=q.asin(((n-C)/i).toFixed(9)),B=q.asin(((l-C)/i).toFixed(9));k=e<S?X-k:k,B=u<S?X-B:B,k<0&&(k=2*X+k),B<0&&(B=2*X+B),s&&k>B&&(k-=2*X),!s&&B>k&&(B-=2*X)}var E=B-k;if(Y(E)>h){var M=B,A=u,j=l;B=k+h*(s&&B>k?1:-1),u=S+r*q.cos(B),l=C+i*q.sin(B),p=T(u,l,r,i,o,0,s,A,j,[B,M,S,C])}E=B-k;var V=q.cos(k),L=q.sin(k),F=q.cos(B),N=q.sin(B),z=q.tan(E/4),O=4/3*r*z,_=4/3*i*z,P=[e,n],D=[e+O*L,n-_*V],R=[u+O*N,l-_*F],G=[u,l];if(D[0]=2*P[0]-D[0],D[1]=2*P[1]-D[1],c)return[D,R,G].concat(p);p=[D,R,G].concat(p).join().split(",");for(var I=[],U=0,$=p.length;U<$;U++)I[U]=U%2?g(p[U-1],p[U],d).y:g(p[U],p[U+1],d).x;return I}function V(t,e,n,r,i,o,a,s){for(var u,l,c,f,h,d,p,g,v=[],m=[[],[]],y=0;y<2;++y)if(0==y?(l=6*t-12*n+6*i,u=-3*t+9*n-9*i+3*a,c=3*n-3*t):(l=6*e-12*r+6*o,u=-3*e+9*r-9*o+3*s,c=3*r-3*e),Y(u)<1e-12){if(Y(l)<1e-12)continue;f=-c/l,0<f&&f<1&&v.push(f)}else p=l*l-4*c*u,g=q.sqrt(p),p<0||(h=(-l+g)/(2*u),0<h&&h<1&&v.push(h),d=(-l-g)/(2*u),0<d&&d<1&&v.push(d));for(var x,b=v.length,w=b;b--;)f=v[b],x=1-f,m[0][b]=x*x*x*t+3*x*x*f*n+3*x*f*f*i+f*f*f*a,m[1][b]=x*x*x*e+3*x*x*f*r+3*x*f*f*o+f*f*f*s;return m[0][w]=t,m[1][w]=e,m[0][w+1]=a,m[1][w+1]=s,m[0].length=m[1].length=w+2,{min:{x:G.apply(0,m[0]),y:G.apply(0,m[1])},max:{x:I.apply(0,m[0]),y:I.apply(0,m[1])}}}function L(t,e){var n=!e&&i(t);if(!e&&n.curve)return s(n.curve);for(var r=M(t),o=e&&M(e),a={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},u={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},l=(function(t,e,n){var r,i;if(!t)return["C",e.x,e.y,e.x,e.y,e.x,e.y];switch(!(t[0]in{T:1,Q:1})&&(e.qx=e.qy=null),t[0]){case"M":e.X=t[1],e.Y=t[2];break;case"A":t=["C"].concat(T.apply(0,[e.x,e.y].concat(t.slice(1))));break;case"S":"C"==n||"S"==n?(r=2*e.x-e.bx,i=2*e.y-e.by):(r=e.x,i=e.y),t=["C",r,i].concat(t.slice(1));break;case"T":"Q"==n||"T"==n?(e.qx=2*e.x-e.qx,e.qy=2*e.y-e.qy):(e.qx=e.x,e.qy=e.y),t=["C"].concat(j(e.x,e.y,e.qx,e.qy,t[1],t[2]));break;case"Q":e.qx=t[1],e.qy=t[2],t=["C"].concat(j(e.x,e.y,t[1],t[2],t[3],t[4]));break;case"L":t=["C"].concat(A(e.x,e.y,t[1],t[2]));break;case"H":t=["C"].concat(A(e.x,e.y,t[1],e.y));break;case"V":t=["C"].concat(A(e.x,e.y,e.x,t[1]));break;case"Z":t=["C"].concat(A(e.x,e.y,e.X,e.Y))}return t}),c=function(t,e){if(t[e].length>7){t[e].shift();for(var n=t[e];n.length;)h[e]="A",o&&(d[e]="A"),t.splice(e++,0,["C"].concat(n.splice(0,6)));t.splice(e,1),m=I(r.length,o&&o.length||0)}},f=function(t,e,n,i,a){t&&e&&"M"==t[a][0]&&"M"!=e[a][0]&&(e.splice(a,0,["M",i.x,i.y]),n.bx=0,n.by=0,n.x=t[a][1],n.y=t[a][2],m=I(r.length,o&&o.length||0))},h=[],d=[],p="",g="",v=0,m=I(r.length,o&&o.length||0);v<m;v++){r[v]&&(p=r[v][0]),"C"!=p&&(h[v]=p,v&&(g=h[v-1])),r[v]=l(r[v],a,g),"A"!=h[v]&&"C"==p&&(h[v]="C"),c(r,v),o&&(o[v]&&(p=o[v][0]),"C"!=p&&(d[v]=p,v&&(g=d[v-1])),o[v]=l(o[v],u,g),"A"!=d[v]&&"C"==p&&(d[v]="C"),c(o,v)),f(r,o,a,u,v),f(o,r,u,a,v);var y=r[v],x=o&&o[v],b=y.length,w=o&&x.length;a.x=y[b-2],a.y=y[b-1],a.bx=R(y[b-4])||a.x,a.by=R(y[b-3])||a.y,u.bx=o&&(R(x[w-4])||u.x),u.by=o&&(R(x[w-3])||u.y),u.x=o&&x[w-2],u.y=o&&x[w-1]}return o||(n.curve=s(r)),o?[r,o]:r}function F(t,e){if(!e)return t;var n,r,i,o,a,s,u;for(t=L(t),i=0,a=t.length;i<a;i++)for(u=t[i],o=1,s=u.length;o<s;o+=2)n=e.x(u[o],u[o+1]),r=e.y(u[o],u[o+1]),u[o]=n,u[o+1]=r;return t}function N(t,e){for(var n=[],r=0,i=t.length;i-2*!e>r;r+=2){var o=[{x:+t[r-2],y:+t[r-1]},{x:+t[r],y:+t[r+1]},{x:+t[r+2],y:+t[r+3]},{x:+t[r+4],y:+t[r+5]}];e?r?i-4==r?o[3]={x:+t[0],y:+t[1]}:i-2==r&&(o[2]={x:+t[0],y:+t[1]},o[3]={x:+t[2],y:+t[3]}):o[0]={x:+t[i-2],y:+t[i-1]}:i-4==r?o[3]=o[2]:r||(o[0]={x:+t[r],y:+t[r+1]}),n.push(["C",(-o[0].x+6*o[1].x+o[2].x)/6,(-o[0].y+6*o[1].y+o[2].y)/6,(o[1].x+6*o[2].x-o[3].x)/6,(o[1].y+6*o[2].y-o[3].y)/6,o[2].x,o[2].y])}return n}var z=e.prototype,O=t.is,_=t._.clone,P="hasOwnProperty",D=/,?([a-z]),?/gi,R=parseFloat,q=Math,X=q.PI,G=q.min,I=q.max,U=q.pow,Y=q.abs,$=l(1),H=l(),W=l(0,1),Z=t._unit2px,J={path:function(t){return t.attr("path")},circle:function(t){var e=Z(t);return B(e.cx,e.cy,e.r)},ellipse:function(t){var e=Z(t);return B(e.cx||0,e.cy||0,e.rx,e.ry)},rect:function(t){var e=Z(t);return k(e.x||0,e.y||0,e.width,e.height,e.rx,e.ry)},image:function(t){var e=Z(t);return k(e.x||0,e.y||0,e.width,e.height)},line:function(t){return"M"+[t.attr("x1")||0,t.attr("y1")||0,t.attr("x2"),t.attr("y2")]},polyline:function(t){return"M"+t.attr("points")},polygon:function(t){return"M"+t.attr("points")+"z"},deflt:function(t){var e=t.node.getBBox();return k(e.x,e.y,e.width,e.height)}};t.path=i,t.path.getTotalLength=$,t.path.getPointAtLength=H,t.path.getSubpath=function(t,e,n){if(this.getTotalLength(t)-n<1e-6)return W(t,e).end;var r=W(t,n,1);return e?W(r,e).end:r},z.getTotalLength=function(){if(this.node.getTotalLength)return this.node.getTotalLength()},z.getPointAtLength=function(t){return H(this.attr("d"),t)},z.getSubpath=function(e,n){return t.path.getSubpath(this.attr("d"),e,n)},t._.box=o,t.path.findDotsAtSegment=c,t.path.bezierBBox=f,t.path.isPointInsideBBox=h,t.path.isBBoxIntersect=d,t.path.intersection=x,t.path.intersectionNumber=b,t.path.isPointInside=S,t.path.getBBox=C,t.path.get=J,t.path.toRelative=E,t.path.toAbsolute=M,t.path.toCubic=L,t.path.map=F,t.path.toString=a,t.path.clone=s}),r.plugin(function(t,r,i,o){var a=Math.max,s=Math.min,u=function(t){if(this.items=[],this.bindings={},this.length=0,this.type="set",t)for(var e=0,n=t.length;e<n;e++)t[e]&&(this[this.items.length]=this.items[this.items.length]=t[e],this.length++)},l=u.prototype;l.push=function(){for(var t,e,n=0,r=arguments.length;n<r;n++)t=arguments[n],t&&(e=this.items.length,this[e]=this.items[e]=t,this.length++);return this},l.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},l.forEach=function(t,e){for(var n=0,r=this.items.length;n<r;n++)if(t.call(e,this.items[n],n)===!1)return this;return this},l.animate=function(r,i,o,a){"function"!=typeof o||o.length||(a=o,o=n.linear),r instanceof t._.Animation&&(a=r.callback,o=r.easing,i=o.dur,r=r.attr);var s=arguments;if(t.is(r,"array")&&t.is(s[s.length-1],"array"))var u=!0;var l,c=function(){l?this.b=l:l=this.b},f=0,h=a&&function(){f++==this.length&&a.call(this)};return this.forEach(function(t,n){e.once("snap.animcreated."+t.id,c),u?s[n]&&t.animate.apply(t,s[n]):t.animate(r,i,o,h)})},l.remove=function(){for(;this.length;)this.pop().remove();return this},l.bind=function(t,e,n){var r={};if("function"==typeof e)this.bindings[t]=e;else{var i=n||t;this.bindings[t]=function(t){r[i]=t,e.attr(r)}}return this},l.attr=function(t){var e={};for(var n in t)this.bindings[n]?this.bindings[n](t[n]):e[n]=t[n];for(var r=0,i=this.items.length;r<i;r++)this.items[r].attr(e);return this},l.clear=function(){for(;this.length;)this.pop()},l.splice=function(t,e,n){t=t<0?a(this.length+t,0):t,e=a(0,s(this.length-t,e));var r,i=[],o=[],l=[];for(r=2;r<arguments.length;r++)l.push(arguments[r]);for(r=0;r<e;r++)o.push(this[t+r]);for(;r<this.length-t;r++)i.push(this[t+r]);var c=l.length;for(r=0;r<c+i.length;r++)this.items[t+r]=this[t+r]=r<c?l[r]:i[r-c];for(r=this.items.length=this.length-=e-c;this[r];)delete this[r++];return new u(o)},l.exclude=function(t){for(var e=0,n=this.length;e<n;e++)if(this[e]==t)return this.splice(e,1),!0;return!1},l.insertAfter=function(t){for(var e=this.items.length;e--;)this.items[e].insertAfter(t);return this},l.getBBox=function(){for(var t=[],e=[],n=[],r=[],i=this.items.length;i--;)if(!this.items[i].removed){var o=this.items[i].getBBox();t.push(o.x),e.push(o.y),n.push(o.x+o.width),r.push(o.y+o.height)}return t=s.apply(0,t),e=s.apply(0,e),n=a.apply(0,n),r=a.apply(0,r),{x:t,y:e,x2:n,y2:r,width:n-t,height:r-e,cx:t+(n-t)/2,cy:e+(r-e)/2}},l.clone=function(t){t=new u;for(var e=0,n=this.items.length;e<n;e++)t.push(this.items[e].clone());return t},l.toString=function(){return"Snap‘s set"},l.type="set",t.set=function(){var t=new u;return arguments.length&&t.push.apply(t,Array.prototype.slice.call(arguments,0)),t}}),r.plugin(function(t,n,r,i){function o(t){var e=t[0];switch(e.toLowerCase()){case"t":return[e,0,0];case"m":return[e,1,0,0,1,0,0];case"r":return 4==t.length?[e,0,t[2],t[3]]:[e,0];case"s":return 5==t.length?[e,1,1,t[3],t[4]]:3==t.length?[e,1,1]:[e,1]}}function a(e,n,r){n=p(n).replace(/\.{3}|\u2026/g,e),e=t.parseTransformString(e)||[],n=t.parseTransformString(n)||[];for(var i,a,s,u,l=Math.max(e.length,n.length),h=[],d=[],g=0;g<l;g++){if(s=e[g]||o(n[g]),u=n[g]||o(s),s[0]!=u[0]||"r"==s[0].toLowerCase()&&(s[2]!=u[2]||s[3]!=u[3])||"s"==s[0].toLowerCase()&&(s[3]!=u[3]||s[4]!=u[4])){
e=t._.transform2matrix(e,r()),n=t._.transform2matrix(n,r()),h=[["m",e.a,e.b,e.c,e.d,e.e,e.f]],d=[["m",n.a,n.b,n.c,n.d,n.e,n.f]];break}for(h[g]=[],d[g]=[],i=0,a=Math.max(s.length,u.length);i<a;i++)i in s&&(h[g][i]=s[i]),i in u&&(d[g][i]=u[i])}return{from:f(h),to:f(d),f:c(h)}}function s(t){return t}function u(t){return function(e){return+e.toFixed(3)+t}}function l(e){return t.rgb(e[0],e[1],e[2])}function c(t){var e,n,r,i,o,a,s=0,u=[];for(e=0,n=t.length;e<n;e++){for(o="[",a=['"'+t[e][0]+'"'],r=1,i=t[e].length;r<i;r++)a[r]="val["+s++ +"]";o+=a+"]",u[e]=o}return Function("val","return Snap.path.toString.call(["+u+"])")}function f(t){for(var e=[],n=0,r=t.length;n<r;n++)for(var i=1,o=t[n].length;i<o;i++)e.push(t[n][i]);return e}var h={},d=/[a-z]+$/i,p=String;h.stroke=h.fill="colour",n.prototype.equal=function(t,n){return e("snap.util.equal",this,t,n).firstDefined()},e.on("snap.util.equal",function(e,n){var r,i,o=p(this.attr(e)||""),g=this;if(o==+o&&n==+n)return{from:+o,to:+n,f:s};if("colour"==h[e])return r=t.color(o),i=t.color(n),{from:[r.r,r.g,r.b,r.opacity],to:[i.r,i.g,i.b,i.opacity],f:l};if("transform"==e||"gradientTransform"==e||"patternTransform"==e)return n instanceof t.Matrix&&(n=n.toTransformString()),t._.rgTransform.test(n)||(n=t._.svgTransform2string(n)),a(o,n,function(){return g.getBBox(1)});if("d"==e||"path"==e)return r=t.path.toCubic(o,n),{from:f(r[0]),to:f(r[1]),f:c(r[0])};if("points"==e)return r=p(o).split(t._.separator),i=p(n).split(t._.separator),{from:r,to:i,f:function(t){return t}};aUnit=o.match(d);var v=p(n).match(d);return aUnit&&aUnit==v?{from:parseFloat(o),to:parseFloat(n),f:u(aUnit)}:{from:this.asPX(e),to:this.asPX(e,n),f:s}})}),r.plugin(function(t,n,r,i){for(var o=n.prototype,a="hasOwnProperty",s=("createTouch"in i.doc),u=["click","dblclick","mousedown","mousemove","mouseout","mouseover","mouseup","touchstart","touchmove","touchend","touchcancel"],l={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},c=(function(t,e){var n="y"==t?"scrollTop":"scrollLeft",r=e&&e.node?e.node.ownerDocument:i.doc;return r[n in r.documentElement?"documentElement":"body"][n]}),f=function(){this.returnValue=!1},h=function(){return this.originalEvent.preventDefault()},d=function(){this.cancelBubble=!0},p=function(){return this.originalEvent.stopPropagation()},g=function(){return i.doc.addEventListener?function(t,e,n,r){var i=s&&l[e]?l[e]:e,o=function(i){var o=c("y",r),u=c("x",r);if(s&&l[a](e))for(var f=0,d=i.targetTouches&&i.targetTouches.length;f<d;f++)if(i.targetTouches[f].target==t||t.contains(i.targetTouches[f].target)){var g=i;i=i.targetTouches[f],i.originalEvent=g,i.preventDefault=h,i.stopPropagation=p;break}var v=i.clientX+u,m=i.clientY+o;return n.call(r,i,v,m)};return e!==i&&t.addEventListener(e,o,!1),t.addEventListener(i,o,!1),function(){return e!==i&&t.removeEventListener(e,o,!1),t.removeEventListener(i,o,!1),!0}}:i.doc.attachEvent?function(t,e,n,r){var i=function(t){t=t||r.node.ownerDocument.window.event;var e=c("y",r),i=c("x",r),o=t.clientX+i,a=t.clientY+e;return t.preventDefault=t.preventDefault||f,t.stopPropagation=t.stopPropagation||d,n.call(r,t,o,a)};t.attachEvent("on"+e,i);var o=function(){return t.detachEvent("on"+e,i),!0};return o}:void 0}(),v=[],m=function(t){for(var n,r=t.clientX,i=t.clientY,o=c("y"),a=c("x"),u=v.length;u--;){if(n=v[u],s){for(var l,f=t.touches&&t.touches.length;f--;)if(l=t.touches[f],l.identifier==n.el._drag.id||n.el.node.contains(l.target)){r=l.clientX,i=l.clientY,(t.originalEvent?t.originalEvent:t).preventDefault();break}}else t.preventDefault();var h=n.el.node;h.nextSibling,h.parentNode,h.style.display;r+=a,i+=o,e("snap.drag.move."+n.el.id,n.move_scope||n.el,r-n.el._drag.x,i-n.el._drag.y,r,i,t)}},y=function(n){t.unmousemove(m).unmouseup(y);for(var r,i=v.length;i--;)r=v[i],r.el._drag={},e("snap.drag.end."+r.el.id,r.end_scope||r.start_scope||r.move_scope||r.el,n);v=[]},x=u.length;x--;)!function(e){t[e]=o[e]=function(n,r){return t.is(n,"function")&&(this.events=this.events||[],this.events.push({name:e,f:n,unbind:g(this.node||document,e,n,r||this)})),this},t["un"+e]=o["un"+e]=function(t){for(var n=this.events||[],r=n.length;r--;)if(n[r].name==e&&(n[r].f==t||!t))return n[r].unbind(),n.splice(r,1),!n.length&&delete this.events,this;return this}}(u[x]);o.hover=function(t,e,n,r){return this.mouseover(t,n).mouseout(e,r||n)},o.unhover=function(t,e){return this.unmouseover(t).unmouseout(e)};var b=[];o.drag=function(n,r,i,o,a,s){function u(u,l,c){(u.originalEvent||u).preventDefault(),this._drag.x=l,this._drag.y=c,this._drag.id=u.identifier,!v.length&&t.mousemove(m).mouseup(y),v.push({el:this,move_scope:o,start_scope:a,end_scope:s}),r&&e.on("snap.drag.start."+this.id,r),n&&e.on("snap.drag.move."+this.id,n),i&&e.on("snap.drag.end."+this.id,i),e("snap.drag.start."+this.id,a||o||this,l,c,u)}if(!arguments.length){var l;return this.drag(function(t,e){this.attr({transform:l+(l?"T":"t")+[t,e]})},function(){l=this.transform().local})}return this._drag={},b.push({el:this,start:u}),this.mousedown(u),this},o.undrag=function(){for(var n=b.length;n--;)b[n].el==this&&(this.unmousedown(b[n].start),b.splice(n,1),e.unbind("snap.drag.*."+this.id));return!b.length&&t.unmousemove(m).unmouseup(y),this}}),r.plugin(function(t,n,r,i){var o=(n.prototype,r.prototype),a=/^\s*url\((.+)\)/,s=String,u=t._.$;t.filter={},o.filter=function(e){var r=this;"svg"!=r.type&&(r=r.paper);var i=t.parse(s(e)),o=t._.id(),a=(r.node.offsetWidth,r.node.offsetHeight,u("filter"));return u(a,{id:o,filterUnits:"userSpaceOnUse"}),a.appendChild(i.node),r.defs.appendChild(a),new n(a)},e.on("snap.util.getattr.filter",function(){e.stop();var n=u(this.node,"filter");if(n){var r=s(n).match(a);return r&&t.select(r[1])}}),e.on("snap.util.attr.filter",function(r){if(r instanceof n&&"filter"==r.type){e.stop();var i=r.node.id;i||(u(r.node,{id:r.id}),i=r.id),u(this.node,{filter:t.url(i)})}r&&"none"!=r||(e.stop(),this.node.removeAttribute("filter"))}),t.filter.blur=function(e,n){null==e&&(e=2);var r=null==n?e:[e,n];return t.format('<feGaussianBlur stdDeviation="{def}"/>',{def:r})},t.filter.blur.toString=function(){return this()},t.filter.shadow=function(e,n,r,i,o){return"string"==typeof r&&(i=r,o=i,r=4),"string"!=typeof i&&(o=i,i="#000"),i=i||"#000",null==r&&(r=4),null==o&&(o=1),null==e&&(e=0,n=2),null==n&&(n=e),i=t.color(i),t.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>',{color:i,dx:e,dy:n,blur:r,opacity:o})},t.filter.shadow.toString=function(){return this()},t.filter.grayscale=function(e){return null==e&&(e=1),t.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>',{a:.2126+.7874*(1-e),b:.7152-.7152*(1-e),c:.0722-.0722*(1-e),d:.2126-.2126*(1-e),e:.7152+.2848*(1-e),f:.0722-.0722*(1-e),g:.2126-.2126*(1-e),h:.0722+.9278*(1-e)})},t.filter.grayscale.toString=function(){return this()},t.filter.sepia=function(e){return null==e&&(e=1),t.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>',{a:.393+.607*(1-e),b:.769-.769*(1-e),c:.189-.189*(1-e),d:.349-.349*(1-e),e:.686+.314*(1-e),f:.168-.168*(1-e),g:.272-.272*(1-e),h:.534-.534*(1-e),i:.131+.869*(1-e)})},t.filter.sepia.toString=function(){return this()},t.filter.saturate=function(e){return null==e&&(e=1),t.format('<feColorMatrix type="saturate" values="{amount}"/>',{amount:1-e})},t.filter.saturate.toString=function(){return this()},t.filter.hueRotate=function(e){return e=e||0,t.format('<feColorMatrix type="hueRotate" values="{angle}"/>',{angle:e})},t.filter.hueRotate.toString=function(){return this()},t.filter.invert=function(e){return null==e&&(e=1),t.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>',{amount:e,amount2:1-e})},t.filter.invert.toString=function(){return this()},t.filter.brightness=function(e){return null==e&&(e=1),t.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>',{amount:e})},t.filter.brightness.toString=function(){return this()},t.filter.contrast=function(e){return null==e&&(e=1),t.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>',{amount:e,amount2:.5-e/2})},t.filter.contrast.toString=function(){return this()}}),r})}).call(window)},function(t,e,n){var r=n(3);t.exports={create:function(t){return r(t)}}},function(t,e,n){function r(){}function i(t){function e(t,e){function r(){if(i&&o)return a?(g.error("Could not load graphic files"),void setTimeout(x.emit.bind(null,"error"))):void n(i.response,o.response)}var i,o,a=!1;h(t,function(t){h.invalidResponse(t)&&(a=!0),i=t,r()}),h(e,function(t){h.invalidResponse(t)&&(a=!0),o=t,r()})}function n(t,e){try{"string"==typeof e&&(e=JSON.parse(e)),e.settings&&i(e.settings),b.load(t),C.load(e),setTimeout(x.emit.bind(null,"ready"))}catch(t){g.error("Error initializing graphic",t),x.emit("error")}}function i(t){k=d(t),v()}function v(){b.element.style["image-rendering"]="speed"==k.imageRendering?"pixelated":"auto"}function m(){b.destroy(),w.destroy(),C.destroy(),S.destroy(),x.destroy()}var y=new r,x=a();o.assign(y,x);var b=y.document=new s(t,y),w=y.view=new u(y),S=y.scheduler=new l(y),C=y.runtime=new c(y),k=d();return p.create(b),o.assign(y,{loadUrl:e,load:n,get config(){return C.config},get settings(){return k},setSettings:i,setAssetRoot:b.setAssetRoot,destroy:m,element:C.getElement,variable:C.getVariable,getValue:C.getValue,setValue:C.setValue,logger:f}),y}var o=n(4),a=n(5),s=n(6),u=n(8),l=n(14),c=n(16),f=n(15),h=n(46),d=n(47),p=n(48),g=f("archer.graphic");t.exports=i},function(t,e){var n=Object.prototype;t.exports={isNumber:function(t){return"number"==typeof t||null!=t&&"[object Number]"==n.toString.call(t)},isString:function(t){return"string"==typeof t||null!=t&&"[object String]"==n.toString.call(t)},isFunction:function(t){return"function"==typeof t||null!=t&&"[object Function]"==n.toString.call(t)},isObject:function(t){return null!=t&&"object"==typeof t},assign:function(t){return Array.prototype.slice.call(arguments,1).forEach(function(e){e&&Object.getOwnPropertyNames(e).forEach(function(n){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r)})}),t},forEach:function(t,e,n){Array.prototype.forEach.call(t,e,n)},forIn:function(t,e,n){for(var r in t){var i=t[r];e.call(n,i,r)}},find:function(t,e,n){var r=t.filter(e,n);return r.length?r[0]:null},toArray:function(t){return Object.keys(t).map(function(e){return t[e]})},curry:function(t){var e=t.length;return function n(){var r=Array.prototype.slice.call(arguments,0);return r.length>=e?t.apply(null,r):function(){var t=Array.prototype.slice.call(arguments,0);return n.apply(null,r.concat(t))}}},memoize:function(t){var e={};return function(n){return n in e?e[n]:e[n]=t(n)}},noop:function(){}}},function(t,e){t.exports=function(t,e){function n(t){var e=c[t];return e||(e=[],c[t]=e),e}function r(t,e){var r=n(t);return r.push(e),i.bind(null,t,e)}function i(t,e){var r=n(t),i=r.indexOf(e);i>=0&&r.splice(i,1)}function o(){c={}}function a(e){u.apply(null,arguments);var n=l(e),r=Array.prototype.slice.call(arguments,1);t&&t.bubble.apply(null,[n].concat(r))}function s(){u.apply(null,arguments),t&&t.bubble.apply(null,arguments)}function u(t){var e=n(t),r=Array.prototype.slice.call(arguments,1);e.forEach(function(t){t.apply(null,r)})}function l(t){return e?e+"."+t:t}var c={};return{on:r,off:i,emit:a,bubble:s,getListeners:n,destroy:o}}},function(t,e,n){function r(){}function i(t,e){function n(){for(;t.firstChild;)t.removeChild(t.firstChild);var e=Snap();e.appendTo(t),V=Snap(e.node),V.attr({overflow:"hidden",display:"block"}),F=null}function i(){V.clear(),V=null,t=null}function d(t){v(),f(!!t,"Content must not be null"),t=o(t);var e;t.node instanceof SVGSVGElement&&(e=Snap(t.node)),e||(e=t.select("svg")),f(!!e,"Content must be or contain an SVG element"),F=a(e),p(e)}function p(t,e){if(t=o(t),e=e||V,k(t),t.node instanceof DocumentFragment){var n=t.node.children.map(o);n.forEach(function(t){V.append(t,e)})}else V.append(t,e);T.emit("contentChange")}function g(t){t=o(t),t.remove(),T.emit("contentChange")}function v(){V.clear(),T.emit("contentChange")}function m(t){return V.select(t)}function y(t){return o(t)}function x(t){return"string"==typeof t?m(t):y(t)}function b(t){return m("#"+l(t))}function w(t,e){return Snap.getElementByPoint(t,e)}function S(t){t&&t.length&&"/"!=t.charAt(t.length-1)&&(t+="/"),L=t}function C(t){if(t){var e=parseFloat(t.x)||0,n=parseFloat(t.y)||0,r=parseFloat(t.width)||0,i=parseFloat(t.height)||0;F={x:e,y:n,width:r,height:i}}else F=null}function k(t){var e=t.selectAll("svg");t.node instanceof SVGSVGElement&&e.push(t),e.forEach(function(t){t.attr("overflow","visible"),t.node.removeAttribute("viewBox")}),t.selectAll("image").forEach(function(t){var e=t.attr("xlink:href");t.attr("xlink:href",B(e))})}function B(t){if(!h.isString(t))return t;if(N.test(t))return t;var e=E(t);return L?L+e:e}function E(t){var e=t.split(/\//),n=e[e.length-1];return n}function M(){var t,e,n={};return t=e=F?F:V.getBBox(),n.x=t.x,n.y=t.y,n.width=e.width,n.height=e.height,n.x2=n.x+n.width,n.y2=n.y+n.height,n}function A(){var e=u(s(t,"width")),n=u(s(t,"height"));return{width:e,height:n}}var j=new r,T=c(e,"document");h.assign(j,T);var V,L,F;n();var N=/[\w\d.+-]+:\/\//;return h.assign(j,{destroy:i,get element(){return t},get contentLayer(){return V},load:d,append:p,remove:g,clear:v,find:m,wrap:y,get:x,getElement:b,getElementByPoint:w,getContentBounds:M,getViewBounds:A,translateAssetUrl:B,extractAssetName:E,setAssetRoot:S,setDocumentBounds:C}),j}function o(t){return t?t.node?t:"string"==typeof t?Snap.parse(t):Snap(t):null}function a(t){var e,n=t.attr("viewBox");if(n)return e={x:n.x,y:n.y,width:n.width,height:n.height};var r=u(t.attr("width")),i=u(t.attr("height"));return r&&i?e={x:0,y:0,width:r,height:i}:e}function s(t,e){return t.ownerDocument.defaultView.getComputedStyle(t,null).getPropertyValue(e)}function u(t){var e=/^[\d.]+(px)?$/;return e.test(t)?parseFloat(t):null}function l(t){return t?t.replace(/(#|:|\.|\[|]|,)/g,"\\$1"):null}var c=n(5),f=n(7),h=n(4);t.exports=i},function(t,e){t.exports=function(t,e){if(!t)throw new Error(e)}},function(t,e,n){function r(){}function i(t){function e(){A=o(),j=a(E,V),i(),V.on("contentChange",i),window.addEventListener("resize",i)}function n(){V.off("contentChange",i),V=null,window.removeEventListener("resize",i)}function i(){var t=V.getContentBounds(),e=s.assign(V.getViewBounds(),{x:0,y:0});V.contentLayer.attr({width:e.width,height:e.height}),f(A.change({viewBounds:e,contentBounds:t}).resize())}function f(t,e,n,r){function i(e){A=A.change({zoomLevel:t.zoomLevel,x:e[0],y:e[1],width:e[2],height:e[3]}),h()}function o(){T=null}if(T&&T.stop(),t=t.sanitize(),e){n=n||l.easeinout,r=r||c;var a=[A.x,A.y,A.width,A.height],s=[t.x,t.y,t.width,t.height];T=l(a,s,i,r,n,o)}else A=t,h()}function h(){requestAnimationFrame(function(){d(),k(),B()})}function d(){var t=[A.x,A.y,A.width,A.height].join(" ");V.contentLayer.attr({viewBox:t})}function p(t,e,n){f(A.zoomTo(t,e),n)}function g(t,e,n){f(A.zoomIn(t,e),n)}function v(t,e,n){f(A.zoomOut(t,e),n)}function m(t,e){f(A.zoomToFit(t),e)}function y(t){f(A.zoomToOriginal(),t)}function x(t,e,n){f(A.zoomToElements(t,e),n)}function b(t,e,n){f(A.moveBy(t,e),n)}function w(t,e,n){f(A.centerAt(t,e),n)}function S(t,e){f(A.setBounds(t),e)}function C(t,e){j.enable(t,e)}function k(){M.emit("zoomChange",A.zoomLevel)}function B(){M.emit("viewportChange",A)}var E=new r,M=u(t,"view");s.assign(E,M);var A,j,T,V=t.document;return e(),s.assign(E,{destroy:n,resize:i,setViewport:f,zoomTo:p,zoomIn:g,zoomOut:v,zoomToFit:m,zoomToOriginal:y,zoomToElements:x,moveBy:b,centerAt:w,setBounds:S,get zoomLevel(){return A.zoomLevel},get viewport(){return A},get viewBounds(){return A.viewBounds},get contentBounds(){return A.contentBounds},enableMouse:C}),E}var o=n(9),a=n(11),s=n(4),u=n(5),l=n(13),c=400;t.exports=i},function(t,e,n){function r(t){return Math.max(s,Math.min(u,t))}function i(t){return o.assign(Object.create(c),t||l)}var o=n(4),a=n(10),s=.01,u=99.99,l={x:0,y:0,width:0,height:0,zoomLevel:1,viewBounds:null,contentBounds:null},c={get center(){return{x:this.contentBounds.x+this.contentBounds.width/2,y:this.contentBounds.y+this.contentBounds.height/2}},change:function(t){return i.of(this,t)},resize:function(){return this.change({width:this.viewBounds.width/this.zoomLevel,height:this.viewBounds.height/this.zoomLevel})},moveBy:function(t,e){return this.change({x:this.x+t,y:this.y+e})},centerAt:function(t,e){return this.change({x:t-this.width/2,y:e-this.height/2})},zoomTo:function(t,e){t=r(t),e=e||{x:this.x+this.width/2,y:this.y+this.height/2};var n=this.viewBounds,i=n.width/t,o=n.height/t,a=this.x-(i-this.width)*((e.x-this.x)/this.width),s=this.y-(o-this.height)*((e.y-this.y)/this.height);return this.change({zoomLevel:t,x:a,y:s,width:i,height:o})},zoomIn:function(t,e){return this.zoomTo(this.zoomLevel*t,e)},zoomOut:function(t,e){return this.zoomTo(this.zoomLevel/t,e)},zoomToFit:function(t){t=t||0;var e=this.contentBounds,n=this.viewBounds,r=n.width/(e.width+t),i=n.height/(e.height+t),o=Math.min(r,i),a=this.center;return this.zoomTo(o).centerAt(a.x,a.y)},zoomToOriginal:function(){var t=this.center;return this.zoomTo(1).centerAt(t.x,t.y)},zoomToElements:function(t,e){var n=a.getCombinedElementsBoundingBox(t,e);return this.setBounds(n)},setBounds:function(t){var e=this.viewBounds,n=e.width/t.width,i=e.height/t.height,o=r(Math.min(n,i)),a=e.width/o,s=t.x-(a-t.width)/2,u=e.height/o,l=t.y-(u-t.height)/2;return this.change({zoomLevel:o,x:s,y:l,width:a,height:u})},sanitize:function(){var t=this.contentBounds,e=this.x,n=this.y;return e=Math.max(t.x-this.width/2,e),e=Math.min(t.x2-this.width/2,e),n=Math.max(t.y-this.height/2,n),n=Math.min(t.y2-this.height/2,n),this.change({x:e,y:n})},toPx:function(t){return{x:t.x*this.zoomLevel,y:t.y*this.zoomLevel}},fromPx:function(t){return{x:t.x/this.zoomLevel,y:t.y/this.zoomLevel}}};o.assign(i,{of:function(t,e){return i(o.assign({},t,e))}}),t.exports=i},function(t,e){var n={};n.getBoxPosition=function(t,e){if(e||(e="center"),"string"!=typeof e)return e;var n=t.x,r=t.y,i=t.width,o=t.height;return"top-left"==e?{x:n,y:r}:"top"==e?{x:n+i/2,y:r}:"top-right"==e?{x:n+i,y:r}:"left"==e?{x:n,y:r+o/2}:"right"==e?{x:n+i,y:r+o/2}:"bottom-left"==e?{x:n,y:r+o}:"bottom"==e?{x:n+i/2,y:r+o}:"bottom-right"==e?{x:n+i,y:r+o}:{x:n+i/2,y:r+o/2}},n.getCombinedElementsBoundingBox=function(t,e){t=t.length?t:[t];var n={x:Number.MAX_VALUE,y:Number.MAX_VALUE,x2:-Number.MAX_VALUE,y2:-Number.MAX_VALUE};return t.forEach(function(t){var e=Snap(t),r=t.getBBox();r.x2=r.x+r.width,r.y2=r.y+r.height;var i=e.transform().globalMatrix,o={x:[],y:[]};o.x.push(i.x(r.x,r.y)),o.y.push(i.y(r.x,r.y)),o.x.push(i.x(r.x2,r.y)),o.y.push(i.y(r.x2,r.y)),o.x.push(i.x(r.x2,r.y2)),o.y.push(i.y(r.x2,r.y2)),o.x.push(i.x(r.x,r.y2)),o.y.push(i.y(r.x,r.y2));var a=Math.min.apply(null,o.x),s=Math.min.apply(null,o.y),u=Math.max.apply(null,o.x),l=Math.max.apply(null,o.y);a<n.x&&(n.x=a),a<n.y&&(n.y=s),u>n.x2&&(n.x2=u),l>n.y2&&(n.y2=l)}),e&&(n.x-=e,n.y-=e,n.x2+=e,n.y2+=e),n.width=n.x2-n.x,n.height=n.y2-n.y,n},t.exports=n},function(t,e,n){function r(t,e){function n(t,e){V.removeEventListener("mousedown",c),V.removeEventListener("wheel",d),V.removeEventListener("mousemove",f),V.removeEventListener("touchstart",p),V.removeEventListener("touchmove",g),V.removeEventListener("touchend",v),window.removeEventListener("mouseup",h),t&&V.addEventListener("mousedown",c),e&&(V.addEventListener("wheel",d),V.addEventListener("touchstart",p),V.addEventListener("touchmove",g),V.addEventListener("touchend",v))}function r(t){var e=t.touches[0],n=t.touches[1],r=n.pageX-e.pageX,i=n.pageY-e.pageY;return Math.sqrt(r*r+i*i)}function s(t){var e=t.touches[0],n=t.touches[1],r=Math.min(e.pageX,n.pageX),i=Math.max(e.pageX,n.pageX),o=Math.min(e.pageY,n.pageY),a=Math.max(e.pageY,n.pageY);return{x:r+(i-r)/2,y:o+(a-o)/2}}function u(e){var n=t.viewport,r=n.viewBounds,i={x:e.x/r.width,y:e.y/r.height};return{x:n.x+n.width*i.x,y:n.y+n.height*i.y}}function l(){if(y&&(new Date).getTime()-y<M){var e=t.viewport,n=e.fromPx({x:-x.x*A,y:-x.y*A});t.setViewport(e.moveBy(n.x,n.y),!0,a.easeoutqart,j)}}function c(t){m={x:t.clientX,y:t.clientY},V.addEventListener("mousemove",f),window.addEventListener("mouseup",h)}function f(e){var n=e.clientX-m.x,r=e.clientY-m.y;y=(new Date).getTime(),x={x:n,y:r},m={x:e.clientX,y:e.clientY};var i=t.viewport,o=i.fromPx({x:-n,y:-r});t.setViewport(i.moveBy(o.x,o.y))}function h(){l(),V.removeEventListener("mousemove",f),window.removeEventListener("mouseup",h),m=null,y=null}function d(e){var n=t.viewport,r=o(V,e),i=u(r),a=e.deltaY;e.ctrlKey&&(a*=5);var s=1+a*k*-1;s=Math.min(s,B),s=Math.max(s,E);var l=n.zoomLevel*s;t.setViewport(n.zoomTo(l,i)),e.preventDefault()}function p(e){if(e.touches&&e.touches.length&&(b=e.touches[0],2==e.touches.length)){b=null,w=r(e),C=t.viewport.zoomLevel;var n=s(e),i=o(V,{pageX:n.x,pageY:n.y});S=u(i)}}function g(e){if(e.touches&&e.touches.length){if(1==e.touches.length&&b){var n=e.touches[0],i=n.pageX-b.pageX,o=n.pageY-b.pageY;y=(new Date).getTime(),x={x:i,y:o},b=n;var a=t.viewport,s=a.fromPx({x:-i,y:-o});t.setViewport(a.moveBy(s.x,s.y)),e.preventDefault()}if(2==e.touches.length){var u=r(e)/w;t.setViewport(t.viewport.zoomTo(C*u,S)),e.preventDefault()}}}function v(){l(),m=null,y=null}var m,y,x,b,w,S,C,k=.001,B=1.25,E=.8,M=100,A=5,j=600,T={},V=e.element;return i.assign(T,{enable:n}),T}var i=n(4),o=n(12),a=n(13);t.exports=r},function(t,e){t.exports=function(t,e){var n=t.getBoundingClientRect(),r=e.pageX-n.left-window.pageXOffset,i=e.pageY-n.top-window.pageYOffset;return{x:r,y:i}}},function(t,e){function n(t,e,n,r,i,o){var a=Snap.animate(t,e,n,r,i,o),s=Object.create(a);return s.stop=function(){a.set=function(){},a.stop()},s}n.linear=mina.linear,n.easein=mina.easein,n.easeout=mina.easeout,n.easeinout=mina.easeinout,n.backin=mina.backin,n.backout=mina.backout,n.easeoutqart=function(t){return 1- --t*t*t*t},n.step=function(){return 0},t.exports=n},function(t,e,n){function r(){}function i(t){function e(t,e,r){var o=n(e,r);return t.push(o),y||(y=requestAnimationFrame(u)),i(t,o)}function n(t,e){return{priority:e||0,apply:function(){t.call()}}}function i(t,e){return function(){var n=t.indexOf(e);n>=0&&t.splice(n,1)}}function u(){d.emit("start"),l(g,"reset"),d.emit("reset"),l(v,"transform"),d.emit("transform"),l(m,"render"),d.emit("render"),y=null,d.emit("complete")}function l(t,e){for(p.debug("Execute "+e+" phase"),c(t);t.length;){var n=t.shift();try{n.apply()}catch(t){p.error("Error executing task in "+e+" phase",t)}}}function c(t){t.sort(function(t,e){return e.priority-t.priority})}function f(){y&&cancelAnimationFrame(y),g=[],v=[],m=[],d.destroy()}var h=new r,d=a(t,"scheduler"),p=s("archer.scheduler"),g=[],v=[],m=[],y=null,x=o.curry(e)(g),b=o.curry(e)(v),w=o.curry(e)(m);return o.assign(h,d),o.assign(h,{scheduleReset:x,scheduleTransform:b,scheduleRender:w,destroy:f}),h}var o=n(4),a=n(5),s=n(15);t.exports=i},function(t,e){function n(t){return null==t?null:t instanceof Error?t.message+"\n"+t.stack:JSON?JSON.stringify(t):null!=t?t.toString():t}function r(t,e,r){if(o[e]){var i=console[e]||console.log,a=Array.prototype.map.call(r,n).join(" "),s="["+t+"] "+a;i.call(console,s)}}function i(t){return{debug:function(){r(t,"debug",arguments)},info:function(){r(t,"info",arguments)},warn:function(){r(t,"warn",arguments)},error:function(){r(t,"error",arguments)}}}var o={warn:!0,error:!0};i.enable=function(t){o[t]=!0},i.disable=function(t){o[t]=!1},i.levels=o,t.exports=i},function(t,e,n){function r(){}function i(t){function e(t){k=h(t),i(),n(),d(),M.debug("Loaded configuration"),M.debug("Loaded variables: "+Object.keys(j).length),M.debug("Loaded transformations: "+T.length)}function n(){k.elements.forEach(y),k.variables.forEach(v),k.transformations.forEach(m)}function i(){o.forIn(j,function(t){t.destroy()}),o.forEach(T,function(t){t.destroy()}),o.forIn(A,function(t){t.destroy()}),A={},j={},T=[],M.debug("Cleared configuration")}function h(t){return t=t||{},t.elements=t.elements||[],t.variables=t.variables||[],t.transformations=t.transformations||[],t}function d(){o.forEach(T,function(t){t.schedule()})}function p(t,e,n){var r=w(t);return r?r.setValue(e,n):void M.warn("Variable does not exist: "+t)}function g(t){var e=w(t);return e?e.value:null}function v(e){try{var n=a(e,t);j[e.name]=n}catch(t){M.error("Error initializing variable: "+e.name,t)}}function m(e){try{var n=s(e,t);T.push(n)}catch(t){M.error("Error initializing transformation: "+e.name,t)}}function y(e){var n=e.id;try{var r=C.getElement(n);f(!!r,"Element does not exist: "+n);var i=new u(e,r,t);A[n]=i}catch(t){M.error("Error initializing element: "+n,t)}}function x(e){var n="string"==typeof e?C.getElement(e):C.wrap(e);if(!n)return null;var r=new u({},n,t);return n.node.id&&(A[n.node.id]=r),r}function b(t){f(t,"Must specify node or node ID");const e="string"==typeof t?t:t.id;return A[e]||x(t)}function w(t){return j[t]}function S(){i(),E.destroy()}var C=t.document,k=h(),B=new r,E=l(t,"runtime"),M=c("archer.runtime"),A={},j={},T=[];return o.assign(B,E),o.assign(B,{load:e,getValue:g,setValue:p,getElement:b,getVariable:w,get config(){return k},destroy:S}),B}var o=n(4),a=n(17),s=n(22),u=n(40),l=n(5),c=n(15),f=n(7);t.exports=i},function(t,e,n){function r(t,e){function n(t,e){t=s(t,g.type),t=l(t,g),f=t,h=u(t,e,g.type),p.emit("change",d,f,h)}function r(){n(g.defaultValue)}function c(){p.emit("destroy"),p.destroy()}var f,h,d={},p=o(e,"variable"),g=a(t);return n(g.defaultValue),i.assign(d,p,{model:g,setValue:n,get value(){return f},get formattedValue(){return h},reset:r,destroy:c})}var i=n(4),o=n(5),a=n(18),s=n(19),u=n(20),l=n(21);t.exports=r},function(t,e,n){function r(t){var e=i(t);return o.assign({},t,{config:t,keyFrames:e})}function i(t){var e=t.type,n=[];return o.forIn(t.keyFrames,function(t,e){n.push({name:e,value:t})}),"number"==e&&(n.push({name:"$min",value:t.minimum}),n.push({name:"$max",value:t.maximum})),"boolean"==e&&(n.push({name:"$true",value:!0}),n.push({name:"$false",value:!1})),n}var o=n(4);t.exports=r},function(t,e){t.exports=function(t,e){var n;if("boolean"===e){if("string"==typeof t)return n=parseFloat(t),isNaN(n)?"true"===t.toLowerCase()?1:0:n>0;if("number"==typeof t)return t>0}else if("number"===e){if("string"==typeof t)return n=parseFloat(t),isNaN(n)?null:n;if("boolean"==typeof t)return t?1:0}return t}},function(t,e,n){var r=n(4);t.exports=function(t,e,n){return void 0!==e?e:"number"==n&&r.isNumber(t)?Math.round(t):t}},function(t,e,n){var r=n(4);t.exports=function(t,e){var n=e.type;if("number"==n&&r.isNumber(t)){var i=e.minimum,o=e.maximum;t<i&&(t=i),t>o&&(t=o)}return t}},function(t,e,n){function r(t,e){function n(){b=A.getVariable(t.variable),w=A.getElement(t.element),f(!!b,"Variable does not exist: "+t.variable),f(!!w,"Element does not exist: "+t.element),C=u(t,b.model),S=s.create(C,e),k=a.isObject(C.transition)?o(C,S,h):i(C,S,h),g()}function r(){var t=w.getDefaultValues(S.attributes),e=C.bind?b.formattedValue:S.calculate(b.value,t);k.update(e,t),V.emit("update",C),L.debug("Updated transformation",{name:C.name})}function h(t){m(w,function(){var e=w.getValues(S.attributes),n=S.apply(t,e);Object.keys(n).forEach(function(t){return S.attributes.indexOf(t)<0?void L.warn("Transformation did not request access to modify attribute",{name:C.name,attribute:t}):void w.setValue(t,n[t])}),L.debug("Executed transformation",{name:C.name})})}function d(){p(),E=j.scheduleTransform(r,C.priority)}function p(){E&&E()}function g(){v(),B=b.on("change",d)}function v(){B&&B()}function m(t,e){y(),M=t.transform(e,C.priority)}function y(){M&&M()}function x(){y(),k.destroy(),v(),p(),V.emit("destroy"),V.destroy()}var b,w,S,C,k,B,E,M,A=e.runtime,j=e.scheduler,T={},V=l(e,"transformation"),L=c("archer.transformation");return n(),a.assign(T,V,{model:C,schedule:d,destroy:x})}function i(t,e,n){return{update:function(t){n(t)},destroy:a.noop}}function o(t,e,n){var r,o,s,u=c("archer.transformation.transition"),l=t.transition,f=l.duration,d=h[l.easing]||h.linear,p=e.interpolate,g=!a.isNumber(f);return g?(u.warn("Invalid transition duration: "+f),i(t,e,n)):{update:function(t){function e(e){s=p(o,t,e,d),n(s)}return o=s,r&&r.stop(),null==o?(s=t,o=t,void n(s)):void(r=h(0,1,e,f,d))},destroy:function(){r&&r.stop()}}}var a=n(4),s=n(23),u=n(38),l=n(5),c=n(15),f=n(7),h=n(13);t.exports=r},function(t,e,n){function r(t,e){a[t]=e}function i(t,e){var n=t.type,r=a[n];return o(!!r,"Unknown transformation type: "+n),r(t,e)}var o=n(7),a={};r("translate",n(24)),r("rotate",n(30)),r("scale",n(31)),r("text",n(32)),r("image-url",n(33)),r("opacity",n(34)),r("fill-color",n(35)),r("stroke-color",n(36)),r("stroke-width",n(37)),t.exports={register:r,create:i}},function(t,e,n){var r=n(25),i=n(28);t.exports=function(t){function e(e){var n=o(e,t.getDefaultValue({x:0,y:0}));return"x"==a&&(n.y=0),"y"==a&&(n.x=0),n}function n(t,e){var n=e.transform,r=(new Snap.Matrix).translate(t.x,t.y),i=n.localMatrix.clone().add(n.totalMatrix.invert()).add(r).add(n.totalMatrix);return{transform:{localMatrix:i,totalMatrix:r.add(n.totalMatrix)}}}var o=r(t.variable.type,t.frames,i.point),a=t.axis;return{attributes:["transform"],interpolate:i.point,calculate:e,apply:n}}},function(t,e,n){var r=n(26),i=n(27),o=n(7),a={number:r,boolean:i,text:i};t.exports=function(t,e,n){var r=a[t];return o(!!r,"Unknown index type:"+t),r(e,n)}},function(t,e,n){function r(t){return null==t||!s.isNumber(t)}function i(t,e){u(!!e.length,"Need at least one frame");var n=null,r=null;return e.some(function(e){return!!e.exists&&(e.index>t?(r=e,!0):void(n=e))}),n||(n=e[0]),r||(r=e[e.length-1]),{lower:n,upper:r}}function o(t,e){var n=e.upper,r=e.lower;return t=a(t,r.index,n.index),(t-r.index)/(n.index-r.index)||0}function a(t,e,n){return t<e&&(t=e),t>n&&(t=n),t}var s=n(4),u=n(7),l=n(13);t.exports=function(t,e){return function(n,a){if(r(n))return a;var s=i(n,t.series),u=s.lower.value,c=s.upper.value;u=null!=u?u:a,null==c&&(c=s.upper.exists?a:u);var f=l[s.lower.easing],h=o(n,s);return e(u,c,h,f)}}},function(t,e){t.exports=function(t){return function(e,n){var r=t.map[e];return r&&null!=r.value?r.value:n}}},function(t,e,n){function r(t,e){return(e=e||l.linear)(t)}function i(t,e,n,i){return t+(e-t)*r(n,i)}function o(t,e,n,i){return{x:t.x+(e.x-t.x)*r(n,i),y:t.y+(e.y-t.y)*r(n,i)}}function a(t,e,n,i){var o=u.color(t),a=u.color(e),s=u.interpolateRgb(o,a,r(n,i));return u.rgb2hex(s)}function s(t){return t}var u=n(29),l=n(13);t.exports={number:i,point:o,color:a,text:s}},function(t,e){t.exports={color:function(t){return Snap.getRGB(t)},rgb2hex:function(t){if(t.r<0||t.g<0||t.b<0)return"none";var e=t.opacity;return e=null!=e&&e<1?e:void 0,Snap.rgb(t.r,t.g,t.b,e)},interpolateRgb:function(t,e,n){if(0==n)return t;if(1==n)return e;(t.r<0||t.g<0||t.b<0)&&(t={r:e.r,g:e.g,b:e.b,opacity:0}),(e.r<0||e.g<0||e.b<0)&&(e={r:t.r,g:t.g,b:t.b,opacity:0}),arguments.length<3&&(n=.5);var r=null!=t.opacity?t.opacity:1,i=null!=e.opacity?e.opacity:1;return{r:Math.round(t.r+n*(e.r-t.r)),g:Math.round(t.g+n*(e.g-t.g)),b:Math.round(t.b+n*(e.b-t.b)),opacity:r+n*(i-r)}}}},function(t,e,n){var r=n(25),i=n(28),o=n(10);t.exports=function(t){function e(e){return a(e,t.getDefaultValue(0))}function n(t,e){var n=e.bbox,r=e.transform,i=o.getBoxPosition(n,s),a=r.totalMatrix.x(i.x,i.y),u=r.totalMatrix.y(i.x,i.y),l=(new Snap.Matrix).rotate(t,a,u),c=r.localMatrix.clone().add(r.totalMatrix.invert()).add(l).add(r.totalMatrix);
return{transform:{localMatrix:c,totalMatrix:l.add(r.totalMatrix)}}}var a=r(t.variable.type,t.frames,i.number),s=t.center;return{attributes:["bbox","transform"],interpolate:i.number,calculate:e,apply:n}}},function(t,e,n){var r=n(25),i=n(28),o=n(10);t.exports=function(t){function e(e){var n=a(e,t.getDefaultValue({x:1,y:1}));return"x"==u&&(n.y=1),"y"==u&&(n.x=1),n}function n(t,e){var n=e.bbox,r=e.transform,i=o.getBoxPosition(n,s),a=(new Snap.Matrix).scale(t.x,t.y,i.x,i.y),u=r.localMatrix.clone().add(a);return{transform:{localMatrix:u,totalMatrix:r.totalMatrix.clone().add(a)}}}var a=r(t.variable.type,t.frames,i.point),s=t.center,u=t.axis;return{attributes:["transform","bbox"],interpolate:i.point,calculate:e,apply:n}}},function(t,e,n){var r=n(25),i=n(28);t.exports=function(t){function e(e,n){return o(e,t.getDefaultValue(n.text))}function n(t){return{text:t}}var o=r(t.variable.type,t.frames,i.text);return{attributes:["text"],interpolate:i.text,calculate:e,apply:n}}},function(t,e,n){var r=n(25),i=n(28);t.exports=function(t){function e(e,n){return o(e,t.getDefaultValue(n.href))}function n(t){return{href:t}}var o=r(t.variable.type,t.frames,i.text);return{attributes:["href"],interpolate:i.text,calculate:e,apply:n}}},function(t,e,n){var r=n(25),i=n(28);t.exports=function(t,e){function n(e,n){return s(e,t.getDefaultValue(n.opacity))}function o(t){var e={opacity:t};return a&&(e.visibility=0==t?"hidden":"inherit"),e}var a="editor"!=e.settings.mode,s=r(t.variable.type,t.frames,i.number);return{attributes:["opacity","visibility"],interpolate:i.number,calculate:n,apply:o}}},function(t,e,n){var r=n(25),i=n(28);t.exports=function(t){function e(e,n){return o(e,t.getDefaultValue(n.fill))}function n(t){return{fill:t}}var o=r(t.variable.type,t.frames,i.color);return{attributes:["fill"],interpolate:i.color,calculate:e,apply:n}}},function(t,e,n){var r=n(25),i=n(28);t.exports=function(t){function e(e,n){return o(e,t.getDefaultValue(n.stroke))}function n(t){return{stroke:t}}var o=r(t.variable.type,t.frames,i.color);return{attributes:["stroke"],interpolate:i.color,calculate:e,apply:n}}},function(t,e,n){var r=n(25),i=n(28);t.exports=function(t){function e(e,n){return o(e,t.getDefaultValue(n["stroke-width"]))}function n(t){return{"stroke-width":t}}var o=r(t.variable.type,t.frames,i.number);return{attributes:["stroke-width"],interpolate:i.number,calculate:e,apply:n}}},function(t,e,n){function r(t,e){function n(e){var n=t.frames.$default;return n?n.value:e}var r=o(e.type,e.keyFrames,t.frames),a=t.name?t.name:t.type+"_"+t.element;return i.assign({},t,{name:a,config:t,variable:e,frames:r,getDefaultValue:n})}var i=n(4),o=n(39);t.exports=r},function(t,e){function n(t,e,n){var i=[],o={};return e.forEach(function(t){var e=n[t.name],r={name:t.name,index:t.value,exists:void 0!=e,value:e?e.value:null,easing:e?e.transition:null};i.push(r),o[r.index]=r}),"number"==t&&i.sort(r),{series:i,map:o}}function r(t,e){return t.index-e.index}t.exports=n},function(t,e,n){function r(){}function i(t,e,n){function i(){var e=t.events||[];e.forEach(function(t){w.on(t,o.noop)})}function f(t,e){var n=C.transform(t,e);return h(),function(){n(),h()}}function h(){d(),m=x.scheduleRender(p,0),k.debug("Scheduled element render",{id:v()})}function d(){m&&m()}function p(){C.apply(),S.apply(),w.emit("render",e),k.debug("Rendered element",{id:v()})}function g(){C.clear(),S.clear(),d(),x.scheduleReset(p,0),w.emit("destroy"),w.destroy()}function v(){return e.node.id}var m,y=n.document,x=n.scheduler,b=new r,w=u(e,n,"element"),S=a(e,y),C=s(S),k=c("archer.element");return i(),o.assign(b,w),o.assign(b,{getValue:S.getValue,getValues:S.getValues,getDefaultValue:S.getDefaultValue,getDefaultValues:S.getDefaultValues,setValue:S.setValue,transform:f,destroy:g,getBBox:l.bind(null,e.node),get node(){return e.node},get snapElement(){return e}}),b}var o=n(4),a=n(41),s=n(43),u=n(44),l=n(45),c=n(15);t.exports=i},function(t,e,n){function r(){}function i(t,e){function n(t){return d[t]||(d[t]=g(t).get())}function i(t){var e={};return t.forEach(function(t){e[t]=n(t)}),e}function s(t){return p[t]||n(t)}function u(t){var e={};return t.forEach(function(t){e[t]=s(t)}),e}function l(t,e){n(t),p[t]=e}function c(){o.forIn(p,function(t,e){g(e).set(t)}),f()}function f(){p=Object.create(d)}var h=new r,d={},p=Object.create(d),g=o.memoize(o.curry(a)(t,e));return o.assign(h,{getValue:s,getValues:u,getDefaultValue:n,getDefaultValues:i,setValue:l,apply:c,clear:f}),h}var o=n(4),a=n(42);t.exports=i},function(t,e){function n(t,e,n){var r=c[n];if(!r)throw new Error("Unsupported attribute access: "+n);return r(t,e)}function r(t){return{get:function(){return t.transform()},set:function(e){t.transform(e.localMatrix)}}}function i(t){return{get:function(){return t.node.getBBox()},set:function(){}}}function o(t){return{get:function(){return t.node.textContent},set:function(e){t.node.textContent=e}}}function a(t,e){return{get:function(){var n=t.attr("xlink:href"),r=e.extractAssetName(n);return r},set:function(n){!n||(n=e.translateAssetUrl(n)),null!=n?t.attr("xlink:href",n||""):(t.node.removeAttribute("xlink:href"),t.node.removeAttribute("href"))}}}function s(t){return function(e){return{get:function(){return e.attr(t)},set:function(n){e.node.style[t]=n}}}}function u(t){return function(e){return{get:function(){var n=e.attr(t),r=Snap.color(n);return r.hex},set:function(n){e.node.style[t]=n}}}}function l(t){return function(e){return{get:function(){var n=e.attr(t);return n=n.replace(/[^0-9.]+/g,""),n=parseFloat(n)},set:function(n){e.node.style[t]=n}}}}var c={transform:r,bbox:i,text:o,href:a,fill:u("fill"),stroke:u("stroke"),"stroke-width":l("stroke-width"),opacity:l("opacity"),display:s("display"),visibility:s("visibility")};t.exports=n},function(t,e,n){function r(){}function i(t){function e(t,e){var r=n(t,e);return c.push(r),i(r)}function n(e,n){return{priority:n||0,apply:function(){e.call(null,t)}}}function i(t){return function(){var e=c.indexOf(t);e>=0&&c.splice(e,1)}}function a(){u(),c.forEach(function(t){t.apply()})}function s(){c=[]}function u(){c.sort(function(t,e){return e.priority-t.priority})}var l=new r,c=[];return o.assign(l,{transform:e,clear:s,apply:a}),l}var o=n(4);t.exports=i},function(t,e,n){function r(){}function i(t,e,n){function i(t,e){p.on(t,e),c(t)}function u(t,e){p.off(t,e),f(t)}function l(){p.destroy();var t=Object.keys(g);t.forEach(f)}function c(e){g[e]||(t.node.addEventListener(e,h),g[e]=!0)}function f(e){p.getListeners(e).length>0||(t.node.removeEventListener(e,h),delete g[e])}function h(e){var n=o.assign(e,{bbox:s(t.node)});p.emit(e.type,t.node,n)}var d=new r,p=a(e,n),g={};return o.assign(d,p),o.assign(d,{on:i,off:u,destroy:l}),d}var o=n(4),a=n(5),s=n(45);t.exports=i},function(t,e){t.exports=function(t){var e=t.getBoundingClientRect(),n=t.farthestViewportElement||t,r=n.getBoundingClientRect(),i={left:e.left-r.left,top:e.top-r.top},o={left:e.left+window.pageXOffset,top:e.top+window.pageYOffset};return{x:i.left,y:i.top,width:e.width,height:e.height,clientX:e.left,clientY:e.top,pageX:o.left,pageY:o.top}}},function(t,e){function n(t,e){var n=new XMLHttpRequest;n.open("GET",t,!0),n.onreadystatechange=function(){4==n.readyState&&e.call(null,n)},n.send()}n.invalidResponse=function(t){return!(200==t.status||0==t.status&&t.response)},t.exports=n},function(t,e,n){var r=n(4),i={mode:"embedded",imageRendering:"quality"};t.exports=function(t){var e=r.assign({},i,t);return e}},function(t,e){function n(){}t.exports={create:n}}])});

const FlowJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
  this.baseClassName = "baseClassName";
}

FlowJs.prototype.returnDiagramMap = function (svgName) {
  const instance = this;
  const { selfHref } = GeneralJs;
  let tong;

  if (svgName === "console") {
    tong = {
      client: {
        c1: {
          name: "1차 응대",
          description: [],
          href: "https://" + GHOSTHOST + "/client",
        },
        c2: {
          name: "응대 리포트",
          description: [],
          href: "https://" + GHOSTHOST + "/client",
        },
      },
      project: {
        p1: {
          name: "프로젝트 관리",
          description: [],
          href: "https://" + GHOSTHOST + "/project",
        },
        p2: {
          name: "프로젝트 현황",
          description: [],
          href: "https://" + GHOSTHOST + "/project",
        },
        p3: {
          name: "프로젝트 상세",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/project");
          }
        },
        p4: {
          name: "서비스 리포트",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/project");
          }
        },
        p5: {
          name: "제안서 리스트",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/proposal");
          }
        },
        p6: {
          name: "제안서 제작",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/proposal");
          }
        },
        p7: {
          name: "촬영 관리",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/designer?mode=contents");
          }
        },
        p8: {
          name: "컨텐츠 관리",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/designer?mode=contents");
          }
        },
        p9: {
          name: "컨텐츠 제어",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/contents");
          }
        },
      },
      designer: {
        d1: {
          name: "디자이너 관리",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/designer");
          }
        },
        d2: {
          name: "디자이너 기본",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/designer?mode=general");
          }
        },
        d3: {
          name: "체크리스트",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/designer?mode=checklist");
          }
        },
        d4: {
          name: "상세 리포트",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/designer?mode=report");
          }
        },
        d5: {
          name: "새로운 신청자",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/designer?mode=aspirant");
          }
        },
        d6: {
          name: "일정 관리",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/designer?mode=possible");
          }
        },
        d7: {
          name: "의뢰서 관리",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/designer?mode=request");
          }
        },
        d8: {
          name: "정산 정보",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/designer?mode=calculation");
          }
        },
        d9: {
          name: "가격 정보",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/designer?mode=price");
          }
        },
        d10: {
          name: "프로젝트 뷰",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/designer?mode=project");
          }
        },
      },
      construct: {
        t1: {
          name: "시공 관리",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/builder");
          }
        },
        t2: {
          name: "시공 기본",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/builder?mode=construct");
          }
        },
        t3: {
          name: "파트너 정보",
        },
        t4: {
          name: "디자이너사",
        },
        t5: {
          name: "의뢰서 관리",
        },
        t6: {
          name: "견적서 관리",
        },
        t7: {
          name: "수수료 관리",
        },
        t8: {
          name: "정산 관리",
        },
        t9: {
          name: "공정표 관리",
        },
      },
      etc: {
        e1: {
          name: "파일 탐색기",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/file");
          }
        },
        e2: {
          name: "플로우 관리",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/flow");
          }
        },
        e3: {
          name: "미니 서비스",
          event: function (e) {
            selfHref("https://" + GHOSTHOST + "/user");
          }
        },
      },
    };
  } else if (svgName === "flow") {
    tong = {

    };
  } else if (svgName === "server") {
    tong = {

    };
  } else {
    tong = {};
  }

  return tong;
}

FlowJs.prototype.launchingDiagram = function (svgName) {
  const instance = this;
  const { createNode, colorChip, withOut, ajaxJson, cleanChildren, isMac } = GeneralJs;
  const { ea, totalContents, belowHeight, baseClassName, typeCase, targetCase } = this;
  let base, graphic;
  let map;
  let idList;
  let domList;
  let flatMap;
  let values;
  let mouseEnterEvent;
  let mouseLeaveEvent;
  let renderContents;
  let titleSize, descriptionSize;
  let titleWeight, descriptionWeight;
  let titleLineHeight, descriptionLineHeight;
  let titleMarginTop, descriptionMarginTop;
  let mouseClickEvent;
  let mouseClickCancelEvent;
  let whiteSize;
  let whiteLineHeight;
  let whitePaddingTop;
  let whitePaddingLeft;
  let whiteMarginTop;
  let alarmBase;
  let whitePaddingBottom;
  let whiteBetween;

  titleSize = 18;
  titleWeight = 800;
  titleLineHeight = 1.5;
  titleMarginTop = 3;

  descriptionSize = 14;
  descriptionWeight = 500;
  descriptionLineHeight = 1.5;
  descriptionMarginTop = 6;

  whiteSize = 13;
  whiteLineHeight = 1.7;

  whitePaddingTop = isMac() ? 12 : 14;
  whitePaddingBottom = isMac() ? 15 : 13;
  whitePaddingLeft = 18;
  whiteMarginTop = 20;

  whiteBetween = 6;

  if (document.querySelector('.' + baseClassName) !== null) {
    document.querySelector('.' + baseClassName).remove();
  }

  renderContents = (block, deactive = true) => {
    const base = instance.contentsBox;
    let whiteBase;

    if (block !== null) {
      createNode({
        mother: base,
        text: block.name,
        style: {
          marginTop: String(titleMarginTop) + ea,
          display: "block",
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.black,
          lineHeight: String(titleLineHeight),
          opacity: String(deactive ? 0.4 : 1),
        }
      });
      createNode({
        mother: base,
        text: block.contents.description,
        style: {
          marginTop: String(descriptionMarginTop) + ea,
          display: "block",
          position: "relative",
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.black,
          lineHeight: String(descriptionLineHeight),
          opacity: String(deactive ? 0.4 : 1),
        }
      });

      whiteBase = createNode({
        mother: base,
        style: {
          marginTop: String(whiteMarginTop) + ea,
          paddingTop: String(whitePaddingTop) + ea,
          paddingBottom: String(whitePaddingTop) + ea,
          paddingLeft: String(whitePaddingLeft) + ea,
          paddingRight: String(whitePaddingLeft) + ea,
          width: withOut(whitePaddingLeft * 2, ea),
          background: colorChip.white,
          display: "block",
          position: "relative",
          borderRadius: String(5) + "px",
          opacity: String(deactive ? 0.4 : 1),
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        }
      });

      createNode({
        mother: whiteBase,
        text: instance.propertyCase.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(whiteSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.green,
          lineHeight: String(whiteLineHeight),
          textAlign: "left",
        }
      });

      createNode({
        mother: whiteBase,
        text: [ typeCase[block.feature.type.code - 1], targetCase[block.feature.target.code - 1], "<b%" + block.project.status + "%b>" ].join("\n"),
        style: {
          display: "block",
          position: "absolute",
          fontSize: String(whiteSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.black,
          lineHeight: String(whiteLineHeight),
          textAlign: "right",
          top: String(whitePaddingTop) + ea,
          left: String(whitePaddingLeft) + ea,
          width: withOut(whitePaddingLeft * 2, ea),
        },
        bold: {
          fontSize: String(whiteSize) + ea,
          fontWeight: String(titleWeight),
          color: block.project.complete ? colorChip.black : colorChip.red,
        }
      });

      if (block.feature.type.code === 3) {
        alarmBase = createNode({
          mother: base,
          style: {
            marginTop: String(whiteBetween) + ea,
            paddingTop: String(whitePaddingTop) + ea,
            paddingBottom: String(whitePaddingBottom) + ea,
            paddingLeft: String(whitePaddingLeft) + ea,
            paddingRight: String(whitePaddingLeft) + ea,
            width: withOut(whitePaddingLeft * 2, ea),
            background: colorChip.white,
            display: "block",
            position: "relative",
            borderRadius: String(5) + "px",
            opacity: String(deactive ? 0.4 : 1),
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          }
        });

        createNode({
          mother: alarmBase,
          text: block.contents.trigger.trim() === '' ? "내용 없음" : block.contents.trigger.trim(),
          attribute: {
            blockid: block.id,
          },
          event: {
            click: function (e) {
              const self = this;
              let cancelBack, whiteInput;

              whiteInput = createNode({
                mother: self,
                mode: "textarea",
                event: {
                  click: (e) => { e.stopPropagation() },
                  keydown: function (e) {
                    if (e.key === "Tab") {
                      e.preventDefault();
                    }
                  },
                  keyup: function (e) {
                    if (e.key === "Tab") {
                      this.blur();
                    }
                  },
                  blur: async function (e) {
                    try {
                      const value = this.value.trim();
                      let whereQuery, updateQuery;
                      whereQuery = { id: self.getAttribute("blockid") };
                      updateQuery = {};
                      if (value === '' || value === "없음" || value === "내용 없음" || value === "내용없음") {
                        updateQuery["contents.trigger"] = "";
                        instance.map.find((obj) => { return obj.id === self.getAttribute("blockid") }).contents.trigger = '';
                        await ajaxJson({ mode: "update", whereQuery, updateQuery }, BACKHOST + "/flowBlock");
                        self.textContent = "내용 없음";
                      } else {
                        updateQuery["contents.trigger"] = value;
                        instance.map.find((obj) => { return obj.id === self.getAttribute("blockid") }).contents.trigger = value;
                        await ajaxJson({ mode: "update", whereQuery, updateQuery }, BACKHOST + "/flowBlock");
                        self.textContent = this.value;
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                text: this.textContent,
                attribute: { value: this.textContent },
                style: {
                  position: "absolute",
                  top: String(0),
                  left: String(0),
                  width: withOut(0),
                  height: withOut(0),
                  fontSize: String(whiteSize) + ea,
                  fontWeight: String(descriptionWeight),
                  color: colorChip.green,
                  lineHeight: String(descriptionLineHeight),
                  textAlign: "left",
                  border: String(0),
                  outline: String(0),
                  background: colorChip.white,
                }
              });

              whiteInput.focus();
            }
          },
          style: {
            display: "block",
            position: "relative",
            fontSize: String(whiteSize) + ea,
            fontWeight: String(descriptionWeight),
            color: colorChip.black,
            lineHeight: String(descriptionLineHeight),
            textAlign: "left",
          }
        });

        alarmBase = createNode({
          mother: base,
          style: {
            marginTop: String(whiteBetween) + ea,
            paddingTop: String(whitePaddingTop) + ea,
            paddingBottom: String(whitePaddingBottom) + ea,
            paddingLeft: String(whitePaddingLeft) + ea,
            paddingRight: String(whitePaddingLeft) + ea,
            width: withOut(whitePaddingLeft * 2, ea),
            background: colorChip.white,
            display: "block",
            position: "relative",
            borderRadius: String(5) + "px",
            opacity: String(deactive ? 0.4 : 1),
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          }
        });

        createNode({
          mother: alarmBase,
          text: block.composition.wordings.trim() === '' ? "내용 없음" : block.composition.wordings.trim(),
          attribute: {
            blockid: block.id,
          },
          event: {
            click: function (e) {
              const self = this;
              let cancelBack, whiteInput;

              whiteInput = createNode({
                mother: self,
                mode: "textarea",
                event: {
                  click: (e) => { e.stopPropagation() },
                  keydown: function (e) {
                    if (e.key === "Tab" || e.key === "Enter") {
                      e.preventDefault();
                    }
                  },
                  keyup: function (e) {
                    if (e.key === "Tab" || e.key === "Enter") {
                      this.blur();
                    }
                  },
                  blur: async function (e) {
                    try {
                      const value = this.value.trim();
                      let whereQuery, updateQuery;
                      whereQuery = { id: self.getAttribute("blockid") };
                      updateQuery = {};
                      if (value === '' || value === "없음" || value === "내용 없음" || value === "내용없음") {
                        updateQuery["composition.wordings"] = "";
                        instance.map.find((obj) => { return obj.id === self.getAttribute("blockid") }).composition.wordings = '';
                        await ajaxJson({ mode: "update", whereQuery, updateQuery }, BACKHOST + "/flowBlock");
                        self.textContent = "내용 없음";
                      } else {
                        updateQuery["composition.wordings"] = value;
                        instance.map.find((obj) => { return obj.id === self.getAttribute("blockid") }).composition.wordings = value;
                        await ajaxJson({ mode: "update", whereQuery, updateQuery }, BACKHOST + "/flowBlock");
                        self.textContent = this.value;
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                text: this.textContent,
                attribute: { value: this.textContent },
                style: {
                  position: "absolute",
                  top: String(0),
                  left: String(0),
                  width: withOut(0),
                  height: withOut(0),
                  fontSize: String(whiteSize) + ea,
                  fontWeight: String(descriptionWeight),
                  color: colorChip.green,
                  lineHeight: String(descriptionLineHeight),
                  textAlign: "left",
                  border: String(0),
                  outline: String(0),
                  background: colorChip.white,
                }
              });

              whiteInput.focus();
            }
          },
          style: {
            display: "block",
            position: "relative",
            fontSize: String(whiteSize) + ea,
            fontWeight: String(descriptionWeight),
            color: colorChip.black,
            lineHeight: String(descriptionLineHeight),
            textAlign: "left",
          }
        });

      } else if (block.feature.type.code === 1) {

        alarmBase = createNode({
          mother: base,
          style: {
            marginTop: String(whiteBetween) + ea,
            paddingTop: String(whitePaddingTop) + ea,
            paddingBottom: String(whitePaddingBottom) + ea,
            paddingLeft: String(whitePaddingLeft) + ea,
            paddingRight: String(whitePaddingLeft) + ea,
            width: withOut(whitePaddingLeft * 2, ea),
            background: colorChip.white,
            display: "block",
            position: "relative",
            borderRadius: String(5) + "px",
            opacity: String(deactive ? 0.4 : 1),
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          }
        });

        createNode({
          mother: alarmBase,
          text: block.composition.link.trim() === '' ? "링크 없음" : block.composition.link.trim(),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(whiteSize) + ea,
            fontWeight: String(descriptionWeight),
            color: colorChip.black,
            lineHeight: String(descriptionLineHeight),
            textAlign: "left",
          }
        });

      }

    }
  }

  mouseEnterEvent = function (e) {
    const id = this.id;
    const block = instance.map.find((obj) => { return obj.id === id });
    const base = instance.contentsBox;

    if (instance.thisBlock === null) {
      cleanChildren(base);
      renderContents(block, true);
    }

    this.style.cursor = "pointer";
  }

  mouseLeaveEvent = function (e) {
    const id = this.id;
    const block = instance.map.find((obj) => { return obj.id === id });
    const base = instance.contentsBox;

    this.style.cursor = "";

    cleanChildren(base);
    renderContents(instance.thisBlock, false);

  }

  mouseClickCancelEvent = function (e) {
    e.preventDefault();
    const base = instance.contentsBox;
    let pathArr;

    instance.thisBlock = null;
    cleanChildren(base);

    for (let { block } of instance.map) {
      pathArr = [ ...block.querySelectorAll("path") ];
      pathArr[0].style.fill = block.getAttribute("color");
      block.setAttribute("toggle", "off");
    }
  }

  mouseClickEvent = function (e) {

    e.stopPropagation();

    const id = this.id;
    const block = instance.map.find((obj) => { return obj.id === id });
    const base = instance.contentsBox;
    let pathArr;

    instance.thisBlock = block;

    cleanChildren(base);
    renderContents(block, false);

    for (let { block } of instance.map) {
      pathArr = [ ...block.querySelectorAll("path") ];
      pathArr[0].style.fill = block.getAttribute("color");
      block.setAttribute("toggle", "off");
    }

    pathArr = [ ...this.querySelectorAll("path") ];
    pathArr[0].style.fill = colorChip.green;
    this.setAttribute("toggle", "on");

  }

  return new Promise((resolve, reject) => {
    base = createNode({
      mother: totalContents,
      class: [ baseClassName ],
      style: {
        position: "absolute",
        top: String(0),
        left: String(0) + ea,
        width: withOut(0, ea),
        height: withOut(belowHeight, ea),
      }
    });

    graphic = window.archer.create(base);

    graphic.loadUrl("https://" + FILEHOST + "/" + svgName + ".svg", "https://" + FILEHOST + "/archer.config.json");
    graphic.on("ready", () => {
        graphic.view.zoomToFit(200, true);
        graphic.view.enableMouse(true, true);

        ajaxJson({ mode: "get", whereQuery: { "feature.mode": svgName } }, BACKHOST + "/flowBlock", { equal: true }).then((blocks) => {
          base.addEventListener("contextmenu", mouseClickCancelEvent);
          for (let obj of blocks) {
            obj.block = base.querySelector('#' + obj.id);
            if (obj.block === null) {
              console.log(obj);
            } else {
              obj.block.setAttribute("toggle", "off");
              obj.block.setAttribute("color", obj.block.querySelector("path").style.fill);
              obj.block.addEventListener("click", mouseClickEvent);
              obj.block.addEventListener("mouseenter", mouseEnterEvent);
              obj.block.addEventListener("mouseleave", mouseLeaveEvent);
            }
          }
          instance.map = blocks;
          resolve(base);
        }).catch((err) => {
          reject(err);
        });

    });
  });

}

FlowJs.prototype.grayRightPopup = function () {
  const instance = this;
  const button = document.getElementById("grayLeftOpenButton");
  const { createNode, colorChip, withOut } = GeneralJs;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const grayBoxClassName = "grayBoxClassName";
  let grayBox, grayBoxMargin;
  let grayBoxWidth;
  let grayBoxHeight;
  let grayBoxInnerPadding;
  let grayBoxInnerPaddingTop;
  let contents;
  let num;
  let buttonSize;
  let buttonWeight;
  let buttonUnitHeight;
  let grayBoxInnerPaddingBottom;
  let grayMother;
  let grayContentsBox;
  let whitePaddingTop;
  let whitePaddingBottom;
  let whitePaddingLeft;
  let whiteBase;
  let whiteSize;
  let whiteLineHeight;
  let buttonHeight;
  let buttonTop0, buttonTop1, buttonTop2, buttonTop3;
  let buttonWidth;
  let buttonRingBetween;
  let deactiveOpacity;

  grayBoxMargin = 45;
  grayBoxWidth = 240;
  grayBoxHeight = 280;
  grayBoxInnerPadding = 26;
  grayBoxInnerPaddingTop = 20;
  grayBoxInnerPaddingBottom = 22;

  buttonSize = 14;
  buttonWeight = 700;
  buttonUnitHeight = 28;

  whitePaddingTop = 12;
  whitePaddingBottom = 15;
  whitePaddingLeft = 18;

  whiteSize = 13;
  whiteLineHeight = 1.7;

  buttonHeight = 14;

  buttonTop0 = 16;
  buttonTop1 = 38;
  buttonTop2 = 60;
  buttonTop3 = 82;

  buttonWidth = 30;
  buttonRingBetween = 2;

  deactiveOpacity = 0.2;

  contents = [
    {
      title: "홈리에종 서비스 플로우",
      event: function (e) {
        instance.launchingDiagram("service").catch((err) => { console.log(err) });
      }
    },
    {
      title: "홈리에종 업무 플로우",
      event: function (e) {

      }
    },
    {
      title: "홈리에종 서버 상태",
      event: function (e) {

      }
    },
  ];

  grayMother = createNode({
    mother: totalContents,
    class: [ grayBoxClassName, "backblurgray" ],
    style: {
      position: "absolute",
      top: String(0) + ea,
      right: String(0) + ea,
      height: withOut(belowHeight, ea),
      width: String(grayBoxWidth) + ea,
      zIndex: String(4),
    },
    children: [
      {
        style: {
          display: "none",
          position: "relative",
          paddingTop: String(grayBoxInnerPaddingTop) + ea,
          paddingBottom: String(grayBoxInnerPaddingBottom) + ea,
          paddingLeft: String(grayBoxInnerPadding) + ea,
          paddingRight: String(grayBoxInnerPadding) + ea,
          width: withOut(grayBoxInnerPadding * 2, ea),
          background: colorChip.gradientGray,
        }
      },
      {
        style: {
          display: "block",
          position: "relative",
          paddingTop: String(grayBoxInnerPaddingTop) + ea,
          paddingLeft: String(grayBoxInnerPadding) + ea,
          paddingRight: String(grayBoxInnerPadding) + ea,
          width: withOut(grayBoxInnerPadding * 2, ea),
        }
      },
      {
        style: {
          display: "block",
          position: "absolute",
          bottom: String(grayBoxInnerPadding) + ea,
          left: String(grayBoxInnerPadding) + ea,
          width: withOut((grayBoxInnerPadding * 2) + (whitePaddingLeft * 2), ea),
          paddingTop: String(whitePaddingTop) + ea,
          paddingBottom: String(whitePaddingTop) + ea,
          paddingLeft: String(whitePaddingLeft) + ea,
          paddingRight: String(whitePaddingLeft) + ea,
          background: colorChip.white,
          borderRadius: String(5) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        }
      }
    ]
  });

  [ grayBox, grayContentsBox, whiteBase ] = [ ...grayMother.children ];

  num = 1;
  for (let { title, event } of contents) {
    createNode({
      mother: grayBox,
      class: [ "hoverDefault_lite" ],
      event: {
        click: event
      },
      style: {
        display: "flex",
        position: "relative",
        height: String(buttonUnitHeight) + ea,
        width: withOut(0),
        justifyContent: "end",
        alignItems: "center",
      },
      children: [
        {
          text: title,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(buttonSize) + ea,
            fontWeight: String(buttonWeight),
            color: colorChip.white,
          }
        },
        {
          text: String(num),
          style: {
            position: "absolute",
            fontSize: String(buttonSize) + ea,
            fontWeight: String(300),
            color: colorChip.white,
            left: String(0),
          }
        }
      ]
    })
    num++;
  }

  this.contentsBox = grayContentsBox;

  createNode({
    mother: whiteBase,
    text: instance.typeCase.join("\n") + "\n" + "베이스",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(whiteSize) + ea,
      fontWeight: String(800),
      color: colorChip.black,
      lineHeight: String(whiteLineHeight),
      textAlign: "left",
    }
  });

  createNode({
    mother: whiteBase,
    attribute: {
      toggle: "on",
    },
    event: {
      click: function (e) {
        const toggle = this.getAttribute("toggle");
        const blocks = instance.map;
        if (toggle === "on") {
          for (let { block, feature } of blocks) {
            if (feature.type.code === 1) {
              block.style.opacity = String(deactiveOpacity);
            }
          }
          this.style.background = colorChip.gray5;
          this.firstChild.firstChild.style.left = String(buttonRingBetween) + ea;
          this.setAttribute("toggle", "off");
        } else {
          for (let { block, feature } of blocks) {
            if (feature.type.code === 1) {
              block.style.opacity = String(1);
            }
          }
          this.style.background = colorChip.green;
          this.firstChild.firstChild.style.left = String(buttonWidth - (buttonHeight - (buttonRingBetween * 2)) - buttonRingBetween) + ea;
          this.setAttribute("toggle", "on");
        }
      }
    },
    style: {
      display: "inline-block",
      position: "absolute",
      top: String(buttonTop0) + ea,
      right: String(whitePaddingLeft) + ea,
      height: String(buttonHeight) + ea,
      width: String(buttonWidth) + ea,
      borderRadius: String(buttonHeight) + ea,
      background: colorChip.green,
      cursor: "pointer",
    },
    children: [
      {
        style: {
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(0),
          display: "block",
          position: "relative",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "absolute",
              top: String(buttonRingBetween) + ea,
              left: String(buttonWidth - (buttonHeight - (buttonRingBetween * 2)) - buttonRingBetween) + ea,
              width: String(buttonHeight - (buttonRingBetween * 2)) + ea,
              height: String(buttonHeight - (buttonRingBetween * 2)) + ea,
              borderRadius: String(buttonHeight - (buttonRingBetween * 2)) + ea,
              background: colorChip.white,
            }
          }
        ]
      }
    ]
  });

  createNode({
    mother: whiteBase,
    attribute: {
      toggle: "on",
    },
    event: {
      click: function (e) {
        const toggle = this.getAttribute("toggle");
        const blocks = instance.map;
        if (toggle === "on") {
          for (let { block, feature } of blocks) {
            if (feature.type.code === 2) {
              block.style.opacity = String(deactiveOpacity);
            }
          }
          this.style.background = colorChip.gray5;
          this.firstChild.firstChild.style.left = String(buttonRingBetween) + ea;
          this.setAttribute("toggle", "off");
        } else {
          for (let { block, feature } of blocks) {
            if (feature.type.code === 2) {
              block.style.opacity = String(1);
            }
          }
          this.style.background = colorChip.green;
          this.firstChild.firstChild.style.left = String(buttonWidth - (buttonHeight - (buttonRingBetween * 2)) - buttonRingBetween) + ea;
          this.setAttribute("toggle", "on");
        }
      }
    },
    style: {
      display: "inline-block",
      position: "absolute",
      top: String(buttonTop1) + ea,
      right: String(whitePaddingLeft) + ea,
      height: String(buttonHeight) + ea,
      width: String(buttonWidth) + ea,
      borderRadius: String(buttonHeight) + ea,
      background: colorChip.green,
      cursor: "pointer",
    },
    children: [
      {
        style: {
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(0),
          display: "block",
          position: "relative",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "absolute",
              top: String(buttonRingBetween) + ea,
              left: String(buttonWidth - (buttonHeight - (buttonRingBetween * 2)) - buttonRingBetween) + ea,
              width: String(buttonHeight - (buttonRingBetween * 2)) + ea,
              height: String(buttonHeight - (buttonRingBetween * 2)) + ea,
              borderRadius: String(buttonHeight - (buttonRingBetween * 2)) + ea,
              background: colorChip.white,
            }
          }
        ]
      }
    ]
  });

  createNode({
    mother: whiteBase,
    attribute: {
      toggle: "on",
    },
    event: {
      click: function (e) {
        const toggle = this.getAttribute("toggle");
        const blocks = instance.map;
        if (toggle === "on") {
          for (let { block, feature } of blocks) {
            if (feature.type.code === 3) {
              block.style.opacity = String(deactiveOpacity);
            }
          }
          this.style.background = colorChip.gray5;
          this.firstChild.firstChild.style.left = String(buttonRingBetween) + ea;
          this.setAttribute("toggle", "off");
        } else {
          for (let { block, feature } of blocks) {
            if (feature.type.code === 3) {
              block.style.opacity = String(1);
            }
          }
          this.style.background = colorChip.green;
          this.firstChild.firstChild.style.left = String(buttonWidth - (buttonHeight - (buttonRingBetween * 2)) - buttonRingBetween) + ea;
          this.setAttribute("toggle", "on");
        }
      }
    },
    style: {
      display: "inline-block",
      position: "absolute",
      top: String(buttonTop2) + ea,
      right: String(whitePaddingLeft) + ea,
      height: String(buttonHeight) + ea,
      width: String(buttonWidth) + ea,
      borderRadius: String(buttonHeight) + ea,
      background: colorChip.green,
      cursor: "pointer",
    },
    children: [
      {
        style: {
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(0),
          display: "block",
          position: "relative",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "absolute",
              top: String(buttonRingBetween) + ea,
              left: String(buttonWidth - (buttonHeight - (buttonRingBetween * 2)) - buttonRingBetween) + ea,
              width: String(buttonHeight - (buttonRingBetween * 2)) + ea,
              height: String(buttonHeight - (buttonRingBetween * 2)) + ea,
              borderRadius: String(buttonHeight - (buttonRingBetween * 2)) + ea,
              background: colorChip.white,
            }
          }
        ]
      }
    ]
  });

  createNode({
    mother: whiteBase,
    attribute: {
      toggle: "on",
    },
    event: {
      click: function (e) {
        const toggle = this.getAttribute("toggle");
        const blocks = instance.map;
        if (toggle === "on") {
          document.getElementById("base").style.opacity = String(deactiveOpacity);
          this.style.background = colorChip.gray5;
          this.firstChild.firstChild.style.left = String(buttonRingBetween) + ea;
          this.setAttribute("toggle", "off");
        } else {
          document.getElementById("base").style.opacity = String(1);
          this.style.background = colorChip.green;
          this.firstChild.firstChild.style.left = String(buttonWidth - (buttonHeight - (buttonRingBetween * 2)) - buttonRingBetween) + ea;
          this.setAttribute("toggle", "on");
        }
      }
    },
    style: {
      display: "inline-block",
      position: "absolute",
      top: String(buttonTop3) + ea,
      right: String(whitePaddingLeft) + ea,
      height: String(buttonHeight) + ea,
      width: String(buttonWidth) + ea,
      borderRadius: String(buttonHeight) + ea,
      background: colorChip.green,
      cursor: "pointer",
    },
    children: [
      {
        style: {
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(0),
          display: "block",
          position: "relative",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "absolute",
              top: String(buttonRingBetween) + ea,
              left: String(buttonWidth - (buttonHeight - (buttonRingBetween * 2)) - buttonRingBetween) + ea,
              width: String(buttonHeight - (buttonRingBetween * 2)) + ea,
              height: String(buttonHeight - (buttonRingBetween * 2)) + ea,
              borderRadius: String(buttonHeight - (buttonRingBetween * 2)) + ea,
              background: colorChip.white,
            }
          }
        ]
      }
    ]
  });

}

FlowJs.prototype.launching = async function () {
  const instance = this;
  const { returnGet, setQueue, ajaxJson } = GeneralJs;
  try {
    const propertyCase = [ "형태", "대상", "구축" ];
    const typeCase = [ "페이지", "액션", "알림" ];
    const targetCase = [ "고객", "디자이너", "홈리에종" ];
    let blocks;

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    document.getElementById("moveLeftArea").remove();
    document.getElementById("moveRightArea").remove();
    document.getElementById("grayLeftOpenButton").remove();

    this.propertyCase = propertyCase;
    this.typeCase = typeCase;
    this.targetCase = targetCase;
    this.contentsBox = null;
    this.thisBlock = null;
    this.map = [];

    this.grayRightPopup();
    await this.launchingDiagram("service");

  } catch (e) {
    GeneralJs.ajax("message=" + e.message + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
