export const getKeys = (source, changes = []) => {
  const sourceKeys = Object.keys(source);
  const changesKeys = Object.keys(changes);
  const keys = sourceKeys.concat(changesKeys);
  const distinct = keys.filter((key, i) => keys.indexOf(key) === i);

  return distinct;
};
export const isValue = (obj) => {
  if (obj === false) return true;
  if (Array.isArray(obj)) return true;
  if (typeof obj === 'string') return true;
  if (typeof obj === 'number') return true;
  if (typeof obj === 'object' && Object.keys(obj).length === 0) return true;

  return false;
};
export const hasKeys = (obj) => {
  if (Array.isArray(obj)) return false;
  if (typeof obj === 'object' && Object.keys(obj).length > 0) return true;

  return false;
};
// this allows undefined or null as a value
const injector = (source, changes) => {
  const output = {};
  getKeys(source, changes).forEach(key => {
    if (source.hasOwnProperty(key) && !changes.hasOwnProperty(key)) {
      output[key] = source[key];
      return;
    }
    if (!source.hasOwnProperty(key) && changes.hasOwnProperty(key)) {
      output[key] = changes[key];
      return;
    }
    if (isValue(changes[key])) {
      output[key] = changes[key];
      return;
    }
    if (hasKeys(changes[key])) {
      output[key] = injector(source[key], changes[key]);
      return;
    }
  });

  return output;
};

export default injector;
