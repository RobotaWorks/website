/* Hero pipeline and mock write-in. The markup is the finished frame, so this only
   runs when motion is allowed; no-JS and reduced motion keep the readable end state. */
(function(){
  if(!window.matchMedia||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var $=function(s,r){return(r||document).querySelector(s)};
  var sleep=function(ms){return new Promise(function(r){setTimeout(r,ms)})};
  var watch=function(el){
    var v=true;new IntersectionObserver(function(e){v=e[e.length-1].isIntersecting}).observe(el);
    return function(ms){return sleep(ms).then(function f(){return v&&!document.hidden?0:sleep(300).then(f)})};
  };
  /* type text into el word by word, with a caret */
  var type=async function(el,text,wait){
    var caret=document.createElement('span'),w=text.split(' ');caret.className='caret';
    for(var i=0;i<w.length;i++){el.textContent=w.slice(0,i+1).join(' ')+' ';el.appendChild(caret);await wait(60+w[i].length*20)}
    el.textContent=text;
  };

  var pipe=$('[data-pipe]');
  if(pipe&&pipe.animate){
    var cs=getComputedStyle(document.documentElement),c=function(n){return cs.getPropertyValue(n).trim()};
    var INK=c('--ink'),PAPER=c('--paper'),SIG=c('--signal'),PANEL='#201d15',T=15500,E='cubic-bezier(.65,0,.35,1)',all=[];
    var track=function(el,prop,fr){
      var kf=fr.map(function(f){var o={offset:Math.min(f[0]/T,1),easing:f[2]||'linear'};o[prop]=f[1];return o});
      kf.push({offset:1});kf[kf.length-1][prop]=fr[fr.length-1][1];
      all.push(el.animate(kf,{duration:T,iterations:Infinity,fill:'both'}));
    };
    /* a stage lights when the packet arrives, then settles to done (or back to idle if it bounced the work) */
    var node=function(id,spans){
      var g=$('#'+id,pipe),fill=[[0,PANEL]],txt=[[0,PAPER]],f=PANEL,t=PAPER;
      spans.forEach(function(s){
        var done=s[2]==='idle'?[PANEL,PAPER]:[PAPER,INK];
        fill.push([s[0],f],[s[0]+150,SIG],[s[1],SIG],[s[1]+250,f=done[0]]);
        txt.push([s[0],t],[s[0]+150,INK],[s[1],INK],[s[1]+250,t=done[1]]);
      });
      fill.push([T-700,f],[T,PANEL]);txt.push([T-700,t],[T,PAPER]);
      track($('rect,circle',g),'fill',fill);if($('text',g))track($('text',g),'fill',txt);
    };
    node('n1',[[200,1000]]);node('n2',[[1900,3300],[6200,7100]]);node('n3',[[4100,5400,'idle'],[7900,9000]]);node('n4',[[10000,11000]]);node('n5',[[12400,13100]]);
    track($('#tick',pipe),'strokeDashoffset',[[0,1],[12550,1],[13050,0,E],[T-700,0],[T,1]]);

    /* one packet: anticipation, eased travel, squash on arrival, absorbed at the node edge */
    var P=function(x,y,s){return'translate('+x+'px,'+y+'px) scale('+s+')'},pf=[],po=[];
    var leg=function(x0,y0,x1,y1,t0,t1,via){
      var dx=Math.sign(x1-x0),dy=Math.sign(y1-y0),pre=t0-300;
      pf.push([pre,P(x0,y0,.3),'ease-out'],[pre+200,P(x0,y0,1),'ease-in-out'],[t0-80,P(x0-dx*6,y0-dy*6,1.1),E]);
      if(via)pf.push([via[0],P(via[1],via[2],1),E]);
      pf.push([t1,P(x1,y1,1),'ease-out'],[t1+150,P(x1,y1,.2)]);
      po.push([pre-1,0],[pre,1],[t1+150,1],[t1+151,0]);
    };
    leg(170,90,310,90,1100,1900);leg(380,130,380,190,3500,4100);leg(410,190,410,130,5600,6200);
    leg(380,130,380,190,7300,7900);leg(310,230,170,230,9200,10000);leg(100,270,194,340,11200,12400,[11700,100,340]);
    track($('#pkt',pipe),'transform',[[0,P(170,90,.3)]].concat(pf));track($('#pkt',pipe),'opacity',[[0,0]].concat(po));

    [200,2000,5400,8000,10100,12550].forEach(function(t,i){
      track($$(pipe,i),'opacity',[[0,0],[t,0],[t+250,1],[T-700,1],[T,0]]);
    });
    function $$(r,i){return r.querySelectorAll('.pipe-log li')[i]}
    var wait=watch(pipe);
    setInterval(function(){wait(0).then(function(){all.forEach(function(a){if(a.playState==='paused')a.play()})});if(document.hidden)all.forEach(function(a){a.pause()})},400);
  }

  /* SEO mock: old text struck, new text typed, then Schválit is pressed */
  var mock=$('.mock');
  if(mock){
    var p=$('.diff .new p',mock),old=$('.diff .old p',mock),badge=$('.badge',mock),yes=$('.mock-actions .yes',mock),full=p.textContent,b0=badge.textContent,w=watch(mock);
    (async function(){
      for(;;){
        old.style.textDecorationColor='transparent';p.textContent='';badge.textContent=b0;badge.classList.remove('ok');
        await w(1200);old.style.textDecorationColor='';await w(700);
        await type(p,full,w);await w(900);
        yes.classList.add('press');await w(220);yes.classList.remove('press');
        badge.textContent=document.documentElement.lang==='cs'?'Schváleno':'Approved';badge.classList.add('ok');
        await w(4200);
      }
    })();
  }

  /* offer page: each CSV row is struck, then its rewrite is typed */
  var csv=$('.csvfx');
  if(csv){
    var rows=[].slice.call(csv.querySelectorAll('.csv-row')),w2=watch(csv),text=rows.map(function(r){return $('.now',r).textContent});
    (async function(){
      for(;;){
        rows.forEach(function(r){$('.was',r).style.textDecorationColor='transparent';$('.now',r).textContent=''});
        await w2(1000);
        for(var k=0;k<rows.length;k++){$('.was',rows[k]).style.textDecorationColor='';await w2(500);await type($('.now',rows[k]),text[k],w2);await w2(500)}
        await w2(4200);
      }
    })();
  }
})();
