document.addEventListener('DOMContentLoaded', function() {
  const skillBars = document.querySelectorAll('.skill-level');  

  const observerOptions = {
    threshold: 0.5 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-level') + '%';
        bar.style.width = targetWidth;
        observer.unobserve(bar); 
      }
    });
  }, observerOptions);

  skillBars.forEach(bar => {
    bar.style.width = '0';
    observer.observe(bar);
  });
});

window.addEventListener('scroll', function() {
  const scrollBtn = document.querySelector('.scroll-top-btn');
  if (window.pageYOffset > 300) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});
document.querySelector('.scroll-top-btn').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

document.querySelectorAll('.quick-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if ('scrollBehavior' in document.documentElement.style) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      smoothScroll(targetElement);
    }
  });
});

function smoothScroll(target) {
  const startPosition = window.pageYOffset;
  const targetPosition = target.getBoundingClientRect().top + startPosition;
  const distance = targetPosition - startPosition;
  const duration = 500;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  requestAnimationFrame(animation);
}

document.querySelectorAll('.quick-link').forEach((button, index) => {
  button.style.setProperty('--i', index);
});

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.scrollY;
  
  sections.forEach(section => {
    const link = document.querySelector(`.quick-link[href="#${section.id}"]`);
    if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const langToggle = document.getElementById('lang-toggle');  

  const savedLang = localStorage.getItem('lang') || 'ru';
  document.body.classList.toggle('en', savedLang === 'en');  
  
  updateButton(savedLang);  
 
  langToggle.addEventListener('click', function() {
    const isEn = document.body.classList.toggle('en');
    const lang = isEn ? 'en' : 'ru';
    localStorage.setItem('lang', lang);
    updateButton(lang);    
    
    forceRedraw();
  });
  
  function updateButton(lang) {
  document.getElementById('lang-toggle').textContent = lang === 'en' ? 'RU' : 'EN';
}
  
  function forceRedraw() {
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.style.display = 'none';
      setTimeout(() => {
        el.style.display = '';
      }, 50);
    });
  }
});