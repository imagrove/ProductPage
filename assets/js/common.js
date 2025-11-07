// 通用JavaScript功能文件

// 组件加载函数
function loadComponent(url, targetId) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.text()
    })
    .then(data => {
      document.getElementById(targetId).innerHTML = data
      return data // 返回数据以便链式调用
    })
    .catch(error => {
      console.error(`Error loading component ${url}:`, error)
      throw error // 重新抛出错误以便链式调用
    })
}

// 加载所有共享组件
function loadSharedComponents() {
  // 加载导航栏
  if (document.getElementById('navbar-placeholder')) {
    loadComponent('components/navbar.html', 'navbar-placeholder').then(() => {
      // 导航栏加载完成后，初始化移动端菜单功能
      initMobileMenu()
    })
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

// 初始化移动端菜单功能
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger')
  const navLinks = document.querySelector('.nav-links')
  
  if (hamburger && navLinks) {
    // 确保汉堡按钮有正确的点击事件
    hamburger.onclick = toggleMenu
    
    // 为移动端菜单链接添加点击事件，点击后关闭菜单
    const mobileLinks = navLinks.querySelectorAll('a')
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        // 在移动端，点击链接后关闭菜单
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active')
          document.removeEventListener('click', closeMenuOnOutsideClick)
        }
      })
    })
  }
}

// 导航菜单切换功能
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links')
  if (navLinks) {
    navLinks.classList.toggle('active')
    
    // 添加点击外部关闭菜单的功能
    if (navLinks.classList.contains('active')) {
      // 添加点击事件监听器，点击菜单外部关闭菜单
      document.addEventListener('click', closeMenuOnOutsideClick)
    } else {
      // 移除点击事件监听器
      document.removeEventListener('click', closeMenuOnOutsideClick)
    }
  }
}

// 点击菜单外部关闭菜单
function closeMenuOnOutsideClick(event) {
  const navLinks = document.querySelector('.nav-links')
  const hamburger = document.querySelector('.hamburger')
  
  // 如果点击的不是菜单链接或汉堡按钮，则关闭菜单
  if (navLinks && hamburger && 
      !navLinks.contains(event.target) && 
      !hamburger.contains(event.target)) {
    navLinks.classList.remove('active')
    document.removeEventListener('click', closeMenuOnOutsideClick)
  }
}

// 导航栏激活状态管理
function setActiveNavLink() {
  // 获取当前页面路径
  let currentPage = window.location.pathname.split('/').pop()
  
  // 处理各种路径情况
  if (!currentPage || currentPage === '' || currentPage === 'index.html') {
    currentPage = 'index.html'
  }
  
  const navLinks = document.querySelectorAll('.nav-links a')
  
  console.log('当前页面路径:', window.location.pathname)
  console.log('当前页面:', currentPage)
  
  navLinks.forEach(link => {
    // 移除所有激活状态
    link.classList.remove('active')
    
    // 根据当前页面设置激活状态
    const href = link.getAttribute('href')
    console.log('检查链接:', href)
    
    // 精确匹配页面路径
    if (href === currentPage) {
      link.classList.add('active')
      console.log('✅ 激活标签:', href)
    } else {
      console.log('❌ 不匹配:', href, 'vs', currentPage)
    }
  })
  
  console.log('激活状态设置完成')
}

// 为导航栏链接添加点击事件（已移除，让浏览器正常处理页面跳转）
function setupNavLinkClickEvents() {
  // 不再需要点击事件处理，让浏览器正常跳转页面
  // 激活状态会在页面加载时通过 setActiveNavLink() 正确设置
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
  // 立即加载共享组件
  loadSharedComponents()
  
  // 立即执行其他功能
  validateContactForm()
  smoothScroll()
  
  // 延迟设置导航栏激活状态，确保导航栏组件已加载
  setTimeout(() => {
    setActiveNavLink()
  }, 100)
  
  // 再次延迟检查，确保激活状态正确应用
  setTimeout(() => {
    setActiveNavLink()
  }, 500)
})

// 窗口大小改变时关闭移动端菜单
window.addEventListener('resize', function() {
  const navLinks = document.querySelector('.nav-links')
  if (navLinks && window.innerWidth > 768) {
    navLinks.classList.remove('active')
  }
})