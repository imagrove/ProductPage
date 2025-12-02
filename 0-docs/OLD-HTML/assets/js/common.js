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
      console.log('导航栏组件加载完成')
      // 导航栏加载完成后，不再在这里初始化移动端菜单
      // 将由各页面的initNavbar()统一处理
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
  console.log('初始化移动端菜单...')
  
  const hamburger = document.querySelector('.hamburger')
  const navLinks = document.querySelector('.nav-links')
  
  console.log('汉堡按钮:', hamburger)
  console.log('导航链接:', navLinks)
  console.log('当前窗口宽度:', window.innerWidth)
  
  if (hamburger && navLinks) {
    // 检查是否已经初始化过
    if (hamburger.dataset.mobileMenuInitialized === 'true') {
      console.log('移动端菜单已初始化，跳过重复初始化')
      return
    }
    
    // 确保汉堡按钮有正确的点击事件
    hamburger.addEventListener('click', function(e) {
      console.log('汉堡按钮点击事件触发！', e)
      toggleMenu(e)
    })
    console.log('汉堡按钮点击事件已绑定')
    
    // 为移动端菜单链接添加点击事件，点击后关闭菜单
    const mobileLinks = navLinks.querySelectorAll('a')
    mobileLinks.forEach(link => {
      link.addEventListener('click', handleMobileLinkClick)
    })
    console.log('移动端菜单链接事件已绑定，链接数量:', mobileLinks.length)
    
    // 标记为已初始化
    hamburger.dataset.mobileMenuInitialized = 'true'
    
    // 立即测试汉堡按钮是否可点击
    console.log('汉堡按钮样式:', window.getComputedStyle(hamburger))
    console.log('汉堡按钮是否可见:', hamburger.offsetParent !== null)
    console.log('汉堡按钮是否可点击:', hamburger.style.pointerEvents !== 'none')
    console.log('汉堡按钮计算样式 - display:', window.getComputedStyle(hamburger).display)
    console.log('汉堡按钮计算样式 - cursor:', window.getComputedStyle(hamburger).cursor)
  } else {
    console.warn('汉堡按钮或导航链接未找到，将在100ms后重试')
    setTimeout(initMobileMenu, 100)
  }
}

// 移动端菜单链接点击处理函数
function handleMobileLinkClick() {
  const navLinks = document.querySelector('.nav-links')
  // 在移动端，点击链接后关闭菜单
  if (window.innerWidth <= 768 && navLinks) {
    navLinks.classList.remove('active')
    document.removeEventListener('click', closeMenuOnOutsideClick)
    console.log('移动端菜单链接点击，关闭菜单')
  }
}

