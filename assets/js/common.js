// 通用JavaScript功能文件

// 组件加载函数
function loadComponent(url, targetId) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.text()
    })
    .then(data => {
      document.getElementById(targetId).innerHTML = data
    })
    .catch(error => {
      console.error(`Error loading component ${url}:`, error)
    })
}

// 加载所有共享组件
function loadSharedComponents() {
  // 加载导航栏
  if (document.getElementById('navbar-placeholder')) {
    loadComponent('components/navbar.html', 'navbar-placeholder')
  }
  
  // 加载页脚
  if (document.getElementById('footer-placeholder')) {
    loadComponent('components/footer.html', 'footer-placeholder')
  }
  
  // 加载联系表单
  if (document.getElementById('contact-form-placeholder')) {
    loadComponent('components/contact-form.html', 'contact-form-placeholder')
  }
  
  // 加载Google Analytics
  if (document.getElementById('google-analytics-placeholder')) {
    loadComponent('components/google-analytics.html', 'google-analytics-placeholder')
  }
}

// 导航菜单切换功能
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links')
  if (navLinks) {
    navLinks.classList.toggle('active')
  }
}

// 表单验证功能
function validateContactForm() {
  const form = document.getElementById('contact-form')
  if (form) {
    form.addEventListener('submit', function(event) {
      let isValid = true
      const name = document.getElementById('name')
      const countryCode = document.getElementById('country-code')
      const phoneNumber = document.getElementById('phone-number')
      const message = document.getElementById('message')
      
      // 验证必填字段
      if (!name.value.trim()) {
        alert('请输入您的姓名')
        isValid = false
        event.preventDefault()
      } else if (!countryCode.value.trim() || !phoneNumber.value.trim()) {
        alert('请输入完整的电话号码')
        isValid = false
        event.preventDefault()
      } else if (!message.value.trim()) {
        alert('请输入您的咨询内容')
        isValid = false
        event.preventDefault()
      }
      
      return isValid
    })
  }
}

// 平滑滚动功能
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        })
      }
    })
  })
}

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
  // 立即显示导航栏占位符内容
  const navbarPlaceholder = document.getElementById('navbar-placeholder')
  if (navbarPlaceholder) {
    // 创建简单的导航栏结构，避免空白期
    navbarPlaceholder.innerHTML = `
      <nav>
        <div class="nav-container">
          <a href="#" onclick="loadPage('index.html')" class="logo">智能展馆多媒体中控系统</a>
          <button class="hamburger" onclick="toggleMenu()">☰</button>
          <ul class="nav-links">
            <li><a href="#" onclick="loadPage('index.html')">首页</a></li>
            <li><a href="#" onclick="loadPage('about.html')">关于我们</a></li>
            <li><a href="#" onclick="loadPage('products.html')">产品</a></li>
            <li><a href="#" onclick="loadPage('cases.html')">项目案例</a></li>
            <li><a href="#" onclick="loadPage('contact.html')">联系方式</a></li>
          </ul>
        </div>
      </nav>
    `
  }
  
  // 加载共享组件（异步更新导航栏样式等）
  loadSharedComponents()
  
  // 立即执行其他功能，无需等待
  validateContactForm()
  smoothScroll()
  
  // 如果是首页，初始化单页应用
  if (window.location.pathname.endsWith('index.html') || 
      window.location.pathname === '/' || 
      window.location.pathname.endsWith('/')) {
    // 初始化页面内容
    const pageContent = document.getElementById('page-content')
    if (pageContent) {
      // 保存首页原始内容
      const originalContent = pageContent.innerHTML
      
      // 监听浏览器前进后退按钮
      window.addEventListener('popstate', function() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html'
        if (currentPage === 'index.html' || currentPage === '') {
          // 如果是首页，显示原始内容
          pageContent.innerHTML = originalContent
        } else {
          // 加载其他页面
          loadPage(currentPage)
        }
      })
    }
  }
})

// 窗口大小改变时关闭移动端菜单
window.addEventListener('resize', function() {
  const navLinks = document.querySelector('.nav-links')
  if (navLinks && window.innerWidth > 768) {
    navLinks.classList.remove('active')
  }
})