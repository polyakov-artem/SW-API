import classNames from 'classnames';

export interface GetClassNamesParamsType {
  baseClass: string;
  classMods?: Record<string, string | boolean | undefined>;
  mix?: string;
}

export const getClassNames = ({ baseClass, classMods, mix }: GetClassNamesParamsType) => {
  const modificationClasses = Object.entries(classMods || {}).map(([modKey, modValue]) => {
    const typeOfValue = typeof modValue;

    return typeOfValue !== 'boolean' && modValue !== undefined
      ? `${baseClass}_${modKey}_${modValue}`
      : modValue === true
        ? `${baseClass}_${modKey}`
        : null;
  });

  return classNames(baseClass, ...modificationClasses, mix);
};
