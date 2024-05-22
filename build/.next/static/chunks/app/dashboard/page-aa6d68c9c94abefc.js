(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[702],{9219:function(e,t,a){Promise.resolve().then(a.bind(a,8713))},8713:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return N}});var s=a(7437),n=a(2265),r=a(4080),o=a(5358),i=()=>(0,s.jsx)("div",{className:"w-full h-screen  flex justify-center items-center text-2xl font-bold text-secondary",children:(0,s.jsx)("span",{className:"loading loading-bars loading-lg",children:"Loading..."})}),c=a(6463),l=a(5262),d=a(6648),u=()=>(0,s.jsxs)("div",{className:"",children:[(0,s.jsx)(d.default,{src:l.default,alt:"logo",width:100,height:100}),(0,s.jsx)("h1",{className:"tracking-wide sm:tracking-wider text-xl sm:text-3xl font-semibold text-primary hidden sm:inline",children:"The Expense Tracker"})]}),m={src:"/_next/static/media/avtar.5262cad9.png",height:692,width:772,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAMAAAACh/xsAAAAJ1BMVEX////7+/tmXP7b2fvw8/+rp/u3jo+Uk57kudy3s/uKi5fRsNZaUltq6WTIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAALklEQVR4nCWKxw0AMBCDIL3tP290yQOBJQOqEP4gq/OGp0Vg2aO800yphjFn4QILWgBpDcwXrAAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:7},p=()=>{let{user:e,logout:t,isLoggedIn:a}=(0,r.a)(),n=(0,c.useRouter)(),{razorCheckout:i}=(0,o.I)();async function l(){try{let e=await i();console.log(e)}catch(e){console.log(e)}}async function p(){await t(),n.push("/login")}return(0,s.jsxs)("nav",{className:"navbar flex justify-evenly",children:[(0,s.jsx)(u,{}),(0,s.jsxs)("div",{className:"p-1  ",children:[(0,s.jsx)(d.default,{className:"mask mask-squircle mx-auto",src:m,width:50,height:50,alt:"user_logo"}),e.premium?(0,s.jsx)("button",{className:"badge badge-success",children:"Premium"}):(0,s.jsx)("button",{className:"btn btn-sm bg-info text-neutral",onClick:l,children:"Buy premium"}),(0,s.jsxs)("h1",{className:"text-lg mx-1",children:["Welcome!",(0,s.jsx)("span",{className:"text-lg font-semibold text-secondary mx-1",children:e.username})]}),(0,s.jsx)("button",{onClick:p,className:"btn absolute right-0 btn-sm sm:btn-md btn-primary  text-primary-content font-semibold  mx-4",children:"Logout"})]})]})},g=a(3872),y=()=>{let{category:e}=(0,r.a)(),{isLoading:t,getTransactionsByCategories:a}=(0,o.I)();async function n(e){console.log(e),await a(e)}return(0,s.jsx)("ul",{className:"join ",children:e.map(e=>(0,s.jsxs)("li",{onClick:()=>n(e.categories),className:"join-item btn btn-sm sm:btn-md m-0 sm:m-2 text-secondary",type:"radio",name:"options","aria-label":"Radio 1",children:[(0,s.jsx)("span",{children:(0,s.jsx)(g.WsE,{})}),e.categories]},e.logo))})},h=e=>{let{handleChange:t,handleFormSubmit:a,expense:n}=e,{category:o}=(0,r.a)();return(0,s.jsx)("div",{className:"card mt-2 shrink-0 w-full shadow-2xl bg-base-100",children:(0,s.jsxs)("form",{className:"card-body",onSubmit:a,children:[(0,s.jsx)("div",{className:"form-control",children:(0,s.jsx)("input",{type:"text",name:"title",placeholder:"title",value:n.title,className:"input input-sm input-bordered",required:!0,onChange:t})}),(0,s.jsxs)("div",{className:"form-control",children:[(0,s.jsx)("textarea",{className:"textarea textarea-info",placeholder:"Descriptions",name:"descriptions",value:n.descriptions,onChange:t}),(0,s.jsx)("div",{className:"form-control my-2",children:(0,s.jsx)("div",{className:"form-control",children:(0,s.jsx)("input",{type:"number",name:"amount",onChange:t,placeholder:"Amount",value:n.amount,className:"input input-sm input-bordered",required:!0})})}),(0,s.jsxs)("div",{className:"form-control flex flex-row ",children:[(0,s.jsx)("select",{className:"select mx-1 select-primary w-1/2 max-w-xs",value:n.categories.connect[0].id,onChange:e=>t({target:{name:"categories",value:{connect:[{id:parseInt(e.target.value)}]}}}),children:o.map(e=>(0,s.jsx)("option",{value:e.id,children:e.categories},e.id))}),(0,s.jsxs)("select",{className:"select select-primary w-1/2 max-w-xs",value:n.transactionType,onChange:t,name:"transactionType",children:[(0,s.jsx)("option",{value:"credit",children:"Credit"}),(0,s.jsx)("option",{value:"debit",children:"Debit"})]})]}),(0,s.jsx)("div",{className:"form-control my-2"})]}),(0,s.jsx)("div",{className:"form-control mt-6",children:(0,s.jsx)("button",{type:"submit",className:"btn btn-md btn-primary",children:"Add"})})]})})},x=a(8554),f=a(3043),j=()=>{let{isLoading:e,fetchTransactions:t,paginationData:a}=(0,o.I)(),{currentPage:r,totalPages:c}=a,[l,d]=(0,n.useState)(r);if(e)return(0,s.jsx)(i,{});(0,n.useEffect)(()=>{l!==r&&t(l)},[l,t,r]);let u=Array.from({length:c},(e,t)=>t+1),m=e=>{d(e)};return(0,s.jsx)("div",{className:"join",children:u.map(e=>(0,s.jsx)("button",{onClick:()=>m(e),className:"join-item btn ",children:e},e))})};let b={title:"",descriptions:"",amount:0,categories:{connect:[{id:0}]},transactionType:"credit"};var v=()=>{let{isLoading:e,transactions:t,balance:a,deleteExpense:l,addExpense:d,editExpense:u,generatePDF:m,paginationData:p,fetchTransactions:g}=(0,o.I)(),y=(0,c.useRouter)(),[v,N]=(0,n.useState)(b),{category:w,user:A}=(0,r.a)(),{currentPage:L,totalPages:O,totalTransactions:k}=p;async function P(e){await l(e),y.push("/dashboard")}function C(e){let{name:t,value:a}=e.target;N({...v,[t]:a})}async function T(){try{let e=await m(t),a=new Blob([e.data],{type:"application/pdf"}),s=URL.createObjectURL(a),n=document.createElement("a");n.href=s,n.setAttribute("download","transactions.pdf"),document.body.appendChild(n),n.click(),n.remove(),y.push("/dashboard")}catch(e){console.error("Failed to generate PDF:",e)}}async function I(e,t){e.preventDefault(),await u(t,v),N(b)}async function D(e){e.preventDefault(),await d(v),N(b),y.push("/dashboard")}return e||e?(0,s.jsx)(i,{}):(0,s.jsxs)("div",{className:"overflow-x-auto h-screen",children:[(0,s.jsxs)("h1",{className:"text-3xl absolute top-0 m-2 z-20 bg-base-200 w-1/2 p-2 rounded border-l-2 border-secondary",children:["Total Balance :"," ",(0,s.jsxs)("span",{className:"font-bold text-secondary ",children:[a," $"]})," "]}),A.premium&&(0,s.jsx)("button",{className:"btn absolute right-10",onClick:T,children:"Generate PDF"}),(0,s.jsxs)("div",{className:"collapse mt-20 w-[20rem] sm:w-[40rem]",children:[(0,s.jsx)("input",{type:"checkbox"}),(0,s.jsx)("div",{className:"collapse-title text-xs text-primary sm:text-sm btn btn-md",children:"Add new Transaction"}),(0,s.jsx)("div",{className:"collapse-content",children:(0,s.jsx)(h,{handleChange:C,handleFormSubmit:D,expense:v})})]}),t.length>0?(0,s.jsxs)("table",{className:"table z-10",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{className:"text-sm text-primary",children:"Title"}),(0,s.jsx)("th",{className:"text-sm text-primary",children:" Amount"}),(0,s.jsx)("th",{className:"text-sm text-primary",children:"Description"}),(0,s.jsx)("th",{className:"text-sm text-primary",children:"Date"}),(0,s.jsx)("th",{className:"text-sm text-primary",children:"Category"}),(0,s.jsx)("th",{className:"text-sm text-primary",children:"type"})]})}),(0,s.jsx)("tbody",{children:t.map(e=>{var t,a,n;return(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:e.title}),(0,s.jsx)("td",{children:(0,s.jsx)("div",{className:"flex items-center gap-3",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"font-bold"}),(0,s.jsxs)("div",{className:"text-sm opacity-50",children:[e.amount,"$"]})]})})}),(0,s.jsxs)("td",{children:[e.descriptions,(0,s.jsx)("br",{}),(0,s.jsx)("span",{className:"badge badge-ghost badge-sm text-accent",children:new Date(e.createdAt).toLocaleTimeString()})]}),(0,s.jsx)("td",{children:(0,s.jsx)("span",{className:"badge badge-ghost badge-sm",children:new Date(e.createdAt).toLocaleDateString()})}),(0,s.jsx)("th",{children:(0,s.jsx)("button",{className:"badge gap-2  ".concat("debit"===e.transactionType?"badge-error":"badge-success"),children:e.transactionType})}),(0,s.jsx)("th",{children:(0,s.jsx)("button",{className:"btn btn-sm text-red-400 bg-transparent",onClick:()=>P(e.id),children:(0,s.jsx)("span",{children:(0,s.jsx)(x.sQZ,{})})})}),(0,s.jsxs)("th",{children:[(0,s.jsx)("label",{htmlFor:"my_modal_6",className:"btn",children:(0,s.jsx)("span",{className:"text-xl text-info",children:(0,s.jsx)(f.uRN,{})})}),(0,s.jsx)("input",{type:"checkbox",id:"my_modal_6",className:"modal-toggle"}),(0,s.jsx)("div",{className:"modal",role:"dialog",children:(0,s.jsxs)("div",{className:"modal-box",children:[(0,s.jsxs)("form",{className:"card-body",onSubmit:t=>I(t,e.id),children:[(0,s.jsx)("div",{className:"form-control",children:(0,s.jsx)("input",{type:"text",name:"title",placeholder:"title",value:v.title,className:"input input-sm input-bordered",required:!0,onChange:C})}),(0,s.jsxs)("div",{className:"form-control",children:[(0,s.jsx)("textarea",{className:"textarea textarea-info",placeholder:"Descriptions",name:"descriptions",value:v.descriptions,onChange:C}),(0,s.jsx)("div",{className:"form-control my-2",children:(0,s.jsx)("div",{className:"form-control",children:(0,s.jsx)("input",{type:"number",name:"amount",onChange:C,placeholder:"Amount",value:v.amount,className:"input input-sm input-bordered",required:!0})})}),(0,s.jsxs)("div",{className:"form-control flex flex-row ",children:[(0,s.jsx)("select",{className:"select mx-1 select-primary w-1/2 max-w-xs",value:(null===(n=v.categories)||void 0===n?void 0:null===(a=n.connect)||void 0===a?void 0:null===(t=a[0])||void 0===t?void 0:t.id)||"other",onChange:e=>C({target:{name:"categories",value:{connect:[{id:parseInt(e.target.value)}]}}}),children:w.map(e=>(0,s.jsx)("option",{value:e.id,children:e.categories},e.id))}),(0,s.jsxs)("select",{className:"select select-primary w-1/2 max-w-xs",value:v.transactionType,onChange:C,name:"transactionType",children:[(0,s.jsx)("option",{value:"credit",children:"Credit"}),(0,s.jsx)("option",{value:"debit",children:"Debit"})]})]}),(0,s.jsx)("div",{className:"form-control my-2"})]}),(0,s.jsx)("div",{className:"form-control mt-6",children:(0,s.jsx)("button",{type:"submit",className:"btn btn-md btn-primary",children:"Update"})})]}),(0,s.jsx)("div",{className:"modal-action",children:(0,s.jsx)("label",{htmlFor:"my_modal_6",className:"btn",children:"X"})})]})})]})]},e.id)})})]}):(0,s.jsx)("h1",{className:"text-3xl mt-20",children:"No Transaction Found..."}),(0,s.jsx)(j,{})]})},N=()=>{let{user:e,isLoggedIn:t,logout:a}=(0,r.a)(),{isLoading:n}=(0,o.I)();return((0,c.useRouter)(),n)?(0,s.jsx)(i,{}):(0,s.jsxs)("main",{className:"",children:[(0,s.jsx)(p,{}),(0,s.jsxs)("div",{className:"flex flex-col w-full",children:[(0,s.jsx)("div",{className:"grid card  rounded-box place-items-center",children:(0,s.jsx)(y,{})}),(0,s.jsx)("div",{className:"divider"}),!n&&(0,s.jsxs)("div",{className:"grid shadow-xl card rounded-box place-items-center",children:[" ",(0,s.jsx)(v,{})]})]})]})}},5358:function(e,t,a){"use strict";a.d(t,{I:function(){return m},TransactionProvider:function(){return u}});var s=a(7437),n=a(2265),r=a(7084),o=a(4080);a(8477);var i=a(5262);let c=(0,n.createContext)(),l={isLoading:!1,transactions:[],error:{},balance:0,order:{orderId:"",paymentId:"",signature:""},paginationData:{currentPage:1,totalPages:1,totalTransactions:0}};function d(e,t){switch(t.type){case"isLoading":return{...e,isLoading:!0};case"getTransactions":return{...e,transactions:t.payload,isLoading:!1};case"getBalance":return{...e,balance:t.payload,isLoading:!1};case"rejected":return{...e,error:t.payload,isLoading:!1};case"setOrder":return{...e,order:t.payload,isLoading:!1};case"setPaginationData":return{...e,paginationData:t.payload,isLoading:!1};default:return"unknown action type"}}function u(e){let{children:t}=e,[{transactions:a,isLoading:u,balance:m,error:p,paginationData:g},y]=(0,n.useReducer)(d,l),{isLoggedIn:h,setPremium:x}=(0,o.a)(),f=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;try{y({type:"isLoading"});let t=await r.Z.get("/api/v1/accounts/myAccount",{params:{page:e}});console.log(t),y({type:"getTransactions",payload:t.data.data.myTransaction}),y({type:"getBalance",payload:t.data.balance}),y({type:"setPaginationData",payload:{currentPage:e,totalPages:t.data.totalPages,totalTransactions:t.data.myTransaction}})}catch(e){y({type:"rejected",payload:e.data})}});async function j(e){try{y({type:"isLoading"});let t=await r.Z.post("api/v1/accounts/addExpense",e);if("success"===t.data.status){let e=t.data.data.newExpense;console.log(e);let s=[...a,e],n="debit"===e.transactionType?m-parseInt(e.amount):m+parseInt(e.amount);y({type:"getTransactions",payload:s}),console.log(m),y({type:"getBalance",payload:n})}}catch(e){y({type:"rejected",payload:e.response.data})}}async function b(e){try{y({type:"isLoading"});let t=await r.Z.delete("/api/v1/accounts/editExpense/".concat(e));if("success"===t.data.status){let t=a.find(t=>t.id===e),s=m+Number(t.amount),n=a.filter(t=>t.id!==e);y({type:"getTransactions",payload:n}),y({type:"getBalance",payload:s})}}catch(e){y({type:"rejected",payload:e.response.data})}}async function v(e,t){try{y({type:"isLoading"});let s=await r.Z.patch("/api/v1/accounts/editExpense/".concat(e),t);if(console.log(s),"success"===s.data.status){let t=a.map(t=>t.id===e?s.data.data.updatedTransaction:t);y({type:"getTransactions",payload:t})}}catch(e){y({type:"rejected",payload:e.response.data})}}async function N(e){try{y({type:"isLoading"});let t=await r.Z.get("/api/v1/accounts/transactions/".concat(e));"success"===t.data.status&&y({type:"getTransactions",payload:t.data.data})}catch(e){y({type:"rejected",payload:p.response.data})}}(0,n.useEffect)(()=>{let e=async()=>{await f(1)};h&&e()},[h]);let w=e=>{if(!window.Razorpay){console.error("Razorpay script is not loaded");return}let t={key:"rzp_test_eMwKYTzL8DP6sN",amount:100,currency:e.currency,name:"premium member",description:"Test Transaction",image:{main:i.default},order_id:e.id,handler:async e=>{try{let{data:t}=await r.Z.post("/api/v1/accounts/verify",e);console.log(t),"success"===t.status?await x(t):(console.error("Payment verification failed:",t.errormessage),alert(t.errormessage))}catch(e){console.log(e)}},theme:{color:"#3399cc"}};new window.Razorpay(t).open()};async function A(){try{let{data:e}=await r.Z.post("/api/v1/accounts/checkout",{amount:100}),t=w(e.data);console.log(t)}catch(e){}console.log(p)}async function L(e){try{y({type:"isLoading"});let t=await r.Z.post("/api/v1/accounts/generatePDF",{transactions:e},{responseType:"json"});if("success"===t.data.status){let e=t.data.data,a=atob(e),s=Array(a.length);for(let e=0;e<a.length;e++)s[e]=a.charCodeAt(e);let n=new Uint8Array(s),r=new Blob([n],{type:"application/pdf"}),o=URL.createObjectURL(r);window.open(o)}else console.error("Failed to generate PDF")}catch(e){y({type:"rejected",payload:e.response.data})}}return(0,s.jsx)(c.Provider,{value:{isLoading:u,transactions:a,deleteExpense:b,balance:m,error:p,addExpense:j,editExpense:v,getTransactionsByCategories:N,razorCheckout:A,generatePDF:L,paginationData:g,fetchTransactions:f},children:t})}let m=()=>{let e=(0,n.useContext)(c);if(void 0===e)throw Error("Unable to find context");return e}},4080:function(e,t,a){"use strict";a.d(t,{UsersProvider:function(){return d},a:function(){return u}});var s=a(7437),n=a(2265),r=a(7084),o=a(2126);let i=(0,n.createContext)(),c={user:{},isLoading:!1,error:{},isAuthenticated:!1,token:"",isAdmin:!1,isLoggedIn:!1,transaction:[],category:[],balance:0,premium:!1};function l(e,t){switch(t.type){case"isLoading":return{...e,isLoading:!0};case"isLoggedIn":return{...e,isLoggedIn:!0,isLoading:!1};case"isAdmin":return{...e,isAdmin:!0};case"isLoggedOut":return{...e,isLoggedIn:!1,isAuthenticated:!1,isAdmin:!1,user:{},transaction:[],token:"",isLoading:!1};case"getUserData":return{user:t.payload,isAuthenticated:!0,isLoggedIn:!0,isLoading:!1};case"rejected":return{...e,isLoading:!1,error:t.payload};case"getToken":return{...e,token:t.payload,isLoading:!1};case"getTransaction":return{...e,transaction:t.payload,isLoading:!1};case"storeUserData":return{...e,user:t.payload,isAuthenticated:!0,isLoggedIn:!0,isLoading:!1};case"getCategory":return{...e,category:t.payload,isLoading:!1};case"getBalance":return{...e,balance:t.payload,isLoading:!1};case"isAuthenticated":return{...e,isAuthenticated:!0,isLoggedIn:!0,isLoading:!1};case"isPremium":return{...e,premium:!0,isLoading:!1};default:return"unknown action type"}}function d(e){let{children:t}=e,[{user:a,isLoading:d,isLoggedIn:u,error:m,token:p,transaction:g,isAuthenticated:y,category:h,getBalance:x,balance:f,isPremium:j},b]=(0,n.useReducer)(l,c);async function v(e){b({type:"isLoading"});try{let t=await o.Z.post("http://localhost:3000/api/v1/users/signup",e);b({type:"getUserData",payload:t.data.data.user}),b({type:"getToken",payload:t.data.token}),b({type:"storeUserData",payload:t.data.data.user}),localStorage.setItem("token",t.data.token),localStorage.setItem("user",JSON.stringify(t.data.data.user))}catch(e){b({type:"rejected",payload:e.response.data})}}async function N(e){b({type:"isLoading"});try{let t=await o.Z.post("http://localhost:3000/api/v1/users/login",e);b({type:"getUserData",payload:t.data.data.user}),b({type:"getToken",payload:t.data.token}),b({type:"storeUserData",payload:t.data.data.user}),localStorage.setItem("token",t.data.token),localStorage.setItem("user",JSON.stringify(t.data.data.user))}catch(e){b({type:"rejected",payload:e.response.data})}}async function w(){try{b({type:"isLoading"}),delete r.Z.defaults.headers.common.Authorization,await r.Z.get("/api/v1/users/logout"),b({type:"isLoading",payload:!1}),b({type:"isLoggedOut"}),localStorage.removeItem("token"),localStorage.removeItem("user")}catch(e){b({type:"rejected",payload:e})}}async function A(e){try{b({type:"isLoading"}),"success"===e.status&&b({type:"isPremium"})}catch(e){b({type:"rejected",payload:m.response.data})}}async function L(e){try{b({type:"isLoading"});let t=await o.Z.post("http://localhost:3000/api/v1/users/forgotPassword",e);console.log(t),"success"===t.data.status?alert("Email has been sent to your email: ".concat(t.data.data.user.email)):alert("Failed to send reset email: ".concat(t.data.message))}catch(e){b({type:"rejected",payload:e})}}return(0,n.useEffect)(()=>{let e=localStorage.getItem("token"),t=JSON.parse(localStorage.getItem("user"));e&&t&&(b({type:"getToken",payload:e}),b({type:"storeUserData",payload:t}),b({type:"isLoggedIn"}))},[]),(0,n.useEffect)(()=>{async function e(){try{b({type:"isLoading"});let e=await r.Z.get("/api/v1/accounts/getAllCategories");b({type:"getCategory",payload:e.data.data})}catch(e){console.log(e)}}y&&e()},[y]),(0,s.jsx)(i.Provider,{value:{signup:v,login:N,isLoading:d,token:p,error:m,user:a,isLoggedIn:u,transaction:g,logout:w,category:h,balance:f,setPremium:A,forgotPassword:L},children:t})}let u=()=>{let e=(0,n.useContext)(i);if(void 0===e)throw Error("Unable to find context");return e}},7084:function(e,t,a){"use strict";let s=a(2126).Z.create({baseURL:"http://localhost:3000"});s.interceptors.request.use(e=>{let t=localStorage.getItem("token"),a=JSON.parse(localStorage.getItem("user"));return t&&a?e.headers.Authorization="Bearer ".concat(t):delete e.headers.Authorization,e},e=>Promise.reject(e)),t.Z=s},6648:function(e,t,a){"use strict";a.d(t,{default:function(){return n.a}});var s=a(5601),n=a.n(s)},6463:function(e,t,a){"use strict";var s=a(1169);a.o(s,"useRouter")&&a.d(t,{useRouter:function(){return s.useRouter}}),a.o(s,"useSearchParams")&&a.d(t,{useSearchParams:function(){return s.useSearchParams}})},5601:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{default:function(){return c},getImageProps:function(){return i}});let s=a(9920),n=a(497),r=a(8173),o=s._(a(1241));function i(e){let{props:t}=(0,n.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,a]of Object.entries(t))void 0===a&&delete t[e];return{props:t}}let c=r.Image},5262:function(e,t,a){"use strict";a.r(t),t.default={src:"/_next/static/media/main_manage.67acc567.svg",height:6e3,width:6e3,blurWidth:0,blurHeight:0}},1810:function(e,t,a){"use strict";a.d(t,{w_:function(){return d}});var s=a(2265),n={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},r=s.createContext&&s.createContext(n),o=["attr","size","title"];function i(){return(i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e}).apply(this,arguments)}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,s)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach(function(t){var s,n;s=t,n=a[t],(s=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var s=a.call(e,t||"default");if("object"!=typeof s)return s;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(s))in e?Object.defineProperty(e,s,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[s]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function d(e){return t=>s.createElement(u,i({attr:l({},e.attr)},t),function e(t){return t&&t.map((t,a)=>s.createElement(t.tag,l({key:a},t.attr),e(t.child)))}(e.child))}function u(e){var t=t=>{var a,{attr:n,size:r,title:c}=e,d=function(e,t){if(null==e)return{};var a,s,n=function(e,t){if(null==e)return{};var a={};for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){if(t.indexOf(s)>=0)continue;a[s]=e[s]}return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(s=0;s<r.length;s++)a=r[s],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}(e,o),u=r||t.size||"1em";return t.className&&(a=t.className),e.className&&(a=(a?a+" ":"")+e.className),s.createElement("svg",i({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,n,d,{className:a,style:l(l({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),c&&s.createElement("title",null,c),e.children)};return void 0!==r?s.createElement(r.Consumer,null,e=>t(e)):t(n)}}},function(e){e.O(0,[218,844,280,240,126,173,669,971,23,744],function(){return e(e.s=9219)}),_N_E=e.O()}]);