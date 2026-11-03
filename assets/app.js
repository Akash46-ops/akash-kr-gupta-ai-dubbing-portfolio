const S=[
 {f:'english-hindi-dub',o:'english-hindi-original',from:'Hindi',to:'English',t:'English Dub',fmt:'Drama'},
 {f:'english-hebrew-accent-dub',o:'english-hebrew-original',from:'Hebrew',to:'English',t:'Hebrew-accented English Dub',fmt:'Drama'},
 {f:'german-dub',o:'german-original',from:'Source',to:'German',t:'AI German Dub',fmt:'Vertical drama',v:1},
 {f:'english-rebels-trailer',from:'Source',to:'English',t:'Rebels · English Trailer',fmt:'Trailer'},
 {f:'anim-english',from:'Source',to:'English',t:'Animation · English',fmt:'Animation'},
 {f:'anim-spanish',from:'Source',to:'Spanish',t:'Animation · LatAm Spanish',fmt:'Animation'},
 {f:'spanish-latam',from:'Source',to:'Spanish',t:'LatAm Spanish Dub',fmt:'Drama'},
 {f:'hindi-chinese',from:'Chinese',to:'Hindi',t:'Chinese → Hindi',fmt:'Vertical drama',v:1},
 {f:'korean-dub',from:'Source',to:'Korean',t:'Korean Dub',fmt:'Vertical drama',v:1},
 {f:'bengali-marathi',from:'Marathi',to:'Bengali',t:'Marathi → Bengali',fmt:'Vertical drama',v:1},
 {f:'tamil-dub',from:'Source',to:'Tamil',t:'Tamil Dub',fmt:'Vertical drama',v:1},
 {f:'telugu-dub',from:'Source',to:'Telugu',t:'Telugu Dub',fmt:'Vertical drama',v:1},
 {f:'kannada-dub',from:'Source',to:'Kannada',t:'Kannada Dub',fmt:'Feature film'},
 {f:'clip_A',from:'Source',to:'Arabic',t:'Emotion test · Fear',fmt:'Emotion test'},
 {f:'clip_R',from:'Source',to:'Russian',t:'Emotion test · Comic timing',fmt:'Emotion test'}
];
const $=id=>document.getElementById(id),V=f=>`assets/video/${f}.mp4`,P=f=>`assets/img/${f}.jpg`;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* waveform */
const HOME=document.body.dataset.page==='home';
const cv=$('wave')||document.createElement('canvas'),cx=cv.getContext('2d');let W,H,t0=0;
function size(){const r=devicePixelRatio||1;W=cv.clientWidth;H=cv.clientHeight;cv.width=W*r;cv.height=H*r;cx.setTransform(r,0,0,r,0,0)}
size();addEventListener('resize',size);
function draw(t){if(cv.dataset.off==='true'||document.hidden){if(!reduce)requestAnimationFrame(draw);return}cx.clearRect(0,0,W,H);const g=cx.createLinearGradient(0,0,W,0);g.addColorStop(0,'rgba(159,216,255,.0)');g.addColorStop(.2,'rgba(159,216,255,.9)');g.addColorStop(.7,'rgba(196,168,255,.9)');g.addColorStop(1,'rgba(241,198,224,0)');
 const n=Math.floor(W/6);for(let i=0;i<n;i++){const x=i*6,p=i/n,env=Math.sin(Math.PI*p);const a=(Math.sin(i*.21+t*.0022)*.5+Math.sin(i*.05-t*.0013)*.35+Math.sin(i*.9+t*.004)*.15);const h=Math.max(2,Math.abs(a)*env*H*.85);cx.fillStyle=g;cx.globalAlpha=.35+.65*env;cx.fillRect(x,(H-h)/2,2,h)}
 cx.globalAlpha=1;if(!reduce)requestAnimationFrame(draw)}

