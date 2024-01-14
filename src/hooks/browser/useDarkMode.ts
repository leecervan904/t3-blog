import { useEffect } from 'react'
import { useLocalStorageState } from 'ahooks'

import { addClass, removeClass } from '~/util'

export const STORAGE_PREFIX = '__blog__'
export const STORAGE_THEME_MODE_KEY = `${STORAGE_PREFIX}dark-mode`

/**
 * 设置暗黑模式，优先级（依次提高）：
 * 1. 系统设置：是否开启深色模式 isSystemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
 * 2. 用户页面设置：手动切换的主题色 darkMode = 'light' | 'dark'，持久化到 localStorage
 *   - light：使用亮色
 *   - dark：使用暗色
 */
export function useDarkMode() {
  const defaultMode = 'light'
  const [darkMode, setDarkMode] = useLocalStorageState<'light' | 'dark'>(
    STORAGE_THEME_MODE_KEY,
    {
      defaultValue: defaultMode,
    },
  )

  // 如果没有值，初始化
  if (!window.localStorage.getItem(STORAGE_THEME_MODE_KEY)) {
    setDarkMode(defaultMode)
  } else {
    const isSystemDarkMode = window?.matchMedia?.('(prefers-color-scheme: dark)').matches
    if (isSystemDarkMode) {
      setDarkMode('dark')
    }
  }

  useEffect(() => {
    const doc = document.documentElement
    if (darkMode === 'light') {
      removeClass(doc, 'dark')
    } else {
      addClass(doc, 'dark')
    }
  }, [darkMode])

  return {
    darkMode,
    setDarkMode,
  }
}
