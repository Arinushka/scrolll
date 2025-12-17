export function readLSAsync<T>(key: string): Promise<T | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const raw = localStorage.getItem(key);
      resolve(raw ? (JSON.parse(raw) as T) : null);
    }, 0);                     
  });
}