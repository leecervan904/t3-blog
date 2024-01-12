
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
