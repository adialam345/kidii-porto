import{c as h}from"./createLucideIcon.DdIBJXgU.js";import{a as x}from"./utils.z_6t8hgT.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=h("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]),m=n=>typeof n=="boolean"?`${n}`:n===0?"0":n,y=x,j=(n,a)=>t=>{var o;if(a?.variants==null)return y(n,t?.class,t?.className);const{variants:u,defaultVariants:d}=a,V=Object.keys(u).map(e=>{const l=t?.[e],s=d?.[e];if(l===null)return null;const i=m(l)||m(s);return u[e][i]}),c=t&&Object.entries(t).reduce((e,l)=>{let[s,i]=l;return i===void 0||(e[s]=i),e},{}),f=a==null||(o=a.compoundVariants)===null||o===void 0?void 0:o.reduce((e,l)=>{let{class:s,className:i,...k}=l;return Object.entries(k).every(N=>{let[v,r]=N;return Array.isArray(r)?r.includes({...d,...c}[v]):{...d,...c}[v]===r})?[...e,s,i]:e},[]);return y(n,V,f,t?.class,t?.className)};export{b as M,j as c};