if($('wave'))requestAnimationFrame(draw);
const L=[['EN',"Don't leave me here."],['HI','मुझे यहाँ छोड़कर मत जाओ।'],['ES','No me dejes aquí.'],['DE','Lass mich nicht hier zurück.'],['KO','날 여기 두고 가지 마.'],['BN','আমাকে এখানে ফেলে যেও না।'],['TA','என்னை இங்கே விட்டுவிட்டுப் போகாதே.'],['TE','నన్ను ఇక్కడ వదిలి వెళ్ళకు.'],['KN','ನನ್ನನ್ನು ಇಲ್ಲಿ ಬಿಟ್ಟು ಹೋಗಬೇಡ.'],['AR','لا تتركني هنا.'],['RU','Не оставляй меня здесь.']];
let li=0;if(!reduce&&$('say'))setInterval(()=>{li=(li+1)%L.length;const s=$('say');s.classList.add('out');setTimeout(()=>{s.textContent=L[li][1];$('say-k').textContent=L[li][0];s.classList.remove('out')},400)},2800);

/* A/B */
if($('abv')){
const AB=S.filter(s=>s.o);let cur=AB[0],side='A';const abv=$('abv');
function knob(){const b=side==='A'?$('abA'):$('abB');$('abk').style.left=b.offsetLeft+'px';$('abk').style.width=b.offsetWidth+'px';$('abA').setAttribute('aria-pressed',side==='A');$('abB').setAttribute('aria-pressed',side==='B')}
function setSide(s){if(s===side&&abv.src)return;side=s;const t=abv.currentTime,pl=!abv.paused;const f=s==='A'?cur.o:cur.f;abv.src=V(f);abv.poster=P(f);if(t)abv.addEventListener('loadedmetadata',()=>{abv.currentTime=t;if(pl)abv.play().catch(()=>{})},{once:true});knob()}
function scene(i){cur=AB[i];$('abt').textContent=`${cur.from} → ${cur.to}`;document.querySelectorAll('#abs button').forEach((b,j)=>b.setAttribute('aria-pressed',j===i));abv.removeAttribute('src');side='';setSide('A');abv.currentTime=0}
$('abs').innerHTML=AB.map((s,i)=>`<button data-i="${i}">${s.t}<small>${s.fmt}</small></button>`).join('');
$('abs').onclick=e=>{const b=e.target.closest('button');if(b)scene(+b.dataset.i)};
$('abA').onclick=()=>setSide('A');$('abB').onclick=()=>setSide('B');
addEventListener('keydown',e=>{if(e.target.matches('input,textarea')||$('lb').classList.contains('open'))return;const r=$('listen').getBoundingClientRect();if(r.top>innerHeight||r.bottom<0)return;if(e.key==='a'||e.key==='A')setSide('A');if(e.key==='b'||e.key==='B')setSide('B')});
scene(0);addEventListener('resize',knob);}

/* explorer */
const langs=['All',...new Set(S.map(s=>s.to))],fmts=['All',...new Set(S.map(s=>s.fmt))];let fl='All',ff='All',list=S;
const chip=(x,k)=>{const n=x==='All'?S.length:S.filter(s=>s[k]===x).length;return `<button class="chip" data-k="${k}" data-v="${x}" aria-pressed="${x==='All'}">${x}<em>${n}</em></button>`};

