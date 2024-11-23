export const getBaseUrlForPageParam = (url: string) => {
  const clearedPath = url.replace(/\?(page=.*&)|(&page=[^&]*)/i, '');
  const hasEndSlash = /\/$/.test(clearedPath);
  const hasParams = /\/\?/.test(clearedPath);
  const pageParamString = 'page=';
  return `${clearedPath}${hasParams ? `&${pageParamString}` : hasEndSlash ? `?${pageParamString}` : `/?${pageParamString}`}`;
};
