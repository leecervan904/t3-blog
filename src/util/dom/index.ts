
export const addClass = (dom: HTMLElement, cls: string | string[]) => {
  for (const s of [...new Set(Array.isArray(cls) ? cls : [cls])]) {
    if (!dom.classList.contains(s)) {
      dom.classList.add(s)
    }
  }
}

export const removeClass = (dom: HTMLElement, cls: string | string[]) => {
  for (const s of [...new Set(Array.isArray(cls) ? cls : [cls])]) {
    if (dom.classList.contains(s)) {
      dom.classList.remove(s)
    }
  }
}

const isDef = (value: unknown) => value != null

const isPrimitive = (value: unknown) => {
  if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') return true
}

const isJSONString = (value: unknown) => {
  try {
    JSON.parse(value as string)
  } catch {
    return false
  }
  return true
}

export const setDataAttr = (
  dom: HTMLElement,
  key: string,
  value: unknown,
  serialized = (data: unknown) => {
    if (!isDef(value)) return ''

    if (isPrimitive(data)) {
      return String(data)
    }

    return JSON.stringify(data)
  },
) => {
  dom.setAttribute(`data-${key}`, serialized(value))
}

export const getDataAttr = (
  dom: HTMLElement,
  key: string,
  deserialized = (data: string) => {
    // todo: 获取最终的返回值类型
    if (isJSONString(data)) {
      const res = JSON.parse(data)
      return res
    }

    return data
  },
) => {
  const value = dom.getAttribute(`data-${key}`) ?? ''

  dom.setAttribute(`data-${key}`, deserialized(value))
}
