  const header = document.getElementById('site-header');
  const stickyBar = document.getElementById('sticky-bar');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);
    if (stickyBar) {
      stickyBar.classList.toggle('show', window.scrollY > 480);
    }
  });

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(btn.dataset.tab);
      panel.classList.add('active');
      // panel was display:none, so its .reveal children may never have
      // intersected while hidden (some mobile browsers never re-check
      // after display:none -> visible) - force them visible on open
      panel.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    });
  });

  function showToast(msg){
    const toast = document.getElementById('toast');
    if(!toast) return;
    document.getElementById('toast-text').textContent = msg;
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  function scrollToId(id){
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function scrollFooter(){
    document.querySelector('footer').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function notifySoon(name){
    showToast(name + ' üzerinde çalışıyoruz, çok yakında burada olacak 🐾');
  }

  // ---------- Shopier placeholder ----------
  // TODO: gerçek Shopier ürün linki hazır olduğunda aşağıdaki URL'yi güncelleyin
  // örn: window.location.href = "https://www.shopier.com/urun-linki";
  function goToShopier(){
    window.open('https://www.shopier.com/komsuhane/48614879', '_blank', 'noopener');
  }

  const notifyForm = document.getElementById('notify-form');
  if(notifyForm){
    notifyForm.addEventListener('submit', function(e){
      e.preventDefault();
      showToast('Bildirim listesine eklendin, teşekkürler!');
      this.reset();
    });
  }

  document.querySelectorAll('.show-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if(target) target.classList.add('expanded');
      btn.remove();
    });
  });

  document.querySelectorAll('.show-gallery-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const galeriTab = document.getElementById('galeri');
      if(galeriTab) galeriTab.click();
    });
  });
