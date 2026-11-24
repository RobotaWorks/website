(function(){
  var h=document.querySelector('.top'),b=h&&h.querySelector('.menu-btn');
  if(b){
    var set=function(o){h.classList.toggle('open',o);b.setAttribute('aria-expanded',o?'true':'false')};
    b.addEventListener('click',function(){set(!h.classList.contains('open'))});
    h.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){set(false)})});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
    window.addEventListener('resize',function(){if(window.innerWidth>860)set(false)});
  }
})();

/* scroll reveal (homepages and product pages: body.home): elements are hidden only after this script marks them */
(function(){
  if(!document.body.classList.contains('home')||!('IntersectionObserver' in window))return;
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;
      var el=e.target;
      io.unobserve(el);
      el.classList.add('in');
      setTimeout(function(){el.classList.remove('rv','in');el.style.removeProperty('--d')},1200);
    });
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.head,.grid3>.card,.about>.card,.steps>li,.compare>.panel,.split>*,.narrow>h2,.faq,.cta-band,.foot-grid>div').forEach(function(el){
    var sib=el.parentNode.children;
    el.style.setProperty('--d',(Array.prototype.indexOf.call(sib,el)*0.1)+'s');
    el.classList.add('rv');
    io.observe(el);
  });
})();
