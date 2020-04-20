export default function(k, v) {
  if (!(typeof window !== 'undefined' && window && window.localStorage)) return;

  k = `sc:${k}`;
  const storage = window.localStorage;

  switch (arguments.length) {
    case 2:
      if (v === null) return storage.removeItem(k);
      return storage.setItem(k, JSON.stringify(v));

    case 1:
      try {
        return JSON.parse(storage.getItem(k));
      } catch (e) {
        return null;
      }

    default:
      return;
  }
}
