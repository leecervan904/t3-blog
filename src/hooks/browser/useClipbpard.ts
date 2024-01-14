function legacyCopy(value: string) {
  const ta = document.createElement('textarea')
  ta.value = value ?? ''
  ta.style.position = 'absolute'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  ta.remove()
}

export function useClipboard() {
  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
      .catch(() => legacyCopy(text))
  }

  const paste = async () => {
    return await navigator.clipboard.readText()
  }

  return {
    copy,
    paste,
  }
}
