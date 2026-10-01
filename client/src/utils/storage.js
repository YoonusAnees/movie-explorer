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

export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Keep the application usable if browser storage is unavailable.
  }
}

export const AUTH_USER_KEY = "movieExplorer:authUser";

export const favoriteKey = (owner) =>
  `movieExplorer:favorites:${owner}`;
