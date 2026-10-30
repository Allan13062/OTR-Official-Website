/* ===== EDIT THIS BLOCK TO UPDATE THE WHOLE SITE ===== */
const C={
 phone:"254794581943",          // WhatsApp/phone, international format, no +
 email:"info@otr.com",
 address:"Moi University, School of Biological and Physical Sciences, P.O. Box 2345, Eldoret, Kenya",
 youtube:"#",                    // paste your channel URL
 api:"",                       // your Cloudflare Worker URL (see worker/README.md) turns on live STK Push
 mpesa:{type:"Paybill",number:"",account:"OTR"},  // fill in your real Paybill/Till
 schedule:[
  {d:"Friday",t:"Welcome to Sabbath",time:"",w:"Vespers and song service"},
  {d:"Sabbath",t:"Sabbath School & Divine Service",time:"",w:"Study, worship and the Word"},
  {d:"Midweek",t:"Prayer Cell",time:"",w:"Prayer and testimonies"}],
 leaders:[{r:"Chairperson",n:"",p:""},{r:"Vice Chairperson",n:"",p:""},{r:"Secretary",n:"",p:""},{r:"Treasurer",n:"",p:""}]
};
/* ==================================================== */
const $=s=>document.querySelector(s),tel="+"+C.phone;
const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("on");setTimeout(()=>t.classList.remove("on"),2600)};
$("#mb").onclick=()=>$("#nav").classList.toggle("on");
$("#nav").onclick=()=>$("#nav").classList.remove("on");
$("#sched").innerHTML=C.schedule.map(s=>`<li><b>${s.d}</b><div><strong>${s.t}</strong>${s.time?" · "+s.time:""}<br><span style="color:var(--mute)">${s.w}</span></div></li>`).join("");
$("#addr").textContent=C.address;
$("#map").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent("Moi University, Eldoret");
$("#yt").href=C.youtube;
$("#lead").innerHTML=C.leaders.map(l=>`<div class="card leader"><div class="av">${(l.n||l.r)[0]}</div><h3>${l.n||l.r}</h3><p>${l.n?l.r:"Contact via the ministry line"}</p><p><a href="tel:${l.p?"+"+l.p:tel}">${l.p?"+"+l.p:tel}</a></p></div>`).join("");
$("#fc").innerHTML=`<a href="tel:${tel}">${tel}</a> · <a href="mailto:${C.email}">${C.email}</a>`;
$("#gtype").textContent=C.mpesa.type;$("#gacc").textContent=C.mpesa.account;
$("#gnum").textContent=C.mpesa.number||"Number coming soon";
$("#copy").onclick=()=>{if(!C.mpesa.number)return toast("Giving number not set yet. Please contact us.");navigator.clipboard.writeText(C.mpesa.number).then(()=>toast("Number copied"),()=>toast("Copy failed"))};
const wa=t=>window.open("https://wa.me/"+C.phone+"?text="+encodeURIComponent(t),"_blank");
$("#reg").onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));
 wa(`New OTR member registration\nName: ${f.name}\nPhone: ${f.phone}\nEmail: ${f.email||"-"}\nCourse/Year: ${f.course||"-"}\nInterested in: ${f.int}`);toast("Opening WhatsApp…")};
$("#prf").onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));
 wa(`Prayer request from ${f.name||"Anonymous"}:\n${f.req}`);toast("Opening WhatsApp…")};
document.querySelectorAll(".amts button").forEach(b=>b.onclick=()=>{$("#stk [name=amount]").value=b.textContent;document.querySelectorAll(".amts button").forEach(x=>x.classList.toggle("on",x===b))});
$("#stk").onsubmit=async e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));
 if(!C.api)return toast("Live STK Push isn’t connected yet. Use the manual details below.");
 try{const r=await fetch(C.api+"/stkpush",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(f)});const d=await r.json();
 toast(d.ok?"Check your phone and enter your M-Pesa PIN":(d.error||"Payment request failed"))}catch(x){toast("Network error. Please try again.")}};
const io=new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&x.target.classList.add("in")),{threshold:.1});
document.querySelectorAll("section .card,section .panel,section .give,.lead").forEach(x=>{x.classList.add("rv");io.observe(x)});
