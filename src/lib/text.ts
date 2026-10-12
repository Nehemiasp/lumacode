/** Separa la última palabra de un titular ("Código que funciona." → ["Código que ", "funciona."]). */
export function splitLast(text: string): [string, string] {
  const i = text.lastIndexOf(' ');
  return i === -1 ? ['', text] : [text.slice(0, i + 1), text.slice(i + 1)];
}
