export function toBase64Modern(str: string): string {
  const bytes = new TextEncoder().encode(str)
  return btoa(String.fromCharCode(...bytes))
}

export function fromBase64Modern(base64: string): string {
  const binary = atob(base64)
  const bytes = new Uint8Array([...binary].map(char => char.charCodeAt(0)))
  return new TextDecoder().decode(bytes)
}