if($('fl')){$('fl').innerHTML=langs.map(x=>chip(x,'to')).join('');$('ff').innerHTML=fmts.map(x=>chip(x,'fmt')).join('')}
document.querySelectorAll('#fl .chip,#ff .chip').forEach(b=>b.onclick=()=>{const k=b.dataset.k;document.querySelectorAll(`.chip[data-k="${k}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));k==='to'?fl=b.dataset.v:ff=b.dataset.v;render()});
const FEAT=['english-hindi-dub','german-dub','hindi-chinese','anim-spanish','korean-dub','kannada-dub'].map(f=>S.find(s=>s.f===f));
function render(){list=(HOME?FEAT:S).filter(s=>(fl==='All'||s.to===fl)&&(ff==='All'||s.fmt===ff));
 $('grid').innerHTML=list.map((s,i)=>`<button class="card" data-i="${i}" style="animation-delay:${i*40}ms" aria-label="Play ${s.t}"><div class="th${s.v?' v':''}"><img src="${P(s.f)}" alt="" loading="lazy"><div class="tg"><span>${s.to.toUpperCase()}</span>${s.o?'<span>A/B</span>':''}</div><span class="pl">▶</span></div><div class="meta"><b>${s.t}</b><small>${s.from} → ${s.to} · ${s.fmt}</small></div></button>`).join('')||'<p class="lead">No sample for this mix yet.</p>';
 document.querySelectorAll('.card').forEach(c=>{const s=list[+c.dataset.i];
  if(matchMedia('(hover:hover)').matches&&!reduce){c.onmouseenter=()=>{let v=c.querySelector('video');if(!v){v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.preload='none';v.src=V(s.f);c.querySelector('.th').insertBefore(v,c.querySelector('.tg'))}c.classList.add('hv');v.play().catch(()=>{})};c.onmouseleave=()=>{const v=c.querySelector('video');c.classList.remove('hv');if(v)v.pause()}}
  c.onclick=()=>openLb(+c.dataset.i)})}
render();

/* lightbox */
let li2=0,last=null;const lb=$('lb'),lbv=$('lbv');
function show(i){li2=(i+list.length)%list.length;const s=list[li2];lbv.src=V(s.f);lbv.poster=P(s.f);$('lbt').textContent=s.t;$('lbm').textContent=`${s.from} → ${s.to} · ${s.fmt} · ←/→ to browse, Esc to close`;lbv.play().catch(()=>{})}
function openLb(i){last=document.activeElement;lb.classList.add('open');document.body.style.overflow='hidden';show(i);$('lbx').focus()}
function closeLb(){lb.classList.remove('open');lbv.pause();lbv.removeAttribute('src');lbv.load();document.body.style.overflow='';last&&last.focus()}
$('lbx').onclick=closeLb;$('lbp').onclick=()=>show(li2-1);$('lbn').onclick=()=>show(li2+1);lb.onclick=e=>{if(e.target===lb)closeLb()};
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowRight')show(li2+1);if(e.key==='ArrowLeft')show(li2-1);
 if(e.key==='Tab'){const f=[...lb.querySelectorAll('button,video')];const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});

/* career toggle */
document.querySelectorAll('.job').forEach(j=>{const t=()=>j.setAttribute('aria-expanded',j.getAttribute('aria-expanded')!=='true');j.onclick=t;j.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}}});

/* copy */
document.querySelectorAll('[data-copy]').forEach(b=>b.onclick=()=>{navigator.clipboard.writeText(b.dataset.copy).then(()=>toast('Email copied'),()=>toast(b.dataset.copy))});
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),1800)}

/* reveal, nav, progress */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
const secs=[...document.querySelectorAll('main section')],links=[...document.querySelectorAll('nav ul a')];
function onScroll(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;$('prog').style.width=(y/h*100)+'%';$('nav').classList.toggle('s',y>20);
 let id='';secs.forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.4)id=s.id});links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+id))}
addEventListener('scroll',onScroll,{passive:true});onScroll();

/* ===== v3 interactions ===== */
const LANGS=[...new Set(S.map(s=>s.to))];
const CODE={English:'EN',German:'DE',Spanish:'ES',Hindi:'HI',Korean:'KO',Bengali:'BN',Tamil:'TA',Telugu:'TE',Kannada:'KN',Arabic:'AR',Russian:'RU'};
function filterLang(l){fl=l;document.querySelectorAll('.chip[data-k="to"]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v===l));render();bindCards()}
const go=id=>document.getElementById(id).scrollIntoView({behavior:reduce?'auto':'smooth'});

/* background mesh, paused when hidden/offscreen */
(()=>{if(reduce)return;const c=$('bg'),x=c.getContext('2d');let w,h,P=[],run=true;
 function rs(){w=c.width=innerWidth;h=c.height=innerHeight;P=Array.from({length:Math.min(60,Math.floor(w/22))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.15}))}
 rs();addEventListener('resize',rs);
 function f(){if(!run)return;x.clearRect(0,0,w,h);for(const p of P){p.x=(p.x+p.vx+w)%w;p.y=(p.y+p.vy+h)%h;x.fillStyle='rgba(180,200,255,.35)';x.fillRect(p.x,p.y,1.2,1.2)}
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<120){x.strokeStyle=`rgba(170,180,255,${.06*(1-d/120)})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
  requestAnimationFrame(f)}
 document.addEventListener('visibilitychange',()=>{run=!document.hidden;if(run)f()});f()})();

