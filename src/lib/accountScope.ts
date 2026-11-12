/** Invalidate asynchronous private-data work synchronously on every identity change. */
export const accountScope: { id: string | null; revision: number } = { id: null, revision: 0 };
export function setAccountScope(id: string | null) {
  if (accountScope.id !== id) { accountScope.id = id; accountScope.revision++; }
}
