// @ts-ignore
import { Enum } from 'shared/dist/interfaces/enum';

type TailwindColorRecord = Record<string, string>;
type TailwindNestedColorRecord = Record<string, string | TailwindColorRecord>;
type TailwindColorJson = Record<string, TailwindNestedColorRecord>;

export const tailwindColors = (enumerable: Enum): TailwindColorJson => {
  const json: TailwindColorJson = {};
  Object.keys(enumerable).forEach((key: string) => {
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

type StringWithoutNumber = string;
type ExtractedNumber = string | null;
type SubColor = string | null;
export const extractNestedColor = (
  original: string,
): [StringWithoutNumber, SubColor, ExtractedNumber] => {
  let numb: string | null = original.match(/\d/g)?.join('') || null;
  const stringWithoutNumber: string = numb
    ? original.replace(/\d/g, '')
    : original;

  const [color, subColor] = stringWithoutNumber.split('-');
  return [color, subColor || null, numb];
};
