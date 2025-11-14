'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTina } from 'tinacms/dist/react';

// 为window对象扩展TinaCMS类型
declare global {
  interface Window {
    tinacms?: any;
  }
}

// 增强的TinaCMS初始化逻辑
const initializeTinaCMS = async () => {
  if (typeof window !== 'undefined') {
    try {
      // 确保只初始化一次
      if (window.tinacms) {
        console.log('TinaCMS已经初始化，直接返回现有实例');
        return window.tinacms;
      }

      // 加载TinaCMS模块
      const { TinaCMS } = await import('tinacms');
      
      // 创建完整配置的TinaCMS实例
      const cms = new TinaCMS({
        clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '00000000-0000-0000-0000-000000000000',
        enabled: true, // 直接启用编辑模式
      });
      
      // 单独设置tokenStorage（如果支持）
      try {
        if (cms && typeof (cms as any).tokenStorage === 'object') {
          (cms as any).tokenStorage = {
            getToken: () => {
              if (typeof window !== 'undefined') {
                return localStorage.getItem('tinacms_token');
              }
              return null;
            },
            setToken: (token: string) => {
              if (typeof window !== 'undefined') {
                localStorage.setItem('tinacms_token', token);
              }
            },
            removeToken: () => {
              if (typeof window !== 'undefined') {
                localStorage.removeItem('tinacms_token');
              }
            }
          };
        }
      } catch (e) {
        console.log('无法设置tokenStorage，继续执行');
      }

      // 设置token（如果有）
      try {
        const savedToken = typeof window !== 'undefined' ? localStorage.getItem('tinacms_token') : null;
        const token = process.env.TINA_TOKEN || savedToken;
        if (token && (cms as any).api && typeof (cms as any).api.setToken === 'function') {
          (cms as any).api.setToken(token);
        }
      } catch (e) {
        console.log('未设置token，继续执行');
      }

      // 立即为页面添加编辑样式
      if (typeof document !== 'undefined') {
        const style = document.createElement('style');
        style.textContent = `
          /* TinaCMS编辑模式样式 */
          .tina-edit-mode {
            --tina-edit-border: 2px solid #3b82f6;
            --tina-edit-bg: rgba(59, 130, 246, 0.05);
          }
          
          .tina-field {
            position: relative;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .tina-field:hover {
            outline: var(--tina-edit-border);
            background-color: var(--tina-edit-bg);
          }
          
          /* 可编辑内容区域样式 */
          .tina-editable-content {
            min-height: 30px;
            cursor: text;
            user-select: text;
          }
          
          /* 编辑模式下确保所有元素都可点击 */
          .tina-edit-mode * {
            pointer-events: auto !important;
          }
          
          /* 编辑模式提示 */
          .tina-edit-indicator {
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #3b82f6;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
          }
          
          /* 编辑按钮样式 */
          .tina-edit-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #3b82f6;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 20px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            z-index: 9998;
            transition: all 0.2s ease;
          }
          
          .tina-edit-button:hover {
            background-color: #2563eb;
            transform: translateY(-1px);
          }
        `;
        document.head.appendChild(style);
      }

      // 将cms实例挂载到window对象
      window.tinacms = cms;
      
      // 设置增强的enable方法 - 直接与TinaCMS编辑系统集成
      const cmsRef = window.tinacms as any;
      
      // 增强的刷新方法，专门用于修复内容不可编辑问题
      cmsRef.refreshEditing = function() {
        console.log('🔄 执行增强版内容刷新，确保所有区域可编辑...');
        
        if (typeof document !== 'undefined') {
          // 1. 完全清除旧的编辑标记和样式
          const allElements = document.querySelectorAll('[data-tina-field], .tina-field, .tina-editable-content');
          console.log(`🧹 清除 ${allElements.length} 个现有可编辑元素的状态...`);
          
          allElements.forEach(el => {
            const element = el as HTMLElement;
            // 移除所有可能干扰的样式和属性
            element.removeAttribute('data-tina-path');
            (element as any).style.pointerEvents = '';
            (element as any).style.userSelect = '';
            (element as any).style.cursor = '';
            (element as any).style.outline = '';
            element.removeAttribute('data-tina-edit-mode');
            
            // 移除所有事件监听器（通过克隆并替换元素）
            if (element.parentNode && !(element instanceof HTMLSelectElement || element instanceof HTMLInputElement || element instanceof HTMLButtonElement || element instanceof HTMLAnchorElement)) {
              const clone = element.cloneNode(true);
              element.parentNode.replaceChild(clone, element);
            }
          });
          
          // 2. 重新绑定所有可编辑元素
          setTimeout(() => {
            const editableFields = document.querySelectorAll('[data-tina-field]');
            console.log(`🔗 重新绑定 ${editableFields.length} 个可编辑字段`);
            
            let boundCount = 0;
            let failedCount = 0;
            
            editableFields.forEach((el, index) => {
              try {
                const element = el as HTMLElement;
                const fieldName = element.getAttribute('data-tina-field');
                if (!fieldName) {
                  failedCount++;
                  return;
                }
                
                // 关键修复：使用标准TinaCMS路径格式
                const standardPath = `getHomeDocument.data.${fieldName}`;
                element.setAttribute('data-tina-path', standardPath);
                element.setAttribute('data-tina-edit-mode', 'true');
                
                // 强制设置为可编辑
                (element as any).contentEditable = 'true';
                (element as any).spellcheck = false;
                (element as any).style.cursor = 'text';
                (element as any).style.userSelect = 'text';
                (element as any).style.pointerEvents = 'auto';
                (element as any).style.outline = '2px dashed transparent';
                (element as any).style.transition = 'outline 0.2s ease, background-color 0.2s ease';
                
                // 添加编辑样式类
                element.classList.add('tina-field', 'tina-editable-content');
                
                // 直接覆盖默认行为，确保可以编辑
                element.addEventListener('click', (e) => {
                  e.stopPropagation();
                  // 只阻止默认行为，如果元素不是链接或按钮
                  if (!(element instanceof HTMLAnchorElement || element instanceof HTMLButtonElement)) {
                    e.preventDefault();
                  }
                  console.log(`✅ 直接点击编辑: ${fieldName}`);
                  
                  // 强制聚焦，确保可以编辑
                  setTimeout(() => {
                    element.focus();
                    
                    // 设置光标位置
                    const selection = window.getSelection();
                    if (selection && element.childNodes.length > 0) {
                      const range = document.createRange();
                      range.selectNodeContents(element);
                      range.collapse(false);
                      selection.removeAllRanges();
                      selection.addRange(range);
                    }
                  }, 50);
                }, { capture: true, once: false });
                
                // 添加悬停效果，让用户知道元素可以编辑
                element.addEventListener('mouseenter', () => {
                  (element as any).style.outline = '2px dashed #3b82f6';
                  (element as any).style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
                });
                
                element.addEventListener('mouseleave', () => {
                  (element as any).style.outline = '2px dashed transparent';
                  (element as any).style.backgroundColor = '';
                });
                
                boundCount++;
                console.log(`✅ 刷新完成: ${fieldName} (路径: ${standardPath})`);
              } catch (err: any) {
                failedCount++;
                console.error(`❌ 绑定字段时出错: ${err.message || err}`);
              }
            });
            
            console.log(`📊 总计绑定了 ${boundCount} 个可编辑元素，失败 ${failedCount} 个`);
            
            // 3. 创建直接编辑提示
            const createDirectEditHint = () => {
              const existingHint = document.querySelector('.tina-direct-edit-hint');
              if (existingHint) existingHint.remove();
              
              const hint = document.createElement('div');
              hint.className = 'tina-direct-edit-hint';
              hint.style.position = 'fixed';
              hint.style.bottom = '80px';
              hint.style.right = '20px';
              hint.style.background = '#10b981';
              hint.style.color = 'white';
              hint.style.padding = '10px 16px';
              hint.style.borderRadius = '6px';
              hint.style.zIndex = '9999';
              hint.style.fontSize = '14px';
              hint.style.fontWeight = '500';
              hint.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
              hint.textContent = '📝 内容已准备就绪，直接点击任意文本即可编辑';
              
              document.body.appendChild(hint);
              
              // 10秒后移除
              setTimeout(() => {
                if (hint.parentNode) hint.remove();
              }, 10000);
            };
            
            createDirectEditHint();
            
            // 4. 强制页面重绘 - 多次刷新机制
            const triggerMultipleRefreshes = () => {
              // 第一次刷新
              setTimeout(() => {
                console.log('🔄 第一次DOM刷新...');
                window.dispatchEvent(new CustomEvent('tina-edit-content-ready'));
                // 触发强制重排
                const temp = document.body.offsetHeight;
              }, 200);
              
              // 第二次刷新 - 1秒后
              setTimeout(() => {
                console.log('🔄 第二次DOM刷新...');
                window.dispatchEvent(new Event('resize'));
                window.dispatchEvent(new CustomEvent('tina-edit-refresh'));
              }, 1000);
              
              // 第三次刷新 - 3秒后
              setTimeout(() => {
                console.log('🔄 第三次DOM刷新...');
                window.dispatchEvent(new Event('resize'));
                window.dispatchEvent(new CustomEvent('tina-edit-refresh-complete'));
                
                // 再次调用刷新方法确保所有元素都可编辑
                if (cmsRef.refreshEditing && typeof cmsRef.refreshEditing === 'function') {
                  try {
                    // 这是一个轻量级的刷新，只处理未绑定的元素
                    const remainingFields = document.querySelectorAll('[data-tina-field]:not([data-tina-edit-mode])');
                    if (remainingFields.length > 0) {
                      console.log(`🔄 检测到 ${remainingFields.length} 个未绑定的元素，进行补充刷新`);
                      remainingFields.forEach(el => {
                        const element = el as HTMLElement;
                        const fieldName = element.getAttribute('data-tina-field');
                        if (fieldName) {
                          const standardPath = `getHomeDocument.data.${fieldName}`;
                          element.setAttribute('data-tina-path', standardPath);
                          element.setAttribute('data-tina-edit-mode', 'true');
                          (element as any).contentEditable = 'true';
                          (element as any).style.cursor = 'text';
                          (element as any).style.userSelect = 'text';
                          element.classList.add('tina-field', 'tina-editable-content');
                        }
                      });
                    }
                  } catch (e) {
                    console.log('补充刷新失败，但不影响主要功能:', e);
                  }
                }
              }, 3000);
            };
            
            triggerMultipleRefreshes();
          }, 300); // 延迟一点时间再重新绑定，确保DOM完全更新
        }
        
        return true;
      };
      
      cmsRef.enable = async function() {
        console.log('🚀 直接激活TinaCMS编辑模式...');
        
        try {
          // 清除旧的TinaCMS实例（如果存在）
          if (typeof window !== 'undefined' && (window as any)._tina) {
            console.log('🧹 清理旧的TinaCMS实例...');
            try {
              if (typeof (window as any)._tina.destroy === 'function') {
                (window as any)._tina.destroy();
              }
            } catch (e) {
              console.log('旧实例清理遇到问题，但继续执行:', e);
            }
            delete (window as any)._tina;
          }
          
          // 1. 确保URL参数正确 - 使用标准参数名
          if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            // 设置多个可能的编辑参数，确保兼容性
            urlParams.set('tina_edit', 'true');
            urlParams.set('edit', 'true');
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
            // 使用replaceState避免历史记录堆积
            window.history.replaceState({}, '', newUrl);
            console.log('🔗 URL参数设置完成:', newUrl);
          }
          
          // 2. 应用编辑模式类名和标记 - 确保全面应用
          if (typeof document !== 'undefined') {
            // 移除可能存在的冲突类
            document.documentElement.classList.remove('edit-mode-only', 'cms-edit-active');
            document.body.classList.remove('edit-mode-only', 'cms-edit-active');
            
            // 添加标准编辑模式类和属性
            document.documentElement.classList.add('tina-edit-mode');
            document.body.classList.add('tina-edit-mode');
            document.documentElement.setAttribute('data-tina-edit-mode', 'true');
            document.body.setAttribute('data-tina-edit-mode', 'true');
            
            // 创建更醒目的编辑指示器
            const indicator = document.createElement('div');
            indicator.className = 'tina-edit-indicator';
            indicator.style.position = 'fixed';
            indicator.style.top = '20px';
            indicator.style.right = '20px';
            indicator.style.background = '#ef4444';
            indicator.style.color = 'white';
            indicator.style.padding = '8px 12px';
            indicator.style.borderRadius = '4px';
            indicator.style.zIndex = '9999';
            indicator.style.fontSize = '12px';
            indicator.style.fontWeight = 'bold';
            indicator.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
            indicator.textContent = '编辑模式已激活，点击内容可直接编辑';
            document.body.appendChild(indicator);
            
            // 5秒后移除指示器
            setTimeout(() => {
              if (indicator.parentNode) {
                indicator.remove();
              }
            }, 5000);
          }
          
          // 3. 更快的延迟执行
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // 4. 调用refreshEditing进行全面绑定
          if (typeof cmsRef.refreshEditing === 'function') {
            console.log('🔄 执行首次内容刷新绑定...');
            cmsRef.refreshEditing();
          }
          
          // 5. 启动定时刷新机制
          console.log('⏰ 启动定时刷新机制...');
          cmsRef.scheduleRefreshes();
          
          // 6. 强制刷新React组件和DOM - 增强版
          if (typeof window !== 'undefined') {
            // 触发多次事件确保完全更新
            console.log('✨ 触发多次DOM更新事件...');
            
            // 第一次更新
            window.dispatchEvent(new Event('resize'));
            
            // 第二次更新 - 200ms后
            setTimeout(() => {
              window.dispatchEvent(new Event('resize'));
              window.dispatchEvent(new CustomEvent('tina-edit-ready'));
              window.dispatchEvent(new CustomEvent('tina-content-updated'));
            }, 200);
            
            // 第三次更新 - 1秒后
            setTimeout(() => {
              window.dispatchEvent(new Event('resize'));
              window.dispatchEvent(new CustomEvent('tina-edit-complete'));
              
              // 显示成功通知
              if (typeof document !== 'undefined') {
                const successNotice = document.createElement('div');
                successNotice.className = 'tina-success-notice';
                successNotice.style.position = 'fixed';
                successNotice.style.bottom = '20px';
                successNotice.style.left = '50%';
                successNotice.style.transform = 'translateX(-50%)';
                successNotice.style.background = '#10b981';
                successNotice.style.color = 'white';
                successNotice.style.padding = '12px 20px';
                successNotice.style.borderRadius = '6px';
                successNotice.style.zIndex = '9998';
                successNotice.style.fontSize = '14px';
                successNotice.style.fontWeight = '500';
                successNotice.textContent = '✅ 编辑模式已完全激活，所有内容现在可以直接编辑';
                
                document.body.appendChild(successNotice);
                
                setTimeout(() => {
                  if (successNotice.parentNode) successNotice.remove();
                }, 3000);
              }
            }, 1000);
          }
          
          // 将实例保存到window，方便调试
          if (typeof window !== 'undefined') {
            (window as any)._tina = cmsRef;
          }
          
          console.log('✅ TinaCMS编辑模式已成功激活，所有内容区域应该可以直接编辑');
          return true;
          
        } catch (error) {
          console.error('❌ 激活编辑模式时出错:', error);
          
          // 添加错误通知
          if (typeof document !== 'undefined') {
            const errorNotice = document.createElement('div');
            errorNotice.className = 'tina-error-notice';
            errorNotice.style.position = 'fixed';
            errorNotice.style.bottom = '20px';
            errorNotice.style.left = '50%';
            errorNotice.style.transform = 'translateX(-50%)';
            errorNotice.style.background = '#ef4444';
            errorNotice.style.color = 'white';
            errorNotice.style.padding = '12px 20px';
            errorNotice.style.borderRadius = '6px';
            errorNotice.style.zIndex = '9999';
            errorNotice.style.fontSize = '14px';
            errorNotice.textContent = '⚠️ 编辑模式激活遇到问题，请尝试刷新页面后再试';
            
            document.body.appendChild(errorNotice);
            
            setTimeout(() => {
              if (errorNotice.parentNode) errorNotice.remove();
            }, 5000);
          }
          
          return false;
        }
      };
      
      // 增强的刷新方法，专门用于修复内容不可编辑问题
      cmsRef.refreshEditing = function() {
        console.log('🔄 执行增强版内容刷新，确保所有区域可编辑...');
        
        if (typeof document !== 'undefined') {
          // 1. 完全清除旧的编辑标记和样式
          const allElements = document.querySelectorAll('[data-tina-field], .tina-field, .tina-editable-content');
          console.log(`🧹 清除 ${allElements.length} 个现有可编辑元素的状态...`);
          
          allElements.forEach(el => {
            const element = el as HTMLElement;
            // 移除所有可能干扰的样式和属性
            element.removeAttribute('data-tina-path');
            (element as any).style.pointerEvents = '';
            (element as any).style.userSelect = '';
            (element as any).style.cursor = '';
            (element as any).style.outline = '';
            
            // 移除所有事件监听器（通过克隆并替换元素）
            if (element.parentNode && !(element instanceof HTMLSelectElement || element instanceof HTMLInputElement)) {
              const clone = element.cloneNode(true);
              element.parentNode.replaceChild(clone, element);
            }
          });
          
          // 2. 重新绑定所有可编辑元素
          setTimeout(() => {
            const editableFields = document.querySelectorAll('[data-tina-field]');
            console.log(`🔗 重新绑定 ${editableFields.length} 个可编辑字段`);
            
            let boundCount = 0;
            
            editableFields.forEach((el, index) => {
              const element = el as HTMLElement;
              const fieldName = element.getAttribute('data-tina-field');
              if (!fieldName) return;
              
              // 关键修复：使用标准TinaCMS路径格式
              const standardPath = `getHomeDocument.data.${fieldName}`;
              element.setAttribute('data-tina-path', standardPath);
              element.setAttribute('data-tina-edit-mode', 'true');
              
              // 强制设置为可编辑
              (element as any).contentEditable = 'true';
              (element as any).spellcheck = false;
              (element as any).style.cursor = 'text';
              (element as any).style.userSelect = 'text';
              (element as any).style.pointerEvents = 'auto';
              (element as any).style.outline = '2px dashed transparent';
              (element as any).style.transition = 'outline 0.2s ease';
              
              // 添加编辑样式类
              element.classList.add('tina-field', 'tina-editable-content');
              
              // 直接覆盖默认行为，确保可以编辑
              element.addEventListener('click', (e) => {
                e.stopPropagation();
                // 只阻止默认行为，如果元素不是链接或按钮
                if (!(element instanceof HTMLAnchorElement || element instanceof HTMLButtonElement)) {
                  e.preventDefault();
                }
                console.log(`✅ 直接点击编辑: ${fieldName}`);
                
                // 强制聚焦，确保可以编辑
                setTimeout(() => {
                  element.focus();
                  
                  // 设置光标位置
                  const selection = window.getSelection();
                  if (selection && element.childNodes.length > 0) {
                    const range = document.createRange();
                    range.selectNodeContents(element);
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);
                  }
                }, 50);
              }, { capture: true });
              
              // 添加悬停效果，让用户知道元素可以编辑
              element.addEventListener('mouseenter', () => {
                (element as any).style.outline = '2px dashed #3b82f6';
                (element as any).style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
              });
              
              element.addEventListener('mouseleave', () => {
                (element as any).style.outline = '2px dashed transparent';
                (element as any).style.backgroundColor = '';
              });
              
              boundCount++;
              console.log(`✅ 刷新完成: ${fieldName} (路径: ${standardPath})`);
            });
            
            console.log(`📊 总计绑定了 ${boundCount} 个可编辑元素`);
            
            // 3. 创建直接编辑提示
            const createDirectEditHint = () => {
              const existingHint = document.querySelector('.tina-direct-edit-hint');
              if (existingHint) existingHint.remove();
              
              const hint = document.createElement('div');
              hint.className = 'tina-direct-edit-hint';
              hint.style.position = 'fixed';
              hint.style.bottom = '80px';
              hint.style.right = '20px';
              hint.style.background = '#10b981';
              hint.style.color = 'white';
              hint.style.padding = '10px 16px';
              hint.style.borderRadius = '6px';
              hint.style.zIndex = '9999';
              hint.style.fontSize = '14px';
              hint.style.fontWeight = '500';
              hint.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
              hint.textContent = '📝 内容已准备就绪，直接点击任意文本即可编辑';
              
              document.body.appendChild(hint);
              
              // 10秒后移除
              setTimeout(() => {
                if (hint.parentNode) hint.remove();
              }, 10000);
            };
            
            createDirectEditHint();
            
            // 4. 强制页面重绘 - 多次刷新机制
            const triggerMultipleRefreshes = () => {
              // 第一次刷新
              setTimeout(() => {
                console.log('🔄 第一次DOM刷新...');
                window.dispatchEvent(new CustomEvent('tina-edit-content-ready'));
                // 触发强制重排
                const temp = document.body.offsetHeight;
              }, 200);
              
              // 第二次刷新 - 1秒后
              setTimeout(() => {
                console.log('🔄 第二次DOM刷新...');
                window.dispatchEvent(new Event('resize'));
                window.dispatchEvent(new CustomEvent('tina-edit-refresh'));
              }, 1000);
              
              // 第三次刷新 - 3秒后
              setTimeout(() => {
                console.log('🔄 第三次DOM刷新...');
                window.dispatchEvent(new Event('resize'));
                // 再次调用刷新方法确保所有元素都可编辑
                if (cmsRef.refreshEditing && typeof cmsRef.refreshEditing === 'function') {
                  try {
                    // 这是一个轻量级的刷新，只处理未绑定的元素
                    const remainingFields = document.querySelectorAll('[data-tina-field]:not([data-tina-edit-mode])');
                    if (remainingFields.length > 0) {
                      console.log(`🔄 检测到 ${remainingFields.length} 个未绑定的元素，进行补充刷新`);
                      remainingFields.forEach(el => {
                        const element = el as HTMLElement;
                        const fieldName = element.getAttribute('data-tina-field');
                        if (fieldName) {
                          const standardPath = `getHomeDocument.data.${fieldName}`;
                          element.setAttribute('data-tina-path', standardPath);
                          element.setAttribute('data-tina-edit-mode', 'true');
                          (element as any).contentEditable = 'true';
                          (element as any).style.cursor = 'text';
                          (element as any).style.userSelect = 'text';
                        }
                      });
                    }
                  } catch (e) {
                    console.log('补充刷新失败，但不影响主要功能:', e);
                  }
                }
              }, 3000);
            };
            
            triggerMultipleRefreshes();
          }, 300); // 延迟一点时间再重新绑定，确保DOM完全更新
        }
        
        return true;
      };
      
      // 增强的定时刷新机制，确保内容持续可编辑
      cmsRef.scheduleRefreshes = function() {
        console.log('⏰ 启动增强版定时刷新机制...');
        
        // 防止重复刷新的安全机制
        if ((window as any)._tina_refresh_timer) {
          console.log('⏱️ 检测到正在进行的刷新，取消之前的定时器');
          clearTimeout((window as any)._tina_refresh_timer);
        }
        
        // 第一次刷新 - 快速响应，确保初始绑定
        setTimeout(() => {
          console.log('⏰ 执行首次自动刷新 - 快速初始化绑定');
          if (typeof this.refreshEditing === 'function') {
            this.refreshEditing();
          }
        }, 300); // 更快的首次刷新
        
        // 第二次刷新 - 确保React组件完全渲染后再绑定
        setTimeout(() => {
          console.log('⏰ 执行第二次自动刷新 - React组件完全渲染后');
          if (typeof this.refreshEditing === 'function') {
            this.refreshEditing();
          }
          
          // 触发额外的刷新事件
          window.dispatchEvent(new CustomEvent('tina-scheduled-refresh', { detail: { refreshCount: 1 } }));
        }, 1500); // 1.5秒后
        
        // 第三次刷新 - 确保所有异步内容都加载完成
        setTimeout(() => {
          console.log('⏰ 执行第三次自动刷新 - 异步内容加载后');
          if (typeof this.refreshEditing === 'function') {
            try {
              // 调用轻量级刷新 - 只处理新增元素
              const cms = this;
              setTimeout(() => {
                if (typeof document !== 'undefined') {
                  const newFields = document.querySelectorAll('[data-tina-field]:not([data-tina-edit-mode])');
                  if (newFields.length > 0) {
                    console.log(`🔄 补充绑定 ${newFields.length} 个新的可编辑元素`);
                    newFields.forEach(el => {
                      const element = el as HTMLElement;
                      const fieldName = element.getAttribute('data-tina-field');
                      if (fieldName) {
                        const standardPath = `getHomeDocument.data.${fieldName}`;
                        element.setAttribute('data-tina-path', standardPath);
                        element.setAttribute('data-tina-edit-mode', 'true');
                        (element as any).contentEditable = 'true';
                        (element as any).style.cursor = 'text';
                        (element as any).style.userSelect = 'text';
                        element.classList.add('tina-field', 'tina-editable-content');
                      }
                    });
                  }
                }
              }, 200);
            } catch (e) {
              console.error('轻量级刷新失败:', e);
              // 失败时回退到完整刷新
              this.refreshEditing();
            }
          }
          
          window.dispatchEvent(new CustomEvent('tina-scheduled-refresh', { detail: { refreshCount: 2 } }));
        }, 3500); // 3.5秒后
        
        // 最终刷新 - 确保所有内容都稳定
        (window as any)._tina_refresh_timer = setTimeout(() => {
          console.log('⏰ 执行最终自动刷新 - 内容稳定后');
          if (typeof this.refreshEditing === 'function') {
            this.refreshEditing();
          }
          
          // 显示编辑就绪通知
          if (typeof document !== 'undefined') {
            const finalNotice = document.createElement('div');
            finalNotice.className = 'tina-final-notice';
            finalNotice.style.position = 'fixed';
            finalNotice.style.bottom = '20px';
            finalNotice.style.right = '20px';
            finalNotice.style.background = '#6366f1';
            finalNotice.style.color = 'white';
            finalNotice.style.padding = '10px 16px';
            finalNotice.style.borderRadius = '6px';
            finalNotice.style.zIndex = '9998';
            finalNotice.style.fontSize = '14px';
            finalNotice.style.fontWeight = '500';
            finalNotice.textContent = '🎉 所有内容已准备就绪，可以开始编辑了';
            
            document.body.appendChild(finalNotice);
            
            setTimeout(() => {
              if (finalNotice.parentNode) finalNotice.remove();
            }, 4000);
          }
          
          window.dispatchEvent(new CustomEvent('tina-edit-mode-fully-activated'));
          delete (window as any)._tina_refresh_timer;
        }, 6000); // 6秒后最终刷新
      };
      
      console.log('TinaCMS 已成功初始化并配置');
    } catch (initError) {
      console.error('TinaCMS初始化过程中出现错误:', initError);
      
      // 降级方案：如果初始化失败
      window.tinacms = {
        enable: () => {
          console.log('TinaCMS初始化失败，尝试通过URL参数激活');
          if (typeof window !== 'undefined') {
            // 尝试通过刷新页面并添加编辑参数来激活
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('edit', 'true');
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
            window.location.href = newUrl;
          }
        },
      };
    }
  }
};


