import { withBase } from './base-path.mjs';
export const sitePath = (path: string) => withBase(path, import.meta.env.BASE_URL);
