(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[129],{5961:function(e,t,a){Promise.resolve().then(a.bind(a,2659))},2659:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return p}});var s=a(7437),r=a(2265),n=a(6648),o=a(7138),i=a(6463),l=a(4080),c={src:"/_next/static/media/signup_img.f44d0c35.svg",height:412,width:551,blurWidth:0,blurHeight:0},d=a(3873);let u={username:"",email:"",password:"",password_confirmation:""};var p=function(){let[e,t]=(0,r.useState)(u),{signup:a,user:p,error:g,isLoggedIn:m}=(0,l.a)(),h=(0,i.useRouter)();function y(a){t({...e,[a.target.name]:a.target.value})}async function f(t){t.preventDefault(),await a(e)}return console.log(m),(0,r.useEffect)(()=>{m?(t(u),h.push("/dashboard")):console.log(g)},[m,g,h]),(0,s.jsx)("div",{className:"hero min-h-screen bg-base-200",children:(0,s.jsxs)("div",{className:"hero-content flex-col lg:flex-row",children:[(0,s.jsxs)("div",{className:"text-center lg:text-left",children:[(0,s.jsx)("h1",{className:"text-3xl sm:text-5xl text-primary font-bold",children:"Register here!"}),(0,s.jsxs)("p",{className:"py-6",children:["Explore the Right way of managing your expenses"," ",(0,s.jsx)("span",{className:"font-semibold text-accent text-lg",children:"Welcome to Expense-tracker"})]}),(0,s.jsx)(n.default,{src:c,width:500,height:500,alt:"Picture of the author",className:"hidden sm:inline"})]}),(0,s.jsx)("div",{className:"card shrink-0 w-full max-w-sm shadow-2xl bg-base-100",children:(0,s.jsxs)("form",{className:"card-body",onSubmit:f,children:[g&&(0,s.jsx)(d.Z,{error:g}),(0,s.jsxs)("div",{className:"form-control",children:[(0,s.jsx)("label",{className:"label ",children:(0,s.jsx)("span",{className:"label-text text-secondary",children:"Username"})}),(0,s.jsx)("input",{type:"text",name:"username",value:e.username,placeholder:"Username",onChange:e=>y(e),className:"input input-bordered",required:!0}),(0,s.jsx)("label",{className:"label",children:(0,s.jsx)("span",{className:"label-text text-secondary",children:"Email"})}),(0,s.jsx)("input",{type:"email",placeholder:"email",value:e.email,name:"email",onChange:e=>y(e),className:"input input-bordered",required:!0})]}),(0,s.jsxs)("div",{className:"form-control",children:[(0,s.jsx)("label",{className:"label",children:(0,s.jsx)("span",{className:"label-text text-secondary",children:"Password"})}),(0,s.jsx)("input",{type:"password",name:"password",placeholder:"password",value:e.password,onChange:e=>y(e),className:"input input-bordered",required:!0})]}),(0,s.jsxs)("div",{className:"form-control",children:[(0,s.jsx)("label",{className:"label",children:(0,s.jsx)("span",{className:"label-text text-secondary",children:"confirm password"})}),(0,s.jsx)("input",{type:"text",placeholder:"confirm password",value:e.password_confirmation,name:"password_confirmation",onChange:e=>y(e),className:"input input-bordered",required:!0})]}),(0,s.jsx)("div",{className:"form-control mt-6",children:(0,s.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Login"})}),(0,s.jsx)("span",{className:"border-t-2 "}),(0,s.jsxs)("p",{className:"text-sm text-center",children:["Already Member ?"," ",(0,s.jsxs)(o.default,{className:"link link-accent ",href:"/login",children:[" ","Please Login"," "]})]})]})})]})})}},3873:function(e,t,a){"use strict";var s=a(7437);a(2265);var r=a(4080);t.Z=()=>{let{error:e}=(0,r.a)();if(!e)return null;let{status:t,message:a}=e;return(0,s.jsx)("div",{role:"alert",className:"".concat(e.message&&"alert"," ").concat("fail"===t||"error"===t?"alert-error":"alert-success"," "),children:a})}},4080:function(e,t,a){"use strict";a.d(t,{UsersProvider:function(){return d},a:function(){return u}});var s=a(7437),r=a(2265),n=a(7084),o=a(2126);let i=(0,r.createContext)(),l={user:{},isLoading:!1,error:{},isAuthenticated:!1,token:"",isAdmin:!1,isLoggedIn:!1,transaction:[],category:[],balance:0,premium:!1};function c(e,t){switch(t.type){case"isLoading":return{...e,isLoading:!0};case"isLoggedIn":return{...e,isLoggedIn:!0,isLoading:!1};case"isAdmin":return{...e,isAdmin:!0};case"isLoggedOut":return{...e,isLoggedIn:!1,isAuthenticated:!1,isAdmin:!1,user:{},transaction:[],token:"",isLoading:!1};case"getUserData":return{user:t.payload,isAuthenticated:!0,isLoggedIn:!0,isLoading:!1};case"rejected":return{...e,isLoading:!1,error:t.payload};case"getToken":return{...e,token:t.payload,isLoading:!1};case"getTransaction":return{...e,transaction:t.payload,isLoading:!1};case"storeUserData":return{...e,user:t.payload,isAuthenticated:!0,isLoggedIn:!0,isLoading:!1};case"getCategory":return{...e,category:t.payload,isLoading:!1};case"getBalance":return{...e,balance:t.payload,isLoading:!1};case"isAuthenticated":return{...e,isAuthenticated:!0,isLoggedIn:!0,isLoading:!1};case"isPremium":return{...e,premium:!0,isLoading:!1};default:return"unknown action type"}}function d(e){let{children:t}=e,[{user:a,isLoading:d,isLoggedIn:u,error:p,token:g,transaction:m,isAuthenticated:h,category:y,getBalance:f,balance:x,isPremium:b},j]=(0,r.useReducer)(c,l);async function v(e){j({type:"isLoading"});try{let t=await o.Z.post("http://localhost:3000/api/v1/users/signup",e);j({type:"getUserData",payload:t.data.data.user}),j({type:"getToken",payload:t.data.token}),j({type:"storeUserData",payload:t.data.data.user}),localStorage.setItem("token",t.data.token),localStorage.setItem("user",JSON.stringify(t.data.data.user))}catch(e){j({type:"rejected",payload:e.response.data})}}async function N(e){j({type:"isLoading"});try{let t=await o.Z.post("http://localhost:3000/api/v1/users/login",e);j({type:"getUserData",payload:t.data.data.user}),j({type:"getToken",payload:t.data.token}),j({type:"storeUserData",payload:t.data.data.user}),localStorage.setItem("token",t.data.token),localStorage.setItem("user",JSON.stringify(t.data.data.user))}catch(e){j({type:"rejected",payload:e.response.data})}}async function L(){try{j({type:"isLoading"}),delete n.Z.defaults.headers.common.Authorization,await n.Z.get("/api/v1/users/logout"),j({type:"isLoading",payload:!1}),j({type:"isLoggedOut"}),localStorage.removeItem("token"),localStorage.removeItem("user")}catch(e){j({type:"rejected",payload:e})}}async function w(e){try{j({type:"isLoading"}),"success"===e.status&&j({type:"isPremium"})}catch(e){j({type:"rejected",payload:p.response.data})}}async function k(e){try{j({type:"isLoading"});let t=await o.Z.post("http://localhost:3000/api/v1/users/forgotPassword",e);console.log(t),"success"===t.data.status?alert("Email has been sent to your email: ".concat(t.data.data.user.email)):alert("Failed to send reset email: ".concat(t.data.message))}catch(e){j({type:"rejected",payload:e})}}return(0,r.useEffect)(()=>{let e=localStorage.getItem("token"),t=JSON.parse(localStorage.getItem("user"));e&&t&&(j({type:"getToken",payload:e}),j({type:"storeUserData",payload:t}),j({type:"isLoggedIn"}))},[]),(0,r.useEffect)(()=>{async function e(){try{j({type:"isLoading"});let e=await n.Z.get("/api/v1/accounts/getAllCategories");j({type:"getCategory",payload:e.data.data})}catch(e){console.log(e)}}h&&e()},[h]),(0,s.jsx)(i.Provider,{value:{signup:v,login:N,isLoading:d,token:g,error:p,user:a,isLoggedIn:u,transaction:m,logout:L,category:y,balance:x,setPremium:w,forgotPassword:k},children:t})}let u=()=>{let e=(0,r.useContext)(i);if(void 0===e)throw Error("Unable to find context");return e}},7084:function(e,t,a){"use strict";let s=a(2126).Z.create({baseURL:"http://localhost:3000"});s.interceptors.request.use(e=>{let t=localStorage.getItem("token"),a=JSON.parse(localStorage.getItem("user"));return t&&a?e.headers.Authorization="Bearer ".concat(t):delete e.headers.Authorization,e},e=>Promise.reject(e)),t.Z=s},6648:function(e,t,a){"use strict";a.d(t,{default:function(){return r.a}});var s=a(5601),r=a.n(s)},7138:function(e,t,a){"use strict";a.d(t,{default:function(){return r.a}});var s=a(231),r=a.n(s)},6463:function(e,t,a){"use strict";var s=a(1169);a.o(s,"useRouter")&&a.d(t,{useRouter:function(){return s.useRouter}}),a.o(s,"useSearchParams")&&a.d(t,{useSearchParams:function(){return s.useSearchParams}})},5601:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{default:function(){return l},getImageProps:function(){return i}});let s=a(9920),r=a(497),n=a(8173),o=s._(a(1241));function i(e){let{props:t}=(0,r.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,a]of Object.entries(t))void 0===a&&delete t[e];return{props:t}}let l=n.Image}},function(e){e.O(0,[126,173,231,971,23,744],function(){return e(e.s=5961)}),_N_E=e.O()}]);