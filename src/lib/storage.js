// localStorage can throw (private mode, blocked storage). Never let it break the UI.
export const safeStorage = {
  getItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
  removeItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

export const sessionCache = {
  get(key, maxAgeMs) {
    try {
      const raw = window.sessionStorage.getItem(key);
      if (!raw) return null;
      const { t, v } = JSON.parse(raw);
      return Date.now() - t < maxAgeMs ? v : null;
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v: value }));
    } catch {
      /* ignore */
    }
  },
};
