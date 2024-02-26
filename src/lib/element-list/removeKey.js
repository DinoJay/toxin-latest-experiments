
export default function (obj, key) {
    const { [key]: deletedKey, ...otherKeys } = obj;
    return otherKeys;
};