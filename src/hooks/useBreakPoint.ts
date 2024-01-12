import { type Config } from "tailwindcss"
import { useMediaQuery } from 'react-responsive'
import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '../../tailwind.config'

const { screens: breakpoints } = resolveConfig(tailwindConfig as Config).theme

// type BreakpointKey = keyof typeof breakpoints

// export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
//   const bool = useMediaQuery({
//     query: `(min-width: ${breakpoints[breakpointKey]})`,
//   })

//   const capitalizedKey = breakpointKey[0]!.toUpperCase() + breakpointKey.substring(1)

//   return {
//     [`is${capitalizedKey}`]: bool,
//   } as Record<`is${Capitalize<K>}`, boolean>
// }

export function useBreakpoint() {
  const isSm = useMediaQuery({ query: `(min-width: ${breakpoints.sm})` })
  const isMd = useMediaQuery({ query: `(min-width: ${breakpoints.md})` })
  const isLg = useMediaQuery({ query: `(min-width: ${breakpoints.lg})` })
  const isXl = useMediaQuery({ query: `(min-width: ${breakpoints.xl})` })
  const isXxl = useMediaQuery({ query: `(min-width: ${breakpoints['2xl']})` })

  return {
    isSm,
    isMd,
    isLg,
    isXl,
    isXxl,
  }
}
