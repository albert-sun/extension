(()=>{"use strict";var e,t={8681:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.defaultSettings=t.changelogs=void 0,t.changelogs=[{version:"b0.2.1",bulletpoints:["Fixed empty blacklist disqualifying all saved items",'Replaced icon which said "AQU" instead of "AGU" (original extension name was AutoQueueUtilities)',"<b>TODO:</b> Fix notification sound not playing if user hasn't interacted with document, maybe play from background instead?"]},{version:"b0.2.0",bulletpoints:["Added About tab showing some information and usage instructions","Changed extension icon to something somewhat more presentable","Removed placeholder logging tab pending further development","Added blacklisted keywords functionality to script (still no test buttons)","Other minor edits to extension popup styling, nothing too major"]},{version:"b0.1.0",bulletpoints:["Added changelog (this tab here) and placeholder logging tab for testing","Changed extension script loading to work somewhat more dynamically"]},{version:"b0.0.1",bulletpoints:['Ported most functionality from Tampermonkey script located <a href="https://github.com/albert-sun/tamper-scripts/">here</a>',"<b>Features not yet implemented</b>: blacklisted keywords and buttons for testing wtihin settings (removed until settings structure finalized)","<b>Improvements from Tampermonkey script</b>: Instant settings propogation and no refresh required for cart addition or removal"]}],t.defaultSettings={bestbuy:[{key:"automaticQueueFix",description:"Attempt to automatically fix broken queues",type:"slideSwitch",value:!0},{key:"autoClickWhitelisted",description:"Automatically click whitelisted ATC buttons",type:"slideSwitch",value:!0},{key:"stopClickCartOccupied",description:"Stop automatic clicking when cart occupied",type:"slideSwitch",value:!0},{key:"globalPollingInterval",description:"Global content script polling interval",type:"number",extraText:"ms",value:100},{key:"successiveClickTimeout",description:"Timeout between clicking unique buttons",type:"number",extraText:"ms",value:2500},{key:"notificationSoundURL",description:"Notification sound URL (mp3 hotlink)",type:"text",value:"https://github.com/albert-sun/tamper-scripts/blob/main/resources/notification.mp3?raw=true"},{key:"whitelistedKeywords",description:"Whitelisted keywords (comma-separated)",type:"text",value:"3060,3060ti,3060 ti,3070,3070ti,3070 ti,3080,3080ti,3080 ti,3090"},{key:"blacklistedKeywords",description:"Blacklisted keywords (comma-separated)",type:"text",value:""}]}},3113:function(e,t,i){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(i(8197)),r=i(8681),a=$(".changelog")[0];new o.default(a,{autoHide:!1}),$(a).find(".content-main").load("/pages/changelog.html",(function(){const e=$("#changelog-contents")[0];for(const t of r.changelogs){const i=document.createElement("br");e.appendChild(i);const n=document.createElement("div");n.id=`changelog-${t.version}`,e.appendChild(n);const o=document.createElement("p");o.classList.add("changelog-title"),n.appendChild(o),o.innerHTML=`<b>${t.version}</b>`;for(const e of t.bulletpoints){const t=document.createElement("p");t.classList.add("bulletpoint"),n.appendChild(t),t.innerHTML=`• ${e}`}}}))}},i={};function n(e){var o=i[e];if(void 0!==o)return o.exports;var r=i[e]={exports:{}};return t[e].call(r.exports,r,r.exports,n),r.exports}n.m=t,e=[],n.O=(t,i,o,r)=>{if(!i){var a=1/0;for(c=0;c<e.length;c++){for(var[i,o,r]=e[c],s=!0,l=0;l<i.length;l++)(!1&r||a>=r)&&Object.keys(n.O).every((e=>n.O[e](i[l])))?i.splice(l--,1):(s=!1,r<a&&(a=r));s&&(e.splice(c--,1),t=o())}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[i,o,r]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.j=693,(()=>{var e={693:0,533:0};n.O.j=t=>0===e[t];var t=(t,i)=>{var o,r,[a,s,l]=i,c=0;for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(l)var d=l(n);for(t&&t(i);c<a.length;c++)r=a[c],n.o(e,r)&&e[r]&&e[r][0](),e[a[c]]=0;return n.O(d)},i=self.webpackChunkextension=self.webpackChunkextension||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var o=n.O(void 0,[736],(()=>n(3113)));o=n.O(o)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9leHRlbnNpb24vLi9zb3VyY2UvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2V4dGVuc2lvbi8uL3NvdXJjZS9wYWdlX2NoYW5nZWxvZy50cyIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9ydW50aW1lSWQiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOlsiZGVmZXJyZWQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImRlZmF1bHRTZXR0aW5ncyIsImNoYW5nZWxvZ3MiLCJrZXkiLCJkZXNjcmlwdGlvbiIsInR5cGUiLCJleHRyYVRleHQiLCJfX2ltcG9ydERlZmF1bHQiLCJ0aGlzIiwibW9kIiwiX19lc01vZHVsZSIsInNpbXBsZWJhcl8xIiwiY29uc3RhbnRzXzEiLCJwYWdlV3JhcHBlciIsIiQiLCJkZWZhdWx0IiwiYXV0b0hpZGUiLCJmaW5kIiwibG9hZCIsImNoYW5nZWxvZ3NEaXYiLCJjaGFuZ2Vsb2ciLCJicmsiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNoYW5nZWxvZ0RpdiIsImlkIiwidmVyc2lvbiIsInRpdGxlUGFyYWdyYXBoIiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJIVE1MIiwiYnVsbGV0cG9pbnQiLCJidWxsZXRwb2ludHMiLCJidWxsZXRQYXJhZ3JhcGgiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiY2FsbCIsIm0iLCJPIiwicmVzdWx0IiwiY2h1bmtJZHMiLCJmbiIsInByaW9yaXR5Iiwibm90RnVsZmlsbGVkIiwiSW5maW5pdHkiLCJpIiwibGVuZ3RoIiwiZnVsZmlsbGVkIiwiaiIsImtleXMiLCJldmVyeSIsInNwbGljZSIsIm4iLCJnZXR0ZXIiLCJkIiwiYSIsImRlZmluaXRpb24iLCJvIiwiZW51bWVyYWJsZSIsImdldCIsImciLCJnbG9iYWxUaGlzIiwiRnVuY3Rpb24iLCJlIiwid2luZG93Iiwib2JqIiwicHJvcCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiaW5zdGFsbGVkQ2h1bmtzIiwiY2h1bmtJZCIsIndlYnBhY2tKc29ucENhbGxiYWNrIiwicGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24iLCJkYXRhIiwibW9yZU1vZHVsZXMiLCJydW50aW1lIiwiY2h1bmtMb2FkaW5nR2xvYmFsIiwic2VsZiIsImZvckVhY2giLCJiaW5kIiwicHVzaCIsIl9fd2VicGFja19leHBvcnRzX18iXSwibWFwcGluZ3MiOiJ1QkFBSUEsRSxnQkNDSkMsT0FBT0MsZUFBZUMsRUFBUyxhQUFjLENBQUVDLE9BQU8sSUFDdERELEVBQVFFLGdCQUFrQkYsRUFBUUcsZ0JBQWEs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QyxNQUFNLElBQU9ILEVBQW9CLFFBQzdGc0QsRUFBc0J0RCxFQUFvQlEsRUFBRThDLEkiLCJmaWxlIjoic291cmNlL3BhZ2VfY2hhbmdlbG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0cmVzdWx0ID0gZm4oKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0U2V0dGluZ3MgPSBleHBvcnRzLmNoYW5nZWxvZ3MgPSB2b2lkIDA7XHJcbi8vIENoYW5nZWxvZyBmcm9tIHByZXZpb3VzIHZlcnNpb25zXHJcbmV4cG9ydHMuY2hhbmdlbG9ncyA9IFtcclxuICAgIHtcclxuICAgICAgICBcInZlcnNpb25cIjogXCJiMC4yLjFcIixcclxuICAgICAgICBcImJ1bGxldHBvaW50c1wiOiBbXHJcbiAgICAgICAgICAgIGBGaXhlZCBlbXB0eSBibGFja2xpc3QgZGlzcXVhbGlmeWluZyBhbGwgc2F2ZWQgaXRlbXNgLFxyXG4gICAgICAgICAgICBgUmVwbGFjZWQgaWNvbiB3aGljaCBzYWlkIFwiQVFVXCIgaW5zdGVhZCBvZiBcIkFHVVwiIChvcmlnaW5hbCBleHRlbnNpb24gbmFtZSB3YXMgQXV0b1F1ZXVlVXRpbGl0aWVzKWAsXHJcbiAgICAgICAgICAgIGA8Yj5UT0RPOjwvYj4gRml4IG5vdGlmaWNhdGlvbiBzb3VuZCBub3QgcGxheWluZyBpZiB1c2VyIGhhc24ndCBpbnRlcmFjdGVkIHdpdGggZG9jdW1lbnQsIG1heWJlIHBsYXkgZnJvbSBiYWNrZ3JvdW5kIGluc3RlYWQ/YFxyXG4gICAgICAgIF1cclxuICAgIH0sIHtcclxuICAgICAgICBcInZlcnNpb25cIjogXCJiMC4yLjBcIixcclxuICAgICAgICBcImJ1bGxldHBvaW50c1wiOiBbXHJcbiAgICAgICAgICAgIGBBZGRlZCBBYm91dCB0YWIgc2hvd2luZyBzb21lIGluZm9ybWF0aW9uIGFuZCB1c2FnZSBpbnN0cnVjdGlvbnNgLFxyXG4gICAgICAgICAgICBgQ2hhbmdlZCBleHRlbnNpb24gaWNvbiB0byBzb21ldGhpbmcgc29tZXdoYXQgbW9yZSBwcmVzZW50YWJsZWAsXHJcbiAgICAgICAgICAgIGBSZW1vdmVkIHBsYWNlaG9sZGVyIGxvZ2dpbmcgdGFiIHBlbmRpbmcgZnVydGhlciBkZXZlbG9wbWVudGAsXHJcbiAgICAgICAgICAgIGBBZGRlZCBibGFja2xpc3RlZCBrZXl3b3JkcyBmdW5jdGlvbmFsaXR5IHRvIHNjcmlwdCAoc3RpbGwgbm8gdGVzdCBidXR0b25zKWAsXHJcbiAgICAgICAgICAgIGBPdGhlciBtaW5vciBlZGl0cyB0byBleHRlbnNpb24gcG9wdXAgc3R5bGluZywgbm90aGluZyB0b28gbWFqb3JgLFxyXG4gICAgICAgIF1cclxuICAgIH0sIHtcclxuICAgICAgICBcInZlcnNpb25cIjogXCJiMC4xLjBcIixcclxuICAgICAgICBcImJ1bGxldHBvaW50c1wiOiBbXHJcbiAgICAgICAgICAgIGBBZGRlZCBjaGFuZ2Vsb2cgKHRoaXMgdGFiIGhlcmUpIGFuZCBwbGFjZWhvbGRlciBsb2dnaW5nIHRhYiBmb3IgdGVzdGluZ2AsXHJcbiAgICAgICAgICAgIGBDaGFuZ2VkIGV4dGVuc2lvbiBzY3JpcHQgbG9hZGluZyB0byB3b3JrIHNvbWV3aGF0IG1vcmUgZHluYW1pY2FsbHlgLFxyXG4gICAgICAgIF1cclxuICAgIH0sIHtcclxuICAgICAgICBcInZlcnNpb25cIjogXCJiMC4wLjFcIixcclxuICAgICAgICBcImJ1bGxldHBvaW50c1wiOiBbXHJcbiAgICAgICAgICAgIGBQb3J0ZWQgbW9zdCBmdW5jdGlvbmFsaXR5IGZyb20gVGFtcGVybW9ua2V5IHNjcmlwdCBsb2NhdGVkIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYWxiZXJ0LXN1bi90YW1wZXItc2NyaXB0cy9cIj5oZXJlPC9hPmAsXHJcbiAgICAgICAgICAgIGA8Yj5GZWF0dXJlcyBub3QgeWV0IGltcGxlbWVudGVkPC9iPjogYmxhY2tsaXN0ZWQga2V5d29yZHMgYW5kIGJ1dHRvbnMgZm9yIHRlc3Rpbmcgd3RpaGluIHNldHRpbmdzIChyZW1vdmVkIHVudGlsIHNldHRpbmdzIHN0cnVjdHVyZSBmaW5hbGl6ZWQpYCxcclxuICAgICAgICAgICAgYDxiPkltcHJvdmVtZW50cyBmcm9tIFRhbXBlcm1vbmtleSBzY3JpcHQ8L2I+OiBJbnN0YW50IHNldHRpbmdzIHByb3BvZ2F0aW9uIGFuZCBubyByZWZyZXNoIHJlcXVpcmVkIGZvciBjYXJ0IGFkZGl0aW9uIG9yIHJlbW92YWxgXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5dO1xyXG4vLyBTZXR0aW5ncyBhY3Jvc3MgYWxsIGNhdGVnb3JpZXMgZm9yIGV4dGVuc2lvblxyXG5leHBvcnRzLmRlZmF1bHRTZXR0aW5ncyA9IHtcclxuICAgIFwiYmVzdGJ1eVwiOiBbXHJcbiAgICAgICAgeyBrZXk6IFwiYXV0b21hdGljUXVldWVGaXhcIiwgZGVzY3JpcHRpb246IFwiQXR0ZW1wdCB0byBhdXRvbWF0aWNhbGx5IGZpeCBicm9rZW4gcXVldWVzXCIsIHR5cGU6IFwic2xpZGVTd2l0Y2hcIiwgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICB7IGtleTogXCJhdXRvQ2xpY2tXaGl0ZWxpc3RlZFwiLCBkZXNjcmlwdGlvbjogXCJBdXRvbWF0aWNhbGx5IGNsaWNrIHdoaXRlbGlzdGVkIEFUQyBidXR0b25zXCIsIHR5cGU6IFwic2xpZGVTd2l0Y2hcIiwgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICB7IGtleTogXCJzdG9wQ2xpY2tDYXJ0T2NjdXBpZWRcIiwgZGVzY3JpcHRpb246IFwiU3RvcCBhdXRvbWF0aWMgY2xpY2tpbmcgd2hlbiBjYXJ0IG9jY3VwaWVkXCIsIHR5cGU6IFwic2xpZGVTd2l0Y2hcIiwgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICB7IGtleTogXCJnbG9iYWxQb2xsaW5nSW50ZXJ2YWxcIiwgZGVzY3JpcHRpb246IFwiR2xvYmFsIGNvbnRlbnQgc2NyaXB0IHBvbGxpbmcgaW50ZXJ2YWxcIiwgdHlwZTogXCJudW1iZXJcIiwgZXh0cmFUZXh0OiBcIm1zXCIsIHZhbHVlOiAxMDAgfSxcclxuICAgICAgICB7IGtleTogXCJzdWNjZXNzaXZlQ2xpY2tUaW1lb3V0XCIsIGRlc2NyaXB0aW9uOiBcIlRpbWVvdXQgYmV0d2VlbiBjbGlja2luZyB1bmlxdWUgYnV0dG9uc1wiLCB0eXBlOiBcIm51bWJlclwiLCBleHRyYVRleHQ6IFwibXNcIiwgdmFsdWU6IDI1MDAgfSxcclxuICAgICAgICB7IGtleTogXCJub3RpZmljYXRpb25Tb3VuZFVSTFwiLCBkZXNjcmlwdGlvbjogXCJOb3RpZmljYXRpb24gc291bmQgVVJMIChtcDMgaG90bGluaylcIiwgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9hbGJlcnQtc3VuL3RhbXBlci1zY3JpcHRzL2Jsb2IvbWFpbi9yZXNvdXJjZXMvbm90aWZpY2F0aW9uLm1wMz9yYXc9dHJ1ZVwiIH0sXHJcbiAgICAgICAgeyBrZXk6IFwid2hpdGVsaXN0ZWRLZXl3b3Jkc1wiLCBkZXNjcmlwdGlvbjogXCJXaGl0ZWxpc3RlZCBrZXl3b3JkcyAoY29tbWEtc2VwYXJhdGVkKVwiLCB0eXBlOiBcInRleHRcIiwgdmFsdWU6IFwiMzA2MCwzMDYwdGksMzA2MCB0aSwzMDcwLDMwNzB0aSwzMDcwIHRpLDMwODAsMzA4MHRpLDMwODAgdGksMzA5MFwiIH0sXHJcbiAgICAgICAgeyBrZXk6IFwiYmxhY2tsaXN0ZWRLZXl3b3Jkc1wiLCBkZXNjcmlwdGlvbjogXCJCbGFja2xpc3RlZCBrZXl3b3JkcyAoY29tbWEtc2VwYXJhdGVkKVwiLCB0eXBlOiBcInRleHRcIiwgdmFsdWU6IFwiXCIgfSxcclxuICAgICAgICAvLyB7IGtleTogXCJ0ZXN0Tm90aWZpY2F0aW9uU291bmRcIiwgZGVzY3JpcHRpb246IFwiUGxheSBjdXJyZW50IG5vdGlmaWNhdGlvbiBzb3VuZFwiLCB0eXBlOiBcImJ1dHRvblwiLCBpbnN0cnVjdGlvbjogXCJ0ZXN0Tm90aWZpY2F0aW9uU291bmRcIiB9LFxyXG4gICAgXVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBzaW1wbGViYXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwic2ltcGxlYmFyXCIpKTtcclxuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHNcIik7XHJcbmNvbnN0IHBhZ2VOYW1lID0gXCJjaGFuZ2Vsb2dcIjtcclxuLy8gUGFnZSBzdGFydHVwIHdyYXBwZXIgZm9yIGxvYWRpbmcgY29udGVudCBhbmQgc2NyaXB0aW5nXHJcbmNvbnN0IHBhZ2VXcmFwcGVyID0gJChgLiR7cGFnZU5hbWV9YClbMF07XHJcbm5ldyBzaW1wbGViYXJfMS5kZWZhdWx0KHBhZ2VXcmFwcGVyLCB7IGF1dG9IaWRlOiBmYWxzZSB9KTtcclxuY29uc3QgcGFnZUNvbnRlbnQgPSAkKHBhZ2VXcmFwcGVyKS5maW5kKFwiLmNvbnRlbnQtbWFpblwiKTtcclxucGFnZUNvbnRlbnQubG9hZChgL3BhZ2VzLyR7cGFnZU5hbWV9Lmh0bWxgLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBBZGQgZWFjaCBjaGFuZ2Vsb2cgYXMgYSBzZXBhcmF0ZSBkaXYgaW50byB0aGUgbWFpbiBkaXZcclxuICAgIGNvbnN0IGNoYW5nZWxvZ3NEaXYgPSAkKFwiI2NoYW5nZWxvZy1jb250ZW50c1wiKVswXTtcclxuICAgIGZvciAoY29uc3QgY2hhbmdlbG9nIG9mIGNvbnN0YW50c18xLmNoYW5nZWxvZ3MpIHtcclxuICAgICAgICBjb25zdCBicmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIik7XHJcbiAgICAgICAgY2hhbmdlbG9nc0Rpdi5hcHBlbmRDaGlsZChicmspO1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZWxvZ0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY2hhbmdlbG9nRGl2LmlkID0gYGNoYW5nZWxvZy0ke2NoYW5nZWxvZy52ZXJzaW9ufWA7XHJcbiAgICAgICAgY2hhbmdlbG9nc0Rpdi5hcHBlbmRDaGlsZChjaGFuZ2Vsb2dEaXYpO1xyXG4gICAgICAgIC8vIEFkZCB0aGUgdmVyc2lvbiBhbmQgZGVzY3JpcHRpb24gcGFyYWdyYXBoXHJcbiAgICAgICAgY29uc3QgdGl0bGVQYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICB0aXRsZVBhcmFncmFwaC5jbGFzc0xpc3QuYWRkKFwiY2hhbmdlbG9nLXRpdGxlXCIpO1xyXG4gICAgICAgIGNoYW5nZWxvZ0Rpdi5hcHBlbmRDaGlsZCh0aXRsZVBhcmFncmFwaCk7XHJcbiAgICAgICAgdGl0bGVQYXJhZ3JhcGguaW5uZXJIVE1MID0gYDxiPiR7Y2hhbmdlbG9nLnZlcnNpb259PC9iPmA7XHJcbiAgICAgICAgLy8gQWRkIGVhY2ggYnVsbGV0IHBvaW50IGFzIGEgcGFyYWdyYXBoIHVuZGVybmVhdGhcclxuICAgICAgICBmb3IgKGNvbnN0IGJ1bGxldHBvaW50IG9mIGNoYW5nZWxvZy5idWxsZXRwb2ludHMpIHtcclxuICAgICAgICAgICAgY29uc3QgYnVsbGV0UGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgICAgIGJ1bGxldFBhcmFncmFwaC5jbGFzc0xpc3QuYWRkKFwiYnVsbGV0cG9pbnRcIik7XHJcbiAgICAgICAgICAgIGNoYW5nZWxvZ0Rpdi5hcHBlbmRDaGlsZChidWxsZXRQYXJhZ3JhcGgpO1xyXG4gICAgICAgICAgICBidWxsZXRQYXJhZ3JhcGguaW5uZXJIVE1MID0gYFxcdTIwMjIgJHtidWxsZXRwb2ludH1gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmogPSA2OTM7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdDY5MzogMCxcblx0NTMzOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2V4dGVuc2lvblwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtleHRlbnNpb25cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFs3MzZdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXygzMTEzKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==