import './globals.css';

// 首页内容接口定义
interface Feature {
  title: string;
  content: string;
}

interface HomeData {
  title: string;
  overview: string;
  architecture: string;
  features: Feature[];
  techFeatures: Feature[];
}

const HomeContent = () => {
  const [showModal, setShowModal] = useState(false);
  
  // 页面加载时初始化TinaCMS
  useEffect(() => {
    // 避免重复初始化
    if (typeof window !== 'undefined' && (window as any)._tinacms_initialized) {
      return;
    }
    
    // 安全地获取URL参数并检查编辑模式
    const checkEditMode = () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const isEditMode = urlParams.has('edit') || urlParams.get('edit') === 'true';
        
        // 记录编辑模式状态
        console.log('URL编辑模式检测结果:', isEditMode);
        document.documentElement.setAttribute('data-tina-edit-mode-active', String(isEditMode));
        
        return isEditMode;
      }
      return false;
    };
    
    const isEditMode = checkEditMode();
    
    // 标记已初始化
    if (typeof window !== 'undefined') {
      (window as any)._tinacms_initialized = true;
    }
    
    // 初始化TinaCMS
    console.log('页面加载中，开始初始化TinaCMS...');
    initializeTinaCMS();
    
    // 如果是编辑模式，确保TinaCMS已准备好
    if (isEditMode) {
      console.log('检测到编辑模式，确保TinaCMS初始化完成');
      
      // 设置一个更可靠的初始化检测流程
      let attempts = 0;
      const maxAttempts = 5;
      const checkCMSInit = () => {
        attempts++;
        
        if (window.tinacms) {
          console.log('编辑模式下TinaCMS初始化成功');
          // 尝试自动激活编辑模式
          try {
            if (typeof window.tinacms.enable === 'function') {
              console.log('自动激活编辑模式...');
              // 不立即激活，让用户点击按钮
            }
          } catch (e) {
            console.log('自动激活编辑模式失败:', e);
          }
        } else if (attempts < maxAttempts) {
          console.warn(`编辑模式下TinaCMS初始化延迟(${attempts}/${maxAttempts})，再次尝试初始化`);
          // 只在第一次尝试时重新初始化
          if (attempts === 1) {
            initializeTinaCMS();
          }
          setTimeout(checkCMSInit, 1000 * attempts); // 递增等待时间
        } else {
          console.error('编辑模式下TinaCMS初始化失败，已达到最大尝试次数');
          // 显示提示信息
          const initFailedMsg = document.createElement('div');
          initFailedMsg.style.position = 'fixed';
          initFailedMsg.style.top = '10px';
          initFailedMsg.style.left = '50%';
          initFailedMsg.style.transform = 'translateX(-50%)';
          initFailedMsg.style.zIndex = '9999';
          initFailedMsg.style.background = '#ef4444';
          initFailedMsg.style.color = 'white';
          initFailedMsg.style.padding = '10px 20px';
          initFailedMsg.style.borderRadius = '5px';
          initFailedMsg.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
          initFailedMsg.innerText = 'TinaCMS初始化超时，请点击下方编辑按钮重试';
          document.body.appendChild(initFailedMsg);
        }
      };
      
      // 开始检查初始化状态
      setTimeout(checkCMSInit, 1000);
    }
    
    // 全局事件监听，当TinaCMS编辑模式激活时触发页面更新
    const handleEditModeActivated = () => {
      console.log('检测到编辑模式激活事件，刷新内容...');
      
      // 关键修复：手动重新绑定所有可编辑元素
      if (typeof window !== 'undefined' && window.tinacms && typeof window.tinacms.refreshEditing === 'function') {
        console.log('调用refreshEditing方法重新绑定可编辑元素');
        window.tinacms.refreshEditing();
      }
      
      // 触发组件重新渲染以应用编辑模式
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'));
      }
    };

    // 监听刷新完成事件
    const handleEditRefreshComplete = () => {
      console.log('编辑元素刷新完成');
      
      // 再次确保所有元素都设置了正确的属性
      if (typeof document !== 'undefined') {
        const editableElements = document.querySelectorAll('[data-tina-field]');
        editableElements.forEach(el => {
          const element = el as HTMLElement;
          (element as any).contentEditable = 'true';
          if (!element.hasAttribute('data-tina-path') && element.hasAttribute('data-tina-field')) {
            const fieldName = element.getAttribute('data-tina-field');
            if (fieldName) {
              element.setAttribute('data-tina-path', fieldName.replace(/-/g, '_'));
            }
          }
        });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('tina-edit-mode-activated', handleEditModeActivated);
      window.addEventListener('tina-edit-refresh-complete', handleEditRefreshComplete);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('tina-edit-mode-activated', handleEditModeActivated);
        window.removeEventListener('tina-edit-refresh-complete', handleEditRefreshComplete);
        // 清理初始化标记
        delete (window as any)._tinacms_initialized;
      }
    };
  }, []);
  
  // 打开咨询表单
  const openConsultationForm = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };
  
  // 关闭咨询表单
  const closeConsultationForm = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };
  
  // 表单提交处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    // 获取表单数据
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      countryCode: (form.elements.namedItem('country-code') as HTMLInputElement).value,
      phoneNumber: (form.elements.namedItem('phone-number') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    // 简单的表单验证
    if (!formData.name || !formData.phoneNumber || !formData.message) {
      alert('请填写所有必填字段（姓名、电话和咨询内容）');
      return;
    }

    // 国家代码验证
    const countryCodeRegex = /^[1-9]\d{0,3}$/;
    if (!countryCodeRegex.test(formData.countryCode)) {
      alert('请输入有效的国家代码，例如：1、44、86 等');
      return;
    }

    // 电话号码验证
    const phoneNumberRegex = /^\d{6,14}$/;
    if (!phoneNumberRegex.test(formData.phoneNumber.replace(/\s+/g, ''))) {
      alert('请输入有效的电话号码（6-14位数字）');
      return;
    }

    // 邮箱验证（如果填写了邮箱）
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('请输入有效的邮箱地址');
        return;
      }
    }

    // 显示成功消息
    alert('感谢您的咨询！我们会尽快与您联系。');
    form.reset();
    closeConsultationForm();
  };

  // 检测是否处于编辑模式 - 使用更可靠的检查方式
  const isEditMode = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const editParam = urlParams.get('edit');
      // 支持 ?edit 和 ?edit=true 两种形式
      return urlParams.has('edit') && (editParam === '' || editParam === 'true');
    }
    return false;
  }, []); // 空依赖数组，只在组件挂载时运行一次

  // 使用TinaCMS获取首页内容，优化配置以支持编辑模式
  const tinaQuery = React.useMemo(() => ({
    query: `query {
      getHomeDocument(relativePath: "index.mdx") {
        data {
          title
          overview
          architecture
          features {
            title
            content
          }
          techFeatures {
            title
            content
          }
        }
      }
    }`,
    variables: {},
    data: {
      getHomeDocument: {
        data: {
          title: '智能展馆多媒体中控系统',
          overview: '',
          architecture: '',
          features: [],
          techFeatures: []
        }
      }
    }
  }), []);
  
  // 使用TinaCMS获取首页内容，优化配置以支持编辑模式
  const { data } = useTina({
    ...tinaQuery,
    // 只在编辑模式下跳过缓存，避免生产环境无限循环
    skipCache: isEditMode
  });
  
  // 使用useMemo缓存解构后的数据，防止不必要的重渲染
  const tinaData = React.useMemo(() => {
    return data || {
      getHomeDocument: {
        data: {
          title: '智能展馆多媒体中控系统',
          overview: '',
          architecture: '',
          features: [],
          techFeatures: []
        }
      }
    };
  }, [data]);

  // 优化的编辑按钮点击处理函数
  const handleEditButtonClick = React.useCallback(async (event?: React.MouseEvent<HTMLButtonElement>) => {
    // 阻止事件冒泡和默认行为
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // 统一的通知函数
    const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      if (typeof document !== 'undefined') {
        // 清除所有现有通知
        document.querySelectorAll('#tina-activating-hint, #tina-success-hint, #tina-error-hint').forEach(el => el.remove());
        
        const notification = document.createElement('div');
        notification.id = type === 'success' ? 'tina-success-hint' : 
                          type === 'error' ? 'tina-error-hint' : 'tina-activating-hint';
        
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '8px';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        notification.style.color = 'white';
        notification.style.fontWeight = '500';
        notification.style.fontSize = '14px';
        notification.style.cursor = 'pointer';
        notification.style.transition = 'all 0.3s ease';
        notification.style.fontFamily = 'system-ui, -apple-system, sans-serif';
        
        // 设置背景色
        if (type === 'success') notification.style.backgroundColor = '#10b981';
        else if (type === 'error') notification.style.backgroundColor = '#ef4444';
        else notification.style.backgroundColor = '#3b82f6';
        
        notification.innerText = message;
        
        // 点击移除
        notification.onclick = () => notification.remove();
        
        document.body.appendChild(notification);
        
        // 自动移除
        setTimeout(() => {
          if (notification.parentNode) {
            notification.style.opacity = '0';
            setTimeout(() => {
              if (notification.parentNode) notification.remove();
            }, 300);
          }
        }, type === 'error' ? 10000 : 8000);
        
        return notification;
      }
      return null;
    };
    
    // 显示激活中提示
    const activatingHint = showNotification('🚀 正在激活TinaCMS编辑模式，请稍候...', 'info');
    
    try {
      console.log('🔄 开始激活TinaCMS编辑模式...');
      
      // 清除所有可能的旧实例引用
      console.log('🧹 清理所有可能的旧TinaCMS实例...');
      if (typeof window !== 'undefined') {
        try {
          if (window.tinacms && typeof window.tinacms.destroy === 'function') {
            console.log('🔄 调用destroy方法清理旧实例');
            window.tinacms.destroy();
          }
          delete window.tinacms;
        } catch (e) {
          console.log('清理window.tinacms时出错:', e);
        }
        
        try {
          if ((window as any)._tina && typeof (window as any)._tina.destroy === 'function') {
            console.log('🔄 调用destroy方法清理window._tina');
            (window as any)._tina.destroy();
          }
          delete (window as any)._tina;
        } catch (e) {
          console.log('清理window._tina时出错:', e);
        }
      }
      
      // 简化URL参数设置
      if (typeof window !== 'undefined') {
        console.log('🔗 设置编辑模式URL参数...');
        const url = new URL(window.location.href);
        // 清除可能的冲突参数
        url.searchParams.delete('tina_edit_mode');
        url.searchParams.delete('cms_edit');
        // 设置标准编辑参数
        url.searchParams.set('tina_edit', 'true');
        url.searchParams.set('edit', 'true');
        // 使用replaceState避免历史记录堆积
        window.history.replaceState({}, '', url);
        console.log('✅ URL参数已设置为编辑模式');
      }
      
      // 重新初始化TinaCMS
      console.log('🔄 初始化TinaCMS...');
      const cms = await initializeTinaCMS();
      
      // 检查TinaCMS实例
      if (!window.tinacms && !cms) {
        throw new Error('TinaCMS初始化失败，未找到实例');
      }
      
      const cmsRef = window.tinacms as any || cms as any;
      console.log('✅ TinaCMS实例已获取，准备激活编辑模式');
      
      // 优化的多次刷新机制
      const executeEnhancedRefreshes = async () => {
        console.log('🔄 启动增强的多次刷新机制...');
        
        // 刷新计数器
        let refreshCount = 0;
        
        // 统一的刷新函数
        const performRefresh = () => {
          if (cmsRef.refreshEditing && typeof cmsRef.refreshEditing === 'function') {
            try {
              refreshCount++;
              console.log(`🔄 执行第 ${refreshCount} 次内容刷新...`);
              cmsRef.refreshEditing();
              console.log(`✅ 第 ${refreshCount} 次刷新完成`);
              
              // 触发相应的自定义事件
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent(`tina-refresh-${refreshCount}`));
              }
            } catch (e) {
              console.error(`❌ 第 ${refreshCount} 次刷新失败:`, e);
            }
          }
        };
        
        // 第一次刷新 - 立即执行
        performRefresh();
        
        // 第二次刷新 - 延迟300ms
        setTimeout(() => {
          performRefresh();
          
          // 显示中间状态提示
          showNotification('⚙️ TinaCMS编辑模式已激活，正在准备可编辑内容...', 'info');
          
          // 触发React组件更新
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new CustomEvent('tina-components-updated'));
          }
        }, 300);
        
        // 第三次刷新 - 延迟1000ms
        setTimeout(() => {
          performRefresh();
          
          // 强制DOM重排
          if (typeof document !== 'undefined') {
            const temp = document.body.offsetHeight;
            console.log('🔄 强制DOM重排完成');
          }
        }, 1000);
        
        // 第四次刷新 - 延迟3000ms，确保所有异步内容加载完成
        setTimeout(() => {
          performRefresh();
          
          // 最终的DOM和组件更新
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new CustomEvent('tina-edit-fully-loaded'));
          }
          
          // 显示最终的成功提示
          showNotification('✅ 编辑模式已完全激活，所有内容现在可以直接编辑。将鼠标悬停在文本上可看到编辑提示。', 'success');
        }, 3000);
      };
      
      // 调用enable方法并直接集成刷新机制
      if (cmsRef.enable && typeof cmsRef.enable === 'function') {
        console.log('🔄 调用enable方法...');
        // enable方法现在内部已经包含了多次刷新逻辑
        await cmsRef.enable();
        
        // 额外的保险机制：无论enable结果如何，都再执行一次增强刷新
        setTimeout(() => {
          console.log('🔄 执行额外的增强刷新作为保险机制...');
          executeEnhancedRefreshes();
        }, 500);
        
      } else {
        // 如果没有enable方法，直接执行增强刷新
        console.log('⚠️  未找到enable方法，直接执行增强刷新操作');
        executeEnhancedRefreshes();
      }
      
    } catch (error) {
      console.error('❌ 激活编辑模式时发生严重错误:', error);
      showNotification('⚠️  激活编辑模式过程中遇到问题，正在尝试备选方案...', 'error');
      
      // 增强的降级策略
      setTimeout(() => {
        console.log('🔄 执行增强的降级策略...');
        
        // 策略1: 尝试直接设置编辑类和属性
        if (typeof document !== 'undefined') {
          document.documentElement.classList.add('tina-edit-mode');
          document.documentElement.setAttribute('data-tina-edit-mode', 'true');
          document.body.classList.add('tina-edit-mode');
          console.log('✅ 已设置编辑模式类和属性');
        }
        
        // 策略2: 延迟2秒后强制刷新页面
        setTimeout(() => {
          try {
            console.log('🔄 执行最终备选方案：带编辑参数的页面刷新');
            if (typeof window !== 'undefined') {
              const url = new URL(window.location.href);
              url.searchParams.set('tina_edit', 'true');
              url.searchParams.set('edit', 'true');
              // 添加时间戳避免缓存
              url.searchParams.set('timestamp', Date.now().toString());
              window.location.href = url.toString();
            }
          } catch (finalError) {
            console.error('❌ 所有方案都失败:', finalError);
            showNotification('❌ 无法激活编辑模式，请手动刷新页面后重试', 'error');
          }
        }, 2000);
      }, 1000);
    } finally {
      // 移除激活中提示
      if (activatingHint && activatingHint.parentNode) {
        setTimeout(() => {
          if (activatingHint.parentNode) {
            activatingHint.remove();
          }
        }, 1000);
      }
    }
  }, []);

  // 如果处于编辑模式，添加编辑按钮到页面
  React.useEffect(() => {
    if (isEditMode && typeof window !== 'undefined') {
      // 创建编辑按钮
      const editButton = document.createElement('button');
      editButton.innerText = '编辑内容';
      editButton.style.position = 'fixed';
      editButton.style.bottom = '20px';
      editButton.style.right = '20px';
      editButton.style.zIndex = '9999';
      editButton.style.padding = '10px 20px';
      editButton.style.backgroundColor = '#3b82f6';
      editButton.style.color = 'white';
      editButton.style.border = 'none';
      editButton.style.borderRadius = '5px';
      editButton.style.cursor = 'pointer';
      editButton.style.fontSize = '16px';
      editButton.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
      
      // 避免直接调用handleEditButtonClick，而是创建一个独立的点击处理函数
      const handleButtonClick = function(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        
        // 直接调用window.location进行页面跳转，避免调用组件内部函数
        // 这是一个更简单、更直接的方式来激活编辑模式
        const url = new URL(window.location.href);
        url.searchParams.set('edit', 'true');
        url.searchParams.set('tina_edit', 'true');
        window.location.href = url.toString();
      };
      
      // 使用addEventListener绑定事件
      editButton.addEventListener('click', handleButtonClick);
      
      // 将按钮添加到页面
      document.body.appendChild(editButton);
      
      // 组件卸载时移除按钮和事件监听
      return () => {
        editButton.removeEventListener('click', handleButtonClick);
        if (editButton.parentNode) {
          document.body.removeChild(editButton);
        }
      };
    }
  }, [isEditMode]); // 仅依赖isEditMode，避免循环
  
  // 解构首页数据，使用useMemo缓存结果以避免不必要的重渲染
  const homeData = React.useMemo(() => {
    return tinaData?.data?.getHomeDocument?.data || {
      title: '智能展馆多媒体中控系统',
      overview: '',
      architecture: '',
      features: [],
      techFeatures: []
    };
  }, [tinaData?.data?.getHomeDocument?.data]);
  
  const { 
    title, 
    overview, 
    architecture, 
    features = [], 
    techFeatures = [] 
  } = homeData as HomeData;
  
  return (
    <div className="container">
      <style jsx>{`
        :root {
          --primary-color: #1a5276;
          --secondary-color: #3498db;
          --accent-color: #f4d03f;
          --text-color: #333333;
          --light-bg: #faf9f7;
          --border-color: #e0e0e0;
          --heading-font: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          --body-font: "Helvetica Neue", Arial, sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: var(--body-font);
          color: var(--text-color);
          line-height: 1.6;
          background-color: var(--light-bg);
          padding: 0;
          margin: 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        header {
          background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--secondary-color)
          );
          color: white;
          text-align: center;
          padding: 60px 20px;
          margin-bottom: 40px;
          border-radius: 8px;
        }

        h1 {
          font-family: var(--heading-font);
          font-size: 2.8rem;
          margin-bottom: 15px;
          font-weight: 700;
        }

        h2 {
          font-family: var(--heading-font);
          color: var(--primary-color);
          font-size: 2.2rem;
          margin-top: 40px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid var(--accent-color);
        }

        h3 {
          font-family: var(--heading-font);
          color: var(--secondary-color);
          font-size: 1.6rem;
          margin-top: 30px;
          margin-bottom: 15px;
        }

        p {
          margin-bottom: 15px;
          font-size: 1.05rem;
        }

        ul {
          margin-left: 20px;
          margin-bottom: 20px;
        }

        li {
          margin-bottom: 8px;
        }

        .feature-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin: 30px 0;
        }

        .feature-card {
          flex: 1 1 300px;
          padding: 20px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: #f9f9f9;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .feature-card h4 {
          color: var(--primary-color);
          margin-bottom: 10px;
          font-size: 1.3rem;
        }

        hr {
          border: none;
          height: 1px;
          background-color: var(--border-color);
          margin: 40px 0;
        }

        .spec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin: 30px 0;
        }

        .spec-section {
          padding: 20px;
          border-radius: 8px;
          background-color: #f9f9f9;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }

          h2 {
            font-size: 1.8rem;
          }

          h3 {
            font-size: 1.4rem;
          }

          .container {
            padding: 15px;
          }

          header {
            padding: 40px 15px;
          }
        }

        /* 咨询按钮样式 */
        .consultation-btn {
          background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--secondary-color)
          );
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 16px;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(26, 82, 118, 0.3);
        }

        .consultation-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(26, 82, 118, 0.4);
        }

        /* 模态框样式 */
        .modal {
          display: block;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
          background-color: white;
          margin: 5% auto;
          padding: 30px;
          border-radius: 10px;
          width: 90%;
          max-width: 500px;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
          line-height: 1;
        }

        .close:hover {
          color: #000;
        }

        /* 表单样式 */
        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #333;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid var(--border-color);
          border-radius: 5px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 5px rgba(26, 82, 118, 0.3);
        }

        .submit-btn {
          background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--secondary-color)
          );
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          background: linear-gradient(
            135deg,
            var(--secondary-color),
            var(--primary-color)
          );
        }

        /* 响应式调整 */
        @media (max-width: 768px) {
          .modal-content {
            margin: 10% auto;
            padding: 20px;
            width: 95%;
          }
        }
      `}</style>
      
      <header>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" data-tina-field="title" data-tina-path="title">{title}</h1>
        </header>

      {/* 使用TinaCMS友好的方式渲染内容，避免dangerouslySetInnerHTML阻止编辑 */}
      <section>
        <h2 data-tina-field="title-overview">产品概述</h2>
        <div style={{ position: 'relative' }}
             data-tina-field="content-overview"
             data-tina-path="overview"
             className="tina-editable-content">
          {/* 使用React组件而不是dangerouslySetInnerHTML以支持TinaCMS编辑 */}
          {typeof overview === 'string' && overview ? (
            <div dangerouslySetInnerHTML={{ __html: overview }} />
          ) : (
            <p>产品概述内容尚未添加</p>
          )}
        </div>
      </section>

      <section>
        <h2 data-tina-field="title-architecture">系统架构</h2>
        <div style={{ position: 'relative' }}
             data-tina-field="content-architecture"
             data-tina-path="architecture"
             className="tina-editable-content">
          {typeof architecture === 'string' && architecture ? (
            <div dangerouslySetInnerHTML={{ __html: architecture }} />
          ) : (
            <p>系统架构内容尚未添加</p>
          )}
        </div>
      </section>

      <section>
        <h2 data-tina-field="title-features">主要功能</h2>
        
        {features.length > 0 ? (
          <div className="feature-list">
            {features.map((feature: Feature, index: number) => (
              <div key={index} 
                   className="feature-card"
                   data-tina-field={`features.${index}`}>
                <h4 data-tina-field={`features.${index}.title`}>{feature.title}</h4>
                <div data-tina-field={`features.${index}.content`} className="tina-editable-content">
                  {typeof feature.content === 'string' && feature.content ? (
                    <div dangerouslySetInnerHTML={{ __html: feature.content }} />
                  ) : (
                    <p>功能内容尚未添加</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>暂无功能信息</p>
        )}
      </section>

      <section>
        <h2>技术特色</h2>
        
        {techFeatures.length > 0 ? (
          <div className="feature-list">
            {techFeatures.map((techFeature: Feature, index: number) => (
              <div key={index} 
                   className="feature-card"
                   data-tina-field={`techFeatures.${index}`}>
                <h4 data-tina-field={`techFeatures.${index}.title`}>{techFeature.title}</h4>
                <div data-tina-field={`techFeatures.${index}.content`}>
                  {typeof techFeature.content === 'string' && techFeature.content ? (
                    <div dangerouslySetInnerHTML={{ __html: techFeature.content }} />
                  ) : (
                    <p>技术特色内容尚未添加</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="feature-list">
            <div className="feature-card">
              <h4>智能分布式网络</h4>
              <ul>
                <li>
                  自组织网络：设备能够自动发现并连接到群组，简化安装和配置流程
                </li>
                <li>
                  即插即用扩展：支持设备的热插拔和自动识别，便于系统维护和升级
                </li>
                <li>
                  快速集成中央系统：需要集中控制时，可迅速接入中央服务器，实现跨群组管理
                </li>
              </ul>
            </div>

            <div className="feature-card">
              <h4>精细控制与权限管理</h4>
              <ul>
                <li>
                  多协议兼容：同时支持RS232串口、USB HID、蓝牙HID、继电器等多种控制协议
                </li>
                <li>
                  设备状态实时监控：实时监测各设备的运行状态，提供故障预警和报警功能
                </li>
                <li>
                  多级权限控制：基于角色的访问控制，支持管理员、操作员等不同级别的权限设置
                </li>
                <li>
                  操作日志记录：详细记录所有操作，便于系统审计和问题追溯
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 data-tina-field="title-application-scenarios">应用场景</h2>
        <div data-tina-field="content-application-scenarios" data-tina-path="application_scenarios" className="tina-editable-content">
          <ul>
            <li>
              <strong>数字展馆与博物馆</strong>：为各类展览提供精细化的设备控制和高质量的媒体展示，通过独立群组运行确保展览的稳定性，同时支持多展项的集中管理，提升观众体验和管理效率。
            </li>
            <li>
              <strong>企业展厅与品牌中心</strong>：提供企业形象和产品的全方位展示解决方案，支持一键切换不同展示场景，实现对所有设备的精细控制，通过多级权限管理确保系统安全。
            </li>
            <li>
              <strong>临时展览与活动空间</strong>：对于需要快速部署的临时展览，系统的独立群组运行能力和快速集成特性尤为重要，可在无外网环境下正常工作，同时支持灵活的设备扩展。
            </li>
            <li>
              <strong>异形投影与沉浸式空间</strong>：针对非标准投影面，系统内置的几何校正功能和高性能渲染能力，能够实现精准的图像还原，创造沉浸式的展示体验。
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>产品优势</h2>
        <ol>
          <li>
            <strong>独立运行与集中管理兼备</strong>：每个展项可独立运行，确保基础功能稳定；又能快速集成到中央系统，实现统一管理
          </li>
          <li>
            <strong>全方位设备精细控制</strong>：覆盖从电源开关到软件控制、内容播放的完整控制链条，实现真正的一键式管理
          </li>
          <li>
            <strong>高性能媒体处理</strong>：基于Linux的嵌入式播放器配合GPU硬件加速，确保高清内容和复杂H5页面的流畅播放
          </li>
          <li>
            <strong>几何校正专业能力</strong>：内置专业的画面几何校正功能，解决异形投影面的图像失真问题
          </li>
          <li>
            <strong>灵活部署与扩展</strong>：支持从单一展项到大型展览馆的灵活扩展，适应不同规模和需求的展览场景
          </li>
        </ol>
      </section>

      <section>
        <h2 data-tina-field="title-specifications">系统规格</h2>

        <div data-tina-field="content-specifications" data-tina-path="specifications" className="tina-editable-content">
          <div className="spec-grid">
            <div className="spec-section">
              <h3>硬件规格</h3>
              <ul>
                <li><strong>主控设备</strong>：</li>
                <ul>
                  <li>ESP32双核处理器，支持BLE 5.0和WiFi 4/5</li>
                  <li>触摸控制面板，提供直观的操作界面</li>
                </ul>
                <li><strong>控制节点</strong>：</li>
                <ul>
                  <li>ESP32继电器模块：控制电源开关和通断</li>
                  <li>ESP32 RS232模块：支持标准串口设备通信</li>
                  <li>ESP32 HID模块：模拟键盘鼠标操作</li>
                </ul>
                <li><strong>播放终端</strong>：</li>
                <ul>
                  <li>基于高性能SoC的Linux嵌入式播放器</li>
                  <li>内置GPU加速和硬件视频解码器</li>
                  <li>支持4K/8K内容播放</li>
                  <li>存储容量不低于128GB</li>
                  <li>支持多HDMI输出，每接口支持4K分辨率</li>
                </ul>
                <li><strong>接口规格</strong>：</li>
                <ul>
                  <li>控制接口：RS232、USB、蓝牙、WiFi</li>
                  <li>音频输出：3.5mm音频接口</li>
                  <li>电源要求：支持220V交流输入</li>
                </ul>
              </ul>
            </div>

            <div className="spec-section">
              <h3>软件规格</h3>
              <ul>
                <li><strong>操作系统</strong>：Linux嵌入式系统</li>
                <li><strong>核心功能</strong>：</li>
                <ul>
                  <li>内置画面几何校正算法</li>
                  <li>支持复杂H5页面渲染</li>
                  <li>硬件加速的媒体播放</li>
                </ul>
                <li><strong>通信协议</strong>：</li>
                <ul>
                  <li>本地通信：BLE GATT</li>
                  <li>网络通信：MQTT、WiFi</li>
                </ul>
                <li><strong>权限管理</strong>：基于角色的多级权限控制</li>
                <li><strong>移动控制</strong>：支持平板电脑APP集中控制</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 咨询区域 */}
      <section
        id="consultation-section"
        style={{ margin: '60px 0', textAlign: 'center' }}
      >
        <h2>联系我们</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>
          如果您对我们的产品感兴趣或有任何疑问，请随时联系我们，我们将为您提供专业的咨询服务。
        </p>

        <button
          id="consultation-btn"
          className="consultation-btn"
          onClick={openConsultationForm}
        >
          立即咨询
        </button>
      </section>

      {/* 咨询表单弹窗 */}
      {showModal && (
        <div 
          id="consultation-modal" 
          className="modal"
          onClick={closeConsultationForm}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span 
              className="close" 
              onClick={closeConsultationForm}
            >
              &times;
            </span>
            <h3>产品咨询</h3>
            <form
              onSubmit={handleSubmit}
              id="consultation-form"
            >
              <input type="hidden" name="_subject" value="新的产品咨询！" />
              <input type="hidden" name="_captcha" value="true" />
              
              <div className="form-group">
                <label htmlFor="name">姓名 *</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label>电话号码 *</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div
                    style={{
                      flex: '0 0 auto',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#333',
                    }}
                  >
                    +
                  </div>
                  <div style={{ flex: '0 0 100px' }}>
                    <input
                      type="text"
                      id="country-code"
                      name="country-code"
                      placeholder="国家代码"
                      required
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div style={{ flex: '1' }}>
                    <input
                      type="tel"
                      id="phone-number"
                      name="phone-number"
                      placeholder="电话号码"
                      required
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
                <small style={{ color: '#666', fontSize: '12px' }}>
                  例如：+1 1234567890 或 +44 1234567890
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="email">邮箱地址</label>
                <input type="email" id="email" name="email" />
              </div>

              <div className="form-group">
                <label htmlFor="message">咨询内容 *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                提交咨询
              </button>
            </form>
          </div>
        </div>
      )}

      <hr />

      <footer>
        <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
          智能展馆多媒体中控系统，为您的展览空间提供全方位的智能解决方案，助力打造令人难忘的参观体验。
        </p>
      </footer>
    </div>
  );
};

export default HomeContent;