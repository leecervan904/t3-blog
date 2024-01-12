'use client'

import clsx from "clsx"
import { useCallback } from "react"

import { ThemeModeEnum, useTheme } from "~/hooks/browser/useTheme"

export default function ThemeModeIcon() {
  const { themeMode, setThemeMode } = useTheme()

  const onClick = useCallback((mode: ThemeModeEnum) => {
    setThemeMode(mode)
  }, [])

  return (
    <span className="overflow-hidden flex rounded border text-sm border-gray-500 dark:border-[#220c52]">
      {[ThemeModeEnum.LIGHT, ThemeModeEnum.AUTO, ThemeModeEnum.DARK].map((mode, i) => (
        <span
          key={mode}
          className={clsx(
            'px-2 py-1 cursor-pointer border-gray-500 hover:bg-gray-300 transition-colors',
            'dark:hover:bg-[#220c52] dark:border-[#220c52]',
            {
              'border border-y-0': i === 1,
              'bg-gray-300 dark:bg-[#220c52]': themeMode === mode,
            },
          )}
          onClick={() => onClick(mode)}
        >{mode}</span>
      ))}
    </span>
  )
}
