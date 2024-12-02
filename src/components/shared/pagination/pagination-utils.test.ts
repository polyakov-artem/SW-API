import { getBaseUrlForPageParam } from './pagination-utils';

describe('getBaseUrlForPageParam', () => {
  describe('when the URL has no parameters', () => {
    test('should return URL with empty page param at the end', () => {
      const url = 'https://example.com/path';
      const result = getBaseUrlForPageParam(url);

      expect(result).toBe('https://example.com/path?page=');
    });
  });

  describe('when URL has only page parameter', () => {
    test('should return URL with empty page param at the end', () => {
      const url = 'https://example.com/?page=10';
      const result = getBaseUrlForPageParam(url);

      expect(result).toBe('https://example.com/?page=');
    });
  });

  describe('when URL has multiple parameters and page is first', () => {
    test('should return URL with empty page param at the end', () => {
      const url = 'https://example.com/?page=2&param=value';
      const result = getBaseUrlForPageParam(url);

      expect(result).toBe('https://example.com/?param=value&page=');
    });
  });

  describe('when URL has multiple parameters and page is second', () => {
    test('should return URL with empty page param at the end', () => {
      const url = 'https://example.com/?param1=value&page=2&param2=value';
      const result = getBaseUrlForPageParam(url);

      expect(result).toBe('https://example.com/?param1=value&param2=value&page=');
    });
  });

  describe('when URL has multiple parameters and page is last', () => {
    test('should return URL with empty page param at the end', () => {
      const url = 'https://example.com/?param1=value&param2=value&page=10';
      const result = getBaseUrlForPageParam(url);

      expect(result).toBe('https://example.com/?param1=value&param2=value&page=');
    });
  });
});
