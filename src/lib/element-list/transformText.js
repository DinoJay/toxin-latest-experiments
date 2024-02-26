export default function transformText(text) {
    return text
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/(?: |\b)(\w)/g, (key) => {
            return key.toUpperCase();
        });

}
function capitalizeExceptLast(inputString) {
    return inputString.replace(/\b\w+\b/g, function (match, index, string) {
        return index === string.trim().split(/\s+/).length - 1 ? match : match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
    });
}
export function transformTextToKey(text) {
    const t = (text
        .replace(/_/g, ' ')
        .replace(/(?: |\b)(\w)/g, (key) => {
            return key
        }))

    // console.log('t', t)

    // if (t.split(' ').length === 1) {
    //     return t[0]?.toUpperCase() + t.slice(1)
    // }
    return t

    // return t.split(' ').filter(d => d !== '').map((d, i) => {
    //     if (i === t.split(' ').length - 1) {
    //         return d[0]?.toLowerCase() + d.slice(1)
    //     } else {
    //         return d[0]?.toUpperCase() + d.slice(1)
    //     }
    // }).join(' ')

}