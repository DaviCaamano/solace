export const getEnumValues = (enumerable) => {
    // @ts-ignore
    return Object.values(enumerable).filter((value) => {
        return typeof value === 'string';
    });
};
export const enumToJson = (enumerable) => {
    // @ts-ignore
    const json = {};
    Object.keys(enumerable).forEach((key) => {
        json[key] = enumerable[key];
    });
    return json;
};
