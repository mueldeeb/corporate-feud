export function normalizeAnswer(input: string) {
  return input.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.,!?;:'"()\[\]{}]/g, '');
}
function levenshtein(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
  return dp[a.length][b.length];
}
export function isMinorVariation(input: string, target: string) {
  const a = normalizeAnswer(input); const b = normalizeAnswer(target);
  if (a === b) return true;
  if (a.length < 4 || b.length < 4) return false;
  return levenshtein(a,b) <= Math.max(1, Math.floor(Math.min(a.length,b.length) * 0.18));
}
