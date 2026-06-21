export type OrderStatusHistoryItem = {
  status: string;
  note?: string;
  changedAt: Date | string;
};

export function dedupeStatusHistory<T extends OrderStatusHistoryItem>(history?: T[] | null): T[] {
  if (!history?.length) {
    return [];
  }

  const seen = new Set<string>();

  return history.filter((entry) => {
    const key = entry.status.trim().toLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}
