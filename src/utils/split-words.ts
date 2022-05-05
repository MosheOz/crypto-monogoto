export function splitWords(value: string) {
  return value.split(/(?=[A-Z])/).join(" ");
}
