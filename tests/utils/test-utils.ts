import { toCamelCase } from '../../src/utils/to-camel-case';

export type getter = () => HTMLElement[] | HTMLElement;

export const assertExistance = (...getters: Array<getter>) => {
  if (getters.length === 0) throw new Error('Should pass at least one getter');

  const elements = {} as Record<string, HTMLElement[] | HTMLElement>;

  getters.forEach((getter) => {
    if (!/^get\w/.test(getter.name)) {
      throw new Error("Getter function name should start with 'get'");
    }

    const name = getter.name.replace(/^get(\w)/, (_, firstLetter) => {
      return firstLetter.toLowerCase();
    });

    elements[name] = getter();
    expect(elements[name]).toBeInTheDocument();
  });

  return elements;
};

export const assertAbsence = (...getters: Array<getter>) => {
  if (getters.length === 0) throw new Error('Should pass at least one getter');

  getters.forEach((getter) => expect(getter).toThrow());
};

export const assertElements = (params: { exist: getter[]; absent: getter[] }) => {
  const elements = assertExistance(...params.exist);
  assertAbsence(...params.absent);

  return elements;
};

export const toRegExp = (text: unknown, flags: string = 'i') => new RegExp(String(text), flags);

export const delay = (time?: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, time);
  });
};

export function createGetter(className: string): () => HTMLElement {
  const getterName = `get${toCamelCase(className)}`;

  const wrap = {
    [getterName]() {
      const result = document.body.querySelector<HTMLElement>(`.${className}`);

      if (result) return result;

      throw new Error(`Element with class ${className} were not found`);
    },
  };

  return wrap[getterName];
}

export function createArrayGetter(className: string): () => HTMLElement[] {
  const getterName = `get${toCamelCase(className)}`;

  const wrap = {
    [getterName]() {
      const result = [...document.body.querySelectorAll<HTMLElement>(`.${className}`)];

      if (result.length) return result;

      throw new Error(`Elements with class ${className} were not found`);
    },
  };

  return wrap[getterName];
}
