export const toCamelCase = (str: string) => str.replace(/-./gi, (match) => match[1].toUpperCase());
