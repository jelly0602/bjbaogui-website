// 北京报规设计服务网站 JavaScript - 专业版

document.addEventListener('DOMContentLoaded', function() {
  // 移动端导航
  const navbarToggle = document.getElementById('navbarToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  
  if (navbarToggle && mobileNav) {
    navbarToggle.addEventListener('click', function() {
      mobileNav.classList.add('active');
      mobileNavOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    function closeMobileNav() {
      mobileNav.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', closeMobileNav);
    }
    
    if (mobileNavOverlay) {
      mobileNavOverlay.addEventListener('click', closeMobileNav);
    }
  }
  
  // 导航栏滚动效果
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow-md)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      } else {
        navbar.style.boxShadow = 'none';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      }
    });
  }
  
  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // 动画观察器
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // 观察需要动画的元素
  document.querySelectorAll('.service-card, .process-step, .advantage-card, .case-card').forEach(el => {
    el.classList.add('animate-ready');
    observer.observe(el);
  });
  
  // 复制到剪贴板功能
  window.copyToClipboard = function(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('已复制到剪贴板');
      }).catch(() => {
        fallbackCopyTextToClipboard(text);
      });
    } else {
      fallbackCopyTextToClipboard(text);
    }
  };
  
  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      showToast('已复制到剪贴板');
    } catch (err) {
      showToast('复制失败，请手动复制');
    }
    
    document.body.removeChild(textArea);
  }
  
  // 显示提示信息
  window.showToast = function(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--text-primary);
      color: var(--text-white);
      padding: var(--spacing-md) var(--spacing-xl);
      border-radius: var(--radius-lg);
      z-index: 10000;
      font-size: 0.9375rem;
      box-shadow: var(--shadow-lg);
      animation: fadeInUp 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.animation = 'fadeOutDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 3000);
  };
  
  // 返回顶部按钮
  const backToTopButton = document.createElement('button');
  backToTopButton.id = 'backToTop';
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    transition: all 0.3s ease;
  `;
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  document.body.appendChild(backToTopButton);
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
});

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
  
  @keyframes fadeOutDown {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
  }
  
  .animate-ready {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }
  
  .animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .animate-ready:nth-child(1) { transition-delay: 0.1s; }
  .animate-ready:nth-child(2) { transition-delay: 0.2s; }
  .animate-ready:nth-child(3) { transition-delay: 0.3s; }
  .animate-ready:nth-child(4) { transition-delay: 0.4s; }
`;

document.head.appendChild(style);