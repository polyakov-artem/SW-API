export const getBaseUrlForPageParam = (url: string) => {
  const hasParams = /\?/.test(url);
  const hasMultipleParams = /&/.test(url);
  const pageParamString = 'page=';

  if (!hasParams) {
    return `${url}?${pageParamString}`;
  }

  const firstParamRegexp = /(?<=\?)page=\w*&*/gi;

  if (hasMultipleParams) {
    const middleOrEndParamRegexp = /&page=\w*/gi;

    if (firstParamRegexp.test(url) || middleOrEndParamRegexp.test(url)) {
      return (
        url.replace(firstParamRegexp, '').replace(middleOrEndParamRegexp, '') +
        `&${pageParamString}`
      );
    }
  }

  return url.replace(firstParamRegexp, '') + `${pageParamString}`;
};
