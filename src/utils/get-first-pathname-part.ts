export const getFirstPathNamePart = () => {
  const pathName = window.location.pathname;
  const pathNameParts = pathName.split('/');

  if (pathNameParts.length === 1) return '';

  return pathNameParts[2];
};
