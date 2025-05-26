(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))c(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const l=document.getElementById("theme-btn"),u=localStorage.getItem("theme");u&&document.documentElement.setAttribute("data-theme",u);l.addEventListener("click",()=>{document.documentElement.getAttribute("data-theme")==="dark"?(document.documentElement.removeAttribute("data-theme"),l.innerHTML='<img src="/images/icon-moon.svg">',localStorage.setItem("theme","light")):(document.documentElement.setAttribute("data-theme","dark"),l.innerHTML='<img src="/images/icon-sun.svg">',localStorage.setItem("theme","dark"))});const r=document.getElementById("extensions-grid"),f=document.getElementById("filter-btns"),g=document.querySelectorAll(".filter-btn");let o=[],d="all";async function h(){o=await(await fetch("/data.json")).json(),m(d)}function v(t){r.innerHTML="",t.forEach(e=>{const n=document.createElement("div");n.classList.add("item"),n.dataset.name=e.name,n.innerHTML=`
    <div class="top">
     <img src=${e.logo} alt="${e.name}">
     <div class="extension-info">
        <div class="name">${e.name}</div> 
        <div class="description">${e.description}</div>
     
      </div>
    </div>

    <div class="bottom">
       <button class="remove-btn">Remove</button>
       <div class="toggle-switch">
         <input class="toggle-input"
             id="toggle-${e.name}"
             type="checkbox"
             ${e.isActive?"checked":""}>
         <label class="toggle-label" for="toggle-${e.name}"></label>
       </div>
    </div>
  
  `,r.appendChild(n)})}function m(t){d=t,g.forEach(n=>{n.classList.toggle("active",n.id===t)});let e;switch(t){case"all":e=o;break;case"active":e=o.filter(n=>n.isActive);break;case"inactive":e=o.filter(n=>!n.isActive);break}v(e)}f.addEventListener("click",p);r.addEventListener("click",b);r.addEventListener("change",y);function p(t){t.target.classList.contains("filter-btn")&&m(t.target.id)}function b(t){if(t.target.classList.contains("remove-btn")){const n=t.target.closest(".item").dataset.name;o=o.filter(c=>c.name!==n),m(d)}}function y(t){if(t.target.classList.contains("toggle-input")){const n=t.target.closest(".item").dataset.name,c=o.find(i=>i.name===n);c&&(c.isActive=t.target.checked)}}h();
