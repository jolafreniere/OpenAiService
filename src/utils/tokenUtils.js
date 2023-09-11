export function isWithinTokenLimit(str, maxTokens) {
  const avgBytesPerToken = 4;
  const byteSize = Buffer.from(str, "utf-8").length;
  const estimatedTokens = Math.ceil(byteSize / avgBytesPerToken);
  return estimatedTokens <= maxTokens;
}
