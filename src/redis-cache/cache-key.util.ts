export const normalizeParams = (raw: Record<string, any> | undefined) => {
  const denylist = new Set(['date', 'end_date_min']);

  const normalizeValue = (value: any): any => {
    if (value === null || value === undefined) return undefined;
    if (Array.isArray(value)) {
      const normalizedArray = value
        .map((v) => normalizeValue(v))
        .filter((v) => v !== undefined);
      const asStrings = normalizedArray.map((v) =>
        typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean'
          ? v
          : JSON.stringify(v),
      );
      const sorted = [...asStrings].sort();
      return sorted.map((s) => {
        try {
          return JSON.parse(String(s));
        } catch {
          return s;
        }
      });
    }
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : undefined;
    }
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed.length ? trimmed : undefined;
    }
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'object') {
      const entries = Object.entries(value)
        .filter(([k]) => !denylist.has(k))
        .map(([k, v]) => [k, normalizeValue(v)] as const)
        .filter(([, v]) => v !== undefined)
        .sort(([a], [b]) => a.localeCompare(b));
      return Object.fromEntries(entries);
    }
    return value;
  };

  return normalizeValue(raw || {}) as Record<string, any>;
};

export const generateCacheKey = (namespace: string, rawParams?: Record<string, any>) => {
  const normalized = normalizeParams(rawParams);
  return `${namespace}:${JSON.stringify(normalized)}`;
};
