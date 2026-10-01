export function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    return value === null
      ? fallback
      : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep the application usable if browser storage is unavailable.
  }
}

export const favoriteKey = (owner) =>
  `movieExplorer:favorites:${owner}`;