/** Educational margin arithmetic; does not validate or measure a photographed card. */
export function marginRatio(first: number, second: number): [number, number] | undefined {
  if (!Number.isFinite(first) || !Number.isFinite(second) || first < 0 || second < 0) return undefined;
  const total = first + second;
  if (!Number.isFinite(total) || total <= 0) return undefined;
  const percent = first / total * 100;
  return [percent, 100 - percent];
}
