// Removes any untranspiled shortcodes that may come through
export const sanitizeWPContent = (content?: string): string =>
  content?.replace(/\[.*?\] */g, '').replace(/(http:)/g, 'https:') ?? ''
