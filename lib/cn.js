/** Tiny class name joiner — no runtime dependency needed. */
export function cn(...parts) {
  let out = '';
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (!part) continue;
    if (typeof part === 'string' || typeof part === 'number') {
      out += (out ? ' ' : '') + part;
    } else if (Array.isArray(part)) {
      const nested = cn(...part);
      if (nested) out += (out ? ' ' : '') + nested;
    } else if (typeof part === 'object') {
      for (const key of Object.keys(part)) {
        if (part[key]) out += (out ? ' ' : '') + key;
      }
    }
  }
  return out;
}