/* hero wave: pause offscreen */
(()=>{const hv=new IntersectionObserver(e=>{cv.dataset.off=!e[0].isIntersecting});hv.observe(cv)})();

/* easter egg */
$('tryl')&&$('tryl').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();if(q.length<2)return;
 const M={english:'EN',hindi:'HI',spanish:'ES',german:'DE',korean:'KO',bengali:'BN',tamil:'TA',telugu:'TE',kannada:'KN',arabic:'AR',russian:'RU'};
 const k=Object.keys(M).find(n=>n.startsWith(q));if(!k)return;const i=L.findIndex(l=>l[0]===M[k]);if(i<0)return;li=i;$('say').textContent=L[i][1];$('say-k').textContent=L[i][0];toast(k[0].toUpperCase()+k.slice(1)+' ✓')});

/* magnetic + spotlight + tilt */
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduce;
function magnet(el){if(!fine)return;el.classList.add('mag');el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')}
document.querySelectorAll('.btn,.playb,.fab button').forEach(magnet);
document.addEventListener('pointermove',e=>{const t=e.target.closest&&e.target.closest('.card,.glass.spot');if(!t)return;const r=t.getBoundingClientRect();t.style.setProperty('--mx',e.clientX-r.left+'px');t.style.setProperty('--my',e.clientY-r.top+'px')},{passive:true});
function bindCards(){if(!fine)return;document.querySelectorAll('.card').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(800px) rotateY(${px*8}deg) rotateX(${-py*8}deg) translateY(-4px)`});c.addEventListener('mouseleave',()=>c.style.transform='')})}
document.querySelectorAll('.chip').forEach(b=>b.addEventListener('click',()=>setTimeout(bindCards)));bindCards();

/* voice lab */
(()=>{if(!$('lab'))return;const c=$('lab'),x=c.getContext('2d'),au=$('laba');let w,h,lang=LANGS[0],cur=new Array(96).fill(0),tgt=[],an=null,buf,ctx,vis=false,raf=0;
 const pick=l=>S.find(s=>s.to===l);
 function shape(l){let seed=[...l].reduce((a,ch)=>a*31+ch.charCodeAt(0),7)%9973;const r=()=>(seed=(seed*16807)%2147483647)/2147483647;
  const f1=1+r()*4,f2=4+r()*9,ph=r()*6;return cur.map((_,i)=>{const p=i/cur.length;return Math.abs(Math.sin(p*f1*3+ph)*.6+Math.sin(p*f2*3)*.4)*Math.sin(Math.PI*p)*.9+.04})}
 function rs(){const d=devicePixelRatio||1;w=c.clientWidth;h=c.clientHeight;c.width=w*d;c.height=h*d;x.setTransform(d,0,0,d,0,0)}rs();addEventListener('resize',rs);
 function set(l){lang=l;tgt=shape(l);const s=pick(l);$('labt').textContent=l;$('labs').textContent=s.t;document.querySelectorAll('#labc .chip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===l));
  if(!au.paused){au.pause();play()}else{$('labm').textContent='Idle'};if(reduce||!vis)frame()}
 $('labc').innerHTML=LANGS.map(l=>`<button class="chip" data-v="${l}" aria-pressed="false">${l}</button>`).join('');
 $('labc').onclick=e=>{const b=e.target.closest('button');if(b)set(b.dataset.v)};
 function frame(){const t=performance.now();if(an){an.getByteFrequencyData(buf);for(let i=0;i<cur.length;i++)tgt[i]=(buf[Math.floor(i*buf.length/cur.length*.7)]/255)*.95+.02}
  x.clearRect(0,0,w,h);const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'#9fd8ff');g.addColorStop(.6,'#c4a8ff');g.addColorStop(1,'#f1c6e0');x.fillStyle=g;
  const bw=w/cur.length;for(let i=0;i<cur.length;i++){cur[i]+=(tgt[i]*(an&&!au.paused?1:(.85+.15*Math.sin(t*.003+i*.3)))-cur[i])*(reduce?1:.12);const bh=Math.max(2,cur[i]*h*.9);x.globalAlpha=.85;x.fillRect(i*bw+bw*.3,(h-bh)/2,Math.max(1.5,bw*.4),bh)}
  x.globalAlpha=1;if(vis&&!reduce)raf=requestAnimationFrame(frame)}
 new IntersectionObserver(e=>{vis=e[0].isIntersecting;cancelAnimationFrame(raf);if(vis)frame();else if(!au.paused)au.pause()}).observe(c);
 function play(){const s=pick(lang);if(!au.src.endsWith(V(s.f))){au.src=V(s.f)}
  try{if(!ctx){ctx=new (window.AudioContext||window.webkitAudioContext)();const src=ctx.createMediaElementSource(au);an=ctx.createAnalyser();an.fftSize=256;buf=new Uint8Array(an.frequencyBinCount);src.connect(an);an.connect(ctx.destination)}ctx.resume()}catch(e){}
  au.play().then(()=>{$('labp').textContent='❚❚';$('labm').textContent='Live · '+CODE[lang]}).catch(()=>{$('labm').textContent='Tap play again'})}
 $('labp').onclick=()=>{if(au.paused)play();else{au.pause()}};
 au.onpause=()=>{$('labp').textContent='▶';$('labm').textContent='Paused'};au.onended=au.onpause;
 $('labw').onclick=()=>{au.pause();list=S.filter(s=>s.to===lang);openLb(0)};
 set(lang)})();

/* pipeline */
(()=>{if(!$('pbar'))return;const ST=[
 ['Scene and language in','Any format, any length, plus the target language.','<div class="fm"><span>Any format</span><span>Any length</span><span>→ Target language</span></div>'],
 ['Transcribe and adapt','Lines rewritten to fit the mouth, the timing and the culture.','<div style="width:70%"><span class="ln" style="--w:90%"></span><span class="ln h" style="--w:70%;animation-delay:.3s"></span><span class="ln" style="--w:80%;animation-delay:.5s"></span><span class="ln h" style="--w:55%;animation-delay:.8s"></span></div>'],
 ['Cast and shape the voices','The AI voice keeps the actor\'s tone; every emotional beat is directed by a person.','<div class="tk">'+Array.from({length:28},(_,i)=>`<i style="animation-delay:${-(i*.13)%1}s"></i>`).join('')+'</div>'],
 ['Mix and quality check','Lip-sync, levels, pronunciation, pacing and emotion, all checked by ear.','<div class="chk"><span>Lip-sync</span><span style="animation-delay:.15s">Levels</span><span style="animation-delay:.3s">Pronunciation</span><span style="animation-delay:.45s">Pacing</span><span style="animation-delay:.6s">Emotion</span></div>'],
 ['Deliver to spec','WAV audio, SRT, or MP4 with burnt-in subtitles, ready to upload.','<div class="fm"><span>WAV</span><span style="animation-delay:.15s">SRT</span><span style="animation-delay:.3s">MP4 + subs</span></div>']];
 let i=0,tm;const bar=$('pbar');
 bar.innerHTML=ST.map((s,j)=>`<button role="tab" id="pt${j}" aria-selected="${j===0}" tabindex="${j?-1:0}"><b>0${j+1}</b>${s[0]}</button>`).join('');
 function set(j,focus){i=(j+5)%5;bar.querySelectorAll('button').forEach((b,k)=>{b.setAttribute('aria-selected',k===i);b.tabIndex=k===i?0:-1});if(focus)bar.children[i].focus();
  $('pn').textContent='Step 0'+(i+1)+' / 05';$('ph').textContent=ST[i][0];$('pp').textContent=ST[i][1];$('pviz').innerHTML=ST[i][2];$('ptr').style.width=(i+1)*20+'%';$('ppanel').setAttribute('aria-labelledby','pt'+i)}
 bar.onclick=e=>{const b=e.target.closest('button');if(b){stop();set([...bar.children].indexOf(b))}};
 bar.onkeydown=e=>{if(e.key==='ArrowRight'){stop();set(i+1,1)}if(e.key==='ArrowLeft'){stop();set(i-1,1)}};
 let sx=null;const pp=$('ppanel');pp.addEventListener('pointerdown',e=>sx=e.clientX);pp.addEventListener('pointerup',e=>{if(sx!==null&&Math.abs(e.clientX-sx)>40){stop();set(i+(e.clientX<sx?1:-1))}sx=null});
 function stop(){clearInterval(tm);tm=null}
 new IntersectionObserver(e=>{if(e[0].isIntersecting&&!reduce&&tm===undefined)tm=setInterval(()=>set(i+1),3800);else if(!e[0].isIntersecting&&tm){stop();tm=undefined}}).observe(pp);
 set(0)})();

/* language orbit */
(()=>{const sv=$('orbit'),C=170;if(!sv)return;const inner=LANGS.slice(0,5),outer=LANGS.slice(5);
 const node=(l,i,n,r)=>{const a=i/n*Math.PI*2-Math.PI/2,x=C+r*Math.cos(a),y=C+r*Math.sin(a),k=S.filter(s=>s.to===l).length;return `<g class="n" tabindex="0" role="button" data-l="${l}" aria-label="${l}, ${k} sample${k>1?'s':''}"><circle cx="${x}" cy="${y}" r="${16+k*2}"/><text x="${x}" y="${y}">${CODE[l]}</text></g>`};
 sv.innerHTML=`<circle class="ring" cx="${C}" cy="${C}" r="78"/><circle class="ring" cx="${C}" cy="${C}" r="145"/><circle cx="${C}" cy="${C}" r="30" fill="url(#og)"/><defs><radialGradient id="og"><stop offset="0" stop-color="#c4a8ff" stop-opacity=".7"/><stop offset="1" stop-color="#9fd8ff" stop-opacity="0"/></radialGradient></defs>
 <g class="spin">${inner.map((l,i)=>node(l,i,inner.length,78)).join('')}</g><g class="spin r">${outer.map((l,i)=>node(l,i,outer.length,145)).join('')}</g>`;
 const info=l=>{const k=S.filter(s=>s.to===l);$('ob').textContent=l;$('op').textContent=k.length+' sample'+(k.length>1?'s':'')+': '+k.map(s=>s.fmt).filter((v,i,a)=>a.indexOf(v)===i).join(', ')};
 sv.querySelectorAll('g.n').forEach(g=>{const l=g.dataset.l;g.onmouseenter=g.onfocus=()=>info(l);const act=()=>{location.href='content.html?lang='+encodeURIComponent(l)+'#library'};g.onclick=act;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();act()}}})})();

/* tour + random */
const TOUR=['english-hindi-dub','hindi-chinese','anim-spanish'].map(f=>S.find(s=>s.f===f));let touring=-1;
function tourStep(k){touring=k;list=TOUR;if(!lb.classList.contains('open'))openLb(k);else show(k);$('lbm').textContent=`Tour ${k+1} / 3 · ${TOUR[k].from} → ${TOUR[k].to} · plays the next one when it ends · Esc to stop`}
if($('tourBtn'))$('tourBtn').onclick=()=>tourStep(0);
lbv.addEventListener('ended',()=>{if(touring>=0&&touring<2)tourStep(touring+1);else touring=-1});
$('lbx').addEventListener('click',()=>{touring=-1;render();bindCards()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&touring>=0){touring=-1;setTimeout(()=>{render();bindCards()})}});
$('rndBtn').onclick=()=>{touring=-1;fl='All';ff='All';document.querySelectorAll('#fl .chip,#ff .chip').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v==='All'));render();bindCards();list=S;openLb(Math.floor(Math.random()*S.length))};

/* section dots */
const SECH=[['top','Intro'],['listen','Hear the difference'],['lab-s','Voice lab'],['work','Featured samples'],['latest','Latest videos'],['process','Process'],['career','Career'],['craft','Craft'],['contact','Contact']],SECC=[['top','Content'],['linkedin','LinkedIn videos & posts'],['library','Sample library'],['contact','Contact']];
const SEC=HOME?SECH:SECC;
$('dots').innerHTML=SEC.map(s=>`<a href="#${s[0]}" aria-label="${s[1]}"><span>${s[1]}</span></a>`).join('');
addEventListener('scroll',()=>{let id='top';SEC.forEach(s=>{if($(s[0]).getBoundingClientRect().top<innerHeight*.45)id=s[0]});$('dots').querySelectorAll('a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+id))},{passive:true});

/* command palette */
(()=>{const kp=$('kp'),inp=$('kpi'),ul=$('kpl');let items=[],sel=0,prev;
 const ALL=[{t:'Home page',k:'Page',run:()=>{HOME?go('top'):location.href='index.html'}},{t:'Content page',k:'Page',run:()=>{HOME?location.href='content.html':go('top')}},...SEC.map(s=>({t:s[1],k:'Section',run:()=>go(s[0])})),...(HOME?SECC.slice(1,3).map(s=>({t:s[1],k:'Content page',run:()=>location.href='content.html#'+s[0]})):SECH.slice(1,-1).map(s=>({t:s[1],k:'Home page',run:()=>location.href='index.html#'+s[0]}))),...LANGS.map(l=>({t:l,k:'Samples',run:()=>{if(HOME)location.href='content.html?lang='+encodeURIComponent(l)+'#library';else{filterLang(l);go('library')}}})),{t:'Take the 3-sample tour',k:'Action',run:()=>tourStep(0)},{t:'Random sample',k:'Action',run:()=>$('rndBtn').click()},{t:'Copy email',k:'Action',run:()=>navigator.clipboard.writeText('akashkrgupta46@gmail.com').then(()=>toast('Email copied'))}];
 function draw(){const q=inp.value.toLowerCase();items=ALL.filter(i=>i.t.toLowerCase().includes(q));sel=Math.min(sel,Math.max(0,items.length-1));ul.innerHTML=items.map((i,j)=>`<li role="option" aria-selected="${j===sel}" class="${j===sel?'sel':''}" data-j="${j}">${i.t}<small>${i.k}</small></li>`).join('')}
 function open(){prev=document.activeElement;kp.classList.add('open');inp.value='';sel=0;draw();inp.focus()}
 function close(){kp.classList.remove('open');prev&&prev.focus()}
 function run(j){const it=items[j];close();it&&it.run()}
 $('kBtn').onclick=open;
 addEventListener('keydown',e=>{const typing=e.target.matches('input,textarea');
  if(!kp.classList.contains('open')){if(((e.key==='k'||e.key==='K')&&(e.metaKey||e.ctrlKey))||(!typing&&(e.key==='k'||e.key==='K')&&!lb.classList.contains('open'))){e.preventDefault();open()}return}
  if(e.key==='Escape')close();if(e.key==='ArrowDown'){e.preventDefault();sel=(sel+1)%items.length;draw()}if(e.key==='ArrowUp'){e.preventDefault();sel=(sel-1+items.length)%items.length;draw()}if(e.key==='Enter')run(sel)});
 inp.oninput=()=>{sel=0;draw()};ul.onclick=e=>{const li=e.target.closest('li');if(li)run(+li.dataset.j)};kp.onclick=e=>{if(e.target===kp)close()}})();
const LI=[
 {u:'7520341715115794433',k:'Post',x:'Carousel · 8 pages',t:'Imagine hearing yourself speak a language you’ve never learned.',m:'Oct 2026',a:'~1 week ago'},
 {u:'7519295787521036288',k:'Video',x:'',t:'Netflix just said it takes 50–60 people to dub ONE language.',m:'Oct 2026',a:'~1 week ago'},
 {u:'7515268048996642816',k:'Video',x:'',t:'Your film doesn’t need a new story to reach a new audience. Sometimes, it just needs a new voice.',m:'Oct 2026',a:'~3 weeks ago'},
 {u:'7513533396740915201',k:'Video',x:'0:27',t:'A frightened character should sound frightened. In Hindi. In Tamil. In Spanish. In Korean.',m:'Oct 2026',a:'~3 weeks ago'},
 {u:'7511703593658421248',k:'Post',x:'',t:'Translation gives you the words. Localization gives you the moment.',m:'Oct 2026',a:'~1 month ago'},
 {u:'7508050195700625409',k:'Video',x:'0:29',t:'AI can generate a voice. But can it make that voice truly belong to the character?',m:'Sep 2026',a:'~1 month ago'},
 {u:'7482267585640681474',k:'Video',x:'1:24',t:'Once upon a time… Spreadsheets controlled the pipeline.',m:'Jul 2026',a:'~3 months ago'}];
const LIU=u=>`https://www.linkedin.com/feed/update/urn:li:activity:${u}/`;
function liCard(p,i){let s=0;for(const c of p.u)s=(s*31+ +c)%9973;const r=()=>(s=(s*16807)%2147483647)/2147483647;const n=34,h=(200+i*37)%360;
 const bars=Array.from({length:n},(_,j)=>{const e=Math.sin(Math.PI*(j+.5)/n),v=Math.max(.08,e*(.35+r()*.65));return `<rect x="${j*10+2}" y="${50-v*48}" width="5" height="${v*96}" rx="2.5" style="animation-delay:${-(j%7)*.17}s"/>`}).join('');
 return `<article class="lic" data-k="${p.k}" style="--h:${h};animation-delay:${i*60}ms"><div class="lv" aria-hidden="true"><svg viewBox="0 0 340 100" preserveAspectRatio="none">${bars}</svg><div class="bdg"><span>${p.k==='Video'?'▶ VIDEO':'✦ POST'}</span>${p.x?`<span>${p.x}</span>`:''}</div></div><div class="lb2"><q>${p.t}</q><time>${p.m} · ${p.a}</time><a class="mini" href="${LIU(p.u)}" target="_blank" rel="noopener" aria-label="Open on LinkedIn: ${p.t.replace(/"/g,'')}">Open on LinkedIn ↗</a></div></article>`}
const LIDEF='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stop-color="#9fd8ff"/><stop offset=".6" stop-color="#c4a8ff"/><stop offset="1" stop-color="#f1c6e0"/></linearGradient></defs></svg>';
if($('lig')){$('lig').innerHTML=LIDEF+LI.map(liCard).join('');const ch=$('lif');ch.onclick=e=>{const b=e.target.closest('button');if(!b)return;ch.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));const v=b.dataset.v;$('lig').querySelectorAll('.lic').forEach(c=>c.hidden=!(v==='All'||c.dataset.k===v));$('lin').textContent=$('lig').querySelectorAll('.lic:not([hidden])').length+' shown'}}
if($('lit'))$('lit').innerHTML=LIDEF+LI.filter(p=>p.k==='Video').slice(0,3).map(liCard).join('');

/* deep link: content.html?lang=X#library */
(()=>{if(HOME||!$('fl'))return;const q=new URLSearchParams(location.search),l=q.get('lang'),f=q.get('fmt');if(f&&fmts.includes(f)){ff=f;document.querySelectorAll('#ff .chip').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v===f))}if(l&&LANGS.includes(l))filterLang(l);else if(f){render();bindCards()}if(l||f)addEventListener('load',()=>go('library'))})();
