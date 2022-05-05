export function splitWords(value: string) {
  const newVal = value.split(/(?=[A-Z])/).join(" ");
  return newVal.charAt(0).toUpperCase() + newVal.slice(1);
}
