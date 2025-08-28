(function(){
  // Set current year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu){
    navToggle.addEventListener('click', function(){
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('show');
    });
    navMenu.addEventListener('click', function(e){
      var target = e.target;
      if (target && target.tagName === 'A'){
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scroll for links with data-scroll
  var scrollLinks = document.querySelectorAll('[data-scroll]');
  scrollLinks.forEach(function(link){
    link.addEventListener('click', function(e){
      var href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', href);
    });
  });

  // Theme toggle with localStorage
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  themeToggle && themeToggle.addEventListener('click', function(){
    var current = root.getAttribute('data-theme') || 'dark';
    var next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // IntersectionObserver for section animations
  var animatedEls = document.querySelectorAll('[data-animate]');
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  animatedEls.forEach(function(el){ observer.observe(el); });

  // Filters for projects
  var filterButtons = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterButtons.forEach(function(b){ b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');
      var type = btn.getAttribute('data-filter');
      projectCards.forEach(function(card){
        var show = type === 'all' || card.getAttribute('data-type') === type;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  // Modal logic for project details
  var modal = document.getElementById('projectModal');
  var modalTitle = document.getElementById('modalTitle');
  var modalDesc = document.getElementById('modalDesc');
  var modalLink = document.getElementById('modalLink');
  var modalOpeners = document.querySelectorAll('[data-modal-open]');
  var modalClosers = document.querySelectorAll('[data-modal-close]');

  var PROJECTS = {
    dashboard: { title: 'Analytics Dashboard', desc: 'Admin dashboard with charts (D3.js), role-based auth, and dark mode.', link: 'https://github.com/' },
    tasks: { title: 'Task Manager', desc: 'PWA with offline sync, drag-and-drop lists, and reminders.', link: 'https://example.com' },
    uikit: { title: 'UI Component Kit', desc: 'Headless, accessible components with theming and docs site.', link: 'https://github.com/' }
  };

  function openModal(key){
    var data = PROJECTS[key] || { title: 'Project', desc: 'Details not found.', link: '#' };
    if (!modal || !modalTitle || !modalDesc || !modalLink) return;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalLink.href = data.link;
    modal.setAttribute('open','');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    if (!modal) return;
    modal.removeAttribute('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  modalOpeners.forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      var key = btn.getAttribute('data-project');
      openModal(key);
    });
  });
  modalClosers.forEach(function(btn){ btn.addEventListener('click', closeModal); });
  modal && modal.addEventListener('click', function(e){
    if (e.target && (e.target.classList.contains('modal') || e.target.classList.contains('modal-backdrop'))) closeModal();
  });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeModal(); });

  // Back to top button
  var backToTop = document.getElementById('backToTop');
  function onScroll(){
    if (!backToTop) return;
    if (window.scrollY > 600){ backToTop.classList.add('show'); }
    else{ backToTop.classList.remove('show'); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  backToTop && backToTop.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


