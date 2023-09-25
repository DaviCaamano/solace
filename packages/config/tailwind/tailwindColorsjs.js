export const tailwindColorsJs = (enumerable) => {
  const json = {};
  Object.keys(enumerable).forEach((key) => {
    const value = enumerable[key];
    const [color, subColor, brightness] = extractNestedColor(key);
    if (!json[color]) {
      json[color] = {};
    }
    if (subColor) {
      if (!json[color][subColor]) {
        json[color][subColor] = {};
      }
      if (brightness) {
        json[color][subColor][brightness] = String(value);
      }
      json[color][subColor] = String(value);
    } else {
      json[color][brightness || 'DEFAULT'] = String(value);
    }
  });
  return json;
};

export const extractNestedColor = (original) => {
  let numb = original.match(/\d/g)?.join('') || null;
  const stringWithoutNumber = numb ? original.replace(/\d/g, '') : original;

  const [color, subColor] = stringWithoutNumber.split('-');
  return [color, subColor || null, numb];
};

export default tailwindColorsJs;
