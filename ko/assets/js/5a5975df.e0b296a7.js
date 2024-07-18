"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[373],{5811:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>p,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var i=n(3274),r=n(3006),c=n(1436);const s={sidebar_position:3},o="API",a={id:"documentations/api/index",title:"API",description:"You can access the Snow Datepicker API through the instance of the datepicker.",source:"@site/i18n/ko/docusaurus-plugin-content-docs/current/documentations/api/index.mdx",sourceDirName:"documentations/api",slug:"/documentations/api/",permalink:"/snow-datepicker/ko/docs/documentations/api/",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"documentations",previous:{title:"\uc774\ubca4\ud2b8",permalink:"/snow-datepicker/ko/docs/documentations/options/events"},next:{title:"\uc18d\uc131",permalink:"/snow-datepicker/ko/docs/documentations/api/properties"}},d={},l=[];function u(e){const t={code:"code",h1:"h1",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"api",children:"API"}),"\n",(0,i.jsx)(t.p,{children:"You can access the Snow Datepicker API through the instance of the datepicker."}),"\n",(0,i.jsx)(t.p,{children:"The instance is returned when you create a new datepicker:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-javascript",children:"const datepicker = new SnowDatepicker('#picker');\r\n\r\ndatepicker.currentView; // 'days'\r\ndatepicker.show();\n"})}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(c.A,{})]})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},1436:(e,t,n)=>{n.d(t,{A:()=>j});n(9474);var i=n(8923),r=n(3985),c=n(7575),s=n(4165),o=n(3770),a=n(9623);const d={cardContainer:"cardContainer_Mflp",cardTitle:"cardTitle_yGmQ",cardDescription:"cardDescription_yyKI"};var l=n(3274);function u(e){let{href:t,children:n}=e;return(0,l.jsx)(c.A,{href:t,className:(0,i.A)("card padding--lg",d.cardContainer),children:n})}function p(e){let{href:t,icon:n,title:r,description:c}=e;return(0,l.jsxs)(u,{href:t,children:[(0,l.jsxs)(a.A,{as:"h2",className:(0,i.A)("text--truncate",d.cardTitle),title:r,children:[n," ",r]}),c&&(0,l.jsx)("p",{className:(0,i.A)("text--truncate",d.cardDescription),title:c,children:c})]})}function m(e){let{item:t}=e;const n=(0,r.Nr)(t);return n?(0,l.jsx)(p,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,o.T)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function h(e){let{item:t}=e;const n=(0,s.A)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",i=(0,r.cC)(t.docId??void 0);return(0,l.jsx)(p,{href:t.href,icon:n,title:t.label,description:t.description??i?.description})}function f(e){let{item:t}=e;switch(t.type){case"link":return(0,l.jsx)(h,{item:t});case"category":return(0,l.jsx)(m,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function x(e){let{className:t}=e;const n=(0,r.$S)();return(0,l.jsx)(j,{items:n.items,className:t})}function j(e){const{items:t,className:n}=e;if(!t)return(0,l.jsx)(x,{...e});const c=(0,r.d1)(t);return(0,l.jsx)("section",{className:(0,i.A)("row",n),children:c.map(((e,t)=>(0,l.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,l.jsx)(f,{item:e})},t)))})}},3006:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>o});var i=n(9474);const r={},c=i.createContext(r);function s(e){const t=i.useContext(c);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(c.Provider,{value:t},e.children)}}}]);