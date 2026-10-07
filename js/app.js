/* HUGO BOSS | Gate Mall Client Appointments (prototype). Content lives in data/looks.json */
const $=(s,e=document)=>e.querySelector(s), $$=(s,e=document)=>[...e.querySelectorAll(s)];
const SHAPES={
 Suits:"M30 18 L42 12 L50 26 L58 12 L70 18 L84 32 L78 90 L22 90 L16 32 Z M50 26 L50 90",
 Jackets:"M30 18 L42 12 L50 26 L58 12 L70 18 L84 32 L78 90 L22 90 L16 32 Z M50 26 L50 90",
 Shirts:"M32 16 L44 12 Q50 22 56 12 L68 16 L88 36 L77 47 L70 40 L70 90 L30 90 L30 40 L23 47 L12 36 Z",
 Knitwear:"M32 16 L44 12 Q50 22 56 12 L68 16 L88 36 L77 47 L70 40 L70 90 L30 90 L30 40 L23 47 L12 36 Z",
 Ties:"M44 10 H56 L58 22 L52 27 L62 80 L50 94 L38 80 L48 27 L42 22 Z",
 Shoes:"M8 62 Q8 48 26 46 L42 46 Q50 60 70 60 Q94 60 94 74 L94 80 L8 80 Z",
 Belts:"M6 42 H94 V58 H6 Z M44 38 H58 V62 H44 Z",
 Trousers:"M28 10 H72 L76 92 H55 L50 38 L45 92 H24 Z",
 Shorts:"M26 14 H74 L80 62 H55 L50 40 L45 62 H20 Z",
 Bags:"M24 38 H76 L82 90 H18 Z M38 38 V30 Q50 14 62 30 V38",
 Accessories:"M50 26 L74 50 L50 74 L26 50 Z"};
