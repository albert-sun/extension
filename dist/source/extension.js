(()=>{"use strict";var e,t={1959:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(9416),a=r(n(8197)),i=r(n(9755)),s=o.browser.runtime.getManifest();i.default("#version")[0].innerText=`Version ${s.version}`;const l={about:"/pages/about.html",bestbuy:"/pages/bestbuy.html",account:"/pages/account.html",settings:"/pages/settings.html"};let u,f;i.default(".sidebar").find("a").toArray().forEach((function(e){e.onclick=function(){u.classList.remove("active"),e.classList.add("active"),u=e,f.style.zIndex="0";const t=i.default(`div.${e.getAttribute("tag")}`)[0];t.style.zIndex="1",i.default(f).find(".simplebar-content-wrapper")[0].scrollTop=0,f=t}}));for(const[e,t]of Object.entries(l)){const t=i.default(`.${e}`)[0];new a.default(t,{autoHide:!1}),i.default(t).find(".content-main").load(l[e])}u=i.default("#default-tab")[0],u.classList.add("active"),f=i.default("#default-content")[0],f.style.zIndex="1"}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var a=n[e]={exports:{}};return t[e].call(a.exports,a,a.exports,r),a.exports}r.m=t,e=[],r.O=(t,n,o,a)=>{if(!n){var i=1/0;for(u=0;u<e.length;u++){for(var[n,o,a]=e[u],s=!0,l=0;l<n.length;l++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](n[l])))?n.splice(l--,1):(s=!1,a<i&&(i=a));s&&(e.splice(u--,1),t=o())}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,o,a]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.j=635,(()=>{var e={635:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,a,[i,s,l]=n,u=0;for(o in s)r.o(s,o)&&(r.m[o]=s[o]);if(l)var f=l(r);for(t&&t(n);u<i.length;u++)a=i[u],r.o(e,a)&&e[a]&&e[a][0](),e[i[u]]=0;return r.O(f)},n=self.webpackChunkextension=self.webpackChunkextension||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var o=r.O(void 0,[736],(()=>r(1959)));o=r.O(o)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9leHRlbnNpb24vLi9zb3VyY2UvZXh0ZW5zaW9uLnRzIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL3J1bnRpbWVJZCIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6WyJkZWZlcnJlZCIsIl9faW1wb3J0RGVmYXVsdCIsInRoaXMiLCJtb2QiLCJfX2VzTW9kdWxlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJ3ZWJleHRlbnNpb25fcG9seWZpbGxfdHNfMSIsInNpbXBsZWJhcl8xIiwianF1ZXJ5XzEiLCJtYW5pZmVzdERhdGEiLCJicm93c2VyIiwicnVudGltZSIsImdldE1hbmlmZXN0IiwiZGVmYXVsdCIsImlubmVyVGV4dCIsInZlcnNpb24iLCJwYWdlcyIsImFjdGl2ZVRhYiIsImFjdGl2ZUNvbnRlbnQiLCJmaW5kIiwidG9BcnJheSIsImZvckVhY2giLCJ0YWJCdXR0b24iLCJvbmNsaWNrIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwic3R5bGUiLCJ6SW5kZXgiLCJ0YWJDb250ZW50IiwiZ2V0QXR0cmlidXRlIiwic2Nyb2xsVG9wIiwicGFnZVRhZyIsIl8iLCJlbnRyaWVzIiwiY29udGVudCIsImF1dG9IaWRlIiwibG9hZCIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImNhY2hlZE1vZHVsZSIsInVuZGVmaW5lZCIsIm1vZHVsZSIsIl9fd2VicGFja19tb2R1bGVzX18iLCJjYWxsIiwibSIsIk8iLCJyZXN1bHQiLCJjaHVua0lkcyIsImZuIiwicHJpb3JpdHkiLCJub3RGdWxmaWxsZWQiLCJJbmZpbml0eSIsImkiLCJsZW5ndGgiLCJmdWxmaWxsZWQiLCJqIiwia2V5cyIsImV2ZXJ5Iiwia2V5Iiwic3BsaWNlIiwibiIsImdldHRlciIsImQiLCJhIiwiZGVmaW5pdGlvbiIsIm8iLCJlbnVtZXJhYmxlIiwiZ2V0IiwiZyIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImUiLCJ3aW5kb3ciLCJvYmoiLCJwcm9wIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJyIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJpbnN0YWxsZWRDaHVua3MiLCJjaHVua0lkIiwid2VicGFja0pzb25wQ2FsbGJhY2siLCJwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiIsImRhdGEiLCJtb3JlTW9kdWxlcyIsImNodW5rTG9hZGluZ0dsb2JhbCIsInNlbGYiLCJiaW5kIiwicHVzaCIsIl9fd2VicGFja19leHBvcnRzX18iXSwibWFwcGluZ3MiOiJ1QkFBSUEsRSx3QkNDSixJQUFJQyxFQUFtQkMsTUFBUUEsS0FBS0QsaUJBQW9CLFNBQVVFLEdBQzlELE9BQVFBLEdBQU9BLEVBQUlDLFdBQWNELEVBQU0sQ0FBRSxRQUFXQSxJQUV4REUsT0FBT0MsZUFBZUMsRUFBUyxhQUFjLENBQUVDLE9BQU8sSUFDdEQsTUFBTUMsRUFBNkIsRUFBUSxNQUNyQ0MsRUFBY1QsRUFBZ0IsRUFBUSxPQUN0Q1UsRUFBV1YsRUFBZ0IsRUFBUSxPQUVuQ1csRUFBZUgsRUFBMkJJLFFBQVFDLFFBQVFDLGNBQ2hFSixFQUFTSyxRQUFRLFlBQVksR0FBR0MsVUFBWSxXQUFXTCxFQUFhTSxVQUVwRSxNQUFNQyxFQUFRLENBQ1YsTUFBUyxvQkFDVCxRQUFXLHNCQUNYLFFBQVcsc0JBQ1gsU0FBWSx3QkFHaEIsSUFBSUMsRUFDQUMsRUFDSlYsRUFBU0ssUUFBUSxZQUFZTSxLQUFLLEtBQUtDLFVBQVVDLFNBQVEsU0FBVUMsR0FFL0RBLEVBQVVDLFFBQVUsV0FFaEJOLEVBQVVPLFVBQVVDLE9BQU8sVUFDM0JILEVBQVVFLFVBQVVFLElBQUksVUFDeEJULEVBQVlLLEVBRVpKLEVBQWNTLE1BQU1DLE9BQVMsSUFDN0IsTUFBTUMsRUFBYXJCLEVBQVNLLFFBQVEsT0FBT1MsRUFBVVEsYUFBYSxVQUFVLEdBQzVFRCxFQUFXRixNQUFNQyxPQUFTLElBQzFCcEIsRUFBU0ssUUFBUUssR0FBZUMsS0FBSyw4QkFBOEIsR0FBR1ksVUFBWSxFQUNsRmIsRUFBZ0JXLE1BSXhCLElBQUssTUFBT0csRUFBU0MsS0FBTS9CLE9BQU9nQyxRQUFRbEIsR0FBUSxDQUU5QyxNQUFNbUIsRUFBVTNCLEVBQVNLLFFBQVEsSUFBSW1CLEtBQVcsR0FDaEQsSUFBSXpCLEVBQVlNLFFBQVFzQixFQUFTLENBQUVDLFVBQVUsSUFDN0M1QixFQUFTSyxRQUFRc0IsR0FBU2hCLEtBQUssaUJBQWlCa0IsS0FBS3JCLEVBQU1nQixJQUcvRGYsRUFBWVQsRUFBU0ssUUFBUSxnQkFBZ0IsR0FDN0NJLEVBQVVPLFVBQVVFLElBQUksVUFDeEJSLEVBQWdCVixFQUFTSyxRQUFRLG9CQUFvQixHQUNyREssRUFBY1MsTUFBTUMsT0FBUyxNQzlDekJVLEVBQTJCLEdBRy9CLFNBQVNDLEVBQW9CQyxHQUU1QixJQUFJQyxFQUFlSCxFQUF5QkUsR0FDNUMsUUFBcUJFLElBQWpCRCxFQUNILE9BQU9BLEVBQWFyQyxRQUdyQixJQUFJdUMsRUFBU0wsRUFBeUJFLEdBQVksQ0FHakRwQyxRQUFTLElBT1YsT0FIQXdDLEVBQW9CSixHQUFVSyxLQUFLRixFQUFPdkMsUUFBU3VDLEVBQVFBLEVBQU92QyxRQUFTbUMsR0FHcEVJLEVBQU92QyxRQUlmbUMsRUFBb0JPLEVBQUlGLEVGekJwQi9DLEVBQVcsR0FDZjBDLEVBQW9CUSxFQUFJLENBQUNDLEVBQVFDLEVBQVVDLEVBQUlDLEtBQzlDLElBQUdGLEVBQUgsQ0FNQSxJQUFJRyxFQUFlQyxJQUNuQixJQUFTQyxFQUFJLEVBQUdBLEVBQUl6RCxFQUFTMEQsT0FBUUQsSUFBSyxDQUd6QyxJQUZBLElBQUtMLEVBQVVDLEVBQUlDLEdBQVl0RCxFQUFTeUQsR0FDcENFLEdBQVksRUFDUEMsRUFBSSxFQUFHQSxFQUFJUixFQUFTTSxPQUFRRSxNQUNwQixFQUFYTixHQUFzQkMsR0FBZ0JELElBQWFqRCxPQUFPd0QsS0FBS25CLEVBQW9CUSxHQUFHWSxPQUFPQyxHQUFTckIsRUFBb0JRLEVBQUVhLEdBQUtYLEVBQVNRLE1BQzlJUixFQUFTWSxPQUFPSixJQUFLLElBRXJCRCxHQUFZLEVBQ1RMLEVBQVdDLElBQWNBLEVBQWVELElBRzFDSyxJQUNGM0QsRUFBU2dFLE9BQU9QLElBQUssR0FDckJOLEVBQVNFLEtBR1gsT0FBT0YsRUF0Qk5HLEVBQVdBLEdBQVksRUFDdkIsSUFBSSxJQUFJRyxFQUFJekQsRUFBUzBELE9BQVFELEVBQUksR0FBS3pELEVBQVN5RCxFQUFJLEdBQUcsR0FBS0gsRUFBVUcsSUFBS3pELEVBQVN5RCxHQUFLekQsRUFBU3lELEVBQUksR0FDckd6RCxFQUFTeUQsR0FBSyxDQUFDTCxFQUFVQyxFQUFJQyxJR0ovQlosRUFBb0J1QixFQUFLbkIsSUFDeEIsSUFBSW9CLEVBQVNwQixHQUFVQSxFQUFPMUMsV0FDN0IsSUFBTzBDLEVBQWlCLFFBQ3hCLElBQU0sRUFFUCxPQURBSixFQUFvQnlCLEVBQUVELEVBQVEsQ0FBRUUsRUFBR0YsSUFDNUJBLEdDTFJ4QixFQUFvQnlCLEVBQUksQ0FBQzVELEVBQVM4RCxLQUNqQyxJQUFJLElBQUlOLEtBQU9NLEVBQ1gzQixFQUFvQjRCLEVBQUVELEVBQVlOLEtBQVNyQixFQUFvQjRCLEVBQUUvRCxFQUFTd0QsSUFDNUUxRCxPQUFPQyxlQUFlQyxFQUFTd0QsRUFBSyxDQUFFUSxZQUFZLEVBQU1DLElBQUtILEVBQVdOLE1DSjNFckIsRUFBb0IrQixFQUFJLFdBQ3ZCLEdBQTBCLGlCQUFmQyxXQUF5QixPQUFPQSxXQUMzQyxJQUNDLE9BQU94RSxNQUFRLElBQUl5RSxTQUFTLGNBQWIsR0FDZCxNQUFPQyxHQUNSLEdBQXNCLGlCQUFYQyxPQUFxQixPQUFPQSxRQUxqQixHQ0F4Qm5DLEVBQW9CNEIsRUFBSSxDQUFDUSxFQUFLQyxJQUFVMUUsT0FBTzJFLFVBQVVDLGVBQWVqQyxLQUFLOEIsRUFBS0MsR0NDbEZyQyxFQUFvQndDLEVBQUszRSxJQUNILG9CQUFYNEUsUUFBMEJBLE9BQU9DLGFBQzFDL0UsT0FBT0MsZUFBZUMsRUFBUzRFLE9BQU9DLFlBQWEsQ0FBRTVFLE1BQU8sV0FFN0RILE9BQU9DLGVBQWVDLEVBQVMsYUFBYyxDQUFFQyxPQUFPLEtDTHZEa0MsRUFBb0JrQixFQUFJLEksTUNLeEIsSUFBSXlCLEVBQWtCLENBQ3JCLElBQUssR0FhTjNDLEVBQW9CUSxFQUFFVSxFQUFLMEIsR0FBMEMsSUFBN0JELEVBQWdCQyxHQUd4RCxJQUFJQyxFQUF1QixDQUFDQyxFQUE0QkMsS0FDdkQsSUFHSTlDLEVBQVUyQyxHQUhUbEMsRUFBVXNDLEVBQWE1RSxHQUFXMkUsRUFHaEJoQyxFQUFJLEVBQzNCLElBQUlkLEtBQVkrQyxFQUNaaEQsRUFBb0I0QixFQUFFb0IsRUFBYS9DLEtBQ3JDRCxFQUFvQk8sRUFBRU4sR0FBWStDLEVBQVkvQyxJQUdoRCxHQUFHN0IsRUFBUyxJQUFJcUMsRUFBU3JDLEVBQVE0QixHQUVqQyxJQURHOEMsR0FBNEJBLEVBQTJCQyxHQUNyRGhDLEVBQUlMLEVBQVNNLE9BQVFELElBQ3pCNkIsRUFBVWxDLEVBQVNLLEdBQ2hCZixFQUFvQjRCLEVBQUVlLEVBQWlCQyxJQUFZRCxFQUFnQkMsSUFDckVELEVBQWdCQyxHQUFTLEtBRTFCRCxFQUFnQmpDLEVBQVNLLElBQU0sRUFFaEMsT0FBT2YsRUFBb0JRLEVBQUVDLElBRzFCd0MsRUFBcUJDLEtBQTRCLHNCQUFJQSxLQUE0Qix1QkFBSyxHQUMxRkQsRUFBbUJuRSxRQUFRK0QsRUFBcUJNLEtBQUssS0FBTSxJQUMzREYsRUFBbUJHLEtBQU9QLEVBQXFCTSxLQUFLLEtBQU1GLEVBQW1CRyxLQUFLRCxLQUFLRixLLEdDM0N2RixJQUFJSSxFQUFzQnJELEVBQW9CUSxPQUFFTCxFQUFXLENBQUMsTUFBTSxJQUFPSCxFQUFvQixRQUM3RnFELEVBQXNCckQsRUFBb0JRLEVBQUU2QyxJIiwiZmlsZSI6InNvdXJjZS9leHRlbnNpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHRyZXN1bHQgPSBmbigpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfdHNfMSA9IHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGwtdHNcIik7XHJcbmNvbnN0IHNpbXBsZWJhcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJzaW1wbGViYXJcIikpO1xyXG5jb25zdCBqcXVlcnlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwianF1ZXJ5XCIpKTtcclxuLy8gU2hvdyB2ZXJzaW9uIGluZm8gb24gYm90dG9tIGxlZnQgY29ybmVyIGZyb20gbWFuaWZlc3RcclxuY29uc3QgbWFuaWZlc3REYXRhID0gd2ViZXh0ZW5zaW9uX3BvbHlmaWxsX3RzXzEuYnJvd3Nlci5ydW50aW1lLmdldE1hbmlmZXN0KCk7XHJcbmpxdWVyeV8xLmRlZmF1bHQoXCIjdmVyc2lvblwiKVswXS5pbm5lclRleHQgPSBgVmVyc2lvbiAke21hbmlmZXN0RGF0YS52ZXJzaW9ufWA7XHJcbi8vIFRhYiBjb250ZW50IEhUTUwgc291cmNlIG1hcHBpbmdcclxuY29uc3QgcGFnZXMgPSB7XHJcbiAgICBcImFib3V0XCI6IFwiL3BhZ2VzL2Fib3V0Lmh0bWxcIixcclxuICAgIFwiYmVzdGJ1eVwiOiBcIi9wYWdlcy9iZXN0YnV5Lmh0bWxcIixcclxuICAgIFwiYWNjb3VudFwiOiBcIi9wYWdlcy9hY2NvdW50Lmh0bWxcIixcclxuICAgIFwic2V0dGluZ3NcIjogXCIvcGFnZXMvc2V0dGluZ3MuaHRtbFwiLFxyXG59O1xyXG4vLyBUYWIgY2xpY2tpbmcgYW5kIFwic3dpdGNoaW5nXCIgZnVuY3Rpb25hbGl0eVxyXG5sZXQgYWN0aXZlVGFiO1xyXG5sZXQgYWN0aXZlQ29udGVudDtcclxuanF1ZXJ5XzEuZGVmYXVsdChcIi5zaWRlYmFyXCIpLmZpbmQoXCJhXCIpLnRvQXJyYXkoKS5mb3JFYWNoKGZ1bmN0aW9uICh0YWJCdXR0b24pIHtcclxuICAgIC8vIFNldCBjbGlja2VkIHRhYiBhcyBhY3RpdmUgYW5kIGxvYWQgcmVzcGVjdGl2ZSBIVE1MXHJcbiAgICB0YWJCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBVcGRhdGUgY3VycmVudGx5IGFjdGl2ZSBoaWdobGlnaHRlZCB0YWJcclxuICAgICAgICBhY3RpdmVUYWIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICB0YWJCdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICBhY3RpdmVUYWIgPSB0YWJCdXR0b247XHJcbiAgICAgICAgLy8gU2V0IGNvbnRlbnQgZm9yIHJlc3BlY3RpdmUgdGFiIGFzIHRvcC1tb3N0XHJcbiAgICAgICAgYWN0aXZlQ29udGVudC5zdHlsZS56SW5kZXggPSBcIjBcIjtcclxuICAgICAgICBjb25zdCB0YWJDb250ZW50ID0ganF1ZXJ5XzEuZGVmYXVsdChgZGl2LiR7dGFiQnV0dG9uLmdldEF0dHJpYnV0ZShcInRhZ1wiKX1gKVswXTtcclxuICAgICAgICB0YWJDb250ZW50LnN0eWxlLnpJbmRleCA9IFwiMVwiO1xyXG4gICAgICAgIGpxdWVyeV8xLmRlZmF1bHQoYWN0aXZlQ29udGVudCkuZmluZChcIi5zaW1wbGViYXItY29udGVudC13cmFwcGVyXCIpWzBdLnNjcm9sbFRvcCA9IDA7XHJcbiAgICAgICAgYWN0aXZlQ29udGVudCA9IHRhYkNvbnRlbnQ7XHJcbiAgICB9O1xyXG59KTtcclxuLy8gTG9hZCBIVE1MIGZvciBvdmVybGF5IGNvbnRlbnQgaW4gYWR2YW5jZVxyXG5mb3IgKGNvbnN0IFtwYWdlVGFnLCBfXSBvZiBPYmplY3QuZW50cmllcyhwYWdlcykpIHtcclxuICAgIC8vIEFsc28gaW5pdGlhbGl6ZSBTaW1wbGVCYXIgZm9yIGVhY2ggZGl2LCB0b28gbGF6eSB0byBkZXN0cm95IGFuZCByZW1ha2VcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBqcXVlcnlfMS5kZWZhdWx0KGAuJHtwYWdlVGFnfWApWzBdO1xyXG4gICAgbmV3IHNpbXBsZWJhcl8xLmRlZmF1bHQoY29udGVudCwgeyBhdXRvSGlkZTogZmFsc2UgfSk7XHJcbiAgICBqcXVlcnlfMS5kZWZhdWx0KGNvbnRlbnQpLmZpbmQoXCIuY29udGVudC1tYWluXCIpLmxvYWQocGFnZXNbcGFnZVRhZ10pO1xyXG59XHJcbi8vIFNldCBkZWZhdWx0IHRhYiB0byBcIkFib3V0XCJcclxuYWN0aXZlVGFiID0ganF1ZXJ5XzEuZGVmYXVsdChcIiNkZWZhdWx0LXRhYlwiKVswXTtcclxuYWN0aXZlVGFiLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbmFjdGl2ZUNvbnRlbnQgPSBqcXVlcnlfMS5kZWZhdWx0KFwiI2RlZmF1bHQtY29udGVudFwiKVswXTtcclxuYWN0aXZlQ29udGVudC5zdHlsZS56SW5kZXggPSBcIjFcIjtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uaiA9IDYzNTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0NjM1OiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2V4dGVuc2lvblwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtleHRlbnNpb25cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFs3MzZdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXygxOTU5KSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==