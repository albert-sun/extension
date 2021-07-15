(()=>{"use strict";var e,t={8681:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.defaultSettings=void 0,t.defaultSettings={bestbuy:[{key:"automaticQueueFix",description:"Attempt to automatically fix broken queues",type:"slideSwitch",value:!0},{key:"autoClickWhitelisted",description:"Automatically click whitelisted ATC buttons",type:"slideSwitch",value:!0},{key:"stopClickCartOccupied",description:"Stop automatic clicking when cart occupied",type:"slideSwitch",value:!0},{key:"globalPollingInterval",description:"Global content script polling interval",type:"number",extraText:"ms",value:100},{key:"successiveClickTimeout",description:"Timeout between clicking different button",type:"number",extraText:"ms",value:2500},{key:"notificationSoundURL",description:"Custom notification sound URL (mp3 hotlink)",type:"text",value:"https://github.com/albert-sun/tamper-scripts/blob/main/resources/notification.mp3?raw=true"},{key:"whitelistKeywords",description:"Comma-separated whitelisted keywords",type:"text",value:"3060,3060ti,3060 ti,3070,3070ti,3070 ti,3080,3080ti,3080 ti,3090"}]}},1209:function(e,t,o){var r=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(i,n){function c(e){try{s(r.next(e))}catch(e){n(e)}}function l(e){try{s(r.throw(e))}catch(e){n(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,l)}s((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.retrieveSettingsKV=t.retrieveSettings=t.storageGet=t.elementColor=t.sleep=void 0;const i=o(9416),n=o(8681);t.sleep=function(e){return new Promise((t=>setTimeout(t,e)))};const c=[{color:"yellow",r:255,g:224,b:0},{color:"blue",r:0,g:30,b:115},{color:"grey",r:197,g:203,b:213},{color:"white",r:255,g:255,b:255}];function l(e,t){return r(this,void 0,void 0,(function*(){const o=yield i.browser.storage.local.get(e);return void 0!==o[e]?o[e]:t}))}function s(e){return r(this,void 0,void 0,(function*(){const t=n.defaultSettings[e];for(const o of t){if(void 0===o.value)continue;const t=`setting-${e}-${o.key}`;o.value=yield l(t,o.value)}return t}))}t.elementColor=function(e){const t=getComputedStyle(e,null).getPropertyValue("background-color");if(t.includes("rgb(0, 0, 0"))return"transparent";const o={r:0,g:0,b:0},r=t.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);o.r=Number(r[1]),o.g=Number(r[2]),o.b=Number(r[3]);const i={color:"",distance:442};for(const e of c){const t=Math.sqrt(Math.pow(o.r-e.r,2)+Math.pow(o.g-e.g,2)+(o.b-e.b));t<i.distance&&(i.color=e.color,i.distance=t)}return i.color},t.storageGet=l,t.retrieveSettings=s,t.retrieveSettingsKV=function(e){return r(this,void 0,void 0,(function*(){const t={},o=yield s(e);for(const e of o)void 0!==e.value&&(t[e.key]=e);return t}))}}},o={};function r(e){var i=o[e];if(void 0!==i)return i.exports;var n=o[e]={exports:{}};return t[e].call(n.exports,n,n.exports,r),n.exports}r.m=t,e=[],r.O=(t,o,i,n)=>{if(!o){var c=1/0;for(u=0;u<e.length;u++){for(var[o,i,n]=e[u],l=!0,s=0;s<o.length;s++)(!1&n||c>=n)&&Object.keys(r.O).every((e=>r.O[e](o[s])))?o.splice(s--,1):(l=!1,n<c&&(c=n));l&&(e.splice(u--,1),t=i())}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[o,i,n]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.j=386,(()=>{var e={386:0,533:0};r.O.j=t=>0===e[t];var t=(t,o)=>{var i,n,[c,l,s]=o,u=0;for(i in l)r.o(l,i)&&(r.m[i]=l[i]);if(s)var a=s(r);for(t&&t(o);u<c.length;u++)n=c[u],r.o(e,n)&&e[n]&&e[n][0](),e[c[u]]=0;return r.O(a)},o=self.webpackChunkextension=self.webpackChunkextension||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var i=r.O(void 0,[736],(()=>r(1209)));i=r.O(i)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9leHRlbnNpb24vLi9zb3VyY2UvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2V4dGVuc2lvbi8uL3NvdXJjZS91dGlsaXRpZXMudHMiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvcnVudGltZUlkIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbImRlZmVycmVkIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZWZhdWx0U2V0dGluZ3MiLCJrZXkiLCJkZXNjcmlwdGlvbiIsInR5cGUiLCJleHRyYVRleHQiLCJfX2F3YWl0ZXIiLCJ0aGlzIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJyZXRyaWV2ZVNldHRpbmdzS1YiLCJyZXRyaWV2ZVNldHRpbmdzIiwic3RvcmFnZUdldCIsImVsZW1lbnRDb2xvciIsInNsZWVwIiwid2ViZXh0ZW5zaW9uX3BvbHlmaWxsX3RzXzEiLCJjb25zdGFudHNfMSIsIm1zIiwic2V0VGltZW91dCIsImNvbG9ycyIsImNvbG9yIiwiciIsImciLCJiIiwic3RvcmFnZUtleSIsImRlZmF1bHRWYWx1ZSIsInN0b3JhZ2VSZXN1bHQiLCJicm93c2VyIiwic3RvcmFnZSIsImxvY2FsIiwiZ2V0IiwidW5kZWZpbmVkIiwic2V0dGluZ3NDYXRlZ29yeSIsImNhdGVnb3J5U2V0dGluZ3MiLCJzZXR0aW5nIiwic2V0dGluZ0tleSIsImVsZW1lbnQiLCJjb2xvclRleHQiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsImluY2x1ZGVzIiwicGFyc2VkQ29sb3IiLCJtYXRjaGVkQ29sb3IiLCJtYXRjaCIsIk51bWJlciIsImNsb3Nlc3QiLCJkaXN0YW5jZSIsImNoZWNrQ29sb3IiLCJNYXRoIiwic3FydCIsInBvdyIsImNhdGVnb3J5U2V0dGluZ3NLViIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImNhY2hlZE1vZHVsZSIsIm1vZHVsZSIsIl9fd2VicGFja19tb2R1bGVzX18iLCJjYWxsIiwibSIsIk8iLCJjaHVua0lkcyIsImZuIiwicHJpb3JpdHkiLCJub3RGdWxmaWxsZWQiLCJJbmZpbml0eSIsImkiLCJsZW5ndGgiLCJqIiwia2V5cyIsImV2ZXJ5Iiwic3BsaWNlIiwibiIsImdldHRlciIsIl9fZXNNb2R1bGUiLCJkIiwiYSIsImRlZmluaXRpb24iLCJvIiwiZW51bWVyYWJsZSIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsIndpbmRvdyIsIm9iaiIsInByb3AiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiaW5zdGFsbGVkQ2h1bmtzIiwiY2h1bmtJZCIsIndlYnBhY2tKc29ucENhbGxiYWNrIiwicGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24iLCJkYXRhIiwibW9yZU1vZHVsZXMiLCJydW50aW1lIiwiY2h1bmtMb2FkaW5nR2xvYmFsIiwic2VsZiIsImZvckVhY2giLCJiaW5kIiwicHVzaCIsIl9fd2VicGFja19leHBvcnRzX18iXSwibWFwcGluZ3MiOiJ1QkFBSUEsRSxnQkNDSkMsT0FBT0MsZUFBZUMsRUFBUyxhQUFjLENBQUVDLE9BQU8sSUFDdERELEVBQVFFLHFCQUFrQixFQUUxQkYsRUFBUUUsZ0JBQWtCLENBQ3RCLFFBQVcsQ0FDUCxDQUFFQyxJQUFLLG9CQUFxQkMsWUFBYSw2Q0FBOENDLEtBQU0sY0FBZUosT0FBTyxHQUNuSCxDQUFFRSxJQUFLLHVCQUF3QkMsWUFBYSw4Q0FBK0NDLEtBQU0sY0FBZUosT0FBTyxHQUN2SCxDQUFFRSxJQUFLLHdCQUF5QkMsWUFBYSw2Q0FBOENDLEtBQU0sY0FBZUosT0FBTyxHQUN2SCxDQUFFRSxJQUFLLHdCQUF5QkMsWUFBYSx5Q0FBMENDLEtBQU0sU0FBVUMsVUFBVyxLQUFNTCxNQUFPLEtBQy9ILENBQUVFLElBQUsseUJBQTBCQyxZQUFhLDRDQUE2Q0MsS0FBTSxTQUFVQyxVQUFXLEtBQU1MLE1BQU8sTUFDbkksQ0FBRUUsSUFBSyx1QkFBd0JDLFlBQWEsOENBQStDQyxLQUFNLE9BQVFKLE1BQU8sOEZBQ2hILENBQUVFLElBQUssb0JBQXFCQyxZQUFhLHVDQUF3Q0MsS0FBTSxPQUFRSixNQUFPLHVFLHFCQ1g5RyxJQUFJTSxFQUFhQyxNQUFRQSxLQUFLRCxXQUFjLFNBQVVFLEVBQVNDLEVBQVlDLEVBQUdDLEdBRTFFLE9BQU8sSUFBS0QsSUFBTUEsRUFBSUUsV0FBVSxTQUFVQyxFQUFTQyxHQUMvQyxTQUFTQyxFQUFVZixHQUFTLElBQU1nQixFQUFLTCxFQUFVTSxLQUFLakIsSUFBVyxNQUFPa0IsR0FBS0osRUFBT0ksSUFDcEYsU0FBU0Ms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dkQsSUFHSXZDLEVBQVVvQyxHQUhUN0IsRUFBVWlDLEVBQWFDLEdBQVdGLEVBR2hCM0IsRUFBSSxFQUMzQixJQUFJWixLQUFZd0MsRUFDWnpDLEVBQW9CeUIsRUFBRWdCLEVBQWF4QyxLQUNyQ0QsRUFBb0JNLEVBQUVMLEdBQVl3QyxFQUFZeEMsSUFHaEQsR0FBR3lDLEVBQVMsSUFBSXpGLEVBQVN5RixFQUFRMUMsR0FFakMsSUFER3VDLEdBQTRCQSxFQUEyQkMsR0FDckQzQixFQUFJTCxFQUFTTSxPQUFRRCxJQUN6QndCLEVBQVU3QixFQUFTSyxHQUNoQmIsRUFBb0J5QixFQUFFVyxFQUFpQkMsSUFBWUQsRUFBZ0JDLElBQ3JFRCxFQUFnQkMsR0FBUyxLQUUxQkQsRUFBZ0I1QixFQUFTSyxJQUFNLEVBRWhDLE9BQU9iLEVBQW9CTyxFQUFFdEQsSUFHMUIwRixFQUFxQkMsS0FBNEIsc0JBQUlBLEtBQTRCLHVCQUFLLEdBQzFGRCxFQUFtQkUsUUFBUVAsRUFBcUJRLEtBQUssS0FBTSxJQUMzREgsRUFBbUJJLEtBQU9ULEVBQXFCUSxLQUFLLEtBQU1ILEVBQW1CSSxLQUFLRCxLQUFLSCxLLEdDNUN2RixJQUFJSyxFQUFzQmhELEVBQW9CTyxPQUFFN0IsRUFBVyxDQUFDLE1BQU0sSUFBT3NCLEVBQW9CLFFBQzdGZ0QsRUFBc0JoRCxFQUFvQk8sRUFBRXlDLEkiLCJmaWxlIjoic291cmNlL3V0aWxpdGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHJlc3VsdCA9IGZuKCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdFNldHRpbmdzID0gdm9pZCAwO1xyXG4vLyBTZXR0aW5ncyBhY3Jvc3MgYWxsIGNhdGVnb3JpZXMgZm9yIGV4dGVuc2lvblxyXG5leHBvcnRzLmRlZmF1bHRTZXR0aW5ncyA9IHtcclxuICAgIFwiYmVzdGJ1eVwiOiBbXHJcbiAgICAgICAgeyBrZXk6IFwiYXV0b21hdGljUXVldWVGaXhcIiwgZGVzY3JpcHRpb246IFwiQXR0ZW1wdCB0byBhdXRvbWF0aWNhbGx5IGZpeCBicm9rZW4gcXVldWVzXCIsIHR5cGU6IFwic2xpZGVTd2l0Y2hcIiwgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICB7IGtleTogXCJhdXRvQ2xpY2tXaGl0ZWxpc3RlZFwiLCBkZXNjcmlwdGlvbjogXCJBdXRvbWF0aWNhbGx5IGNsaWNrIHdoaXRlbGlzdGVkIEFUQyBidXR0b25zXCIsIHR5cGU6IFwic2xpZGVTd2l0Y2hcIiwgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICB7IGtleTogXCJzdG9wQ2xpY2tDYXJ0T2NjdXBpZWRcIiwgZGVzY3JpcHRpb246IFwiU3RvcCBhdXRvbWF0aWMgY2xpY2tpbmcgd2hlbiBjYXJ0IG9jY3VwaWVkXCIsIHR5cGU6IFwic2xpZGVTd2l0Y2hcIiwgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICB7IGtleTogXCJnbG9iYWxQb2xsaW5nSW50ZXJ2YWxcIiwgZGVzY3JpcHRpb246IFwiR2xvYmFsIGNvbnRlbnQgc2NyaXB0IHBvbGxpbmcgaW50ZXJ2YWxcIiwgdHlwZTogXCJudW1iZXJcIiwgZXh0cmFUZXh0OiBcIm1zXCIsIHZhbHVlOiAxMDAgfSxcclxuICAgICAgICB7IGtleTogXCJzdWNjZXNzaXZlQ2xpY2tUaW1lb3V0XCIsIGRlc2NyaXB0aW9uOiBcIlRpbWVvdXQgYmV0d2VlbiBjbGlja2luZyBkaWZmZXJlbnQgYnV0dG9uXCIsIHR5cGU6IFwibnVtYmVyXCIsIGV4dHJhVGV4dDogXCJtc1wiLCB2YWx1ZTogMjUwMCB9LFxyXG4gICAgICAgIHsga2V5OiBcIm5vdGlmaWNhdGlvblNvdW5kVVJMXCIsIGRlc2NyaXB0aW9uOiBcIkN1c3RvbSBub3RpZmljYXRpb24gc291bmQgVVJMIChtcDMgaG90bGluaylcIiwgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9hbGJlcnQtc3VuL3RhbXBlci1zY3JpcHRzL2Jsb2IvbWFpbi9yZXNvdXJjZXMvbm90aWZpY2F0aW9uLm1wMz9yYXc9dHJ1ZVwiIH0sXHJcbiAgICAgICAgeyBrZXk6IFwid2hpdGVsaXN0S2V5d29yZHNcIiwgZGVzY3JpcHRpb246IFwiQ29tbWEtc2VwYXJhdGVkIHdoaXRlbGlzdGVkIGtleXdvcmRzXCIsIHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogXCIzMDYwLDMwNjB0aSwzMDYwIHRpLDMwNzAsMzA3MHRpLDMwNzAgdGksMzA4MCwzMDgwdGksMzA4MCB0aSwzMDkwXCIgfSxcclxuICAgICAgICAvLyB7IGtleTogXCJ0ZXN0Tm90aWZpY2F0aW9uU291bmRcIiwgZGVzY3JpcHRpb246IFwiUGxheSBjdXJyZW50IG5vdGlmaWNhdGlvbiBzb3VuZFwiLCB0eXBlOiBcImJ1dHRvblwiLCBpbnN0cnVjdGlvbjogXCJ0ZXN0Tm90aWZpY2F0aW9uU291bmRcIiB9LFxyXG4gICAgXVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMucmV0cmlldmVTZXR0aW5nc0tWID0gZXhwb3J0cy5yZXRyaWV2ZVNldHRpbmdzID0gZXhwb3J0cy5zdG9yYWdlR2V0ID0gZXhwb3J0cy5lbGVtZW50Q29sb3IgPSBleHBvcnRzLnNsZWVwID0gdm9pZCAwO1xyXG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfdHNfMSA9IHJlcXVpcmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGwtdHNcIik7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzXCIpO1xyXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85NTEwMjEvd2hhdC1pcy10aGUtamF2YXNjcmlwdC12ZXJzaW9uLW9mLXNsZWVwXHJcbi8vIFBvc3NpYmx5IGhhcyBpc3N1ZXMgcmVzb2x2aW5nIG9uIEZpcmVmb3g/IFN0YWNrT3ZlcmZsb3cgc3VyZSBkb2Vzbid0IHRoaW5rIHNvLi4uXHJcbmZ1bmN0aW9uIHNsZWVwKG1zKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XHJcbn1cclxuZXhwb3J0cy5zbGVlcCA9IHNsZWVwO1xyXG4vLyBBcHByb3hpbWF0ZXMgdGhlIHJlbmRlcmVkIGJhY2tncm91bmQgY29sb3Igb2YgYSBnaXZlbiBlbGVtZW50IHRvIGEgZ2l2ZW4gc2V0IG9mIGNvbG9ycy5cclxuLy8gQ2hlY2tzIHdoZXRoZXIgdGhlIFwiZGlzdGFuY2VcIiBmcm9tIHRoZSBlbGVtZW50IGNvbG9yIGlzIHRyYW5zcGFyZW50IG9yIGNsb3Nlc3QgdG8gZWl0aGVyIHllbGxvdy93aGl0ZS9ibHVlLlxyXG5jb25zdCBjb2xvcnMgPSBbXHJcbiAgICB7IGNvbG9yOiBcInllbGxvd1wiLCByOiAyNTUsIGc6IDIyNCwgYjogMCB9LFxyXG4gICAgeyBjb2xvcjogXCJibHVlXCIsIHI6IDAsIGc6IDMwLCBiOiAxMTUgfSxcclxuICAgIHsgY29sb3I6IFwiZ3JleVwiLCByOiAxOTcsIGc6IDIwMywgYjogMjEzIH0sXHJcbiAgICB7IGNvbG9yOiBcIndoaXRlXCIsIHI6IDI1NSwgZzogMjU1LCBiOiAyNTUgfSxcclxuXTtcclxuZnVuY3Rpb24gZWxlbWVudENvbG9yKGVsZW1lbnQpIHtcclxuICAgIC8vIEdldCB0aGUgcmVuZGVyZWQgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgZWxlbWVudFxyXG4gICAgY29uc3QgY29sb3JUZXh0ID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuICAgIGlmIChjb2xvclRleHQuaW5jbHVkZXMoXCJyZ2IoMCwgMCwgMFwiKSkgeyAvLyBlbGVtZW50IGhhcyBubyBjb2xvciA9IHRyYW5zcGFyZW50XHJcbiAgICAgICAgcmV0dXJuIFwidHJhbnNwYXJlbnRcIjtcclxuICAgIH1cclxuICAgIC8vIFBhcnNlIFJHQiB2YWx1ZSBhbmQgdXNlIGZhbmN5IG1hdGhzIHRvIGZpbmQgY2xvc2VzdCBjb2xvclxyXG4gICAgY29uc3QgcGFyc2VkQ29sb3IgPSB7IHI6IDAsIGc6IDAsIGI6IDAgfTtcclxuICAgIGNvbnN0IG1hdGNoZWRDb2xvciA9IGNvbG9yVGV4dC5tYXRjaCgvXnJnYlxccypcXChcXHMqKFxcZCspXFxzKixcXHMqKFxcZCspXFxzKixcXHMqKFxcZCspXFxzKlxcKSQvaSk7XHJcbiAgICBwYXJzZWRDb2xvci5yID0gTnVtYmVyKG1hdGNoZWRDb2xvclsxXSk7XHJcbiAgICBwYXJzZWRDb2xvci5nID0gTnVtYmVyKG1hdGNoZWRDb2xvclsyXSk7XHJcbiAgICBwYXJzZWRDb2xvci5iID0gTnVtYmVyKG1hdGNoZWRDb2xvclszXSk7XHJcbiAgICBjb25zdCBjbG9zZXN0ID0geyBjb2xvcjogXCJcIiwgZGlzdGFuY2U6IDQ0MiB9OyAvLyBEZWZhdWx0IGRpc3RhbmNlIGp1c3Qgc2xpZ2h0bHkgbGFyZ2VyIHRoYW4gbWF4XHJcbiAgICBmb3IgKGNvbnN0IGNoZWNrQ29sb3Igb2YgY29sb3JzKSB7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coKHBhcnNlZENvbG9yLnIgLSBjaGVja0NvbG9yLnIpLCAyKSArIE1hdGgucG93KChwYXJzZWRDb2xvci5nIC0gY2hlY2tDb2xvci5nKSwgMikgKyAocGFyc2VkQ29sb3IuYiAtIGNoZWNrQ29sb3IuYikpO1xyXG4gICAgICAgIGlmIChkaXN0YW5jZSA8IGNsb3Nlc3QuZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgY2xvc2VzdC5jb2xvciA9IGNoZWNrQ29sb3IuY29sb3I7XHJcbiAgICAgICAgICAgIGNsb3Nlc3QuZGlzdGFuY2UgPSBkaXN0YW5jZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2xvc2VzdC5jb2xvcjtcclxufVxyXG5leHBvcnRzLmVsZW1lbnRDb2xvciA9IGVsZW1lbnRDb2xvcjtcclxuLy8gV3JhcHBlciBmb3IgcmV0cmlldmluZyBmcm9tIHN0b3JhZ2Ugd2l0aCBkZWZhdWx0IHZhbHVlIGlmIHVuZGVmaW5lZFxyXG5mdW5jdGlvbiBzdG9yYWdlR2V0KHN0b3JhZ2VLZXksIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBzdG9yYWdlUmVzdWx0ID0geWllbGQgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsX3RzXzEuYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChzdG9yYWdlS2V5KTtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZVJlc3VsdFtzdG9yYWdlS2V5XSAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gc3RvcmFnZVJlc3VsdFtzdG9yYWdlS2V5XSA6IGRlZmF1bHRWYWx1ZTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuc3RvcmFnZUdldCA9IHN0b3JhZ2VHZXQ7XHJcbi8vIFdyYXBwZXIgZm9yIHJldHJpZXZpbmcgc2V0dGluZ3MgZm9yIGdpdmVuIGNhdGVnb3J5IGJ5IHVwZGF0aW5nIGZyb20gU3RvcmFnZSBBUElcclxuZnVuY3Rpb24gcmV0cmlldmVTZXR0aW5ncyhzZXR0aW5nc0NhdGVnb3J5KSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIC8vIEdldCBkZWZhdWx0IHNldHRpbmdzLCB0aGVuIHVwZGF0ZSBpbmRpdmlkdWFsIHNldHRpbmdzIGZyb20gU3RvcmFnZSBBUElcclxuICAgICAgICBjb25zdCBjYXRlZ29yeVNldHRpbmdzID0gY29uc3RhbnRzXzEuZGVmYXVsdFNldHRpbmdzW3NldHRpbmdzQ2F0ZWdvcnldO1xyXG4gICAgICAgIGZvciAoY29uc3Qgc2V0dGluZyBvZiBjYXRlZ29yeVNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgIC8vIElnbm9yZSBzZXR0aW5ncyB3aXRob3V0IGEgdmFsdWUgKGJ1dHRvbnMgbWFpbmx5KVxyXG4gICAgICAgICAgICBpZiAoc2V0dGluZy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBSZXBsYWNlIHdpdGggdmFsdWUgZnJvbSBzdG9yYWdlIGlmIG1vZGlmaWVkIGV4aXN0cywgb3RoZXJ3aXNlIGtlZXAgZGVmYXVsdFxyXG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nS2V5ID0gYHNldHRpbmctJHtzZXR0aW5nc0NhdGVnb3J5fS0ke3NldHRpbmcua2V5fWA7XHJcbiAgICAgICAgICAgIHNldHRpbmcudmFsdWUgPSB5aWVsZCBzdG9yYWdlR2V0KHNldHRpbmdLZXksIHNldHRpbmcudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2F0ZWdvcnlTZXR0aW5ncztcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMucmV0cmlldmVTZXR0aW5ncyA9IHJldHJpZXZlU2V0dGluZ3M7XHJcbi8vIFdyYXBwZXIgZm9yIGZvcm1hdHRpbmcgdGhlIHNldHRpbmdzIGludG8ga2V5LXZhbHVlIGluc3RlYWQgb2YgYXJyYXlcclxuZnVuY3Rpb24gcmV0cmlldmVTZXR0aW5nc0tWKHNldHRpbmdzQ2F0ZWdvcnkpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlTZXR0aW5nc0tWID0ge307XHJcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlTZXR0aW5ncyA9IHlpZWxkIHJldHJpZXZlU2V0dGluZ3Moc2V0dGluZ3NDYXRlZ29yeSk7IC8vIEdldCBzZXR0aW5ncyBiZWZvcmUgcmVmb3JtYXR0aW5nXHJcbiAgICAgICAgZm9yIChjb25zdCBzZXR0aW5nIG9mIGNhdGVnb3J5U2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgLy8gSWdub3JlIHNldHRpbmdzIHdpdGhvdXQgYSB2YWx1ZSAoYnV0dG9ucyBtYWlubHkpXHJcbiAgICAgICAgICAgIGlmIChzZXR0aW5nLnZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGVnb3J5U2V0dGluZ3NLVltzZXR0aW5nLmtleV0gPSBzZXR0aW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2F0ZWdvcnlTZXR0aW5nc0tWO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5yZXRyaWV2ZVNldHRpbmdzS1YgPSByZXRyaWV2ZVNldHRpbmdzS1Y7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmogPSAzODY7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdDM4NjogMCxcblx0NTMzOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2V4dGVuc2lvblwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtleHRlbnNpb25cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFs3MzZdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXygxMjA5KSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==