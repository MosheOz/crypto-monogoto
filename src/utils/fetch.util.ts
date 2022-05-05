export function fetchDynamicAPI(e: string) {
  return fetch(e).then((response) => response.json());
}
