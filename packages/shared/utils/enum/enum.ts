import { Enum } from 'shared/interfaces/enum';

export const getEnumValues = <T = string | number>(
  enumerable: Enum<T>,
): T[] => {
  // @ts-ignore
  return Object.values(enumerable).filter((value: T) => {
    return typeof value === 'string';
  });
};
