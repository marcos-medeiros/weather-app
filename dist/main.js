/* eslint-disable */!function(e){var t={};function n(o){if(t[o])return t[o].exports;var d=t[o]={i:o,l:!1,exports:{}};return e[o].call(d.exports,d,d.exports,n),d.l=!0,d.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var d in e)n.d(o,d,function(t){return e[t]}.bind(null,d));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=document.getElementById("temp-switch"),o=document.getElementById("search-input"),d=document.getElementById("search-button"),a=document.getElementById("city-name"),i=document.getElementById("today-max"),r=document.getElementById("today-min"),y=document.getElementById("today-feels-like"),l=document.getElementById("today-humidity"),c=document.getElementById("error-msg"),s=document.getElementById("wrapper"),u=document.getElementById("initial-message");let m="°C";const f=(new Date).getDay(),p={0:0,1:0,2:0,3:0,4:0,5:0,6:0},x={todayMax:0,todayMin:0,todayFeelsLike:0,todayHumidity:0},g={0:"",1:"",2:"",3:"",4:"",5:"",6:""},M={0:"",1:"",2:"",3:"",4:"",5:"",6:""},F=e=>{const t={0:"Sunday",1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday"};return e<=6?t[e]:t[e-7]},L=()=>{for(let e=0;e<=6;e++){const t=document.getElementById(`day-${e}-img`),n=document.getElementById(`day-${e}`),o=document.getElementById(`day-${e}-description`),d=document.getElementById(`day-${e}-temp`);t.src=g[e],o.innerHTML=M[e],d.innerHTML=`${p[`${e}`]} ${m}`,n.innerHTML=F(`${f+e}`)}i.innerHTML=`${x.todayMax} ${m}`,r.innerHTML=`${x.todayMin} ${m}`,y.innerHTML=`${x.todayFeelsLike} ${m}`,l.innerHTML=`${x.todayHumidity}%`},E=async e=>{const t=await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=52119e88a31d7d889fe0c2dc770ee44b&units=metric&q=${e}`),n=await t.json();await(e=>{if("200"===e.cod){c.classList="d-none",x.todayMax=e.list[0].main.temp_max.toFixed(1),x.todayMin=e.list[0].main.temp_min.toFixed(1),x.todayFeelsLike=e.list[0].main.feels_like.toFixed(1),x.todayHumidity=e.list[0].main.humidity;for(let t=0;t<=6;t++)p[t]=e.list[t].main.temp.toFixed(1);"°F"===m&&(Object.keys(p).forEach(e=>{p[e]=(1.8*p[e]+32).toFixed(1)}),x.todayMax=(1.8*x.todayMax+32).toFixed(1),x.todayMin=(1.8*x.todayMin+32).toFixed(1),x.todayFeelsLike=(1.8*x.todayFeelsLike+32).toFixed(1));for(let t=0;t<=6;t++)g[t]=`http://openweathermap.org/img/wn/${e.list[`${t}`].weather[0].icon}.png`;for(let n=0;n<=6;n++)M[n]=(t=e.list[n].weather[0].description).charAt(0).toUpperCase()+t.slice(1);a.innerHTML=`${e.city.name} today`,s.classList.remove("d-none")}else c.classList="text-danger font-weight-bold mx-auto";var t;u.classList.add("d-none"),o.value=""})(n),await L()};d.addEventListener("click",()=>{E(o.value)}),o.addEventListener("keypress",e=>{"Enter"===e.key&&E(o.value)}),n.addEventListener("click",()=>{"°C"===m?(Object.keys(p).forEach(e=>{p[e]=(1.8*p[e]+32).toFixed(1)}),x.todayMax=(1.8*x.todayMax+32).toFixed(1),x.todayMin=(1.8*x.todayMin+32).toFixed(1),x.todayFeelsLike=(1.8*x.todayFeelsLike+32).toFixed(1),m="°F"):(Object.keys(p).forEach(e=>{p[e]=((p[e]-32)*(5/9)).toFixed(1)}),x.todayMax=((x.todayMax-32)*(5/9)).toFixed(1),x.todayMin=((x.todayMin-32)*(5/9)).toFixed(1),x.todayFeelsLike=((x.todayFeelsLike-32)*(5/9)).toFixed(1),m="°C"),L()})}]);