// 导航菜单切换功能
function toggleMenu(event) {
  console.log('汉堡按钮被点击了！', event)
  console.log('事件目标:', event.target)
  console.log('当前窗口宽度:', window.innerWidth)
  
  const navLinks = document.querySelector('.nav-links')
  const hamburger = document.querySelector('.hamburger')
  
  console.log('当前导航链接元素:', navLinks)
  console.log('汉堡按钮元素:', hamburger)
  console.log('汉堡按钮计算样式:', window.getComputedStyle(hamburger))
  
  if (navLinks) {
    const wasActive = navLinks.classList.contains('active')
    console.log('切换菜单状态，当前状态:', wasActive)
    
    navLinks.classList.toggle('active')
    const isActive = navLinks.classList.contains('active')
    console.log('切换后状态:', isActive)
    
    // 获取导航链接的计算样式
    const navLinksStyle = window.getComputedStyle(navLinks)
    console.log('导航链接计算样式 - left:', navLinksStyle.left)
    console.log('导航链接计算样式 - z-index:', navLinksStyle.zIndex)
    console.log('导航链接计算样式 - position:', navLinksStyle.position)
    
    // 添加点击外部关闭菜单的功能
    if (isActive) {
      // 直接通过JavaScript设置z-index，确保样式正确应用
      navLinks.style.zIndex = '998'
      // 强制设置top值，确保菜单显示在导航栏下方
      navLinks.style.setProperty('top', '80px', 'important')
      // 使用transform作为备用方案，确保菜单显示在正确位置
      navLinks.style.setProperty('transform', 'translateY(0)', 'important')
      console.log('菜单已展开，添加外部点击监听器')
      // 添加点击事件监听器，点击菜单外部关闭菜单
      document.addEventListener('click', closeMenuOnOutsideClick)
      
      // 延迟检查z-index是否正确应用
      setTimeout(() => {
        const updatedStyle = window.getComputedStyle(navLinks)
        console.log('更新后的导航链接z-index:', updatedStyle.zIndex)
        console.log('更新后的导航链接display:', updatedStyle.display)
        console.log('更新后的导航链接visibility:', updatedStyle.visibility)
        console.log('更新后的导航链接opacity:', updatedStyle.opacity)
        console.log('更新后的导航链接width:', updatedStyle.width)
        console.log('更新后的导航链接height:', updatedStyle.height)
        console.log('更新后的导航链接top:', updatedStyle.top)
        console.log('更新后的导航链接background-color:', updatedStyle.backgroundColor)
        
        // 检查元素的实际尺寸和位置
        const rect = navLinks.getBoundingClientRect()
        console.log('导航链接元素尺寸和位置:', {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom
        })
      }, 100)
    } else {
      navLinks.style.zIndex = ''
      console.log('菜单已收起，移除外部点击监听器')
      // 移除点击事件监听器
      document.removeEventListener('click', closeMenuOnOutsideClick)
    }
  } else {
    console.error('导航链接元素未找到！')
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

// 页面加载完成后执行 - 只执行不依赖组件加载的功能
window.addEventListener('DOMContentLoaded', function() {
  // 立即执行其他功能
  validateContactForm()
  smoothScroll()
  
  // 注意：loadSharedComponents()现在由各页面自己管理
  // 导航栏激活状态设置也由各页面在组件加载完成后调用
})

// 窗口大小改变时关闭移动端菜单
window.addEventListener('resize', function() {
  const navLinks = document.querySelector('.nav-links')
  if (navLinks && window.innerWidth > 768) {
    navLinks.classList.remove('active')
  }
})


// 统一的导航栏初始化函数
function initNavbar() {
  console.log('开始初始化导航栏...');
  
  // 检查导航栏是否已加载
  const checkNavbarLoaded = function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    console.log('检查导航栏加载状态...');
    console.log('汉堡按钮:', hamburger);
    console.log('导航链接:', navLinks);
    
    if (hamburger && navLinks) {
      console.log('导航栏已加载完成，初始化导航栏功能');
      
      // 先设置导航栏激活状态
      if (typeof setActiveNavLink === "function") {
        console.log('调用setActiveNavLink函数...');
        setActiveNavLink();
      } else {
        console.error('setActiveNavLink函数未定义！');
      }
      
      // 然后初始化移动端菜单
      if (typeof initMobileMenu === "function") {
        console.log('调用initMobileMenu函数...');
        initMobileMenu();
      } else {
        console.error('initMobileMenu函数未定义！');
      }
      
      return true;
    } else {
      console.log('导航栏未完全加载，100ms后重试');
      return false;
    }
  };
  
  // 延迟启动检查，给组件加载留出时间
  setTimeout(() => {
    if (!checkNavbarLoaded()) {
      // 如果第一次检查没找到，继续检查
      const checkInterval = setInterval(() => {
        if (checkNavbarLoaded()) {
          clearInterval(checkInterval);
        }
      }, 100);
      
      // 最多检查5秒
      setTimeout(() => clearInterval(checkInterval), 5000);
    }
  }, 300);
}

// 修复移动端菜单点击不显示的问题
function fixMobileMenu() {
  console.log('尝试修复移动端菜单...');
  
  // 确保在DOM完全加载后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    // DOM已经加载完成，直接执行
    initMobileMenu();
  }
}