const dark=h=>{const v=parseInt(h.slice(1),16),r=v>>16,g=v>>8&255,b=v&255;return (r*299+g*587+b*114)/1000<140};
const icon=i=>`<svg viewBox="0 0 100 100" aria-hidden="true"><path d="${SHAPES[i.c]||SHAPES.Accessories}" fill="${i.col}" stroke="${dark(i.col)?"rgba(255,255,255,.4)":"#9a9a9a"}" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
const flat=(l,cls="")=>{const c=l.items.length>4?3:2,pad=(c-l.items.length%c)%c;return `<div class="flat ${cls}" style="--n:${c}">${l.items.map(i=>`<div class="sw">${icon(i)}<span>${i.c}</span></div>`).join("")}${"<div class=\"sw\"></div>".repeat(pad)}</div>`};

let LOOKS=[],PRODS=[],pm=null,pcat="All",appt=[],date=null,time=null,filter="All",view="form",ref="",nameV="",phoneV="";
const mid=s=>s[Math.floor(s.length/2)];
const find=id=>LOOKS.find(x=>x.id===id);

/* Reveal on scroll */
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.12});
const reveal=()=>$$(".reveal:not(.in)").forEach(el=>io.observe(el));

/* Page sections */
function renderFeature(){const l=LOOKS[0];
 $("#feature").innerHTML=`<div class="wrap feat">${flat(l,"dkf big reveal")}<div class="reveal"><p class="eyebrow">Look of the week</p><h2>${l.name}</h2>
 <p class="note">&ldquo;${l.note}&rdquo;<span>The Gate Mall styling team</span></p>
 <ul class="pl">${l.items.map(i=>`<li><span>${i.n}</span><em>${i.c}</em></li>`).join("")}</ul>
 <div class="cta"><button class="btn" data-add="${l.id}">Add full look</button><button class="btn line" data-look="${l.id}">View pieces</button></div></div></div>`}
function renderGrid(){
 const tags=["All",...new Set(LOOKS.map(l=>l.tag))];
 $("#filters").innerHTML=tags.map(t=>`<button class="chip ${t===filter?"on":""}" data-f="${t}">${t}</button>`).join("");
 $("#grid").innerHTML=LOOKS.filter(l=>filter==="All"||l.tag===filter).map(l=>`<article class="card reveal" data-look="${l.id}">${flat(l)}<div class="ci"><div><h3>${l.name}</h3><small>${l.tag} &middot; ${l.items.length} pieces</small></div><span class="arrow">&rarr;</span></div></article>`).join("")}

/* Shop the collection (menswear) */
function renderShop(){
 const cats=["All",...new Set(PRODS.map(p=>p.cat))];
 $("#pfilters").innerHTML=cats.map(t=>`<button class="chip ${t===pcat?"on":""}" data-pc="${t}">${t}</button>`).join("");
 const list=PRODS.filter(p=>pcat==="All"||p.cat===pcat);
 $("#pcount").textContent=`${list.length} pieces`;
 $("#pgrid").innerHTML=list.map(p=>`<article class="pcard reveal" data-prod="${p.id}"><div class="ptile">${icon({c:p.c,col:p.cols[0].hex})}<span class="rv">Reserve</span></div>
 <h3>${p.n}</h3><div class="pm"><span class="dots">${p.cols.map(c=>`<i style="background:${c.hex}"></i>`).join("")}</span><small>${p.cols.length} ${p.cols.length>1?"colours":"colour"}</small></div></article>`).join("")}
function openProd(id){const p=PRODS.find(x=>x.id===id);pm={p,ci:0,size:mid(p.s)};renderProd();$("#modal").classList.add("show");document.body.classList.add("lock")}
function renderProd(){const {p,ci,size}=pm,c=p.cols[ci];
 $("#modal").innerHTML=`<div class="ms"><div class="ptile big">${icon({c:p.c,col:c.hex})}</div><div class="info"><button class="x" data-close aria-label="Close">&times;</button>
 <p class="eyebrow">${p.cat}</p><h2 style="font-size:30px">${p.n}</h2><p class="avail">&#9679; Available at Gate Mall (sample)</p>
 <div class="lbl">Colour: <b style="color:var(--ink)">${c.n}</b></div><div class="sws">${p.cols.map((x,k)=>`<button class="${k===ci?"on":""}" style="background:${x.hex}" data-pcol="${k}" aria-label="${x.n}"></button>`).join("")}</div>
 <div class="lbl">Size</div><div class="chips">${p.s.map(z=>`<button class="chip ${z===size?"on":""}" data-psize="${z}">${z}</button>`).join("")}</div>
 <div style="margin-top:26px"><button class="btn full" data-padd>Add to appointment</button></div>
 <p class="hint">Reserve this piece to try in store. No payment online.</p></div></div>`}
function addProd(){const {p,ci,size}=pm,c=p.cols[ci],key=`P${p.id}:${ci}`;
 if(appt.some(x=>x.key===key))return toast("Already in your appointment");
 appt.push({key,n:p.n,c:p.c,cat:p.cat,col:c.hex,colName:c.n,s:p.s,size,look:"Collection"});
 closeAll();updateCnt();toast(`${p.n} (${c.n}) added to your appointment`)}

/* Look detail */
function openLook(id){const l=find(id);
 $("#modal").innerHTML=`<div class="ms">${flat(l,"dkf")}<div class="info"><button class="x" data-close aria-label="Close">&times;</button>
 <p class="eyebrow">${l.tag}</p><h2 style="font-size:32px">${l.name}</h2><p class="note">&ldquo;${l.note}&rdquo;</p>
 ${l.items.map((i,k)=>`<div class="row"><div class="dot">${icon(i)}</div><div class="t"><b>${i.n}</b><span>${i.c} &middot; In stock (sample)</span></div>
 ${appt.some(x=>x.key===`L${id}:${k}`)?'<span class="eyebrow">Added</span>':`<button class="chip" data-one="${id}:${k}">Add</button>`}</div>`).join("")}
 <div style="margin-top:26px"><button class="btn full" data-add="${id}">Add full look</button></div></div></div>`;
 $("#modal").classList.add("show");document.body.classList.add("lock")}
function addLook(id){const l=find(id);
 l.items.forEach((i,k)=>{const key=`L${id}:${k}`;if(!appt.some(x=>x.key===key))appt.push({...i,key,look:l.name,size:mid(i.s)})});
 closeAll();updateCnt();toast(`${l.name} added to your appointment`)}
function addOne(id,k){const l=find(id),i=l.items[k];
 const key=`L${id}:${k}`;if(!appt.some(x=>x.key===key))appt.push({...i,key,look:l.name,size:mid(i.s)});
 updateCnt();openLook(id)}
const updateCnt=()=>{$("#cnt").textContent=appt.length};

/* Appointment drawer */
function openDrawer(){closeModal();view=appt.length||view==="done"?view:"form";renderDrawer();document.body.classList.add("dopen","lock")}
function closeModal(){$("#modal").classList.remove("show");$("#modal").innerHTML=""}
function closeAll(){closeModal();document.body.classList.remove("dopen","lock")}
function renderDrawer(){
 const b=$("#dbody"),st=b.scrollTop,f=$("#dfoot");updateCnt();
 if(view==="done"){
  const d=new Date();d.setDate(d.getDate()+date+1);
  b.innerHTML=`<div class="done"><div class="tick">&#10003;</div><p class="eyebrow">Request received</p><h2>See you soon, ${nameV.split(" ")[0]}</h2>
  <p class="lead" style="margin:14px auto">Our team will confirm your appointment by phone or WhatsApp and prepare your pieces.</p>
  <div class="sum"><b>${d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})} at ${time}</b><br>HUGO BOSS Gate Mall &middot; Ref ${ref}<br><br>${appt.map(x=>`${x.n} (${x.size})`).join("<br>")}</div></div>`;
  f.innerHTML=`<button class="btn full" data-finish>Back to the site</button>`;return}
 if(!appt.length){b.innerHTML=`<div class="empty">Your appointment is empty.<br>Add a look or pieces to get started.<br><button class="btn" data-close>Browse the looks</button></div>`;f.innerHTML="";return}
 const days=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()+i+1);return d});
 const slots=["11:00","12:00","13:00","14:00","16:00","17:00","18:00","19:00","20:00"];
 b.innerHTML=`<div class="lbl">Your pieces</div>${appt.map((x,i)=>`<div class="row"><div class="dot">${icon(x)}</div><div class="t"><b>${x.n}</b><span>${x.colName?x.colName+" &middot; ":""}${x.cat||x.c} &middot; ${x.look}</span></div>
  <select data-size="${i}" aria-label="Size">${x.s.map(z=>`<option ${z===x.size?"selected":""}>${z}</option>`).join("")}</select><button class="x" data-rm="${i}" aria-label="Remove">&times;</button></div>`).join("")}
 <div class="lbl">Choose a day</div><div class="chips">${days.map((d,i)=>`<button class="chip ${date===i?"on":""}" data-day="${i}">${d.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"})}</button>`).join("")}</div>
 <div class="lbl">Choose a time</div><div class="chips">${slots.map((s,i)=>`<button class="chip ${time===s?"on":""}" ${date===null||(date+i)%5===3?"disabled":""} data-time="${s}">${s}</button>`).join("")}</div>
 <div class="lbl">Your details</div><input id="nm" placeholder="Full name" autocomplete="name"><input id="ph" placeholder="Phone number" type="tel" autocomplete="tel">`;
 $("#nm").value=nameV;$("#ph").value=phoneV;b.scrollTop=st;
 f.innerHTML=`<button class="btn full" data-submit>Request appointment</button>`}
function submit(){
 if(date===null||!time)return toast("Please choose a day and time");
 if(nameV.trim().length<2||phoneV.trim().length<6)return toast("Please enter your name and phone number");
 ref="GM-"+Math.floor(1000+Math.random()*9000);view="done";renderDrawer()}
function toast(m){const t=document.createElement("div");t.className="toast";t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2400)}

/* Events */
document.addEventListener("click",e=>{
 if(e.target.id==="modal")return closeModal(),document.body.classList.remove("lock");
 const t=e.target.closest("[data-add],[data-look],[data-f],[data-open],[data-close],[data-rm],[data-day],[data-time],[data-one],[data-pc],[data-prod],[data-pcol],[data-psize],[data-padd],[data-submit],[data-finish]");if(!t)return;
 const d=t.dataset;
 if(d.add)addLook(+d.add);
 else if(d.look)openLook(+d.look);
 else if(d.f){filter=d.f;renderGrid();reveal()}
 else if(d.open!==undefined)openDrawer();
 else if(d.close!==undefined){closeModal();if(!e.target.closest(".ms")||e.target.closest(".x"))closeAll()}
 else if(d.rm!==undefined){appt.splice(+d.rm,1);renderDrawer()}
 else if(d.day!==undefined){date=+d.day;time=null;renderDrawer()}
 else if(d.time){time=d.time;renderDrawer()}
 else if(d.pc){pcat=d.pc;renderShop();reveal()}
 else if(d.prod){openProd(+d.prod)}
 else if(d.pcol!==undefined){pm.ci=+d.pcol;renderProd()}
 else if(d.psize){pm.size=d.psize;renderProd()}
 else if(d.padd!==undefined)addProd()
 else if(d.one){const[a,b]=d.one.split(":");addOne(+a,+b)}
 else if(d.submit!==undefined)submit();
 else if(d.finish!==undefined){appt=[];date=time=null;nameV=phoneV="";view="form";updateCnt();closeAll()}
});
document.addEventListener("change",e=>{if(e.target.dataset.size!==undefined)appt[+e.target.dataset.size].size=e.target.value});
document.addEventListener("input",e=>{if(e.target.id==="nm")nameV=e.target.value;if(e.target.id==="ph")phoneV=e.target.value});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAll()});
const hw=$("#hdwrap"),onScroll=()=>hw.classList.toggle("solid",scrollY>60);
addEventListener("scroll",onScroll,{passive:true});onScroll();
const im=new Image();im.onload=()=>document.documentElement.classList.add("has-photo");im.src="assets/images/store.jpg";

/* Start */
fetch("data/products.json").then(r=>r.json()).then(d=>{PRODS=d;renderShop();reveal()}).catch(()=>{});
fetch("data/looks.json").then(r=>r.json()).then(d=>{LOOKS=d;renderFeature();renderGrid();reveal()})
 .catch(()=>{$("#feature").innerHTML='<p style="text-align:center;padding:60px 20px">Could not load the looks. Open the site through GitHub Pages or a local web server.</p>'});
reveal();
