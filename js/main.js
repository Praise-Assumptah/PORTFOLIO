(function(){
"use strict";
/* Missing images: show a placeholder that names the file to add to the uploads folder */
function miss(img){
  var s=img.closest(".slot");
  if(s){s.classList.add("missing")}else{img.style.display="none"}
}
document.querySelectorAll("img[data-zoom]").forEach(function(img){
  if(img.complete&&!img.naturalWidth)miss(img);
  else img.addEventListener("error",function(){miss(img)});
});
/* Lightbox */
var lb=document.getElementById("lb"),lbi=lb.querySelector("img");
document.addEventListener("click",function(e){
  var t=e.target;
  if(t.matches&&t.matches("img[data-zoom]")&&!t.closest(".slot.missing")&&!t.closest(".photo")){lbi.src=t.src;lbi.alt=t.alt;lb.classList.add("open")}
});
lb.addEventListener("click",function(){lb.classList.remove("open")});
document.addEventListener("keydown",function(e){if(e.key==="Escape")lb.classList.remove("open")});
/* Project details toggle */
document.querySelectorAll(".more").forEach(function(b){
  b.addEventListener("click",function(){b.setAttribute("aria-expanded",b.getAttribute("aria-expanded")!=="true")});
});
/* Skill filter */
var tabs=document.getElementById("tabs");
tabs.addEventListener("click",function(e){
  var b=e.target.closest("button");if(!b)return;
  tabs.querySelectorAll("button").forEach(function(x){x.classList.toggle("on",x===b)});
  document.querySelectorAll(".sk").forEach(function(s){s.classList.toggle("hide",b.dataset.f!=="all"&&s.dataset.c!==b.dataset.f)});
});
/* Highlight current section in the menu */
var links=document.querySelectorAll("#links a");
var io=new IntersectionObserver(function(es){es.forEach(function(e){
  if(e.isIntersecting)links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id)});
})},{rootMargin:"-40% 0px -55% 0px"});
document.querySelectorAll("main section").forEach(function(s){io.observe(s)});
})();
