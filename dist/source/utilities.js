(()=>{"use strict";var e,t={8681:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.defaultSettings=t.changelogs=void 0,t.changelogs=[{version:"b0.0.1",bulletpoints:['Ported most functionality from Tampermonkey script located <a href="https://github.com/albert-sun/tamper-scripts/">here</a>',"<b>Not yet implemented</b>: blacklisted keywords and buttons for testing wtihin settings (removed until settings structure finalized)","<b>Improvements from Tampermonkey script</b>: Instant settings propogation and no refresh required for cart addition or removal"]},{version:"b0.1.0",bulletpoints:["Added changelog (this tab here) and placeholder logging tab for testing","Changed extension script loading to work somewhat more dynamically"]}],t.defaultSettings={bestbuy:[{key:"automaticQueueFix",description:"Attempt to automatically fix broken queues",type:"slideSwitch",value:!0},{key:"autoClickWhitelisted",description:"Automatically click whitelisted ATC buttons",type:"slideSwitch",value:!0},{key:"stopClickCartOccupied",description:"Stop automatic clicking when cart occupied",type:"slideSwitch",value:!0},{key:"globalPollingInterval",description:"Global content script polling interval",type:"number",extraText:"ms",value:100},{key:"successiveClickTimeout",description:"Timeout between clicking unique buttons",type:"number",extraText:"ms",value:2500},{key:"notificationSoundURL",description:"Notification sound URL (mp3 hotlink)",type:"text",value:"https://github.com/albert-sun/tamper-scripts/blob/main/resources/notification.mp3?raw=true"},{key:"whitelistKeywords",description:"Whitelisted keywords (comma-separated)",type:"text",value:"3060,3060ti,3060 ti,3070,3070ti,3070 ti,3080,3080ti,3080 ti,3090"}]}},1209:function(e,t,o){var r=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function l(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}a((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.retrieveSettingsKV=t.retrieveSettings=t.storageGet=t.elementColor=t.sleep=void 0;const n=o(9416),i=o(8681);t.sleep=function(e){return new Promise((t=>setTimeout(t,e)))};const s=[{color:"yellow",r:255,g:224,b:0},{color:"blue",r:0,g:30,b:115},{color:"grey",r:197,g:203,b:213},{color:"white",r:255,g:255,b:255}];function l(e,t){return r(this,void 0,void 0,(function*(){const o=yield n.browser.storage.local.get(e);return void 0!==o[e]?o[e]:t}))}function a(e){return r(this,void 0,void 0,(function*(){const t=i.defaultSettings[e];for(const o of t){if(void 0===o.value)continue;const t=`setting-${e}-${o.key}`;o.value=yield l(t,o.value)}return t}))}t.elementColor=function(e){const t=getComputedStyle(e,null).getPropertyValue("background-color");if(t.includes("rgb(0, 0, 0"))return"transparent";const o={r:0,g:0,b:0},r=t.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);o.r=Number(r[1]),o.g=Number(r[2]),o.b=Number(r[3]);const n={color:"",distance:442};for(const e of s){const t=Math.sqrt(Math.pow(o.r-e.r,2)+Math.pow(o.g-e.g,2)+(o.b-e.b));t<n.distance&&(n.color=e.color,n.distance=t)}return n.color},t.storageGet=l,t.retrieveSettings=a,t.retrieveSettingsKV=function(e){return r(this,void 0,void 0,(function*(){const t={},o=yield a(e);for(const e of o)void 0!==e.value&&(t[e.key]=e);return t}))}}},o={};function r(e){var n=o[e];if(void 0!==n)return n.exports;var i=o[e]={exports:{}};return t[e].call(i.exports,i,i.exports,r),i.exports}r.m=t,e=[],r.O=(t,o,n,i)=>{if(!o){var s=1/0;for(c=0;c<e.length;c++){for(var[o,n,i]=e[c],l=!0,a=0;a<o.length;a++)(!1&i||s>=i)&&Object.keys(r.O).every((e=>r.O[e](o[a])))?o.splice(a--,1):(l=!1,i<s&&(s=i));l&&(e.splice(c--,1),t=n())}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[o,n,i]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.j=386,(()=>{var e={386:0,533:0};r.O.j=t=>0===e[t];var t=(t,o)=>{var n,i,[s,l,a]=o,c=0;for(n in l)r.o(l,n)&&(r.m[n]=l[n]);if(a)var u=a(r);for(t&&t(o);c<s.length;c++)i=s[c],r.o(e,i)&&e[i]&&e[i][0](),e[s[c]]=0;return r.O(u)},o=self.webpackChunkextension=self.webpackChunkextension||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var n=r.O(void 0,[736],(()=>r(1209)));n=r.O(n)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9leHRlbnNpb24vLi9zb3VyY2UvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2V4dGVuc2lvbi8uL3NvdXJjZS91dGlsaXRpZXMudHMiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvcnVudGltZUlkIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbImRlZmVycmVkIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZWZhdWx0U2V0dGluZ3MiLCJjaGFuZ2Vsb2dzIiwia2V5IiwiZGVzY3JpcHRpb24iLCJ0eXBlIiwiZXh0cmFUZXh0IiwiX19hd2FpdGVyIiwidGhpcyIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwicmV0cmlldmVTZXR0aW5nc0tWIiwicmV0cmlldmVTZXR0aW5ncyIsInN0b3JhZ2VHZXQiLCJlbGVtZW50Q29sb3IiLCJzbGVlcCIsIndlYmV4dGVuc2lvbl9wb2x5ZmlsbF90c18xIiwiY29uc3RhbnRzXzEiLCJtcyIsInNldFRpbWVvdXQiLCJjb2xvcnMiLCJjb2xvciIsInIiLCJnIiwiYiIsInN0b3JhZ2VLZXkiLCJkZWZhdWx0VmFsdWUiLCJzdG9yYWdlUmVzdWx0IiwiYnJvd3NlciIsInN0b3JhZ2UiLCJsb2NhbCIsImdldCIsInVuZGVmaW5lZCIsInNldHRpbmdzQ2F0ZWdvcnkiLCJjYXRlZ29yeVNldHRpbmdzIiwic2V0dGluZyIsInNldHRpbmdLZXkiLCJlbGVtZW50IiwiY29sb3JUZXh0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImdldFByb3BlcnR5VmFsdWUiLCJpbmNsdWRlcyIsInBhcnNlZENvbG9yIiwibWF0Y2hlZENvbG9yIiwibWF0Y2giLCJOdW1iZXIiLCJjbG9zZXN0IiwiZGlzdGFuY2UiLCJjaGVja0NvbG9yIiwiTWF0aCIsInNxcnQiLCJwb3ciLCJjYXRlZ29yeVNldHRpbmdzS1YiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJtb2R1bGUiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiY2FsbCIsIm0iLCJPIiwiY2h1bmtJZHMiLCJmbiIsInByaW9yaXR5Iiwibm90RnVsZmlsbGVkIiwiSW5maW5pdHkiLCJpIiwibGVuZ3RoIiwiaiIsImtleXMiLCJldmVyeSIsInNwbGljZSIsIm4iLCJnZXR0ZXIiLCJfX2VzTW9kdWxlIiwiZCIsImEiLCJkZWZpbml0aW9uIiwibyIsImVudW1lcmFibGUiLCJnbG9iYWxUaGlzIiwiRnVuY3Rpb24iLCJ3aW5kb3ciLCJvYmoiLCJwcm9wIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsImluc3RhbGxlZENodW5rcyIsImNodW5rSWQiLCJ3ZWJwYWNrSnNvbnBDYWxsYmFjayIsInBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uIiwiZGF0YSIsIm1vcmVNb2R1bGVzIiwicnVudGltZSIsImNodW5rTG9hZGluZ0dsb2JhbCIsInNlbGYiLCJmb3JFYWNoIiwiYmluZCIsInB1c2giLCJfX3dlYnBhY2tfZXhwb3J0c19fIl0sIm1hcHBpbmdzIjoidUJBQUlBLEUsZ0JDQ0pDLE9BQU9DLGVBQWVDLEVBQVMsYUFBYyxDQUFFQyxPQUFPLElBQ3RERCxFQUFRRSxnQkFBa0JGLEVBQVFHLGdCQUFhLEVBRS9DSCxFQUFRRyxXQUFhLENBQ2pCLENBQ0ksUUFBVyxTQUNYLGFBQWdCLENBQ1osOEhBQ0Esd0lBQ0Esb0lBRUwsQ0FDQyxRQUFXLFNBQ1gsYUFBZ0IsQ0FDWiwwRUFDQSx3RUFLWkgsRUFBUUUsZ0JBQWtCLENBQ3RCLFFBQVcsQ0FDUCxDQUFFRSxJQUFLLG9CQUFxQkMsWUFBYSw2Q0FBOENDLEtBQU0sY0FBZUwsT0FBTyxHQUNuSCxDQUFFRyxJQUFLLHVCQUF3QkMsWUFBYSw4Q0FBK0NDLEtBQU0sY0FBZUwsT0FBTyxHQUN2SCxDQUFFRyxJQUFLLHdCQUF5QkMsWUFBYSw2Q0FBOENDLEtBQU0sY0FBZUwsT0FBTyxHQUN2SCxDQUFFRyxJQUFLLHdCQUF5QkMsWUFBYSx5Q0FBMENDLEtBQU0sU0FBVUMsVUFBVyxLQUFNTixNQUFPLEtBQy9ILENBQUVHLElBQUsseUJBQTBCQyxZQUFhLDBDQUEyQ0MsS0FBTSxTQUFVQyxVQUFXLEtBQU1OLE1BQU8sTUFDakksQ0FBRUcsSUFBSyx1QkFBd0JDLFlBQWEsdUNBQXdDQyxLQUFNLE9BQVFMLE1BQU8sOEZBQ3pHLENBQUVHLElBQUssb0JBQXFCQyxZQUFhLHlDQUEwQ0MsS0FBTSxPQUFRTCxNQUFPLHVFLHFCQzVCaEgsSUFBSU8sRUFBYUMsTUFBUUEsS0FBS0QsV0FBYyxTQUFVRSxFQUFTQyxFQUFZQyxFQUFHQyxHQUUx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RUFBSSxJLE1DS3hCLElBQUlxQixFQUFrQixDQUNyQixJQUFLLEVBQ0wsSUFBSyxHQWFOcEMsRUFBb0JPLEVBQUVRLEVBQUtzQixHQUEwQyxJQUE3QkQsRUFBZ0JDLEdBR3hELElBQUlDLEVBQXVCLENBQUNDLEVBQTRCQyxLQUN2RCxJQUdJdkMsRUFBVW9DLEdBSFQ3QixFQUFVaUMsRUFBYUMsR0FBV0YsRUFHaEIzQixFQUFJLEVBQzNCLElBQUlaLEtBQVl3QyxFQUNaekMsRUFBb0J5QixFQUFFZ0IsRUFBYXhDLEtBQ3JDRCxFQUFvQk0sRUFBRUwsR0FBWXdDLEVBQVl4QyxJQUdoRCxHQUFHeUMsRUFBUyxJQUFJekYsRUFBU3lGLEVBQVExQyxHQUVqQyxJQURHdUMsR0FBNEJBLEVBQTJCQyxHQUNyRDNCLEVBQUlMLEVBQVNNLE9BQVFELElBQ3pCd0IsRUFBVTdCLEVBQVNLLEdBQ2hCYixFQUFvQnlCLEVBQUVXLEVBQWlCQyxJQUFZRCxFQUFnQkMsSUFDckVELEVBQWdCQyxHQUFTLEtBRTFCRCxFQUFnQjVCLEVBQVNLLElBQU0sRUFFaEMsT0FBT2IsRUFBb0JPLEVBQUV0RCxJQUcxQjBGLEVBQXFCQyxLQUE0QixzQkFBSUEsS0FBNEIsdUJBQUssR0FDMUZELEVBQW1CRSxRQUFRUCxFQUFxQlEsS0FBSyxLQUFNLElBQzNESCxFQUFtQkksS0FBT1QsRUFBcUJRLEtBQUssS0FBTUgsRUFBbUJJLEtBQUtELEtBQUtILEssR0M1Q3ZGLElBQUlLLEVBQXNCaEQsRUFBb0JPLE9BQUU3QixFQUFXLENBQUMsTUFBTSxJQUFPc0IsRUFBb0IsUUFDN0ZnRCxFQUFzQmhELEVBQW9CTyxFQUFFeUMsSSIsImZpbGUiOiJzb3VyY2UvdXRpbGl0aWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0cmVzdWx0ID0gZm4oKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0U2V0dGluZ3MgPSBleHBvcnRzLmNoYW5nZWxvZ3MgPSB2b2lkIDA7XHJcbi8vIENoYW5nZWxvZyBmcm9tIHByZXZpb3VzIHZlcnNpb25zXHJcbmV4cG9ydHMuY2hhbmdlbG9ncyA9IFtcclxuICAgIHtcclxuICAgICAgICBcInZlcnNpb25cIjogXCJiMC4wLjFcIixcclxuICAgICAgICBcImJ1bGxldHBvaW50c1wiOiBbXHJcbiAgICAgICAgICAgIGBQb3J0ZWQgbW9zdCBmdW5jdGlvbmFsaXR5IGZyb20gVGFtcGVybW9ua2V5IHNjcmlwdCBsb2NhdGVkIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYWxiZXJ0LXN1bi90YW1wZXItc2NyaXB0cy9cIj5oZXJlPC9hPmAsXHJcbiAgICAgICAgICAgIGA8Yj5Ob3QgeWV0IGltcGxlbWVudGVkPC9iPjogYmxhY2tsaXN0ZWQga2V5d29yZHMgYW5kIGJ1dHRvbnMgZm9yIHRlc3Rpbmcgd3RpaGluIHNldHRpbmdzIChyZW1vdmVkIHVudGlsIHNldHRpbmdzIHN0cnVjdHVyZSBmaW5hbGl6ZWQpYCxcclxuICAgICAgICAgICAgYDxiPkltcHJvdmVtZW50cyBmcm9tIFRhbXBlcm1vbmtleSBzY3JpcHQ8L2I+OiBJbnN0YW50IHNldHRpbmdzIHByb3BvZ2F0aW9uIGFuZCBubyByZWZyZXNoIHJlcXVpcmVkIGZvciBjYXJ0IGFkZGl0aW9uIG9yIHJlbW92YWxgXHJcbiAgICAgICAgXVxyXG4gICAgfSwge1xyXG4gICAgICAgIFwidmVyc2lvblwiOiBcImIwLjEuMFwiLFxyXG4gICAgICAgIFwiYnVsbGV0cG9pbnRzXCI6IFtcclxuICAgICAgICAgICAgYEFkZGVkIGNoYW5nZWxvZyAodGhpcyB0YWIgaGVyZSkgYW5kIHBsYWNlaG9sZGVyIGxvZ2dpbmcgdGFiIGZvciB0ZXN0aW5nYCxcclxuICAgICAgICAgICAgYENoYW5nZWQgZXh0ZW5zaW9uIHNjcmlwdCBsb2FkaW5nIHRvIHdvcmsgc29tZXdoYXQgbW9yZSBkeW5hbWljYWxseWAsXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5dO1xyXG4vLyBTZXR0aW5ncyBhY3Jvc3MgYWxsIGNhdGVnb3JpZXMgZm9yIGV4dGVuc2lvblxyXG5leHBvcnRzLmRlZmF1bHRTZXR0aW5ncyA9IHtcclxuICAgIFwiYmVzdGJ1eVwiOiBbXHJcbiAgICAgICAgeyBrZXk6IFwiYXV0b21hdGljUXVldWVGaXhcIiwgZGVzY3JpcHRpb246IFwiQXR0ZW1wdCB0byBhdXRvbWF0aWNhbGx5IGZpeCBicm9rZW4gcXVldWVzXCIsIHR5cGU6IFwic2xpZGVTd2l0Y2hcIiwgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICB7IGtleTogXCJhdXRvQ2xpY2tXaGl0ZWxpc3RlZFwiLCBkZXNjcmlwdGlvbjogXCJBdXRvbWF0aWNhbGx5IGNsaWNrIHdoaXRlbGlzdGVkIEFUQyBidXR0b25zXCIsIHR5cGU6IFwic2xpZGVTd2l0Y2hcIiwgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICB7IGtleTogXCJzdG9wQ2xpY2tDYXJ0T2NjdXBpZWRcIiwgZGVzY3JpcHRpb246IFwiU3RvcCBhdXRvbWF0aWMgY2xpY2tpbmcgd2hlbiBjYXJ0IG9jY3VwaWVkXCIsIHR5cGU6IFwic2xpZGVTd2l0Y2hcIiwgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICB7IGtleTogXCJnbG9iYWxQb2xsaW5nSW50ZXJ2YWxcIiwgZGVzY3JpcHRpb246IFwiR2xvYmFsIGNvbnRlbnQgc2NyaXB0IHBvbGxpbmcgaW50ZXJ2YWxcIiwgdHlwZTogXCJudW1iZXJcIiwgZXh0cmFUZXh0OiBcIm1zXCIsIHZhbHVlOiAxMDAgfSxcclxuICAgICAgICB7IGtleTogXCJzdWNjZXNzaXZlQ2xpY2tUaW1lb3V0XCIsIGRlc2NyaXB0aW9uOiBcIlRpbWVvdXQgYmV0d2VlbiBjbGlja2luZyB1bmlxdWUgYnV0dG9uc1wiLCB0eXBlOiBcIm51bWJlclwiLCBleHRyYVRleHQ6IFwibXNcIiwgdmFsdWU6IDI1MDAgfSxcclxuICAgICAgICB7IGtleTogXCJub3RpZmljYXRpb25Tb3VuZFVSTFwiLCBkZXNjcmlwdGlvbjogXCJOb3RpZmljYXRpb24gc291bmQgVVJMIChtcDMgaG90bGluaylcIiwgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9hbGJlcnQtc3VuL3RhbXBlci1zY3JpcHRzL2Jsb2IvbWFpbi9yZXNvdXJjZXMvbm90aWZpY2F0aW9uLm1wMz9yYXc9dHJ1ZVwiIH0sXHJcbiAgICAgICAgeyBrZXk6IFwid2hpdGVsaXN0S2V5d29yZHNcIiwgZGVzY3JpcHRpb246IFwiV2hpdGVsaXN0ZWQga2V5d29yZHMgKGNvbW1hLXNlcGFyYXRlZClcIiwgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBcIjMwNjAsMzA2MHRpLDMwNjAgdGksMzA3MCwzMDcwdGksMzA3MCB0aSwzMDgwLDMwODB0aSwzMDgwIHRpLDMwOTBcIiB9LFxyXG4gICAgICAgIC8vIHsga2V5OiBcInRlc3ROb3RpZmljYXRpb25Tb3VuZFwiLCBkZXNjcmlwdGlvbjogXCJQbGF5IGN1cnJlbnQgbm90aWZpY2F0aW9uIHNvdW5kXCIsIHR5cGU6IFwiYnV0dG9uXCIsIGluc3RydWN0aW9uOiBcInRlc3ROb3RpZmljYXRpb25Tb3VuZFwiIH0sXHJcbiAgICBdXHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5yZXRyaWV2ZVNldHRpbmdzS1YgPSBleHBvcnRzLnJldHJpZXZlU2V0dGluZ3MgPSBleHBvcnRzLnN0b3JhZ2VHZXQgPSBleHBvcnRzLmVsZW1lbnRDb2xvciA9IGV4cG9ydHMuc2xlZXAgPSB2b2lkIDA7XHJcbmNvbnN0IHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF90c18xID0gcmVxdWlyZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbC10c1wiKTtcclxuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHNcIik7XHJcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzk1MTAyMS93aGF0LWlzLXRoZS1qYXZhc2NyaXB0LXZlcnNpb24tb2Ytc2xlZXBcclxuLy8gUG9zc2libHkgaGFzIGlzc3VlcyByZXNvbHZpbmcgb24gRmlyZWZveD8gU3RhY2tPdmVyZmxvdyBzdXJlIGRvZXNuJ3QgdGhpbmsgc28uLi5cclxuZnVuY3Rpb24gc2xlZXAobXMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxufVxyXG5leHBvcnRzLnNsZWVwID0gc2xlZXA7XHJcbi8vIEFwcHJveGltYXRlcyB0aGUgcmVuZGVyZWQgYmFja2dyb3VuZCBjb2xvciBvZiBhIGdpdmVuIGVsZW1lbnQgdG8gYSBnaXZlbiBzZXQgb2YgY29sb3JzLlxyXG4vLyBDaGVja3Mgd2hldGhlciB0aGUgXCJkaXN0YW5jZVwiIGZyb20gdGhlIGVsZW1lbnQgY29sb3IgaXMgdHJhbnNwYXJlbnQgb3IgY2xvc2VzdCB0byBlaXRoZXIgeWVsbG93L3doaXRlL2JsdWUuXHJcbmNvbnN0IGNvbG9ycyA9IFtcclxuICAgIHsgY29sb3I6IFwieWVsbG93XCIsIHI6IDI1NSwgZzogMjI0LCBiOiAwIH0sXHJcbiAgICB7IGNvbG9yOiBcImJsdWVcIiwgcjogMCwgZzogMzAsIGI6IDExNSB9LFxyXG4gICAgeyBjb2xvcjogXCJncmV5XCIsIHI6IDE5NywgZzogMjAzLCBiOiAyMTMgfSxcclxuICAgIHsgY29sb3I6IFwid2hpdGVcIiwgcjogMjU1LCBnOiAyNTUsIGI6IDI1NSB9LFxyXG5dO1xyXG5mdW5jdGlvbiBlbGVtZW50Q29sb3IoZWxlbWVudCkge1xyXG4gICAgLy8gR2V0IHRoZSByZW5kZXJlZCBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBlbGVtZW50XHJcbiAgICBjb25zdCBjb2xvclRleHQgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG4gICAgaWYgKGNvbG9yVGV4dC5pbmNsdWRlcyhcInJnYigwLCAwLCAwXCIpKSB7IC8vIGVsZW1lbnQgaGFzIG5vIGNvbG9yID0gdHJhbnNwYXJlbnRcclxuICAgICAgICByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgfVxyXG4gICAgLy8gUGFyc2UgUkdCIHZhbHVlIGFuZCB1c2UgZmFuY3kgbWF0aHMgdG8gZmluZCBjbG9zZXN0IGNvbG9yXHJcbiAgICBjb25zdCBwYXJzZWRDb2xvciA9IHsgcjogMCwgZzogMCwgYjogMCB9O1xyXG4gICAgY29uc3QgbWF0Y2hlZENvbG9yID0gY29sb3JUZXh0Lm1hdGNoKC9ecmdiXFxzKlxcKFxccyooXFxkKylcXHMqLFxccyooXFxkKylcXHMqLFxccyooXFxkKylcXHMqXFwpJC9pKTtcclxuICAgIHBhcnNlZENvbG9yLnIgPSBOdW1iZXIobWF0Y2hlZENvbG9yWzFdKTtcclxuICAgIHBhcnNlZENvbG9yLmcgPSBOdW1iZXIobWF0Y2hlZENvbG9yWzJdKTtcclxuICAgIHBhcnNlZENvbG9yLmIgPSBOdW1iZXIobWF0Y2hlZENvbG9yWzNdKTtcclxuICAgIGNvbnN0IGNsb3Nlc3QgPSB7IGNvbG9yOiBcIlwiLCBkaXN0YW5jZTogNDQyIH07IC8vIERlZmF1bHQgZGlzdGFuY2UganVzdCBzbGlnaHRseSBsYXJnZXIgdGhhbiBtYXhcclxuICAgIGZvciAoY29uc3QgY2hlY2tDb2xvciBvZiBjb2xvcnMpIHtcclxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdygocGFyc2VkQ29sb3IuciAtIGNoZWNrQ29sb3IuciksIDIpICsgTWF0aC5wb3coKHBhcnNlZENvbG9yLmcgLSBjaGVja0NvbG9yLmcpLCAyKSArIChwYXJzZWRDb2xvci5iIC0gY2hlY2tDb2xvci5iKSk7XHJcbiAgICAgICAgaWYgKGRpc3RhbmNlIDwgY2xvc2VzdC5kaXN0YW5jZSkge1xyXG4gICAgICAgICAgICBjbG9zZXN0LmNvbG9yID0gY2hlY2tDb2xvci5jb2xvcjtcclxuICAgICAgICAgICAgY2xvc2VzdC5kaXN0YW5jZSA9IGRpc3RhbmNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjbG9zZXN0LmNvbG9yO1xyXG59XHJcbmV4cG9ydHMuZWxlbWVudENvbG9yID0gZWxlbWVudENvbG9yO1xyXG4vLyBXcmFwcGVyIGZvciByZXRyaWV2aW5nIGZyb20gc3RvcmFnZSB3aXRoIGRlZmF1bHQgdmFsdWUgaWYgdW5kZWZpbmVkXHJcbmZ1bmN0aW9uIHN0b3JhZ2VHZXQoc3RvcmFnZUtleSwgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2VSZXN1bHQgPSB5aWVsZCB3ZWJleHRlbnNpb25fcG9seWZpbGxfdHNfMS5icm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KHN0b3JhZ2VLZXkpO1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlUmVzdWx0W3N0b3JhZ2VLZXldICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyBzdG9yYWdlUmVzdWx0W3N0b3JhZ2VLZXldIDogZGVmYXVsdFZhbHVlO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5zdG9yYWdlR2V0ID0gc3RvcmFnZUdldDtcclxuLy8gV3JhcHBlciBmb3IgcmV0cmlldmluZyBzZXR0aW5ncyBmb3IgZ2l2ZW4gY2F0ZWdvcnkgYnkgdXBkYXRpbmcgZnJvbSBTdG9yYWdlIEFQSVxyXG5mdW5jdGlvbiByZXRyaWV2ZVNldHRpbmdzKHNldHRpbmdzQ2F0ZWdvcnkpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgLy8gR2V0IGRlZmF1bHQgc2V0dGluZ3MsIHRoZW4gdXBkYXRlIGluZGl2aWR1YWwgc2V0dGluZ3MgZnJvbSBTdG9yYWdlIEFQSVxyXG4gICAgICAgIGNvbnN0IGNhdGVnb3J5U2V0dGluZ3MgPSBjb25zdGFudHNfMS5kZWZhdWx0U2V0dGluZ3Nbc2V0dGluZ3NDYXRlZ29yeV07XHJcbiAgICAgICAgZm9yIChjb25zdCBzZXR0aW5nIG9mIGNhdGVnb3J5U2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgLy8gSWdub3JlIHNldHRpbmdzIHdpdGhvdXQgYSB2YWx1ZSAoYnV0dG9ucyBtYWlubHkpXHJcbiAgICAgICAgICAgIGlmIChzZXR0aW5nLnZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFJlcGxhY2Ugd2l0aCB2YWx1ZSBmcm9tIHN0b3JhZ2UgaWYgbW9kaWZpZWQgZXhpc3RzLCBvdGhlcndpc2Uga2VlcCBkZWZhdWx0XHJcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdLZXkgPSBgc2V0dGluZy0ke3NldHRpbmdzQ2F0ZWdvcnl9LSR7c2V0dGluZy5rZXl9YDtcclxuICAgICAgICAgICAgc2V0dGluZy52YWx1ZSA9IHlpZWxkIHN0b3JhZ2VHZXQoc2V0dGluZ0tleSwgc2V0dGluZy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYXRlZ29yeVNldHRpbmdzO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5yZXRyaWV2ZVNldHRpbmdzID0gcmV0cmlldmVTZXR0aW5ncztcclxuLy8gV3JhcHBlciBmb3IgZm9ybWF0dGluZyB0aGUgc2V0dGluZ3MgaW50byBrZXktdmFsdWUgaW5zdGVhZCBvZiBhcnJheVxyXG5mdW5jdGlvbiByZXRyaWV2ZVNldHRpbmdzS1Yoc2V0dGluZ3NDYXRlZ29yeSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBjYXRlZ29yeVNldHRpbmdzS1YgPSB7fTtcclxuICAgICAgICBjb25zdCBjYXRlZ29yeVNldHRpbmdzID0geWllbGQgcmV0cmlldmVTZXR0aW5ncyhzZXR0aW5nc0NhdGVnb3J5KTsgLy8gR2V0IHNldHRpbmdzIGJlZm9yZSByZWZvcm1hdHRpbmdcclxuICAgICAgICBmb3IgKGNvbnN0IHNldHRpbmcgb2YgY2F0ZWdvcnlTZXR0aW5ncykge1xyXG4gICAgICAgICAgICAvLyBJZ25vcmUgc2V0dGluZ3Mgd2l0aG91dCBhIHZhbHVlIChidXR0b25zIG1haW5seSlcclxuICAgICAgICAgICAgaWYgKHNldHRpbmcudmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0ZWdvcnlTZXR0aW5nc0tWW3NldHRpbmcua2V5XSA9IHNldHRpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYXRlZ29yeVNldHRpbmdzS1Y7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLnJldHJpZXZlU2V0dGluZ3NLViA9IHJldHJpZXZlU2V0dGluZ3NLVjtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uaiA9IDM4NjsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0Mzg2OiAwLFxuXHQ1MzM6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rZXh0ZW5zaW9uXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2V4dGVuc2lvblwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgWzczNl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKDEyMDkpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iXSwic291cmNlUm9vdCI6IiJ9