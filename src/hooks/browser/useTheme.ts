import { useEffect } from 'react'
import { useLocalStorageState } from 'ahooks'

import { addClass, removeClass, setDataAttr } from '~/util'

export enum ThemeModeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export const STORAGE_PREFIX = '__blog__'
export const STORAGE_THEME_MODE_KEY = `${STORAGE_PREFIX}theme-mode`

/**
 * 这里仅仅是一种实现方式，可以选择使用第三方工具
 * theme-change https://github.com/saadeghi/theme-change
 *
 * 设置主题色，优先级（依次提高）：
 * 1. 系统设置：是否开启深色模式 isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
 * 2. 用户页面设置：手动切换的主题色 themeMode = 'auto' | 'light' | 'dark'，持久化到 localStorage
 *   - auto：使用 1.系统设置
 *   - light：使用亮色
 *   - dark：使用暗色
 */
export function useTheme() {
  const systemThemeMode = window?.matchMedia?.('(prefers-color-scheme: dark)').matches ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT
  const [themeMode, setThemeMode] = useLocalStorageState<ThemeModeEnum>(
    STORAGE_THEME_MODE_KEY,
    {
      defaultValue: systemThemeMode,
    },
  )

  useEffect(() => {
    // 如果没有值，初始化
    if (!window.localStorage.getItem(STORAGE_THEME_MODE_KEY)) {
      setThemeMode(systemThemeMode)
    }
  }, [])

  useEffect(() => {
    const doc = document.documentElement
    if (themeMode === ThemeModeEnum.LIGHT) {
      removeClass(doc, 'dark')
      setDataAttr(doc, 'theme', 'light')
    } else {
      addClass(doc, 'dark')
      setDataAttr(doc, 'theme', 'dark')
    }
  }, [themeMode])

  return {
    themeMode,
    systemThemeMode,
    setThemeMode,
  }
}
