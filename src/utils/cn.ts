/** Koşullu className birleştirici. Harici bağımlılık gerektirmeyecek kadar basit. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
