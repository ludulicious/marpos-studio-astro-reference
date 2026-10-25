/** Add a deployment base to local absolute URLs; preserve anchors and external URLs.
 * @param {string} path
 * @param {string} base
 */
export function withBase(path, base = '/') {
  const prefix = base.replace(/\/$/, '');
  if (!prefix || !path.startsWith('/') || path.startsWith('//')) return path;
  if (path === prefix || path.startsWith(prefix + '/')) return path;
  return prefix + path;
}
