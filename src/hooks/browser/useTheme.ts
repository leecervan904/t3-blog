import { useLocalStorageState } from 'ahooks'
import { useEffect } from 'react'
import { addClass, removeClass } from '~/util'

export enum ThemeModeEnum {
  AUTO = 'auto',
  LIGHT = 'light',
  DARK = 'dark',
}

export const STORAGE_THEME_MODE_KEY = '__theme-mode'

/**
 * 设置主题色，优先级（依次提高）：
 * 1. 系统设置：是否开启深色模式 isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
 * 2. 用户页面设置：手动切换的主题色 themeMode = 'auto' | 'light' | 'dark'，持久化到 localStorage
 *   - auto：使用 1.系统设置
 *   - light：使用亮色
 *   - dark：使用暗色
 */
export function useTheme() {
  const [themeMode, setThemeMode] = useLocalStorageState<ThemeModeEnum>(
    STORAGE_THEME_MODE_KEY,
    {
      defaultValue: ThemeModeEnum.AUTO,
    },
  )

  // 如果没有值，初始化
  if (!window.localStorage.getItem(STORAGE_THEME_MODE_KEY)) {
    setThemeMode(ThemeModeEnum.AUTO)
  }

  const isSystemDarkMode = window?.matchMedia?.('(prefers-color-scheme: dark)').matches

  useEffect(() => {
    console.log('themeMode', themeMode);

    let mode = themeMode
    if (themeMode === ThemeModeEnum.AUTO) {
      mode = isSystemDarkMode ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT
    }

    const doc = document.documentElement
    if (mode === ThemeModeEnum.LIGHT) {
      removeClass(doc, 'dark')
    } else {
      addClass(doc, 'dark')
    }
  }, [themeMode])

  return {
    themeMode,
    isSystemDarkMode,
    setThemeMode,
  }
}
